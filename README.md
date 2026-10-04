# Trợ Lý Ví cho iPhone — bản đầu

Đây là web-app độc lập, không thay đổi `index.html` hay dữ liệu của bản Windows. Nó dùng cùng mã giao diện và toàn bộ chức năng của bản Windows; CSS có sẵn của Trợ Lý Ví tự chuyển sang thanh điều hướng dưới và bố cục một cột trên iPhone.

## Có trong bản đầu

- Giữ đầy đủ các mục của bản Windows: Tổng quan, Giao dịch, Lịch, Thống kê, Báo cáo, Lịch & nhắc việc, Chi hộ & Hoàn tiền, Sao lưu và Cài đặt.
- Giữ cùng màu, font, thẻ, nút, chế độ tối và cách trình bày; trên iPhone thanh bên chuyển thành thanh điều hướng ở dưới để không chật màn hình.
- Xuất/khôi phục định dạng JSON tương thích với tệp Sao lưu của Trợ Lý Ví 1.25. Trong mục Sao lưu có thêm nút **Lưu vào iCloud Drive**, mở bảng Chia sẻ của iPhone; chọn **Lưu vào Tệp** rồi chọn **iCloud Drive**.

## Cách chạy thử trên iPhone

Bạn có thể mở ảnh `qr-tro-ly-vi-iphone.png`, dùng Camera hoặc Zalo quét mã rồi mở liên kết bằng Safari.

1. Đưa toàn bộ thư mục `D:\Codex\2026-08-20\iphone` lên một địa chỉ HTTPS.
2. Mở địa chỉ đó bằng Safari trên iPhone.
3. Bấm Chia sẻ → **Thêm vào Màn hình chính**.
4. Mở biểu tượng **Trợ Lý Ví** vừa thêm.

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
