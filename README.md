# Trợ Lý Ví cho iPhone — bản đầu

Đây là web-app độc lập, không thay đổi `index.html` hay dữ liệu của bản Windows.

## Có trong bản đầu

- Tổng quan tự tính giao dịch trong tháng hiện tại.
- Thêm và xem giao dịch trên iPhone.
- Thêm Lịch hẹn, Việc cần làm, Sinh nhật, Kỷ niệm và lựa chọn lặp lại hằng năm.
- Đổi Hồ sơ hiện có sau khi khôi phục tệp sao lưu.
- Xuất/khôi phục định dạng JSON tương thích với tệp Sao lưu của Trợ Lý Ví 1.25.
- Nút **Tải sao lưu** mở bảng chia sẻ của iPhone khi Safari hỗ trợ; chọn **Lưu vào Tệp** rồi chọn **iCloud Drive**. Khi cần chuyển dữ liệu từ máy tính, chọn **Khôi phục** và lấy tệp trong iCloud Drive.

## Cách chạy thử trên iPhone

1. Đưa toàn bộ thư mục `PHAT-TRIEN/iphone` lên một địa chỉ HTTPS.
2. Mở địa chỉ đó bằng Safari trên iPhone.
3. Bấm Chia sẻ → **Thêm vào Màn hình chính**.
4. Mở biểu tượng **Trợ Lý Ví** vừa thêm.

## Giới hạn có chủ đích

Đây chưa phải ứng dụng iOS native, nên chưa tự đồng bộ iCloud sau mỗi thay đổi. Dữ liệu được lưu cục bộ trên iPhone; iCloud Drive là kênh sao lưu/khôi phục do người dùng chủ động chọn tệp. Làm đồng bộ tự động cần dự án iOS/CloudKit riêng để xử lý an toàn trường hợp máy tính và điện thoại cùng sửa dữ liệu.
