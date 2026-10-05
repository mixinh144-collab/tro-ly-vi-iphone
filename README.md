# Trợ Lý Ví Mimi cho iPhone, iPad và Android

Đây là web-app độc lập, không thay đổi `index.html` hay dữ liệu của bản Windows. Ứng dụng dùng giao diện điện thoại trên màn hình nhỏ và tự mở rộng theo chiều rộng máy tính bảng.

## Có trong bản đầu

- Giữ đầy đủ các mục của bản Windows: Tổng quan, Giao dịch, Lịch, Thống kê, Báo cáo, Lịch & nhắc việc, Chi hộ & Hoàn tiền, Sao lưu và Cài đặt.
- Giữ cùng màu, font, thẻ, nút, chế độ tối và cách trình bày; trên iPhone thanh bên chuyển thành thanh điều hướng ở dưới để không chật màn hình.
- Xuất/khôi phục định dạng JSON tương thích với tệp Sao lưu của Trợ Lý Ví 1.25. Trong mục Sao lưu có thêm nút **Lưu vào iCloud Drive**, mở bảng Chia sẻ của iPhone; chọn **Lưu vào Tệp** rồi chọn **iCloud Drive**.

## Cách cài trên điện thoại và máy tính bảng

Bạn có thể mở ảnh `qr-tro-ly-vi-iphone.png`, dùng Camera quét mã rồi mở liên kết bằng Safari. QR có tham số phiên bản `?v=8` để tránh trình quét mở lại trang hoặc biểu tượng nền đen từ bộ nhớ đệm.
Ảnh dùng thẻ trắng bo góc với viền hồng nhẹ, không có mảng bóng xám phía sau và không in địa chỉ GitHub bên dưới; đường dẫn vẫn nằm đầy đủ trong mã QR.
Phía dưới thẻ QR có dòng ghi công **Tạo bởi Mimi Studio** để người nhận ảnh biết người tạo ứng dụng.
Logo mới của Trợ Lý Ví Mimi là hình chiếc ví hồng có chữ M; cùng ảnh được dùng cho biểu tượng ứng dụng và biểu tượng trong giao diện.

1. Đưa toàn bộ thư mục `D:\Codex\2026-08-20\iphone` lên một địa chỉ HTTPS.
2. Mở địa chỉ đó bằng Safari trên iPhone.
3. Bấm Chia sẻ → **Thêm vào Màn hình chính**.
4. Mở biểu tượng **Ví Mimi** vừa thêm.

Khi mở trang lần đầu từ QR trên iPhone hoặc iPad, ứng dụng tự hiện bảng hướng dẫn ba bước: mở bằng Safari, bấm Chia sẻ và chọn **Thêm vào Màn hình chính**. Bảng không tự hiện khi ứng dụng đã chạy ở chế độ Màn hình chính. Có thể mở lại bất cứ lúc nào tại **Khác → Hướng dẫn cài đặt**.

Trên Android, bảng hướng dẫn tự đổi thành ba bước dành cho Chrome: mở bằng Google Chrome, bấm menu `⋮`, rồi chọn **Cài đặt ứng dụng** hoặc **Thêm vào màn hình chính**. Nút sao lưu bổ sung đổi thành **Lưu hoặc chia sẻ tệp** và có thể gửi tệp tới Google Drive hoặc ứng dụng lưu trữ khác.

Mục **Khác → Kiểm tra cập nhật** đọc `version.json` trực tiếp từ máy chủ, yêu cầu service worker tải bản mới rồi cho phép tải lại để áp dụng. Mỗi lần phát hành bản điện thoại cần cập nhật đồng thời `version.json`, tên cache trong `service-worker.js` và tải toàn bộ tệp thay đổi lên cùng địa chỉ GitHub Pages. Bản cập nhật EXE của Windows không tự chuyển chức năng sang bản điện thoại.

`version.json` còn có khối `notice` để Mimi Studio gửi thông báo khi người dùng mở ứng dụng. Đổi `id` mỗi lần có nội dung mới, sửa `title` và `message`, đặt `enabled` thành `true`, rồi tải tệp lên GitHub Pages. Mỗi thiết bị chỉ hiện một lần cho mỗi `id`; đặt `showUpdateButton` thành `true` nếu thông báo cần kèm nút **Kiểm tra cập nhật**. Đặt `enabled` về `false` để ngừng hiện thông báo. Chức năng này chỉ đọc tệp công khai trên GitHub và không gửi dữ liệu người dùng.

`version.json` có thêm khối `shutdown` để tạm khóa ứng dụng từ xa khi bạn không muốn tiếp tục cho người khác trải nghiệm. Giữ `enabled` ở `false` để ứng dụng hoạt động bình thường. Khi cần khóa, đổi `enabled` thành `true`, sửa `title` và `message`, rồi tự tải riêng `version.json` lên GitHub Pages. Người dùng cần có mạng và mở/tải lại ứng dụng để nhận lệnh; bản đang mở khi hoàn toàn mất mạng có thể chưa nhận được lệnh khóa.

Khi `notice.showUpdateButton` là `true`, thông báo tự hiện sẽ có nút **Cập nhật ngay**. Nút này tự kiểm tra bản mới, chờ service worker chuẩn bị xong và tải lại ứng dụng; nếu mạng lỗi, người dùng có thể thử lại hoặc dùng mục **Khác → Kiểm tra cập nhật**.

Phiên bản phát hành hiện tại của bản iPhone/iPad là **1.2.7**. Số cache `tro-ly-vi-iphone-29` chỉ dùng nội bộ để làm mới tệp, không phải số phiên bản hiển thị cho người dùng.

Cuối mục **Khác** có thẻ **Phiên bản ứng dụng**, tự hiển thị số phiên bản iPhone hiện tại bên cạnh tên **Trợ Lý Ví** và chữ **Mimi Studio**.

Góc trên bên phải hiển thị ảnh của hồ sơ đang dùng. Nếu hồ sơ chưa có ảnh, vị trí này hiển thị icon đã chọn cho hồ sơ thay vì chữ cái đầu của tên.
Bấm trực tiếp vào ảnh hoặc icon này để mở bảng **Ảnh hồ sơ**. Bảng có hai lựa chọn riêng: **Chụp ảnh** mở Camera trước và **Chọn từ thư viện** mở kho ảnh; ảnh có thể kéo để căn, phóng to, lưu hoặc xóa mà không cần vào Cài đặt.

Trên điện thoại, giao diện hiện tại được giữ nguyên. Từ 700 px, khung ứng dụng và thanh điều hướng mở rộng linh hoạt gần hết màn hình; từ 960 px, các khu vực đủ chỗ như Tổng quan, Lịch, Nhắc việc, Cài đặt và Sao lưu mới chuyển sang hai cột.

Khi người dùng chọn **Cập nhật ngay** hoặc **Tải lại để cập nhật**, ứng dụng yêu cầu service worker đang chờ kích hoạt trước, sau đó chỉ xóa các cache chương trình có tiền tố `tro-ly-vi-iphone-`, giữ nguyên dữ liệu giao dịch trong `localStorage`, rồi mở lại bằng URL chống cache. Bản cũ giữ nguyên HTML đã cache cho đến khi người dùng xác nhận cập nhật; vì vậy mở app không tự nhảy sang giao diện mới.
Trình kiểm tra cập nhật so sánh số phiên bản theo từng phần; chỉ báo bản mới khi phiên bản trên máy chủ cao hơn. Nếu máy chủ đang thấp hơn do GitHub Pages chưa cập nhật xong, ứng dụng không báo nhầm là có bản mới.

## Giới hạn có chủ đích

Đây chưa phải ứng dụng iOS native, nên chưa tự đồng bộ iCloud sau mỗi thay đổi. Dữ liệu được lưu cục bộ trên iPhone; iCloud Drive là kênh sao lưu/khôi phục do người dùng chủ động chọn tệp. Làm đồng bộ tự động cần dự án iOS/CloudKit riêng để xử lý an toàn trường hợp máy tính và điện thoại cùng sửa dữ liệu.

## Giao diện điện thoại đã chốt

- Tổng quan dùng khung hồng lớn: tổng đã chi trong tháng, đã chi trong hôm nay và đã thu trong tháng.
- Nút **Thêm giao dịch** gọn ngay dưới khung tổng quan.
- Thanh dưới có 5 mục: **Tổng quan, Giao dịch, Lịch, Báo cáo, Khác**. Thống kê, Lịch chi tiêu, Chi hộ & Hoàn tiền, Sao lưu và Cài đặt nằm trong **Khác**.
- Vì đây là thư mục dành riêng cho điện thoại, bố cục mobile luôn được dùng cả khi mở thử trong Browser của ChatGPT hoặc trình duyệt máy tính; chiều rộng nội dung được giới hạn 680 px.
- `logo.png` là bản sao logo của Trợ Lý Ví trên máy tính, dùng riêng cho giao diện, biểu tượng tab và biểu tượng cài lên Màn hình chính; logo gốc của bản Windows không bị sửa.
- `apple-touch-icon.png` là bản sao cùng nội dung đặt đúng tên Safari ưu tiên khi tạo biểu tượng Màn hình chính. Sau khi thay logo, cần xóa biểu tượng cũ trên iPhone rồi thêm lại từ Safari để tránh bộ nhớ đệm.
- `apple-touch-icon-white.png` là biểu tượng cài lên Màn hình chính có nền trắng kín, giữ nguyên hình chiếc ví. Safari dùng tên tệp mới để tránh lấy lại biểu tượng nền đen đã lưu trước đó.
- Tỷ lệ giao diện được cố định ở 100%. Cử chỉ thu phóng bằng hai ngón bị chặn, còn cuộn bằng một ngón vẫn hoạt động. Các ô nhập dùng cỡ chữ tối thiểu 16 px để Safari không tự phóng to khi bắt đầu nhập liệu.
