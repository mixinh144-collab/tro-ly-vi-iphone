(() => {
  const enable = document.getElementById('pushEnable');
  const disable = document.getElementById('pushDisable');
  const status = document.getElementById('pushStatus');
  if (!enable || !disable || !status) return;

  const setStatus = message => { status.textContent = message; };
  const supported = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let api = '', publicKey = '', registration;
  const bytes = value => {
    const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - value.length % 4) % 4);
    return Uint8Array.from(atob(padded), char => char.charCodeAt(0));
  };
  const refresh = async () => {
    const subscription = await registration.pushManager.getSubscription();
    enable.hidden = Boolean(subscription);
    disable.hidden = !subscription;
    setStatus(subscription ? 'Đã bật thông báo trên thiết bị này.' : 'Chưa bật thông báo trên thiết bị này.');
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

  setup();
})();
