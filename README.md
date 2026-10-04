# Trợ Lý Ví cho iPhone — bản đầu

Đây là web-app độc lập, không thay đổi `index.html` hay dữ liệu của bản Windows. Nó dùng cùng mã giao diện và toàn bộ chức năng của bản Windows; CSS có sẵn của Trợ Lý Ví tự chuyển sang thanh điều hướng dưới và bố cục một cột trên iPhone.

## Có trong bản đầu

- Giữ đầy đủ các mục của bản Windows: Tổng quan, Giao dịch, Lịch, Thống kê, Báo cáo, Lịch & nhắc việc, Chi hộ & Hoàn tiền, Sao lưu và Cài đặt.
- Giữ cùng màu, font, thẻ, nút, chế độ tối và cách trình bày; trên iPhone thanh bên chuyển thành thanh điều hướng ở dưới để không chật màn hình.
- Xuất/khôi phục định dạng JSON tương thích với tệp Sao lưu của Trợ Lý Ví 1.25. Trong mục Sao lưu có thêm nút **Lưu vào iCloud Drive**, mở bảng Chia sẻ của iPhone; chọn **Lưu vào Tệp** rồi chọn **iCloud Drive**.

## Cách chạy thử trên iPhone

1. Đưa toàn bộ thư mục `PHAT-TRIEN/iphone` lên một địa chỉ HTTPS.
2. Mở địa chỉ đó bằng Safari trên iPhone.
3. Bấm Chia sẻ → **Thêm vào Màn hình chính**.
4. Mở biểu tượng **Trợ Lý Ví** vừa thêm.

## Giới hạn có chủ đích

Đây chưa phải ứng dụng iOS native, nên chưa tự đồng bộ iCloud sau mỗi thay đổi. Dữ liệu được lưu cục bộ trên iPhone; iCloud Drive là kênh sao lưu/khôi phục do người dùng chủ động chọn tệp. Làm đồng bộ tự động cần dự án iOS/CloudKit riêng để xử lý an toàn trường hợp máy tính và điện thoại cùng sửa dữ liệu.
