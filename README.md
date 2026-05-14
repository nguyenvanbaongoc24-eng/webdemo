# CA2 Remote Signing Demo

Web app tĩnh mô phỏng quy trình đăng ký dịch vụ Remote Signing theo spec trong `remote-signing-demo-spec.md`.

## File chính

- `index.html`: entry point
- `style.css`: toàn bộ giao diện responsive
- `app.js`: logic 8 bước, validate, mock upload, mock duyệt và kích hoạt
- `mock-data.js`: danh sách option, gói cước, lý do từ chối, yêu cầu upload
- `pdf-mock.js`: tạo và tải 2 file PDF mock từ trình duyệt

## Chạy local

```bash
python -m http.server 3000
```

Sau đó mở `http://localhost:3000`.
