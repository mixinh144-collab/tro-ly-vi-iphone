# Trợ Lý Ví cho iPhone — bản đầu

Đây là web-app độc lập, không thay đổi `index.html` hay dữ liệu của bản Windows. Nó dùng cùng mã giao diện và toàn bộ chức năng của bản Windows; CSS có sẵn của Trợ Lý Ví tự chuyển sang thanh điều hướng dưới và bố cục một cột trên iPhone.

## Có trong bản đầu

- Giữ đầy đủ các mục của bản Windows: Tổng quan, Giao dịch, Lịch, Thống kê, Báo cáo, Lịch & nhắc việc, Chi hộ & Hoàn tiền, Sao lưu và Cài đặt.
- Giữ cùng màu, font, thẻ, nút, chế độ tối và cách trình bày; trên iPhone thanh bên chuyển thành thanh điều hướng ở dưới để không chật màn hình.
- Xuất/khôi phục định dạng JSON tương thích với tệp Sao lưu của Trợ Lý Ví 1.25. Trong mục Sao lưu có thêm nút **Lưu vào iCloud Drive**, mở bảng Chia sẻ của iPhone; chọn **Lưu vào Tệp** rồi chọn **iCloud Drive**.

## Cách chạy thử trên iPhone

Bạn có thể mở ảnh `qr-tro-ly-vi-iphone.png`, dùng Camera quét mã rồi mở liên kết bằng Safari. QR có tham số phiên bản `?v=8` để tránh trình quét mở lại trang hoặc biểu tượng nền đen từ bộ nhớ đệm.
Ảnh dùng thẻ trắng bo góc với viền hồng nhẹ, không có mảng bóng xám phía sau và không in địa chỉ GitHub bên dưới; đường dẫn vẫn nằm đầy đủ trong mã QR.

1. Đưa toàn bộ thư mục `D:\Codex\2026-08-20\iphone` lên một địa chỉ HTTPS.
2. Mở địa chỉ đó bằng Safari trên iPhone.
3. Bấm Chia sẻ → **Thêm vào Màn hình chính**.
4. Mở biểu tượng **Trợ Lý Ví** vừa thêm.

Khi mở trang lần đầu từ QR trên iPhone hoặc iPad, ứng dụng tự hiện bảng hướng dẫn ba bước: mở bằng Safari, bấm Chia sẻ và chọn **Thêm vào Màn hình chính**. Bảng không tự hiện khi ứng dụng đã chạy ở chế độ Màn hình chính. Có thể mở lại bất cứ lúc nào tại **Khác → Hướng dẫn cài đặt**.

Mục **Khác → Kiểm tra cập nhật** đọc `version.json` trực tiếp từ máy chủ, yêu cầu service worker tải bản mới rồi cho phép tải lại để áp dụng. Mỗi lần phát hành bản điện thoại cần cập nhật đồng thời `version.json`, tên cache trong `service-worker.js` và tải toàn bộ tệp thay đổi lên cùng địa chỉ GitHub Pages. Bản cập nhật EXE của Windows không tự chuyển chức năng sang bản điện thoại.

Phiên bản phát hành hiện tại của bản iPhone là **1.1.5**. Số cache `tro-ly-vi-iphone-16` chỉ dùng nội bộ để làm mới tệp, không phải số phiên bản hiển thị cho người dùng.

Cuối mục **Khác** có thẻ **Phiên bản ứng dụng**, tự hiển thị số phiên bản iPhone hiện tại bên cạnh tên **Trợ Lý Ví** và chữ **Mimi Studio**.

Góc trên bên phải hiển thị ảnh của hồ sơ đang dùng. Nếu hồ sơ chưa có ảnh, vị trí này hiển thị icon đã chọn cho hồ sơ thay vì chữ cái đầu của tên.

Trên iPad, khung ứng dụng, thanh điều hướng dưới và các bảng hướng dẫn được giới hạn ở 430 px và căn giữa để giữ đúng bố cục điện thoại, không giãn thành giao diện máy tính bảng.
Các bố cục bên trong như biểu mẫu Lịch & nhắc việc, bộ lọc giao dịch, Thùng rác và Tiết kiệm cũng luôn dùng quy tắc một cột của điện thoại trên iPad.

Khi người dùng chọn **Tải lại để cập nhật**, ứng dụng chỉ xóa các cache chương trình có tiền tố `tro-ly-vi-iphone-`, giữ nguyên dữ liệu giao dịch trong `localStorage`, rồi mở lại bằng URL chống cache. Điều hướng trang dùng mạng trước khi có kết nối và chỉ dùng bản ngoại tuyến khi mạng lỗi, tránh iOS mở lại HTML phiên bản cũ.

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
