# Nacencomm Demo Website

Website demo tĩnh cho Nacencomm, dựng bằng HTML, CSS và JavaScript thuần.

## Nội dung chính

- Trang chủ giới thiệu hệ sinh thái sản phẩm
- Danh mục 14 sản phẩm với nút `MUA NGAY`
- Trang chi tiết theo `slug`
- Form đăng ký theo từng sản phẩm
- Flow riêng 8 bước cho `remote-signing`
- Upload hồ sơ, trạng thái xử lý và kích hoạt dịch vụ mock

## File chính

- `index.html`: entry point của website
- `style.css`: giao diện, responsive và component styles
- `app.js`: router hash-based, render view, form flow và UI logic
- `mock-data.js`: dữ liệu 14 sản phẩm và các cấu hình mock
- `pdf-mock.js`: tạo file PDF mock từ trình duyệt

## Chạy local

```bash
python -m http.server 3000
```

Mở:

```text
http://127.0.0.1:3000/#/
```

## Route demo

- `#/` - Trang chủ
- `#/products` - Danh mục sản phẩm
- `#/products/remote-signing` - Trang chi tiết sản phẩm
- `#/register/remote-signing` - Form đăng ký Remote Signing
- `#/register/remote-signing/status` - Trạng thái hồ sơ
- `#/support` - Hỗ trợ
- `#/about` - Giới thiệu

## Ghi chú

- Website dùng hash routing để chạy tốt trên static hosting như GitHub hoặc Vercel
- Không cần backend, toàn bộ flow là mock phía client
- Có thể deploy trực tiếp như static site
