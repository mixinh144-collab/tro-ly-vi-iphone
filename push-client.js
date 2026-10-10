(() => {
  const enable = document.getElementById('pushEnable');
  const disable = document.getElementById('pushDisable');
  const status = document.getElementById('pushStatus');
  if (!enable || !disable || !status) return;
  const description = enable.closest('.card')?.querySelector('p');
  if (description) description.textContent = 'Nhận thông báo khi ứng dụng không mở. Dữ liệu thu chi vẫn ở trên máy; sự kiện được chọn nhắc sẽ gửi tên và thời điểm nhắc tới Cloudflare.';

  const setStatus = message => { status.textContent = message; };
  const reminderStatus = () => document.getElementById('reminderSyncStatus');
  const setReminderStatus = message => { const target = reminderStatus(); if (target) target.textContent = message; };
  const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let api = '', publicKey = '', registration;
  let syncTimer = 0, syncRunning = false, syncQueued = false;
  const bytes = value => {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
    return Uint8Array.from(atob(padded), char => char.charCodeAt(0));
  };
  const refresh = async () => {
    const subscription = await registration.pushManager.getSubscription();
    enable.hidden = Boolean(subscription);
    disable.hidden = !subscription;
    setStatus(subscription ? 'Đã bật thông báo trên thiết bị này.' : 'Chưa bật thông báo trên thiết bị này.');
    if (!subscription) setReminderStatus('Bật thông báo màn hình khóa để nhận nhắc sự kiện.');
  };

  const validDate = value => {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };
  const isoDate = (year, month, day) => [year, month, day].map((part, index) => index ? String(part).padStart(2, '0') : String(part)).join('-');
  const plannedReminders = () => {
    let store;
    try { store = JSON.parse(localStorage.getItem('tro_ly_vi_portable_v1') || 'null'); } catch { return []; }
    const profiles = Array.isArray(store?.profiles) ? store.profiles : [];
    const now = Date.now(), currentYear = new Date(now).getFullYear(), reminders = [];
    for (const profile of profiles) {
      const events = Array.isArray(profile?.data?.reminderEvents) ? profile.data.reminderEvents : [];
      for (const event of events) {
        const before = event?.notifyBefore == null || event.notifyBefore === '' ? -1 : Number(event.notifyBefore);
        const title = typeof event?.title === 'string' ? event.title.trim().slice(0, 100) : '';
        if (!title || ![0, 60, 1440, 4320, 10080].includes(before) || !validDate(event?.date)) continue;
        const eventId = JSON.stringify([profile.id, event.id]);
        if (eventId.length > 200 || !profile.id || !event.id) continue;
        const time = typeof event.time === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(event.time) ? event.time : '';
        const [originalYear, month, day] = event.date.split('-').map(Number);
        const years = event.repeatYearly ? [currentYear, currentYear + 1, currentYear + 2, currentYear + 3] : [originalYear];
        for (const year of years) {
          if (year < originalYear) continue;
          const occurrenceDate = month === 2 && day === 29 && !validDate(isoDate(year, 2, 29)) ? isoDate(year, 2, 28) : isoDate(year, month, day);
          const [hour, minute] = (time || '09:00').split(':').map(Number);
          const eventAt = new Date(year, Number(occurrenceDate.slice(5, 7)) - 1, Number(occurrenceDate.slice(8, 10)), hour, minute).getTime();
          const fireAt = eventAt - before * 60000;
          if (eventAt < now || fireAt < now - 3600000) continue;
          reminders.push({ eventId, occurrenceDate, eventTime: time, title, fireAt });
        }
      }
    }
    return reminders.sort((a, b) => a.fireAt - b.fireAt).slice(0, 100);
  };

  const syncReminders = async () => {
    if (!api || !registration) return;
    const subscription = await registration.pushManager.getSubscription();
    if (!subscription) return;
    const reminders = plannedReminders();
    const response = await fetch(api + '/reminders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscription: subscription.toJSON(), reminders }),
    });
    if (!response.ok) throw new Error('Không đồng bộ được lịch nhắc');
    setReminderStatus(reminders.length ? 'Đã đồng bộ lịch nhắc trên thiết bị này.' : 'Chưa có sự kiện được chọn nhắc.');
  };
  const flushSync = async () => {
    if (syncRunning) return;
    syncRunning = true;
    try {
      while (syncQueued) {
        syncQueued = false;
        try { await syncReminders(); }
        catch { setReminderStatus('Chưa đồng bộ được lịch nhắc. Kết nối mạng rồi mở lại ứng dụng.'); }
      }
    } finally { syncRunning = false; }
  };
  const queueSync = () => {
    syncQueued = true;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(flushSync, 400);
  };

  async function setup() {
    if (!supported) { enable.disabled = true; setStatus('Thiết bị hoặc trình duyệt này chưa hỗ trợ thông báo Web Push.'); return; }
    if (!standalone && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      enable.disabled = true;
      setStatus('Hãy mở ứng dụng từ biểu tượng đã thêm vào Màn hình chính.');
      return;
    }
    try {
      const configResponse = await fetch('push-config.json?t=' + Date.now(), { cache: 'no-store' });
      if (!configResponse.ok) throw new Error('Chưa có cấu hình');
      const config = await configResponse.json();
      const url = new URL(config.apiBaseUrl);
      if (url.protocol !== 'https:') throw new Error('Chưa có cấu hình');
      api = url.origin;
      const response = await fetch(api + '/config', { cache: 'no-store' });
      if (!response.ok) throw new Error('Máy chủ chưa sẵn sàng');
      const info = await response.json();
      if (!info.publicKey) throw new Error('Thiếu khóa công khai');
      publicKey = info.publicKey;
      registration = await navigator.serviceWorker.ready;
      enable.disabled = false;
      await refresh();
      queueSync();
    } catch {
      enable.disabled = true;
      setStatus('Thông báo màn hình khóa chưa được thiết lập.');
    }
  }

  enable.addEventListener('click', async () => {
    if (!registration || !publicKey || !api) return;
    enable.disabled = true;
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setStatus('Bạn chưa cho phép thông báo. Có thể bật lại trong Cài đặt của iPhone.');
        return;
      }
      let subscription = await registration.pushManager.getSubscription();
      const created = !subscription;
      if (!subscription) subscription = await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: bytes(publicKey) });
      const response = await fetch(api + '/subscriptions', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(subscription.toJSON()),
      });
      if (!response.ok) {
        if (created) await subscription.unsubscribe();
        throw new Error('Không lưu được thiết bị');
      }
      await refresh();
      queueSync();
    } catch { setStatus('Chưa bật được thông báo. Hãy kiểm tra mạng rồi thử lại.'); }
    finally { enable.disabled = false; }
  });

  disable.addEventListener('click', async () => {
    disable.disabled = true;
    try {
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await fetch(api + '/subscriptions', {
          method: 'DELETE', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        }).catch(() => {});
      }
      await refresh();
    } catch { setStatus('Chưa tắt được thông báo. Hãy thử lại.'); }
    finally { disable.disabled = false; }
  });

  window.addEventListener('mimi-reminders-changed', queueSync);
  window.addEventListener('online', queueSync);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) queueSync(); });
  setup();
})();
