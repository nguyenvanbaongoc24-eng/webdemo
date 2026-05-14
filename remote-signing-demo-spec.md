# 🔐 Remote Signing – Demo App Spec
## Nacencomm CA2 | Quy trình đăng ký Online

---

## 🧭 Tổng quan dự án

Xây dựng web app demo mô phỏng **toàn bộ quy trình đăng ký dịch vụ Remote Signing** trên website nacencomm.vn.

- **Stack**: HTML + CSS + Vanilla JS (hoặc React nếu muốn)
- **Chạy**: localhost (không cần backend thật — mock toàn bộ)
- **Mục tiêu**: Demo flow cho khách hàng xem, dùng để thiết kế thực tế sau

---

## 🎨 Thiết kế / Brand

| Thuộc tính | Giá trị |
|---|---|
| Font | `Be Vietnam Pro` (Google Fonts) |
| Màu chính (Navy) | `#003087` |
| Màu Navy đậm | `#001f5c` |
| Màu Navy nhạt (bg) | `#e8eef8` |
| Màu đỏ accent | `#d62b2b` |
| Màu xanh lá (success) | `#1a7d4a` |
| Màu vàng (badge) | `#f5a623` |
| Border mặc định | `#d0d5e0` |
| Radius | `10px` card, `6px` input |
| Shadow | `0 2px 12px rgba(0,48,135,0.10)` |

**Header**: nền `#001f5c`, logo badge đỏ chữ "CA2", nav links trắng mờ, nút CTA đỏ.

**Hero banner**: gradient `#001f5c → #0a52c4`, text trắng, breadcrumb mờ.

---

## 🗺️ Kiến trúc Flow (8 bước)

```
[Trang chủ]
    │
    ▼ Nhấn "Đăng Ký Online Remote Signing"
[STEP 1] Chọn đối tượng + hình thức
    │
    ▼
[STEP 2] Điền form thông tin (Phần 2 + 3 + 4)
    │  └─ Validate real-time → báo lỗi nếu thiếu
    ▼
[STEP 3] Chọn gói dịch vụ (Phần 5)
    │
    ▼
[STEP 4] Review + xác nhận điều khoản
    │
    ▼
[STEP 5] Thành công → Sinh 2 PDF mock → Gửi "email" mock
    │  └─ Nút tải PDF (mock download)
    ▼ Nhấn "Tiếp tục nộp hồ sơ"
[STEP 6] Upload 4 loại hồ sơ
    │  └─ Validate đủ 4 ô → nút Hoàn tất
    ▼
[STEP 7] Trạng thái thẩm định (mock)
    │  ├─ Nhánh DUYỆT → tiếp STEP 8
    │  └─ Nhánh TỪ CHỐI → hiện lý do
    ▼
[STEP 8] Hướng dẫn tải app + nhập mã kích hoạt + tạo PIN
    │
    ▼
[HOÀN TẤT] Thông báo kích hoạt thành công
```

---

## 📋 Chi tiết từng STEP

---

### STEP 1 — Chọn đối tượng

**Card tiêu đề**: "Bước 1 / 4 — Chọn đối tượng đăng ký"

**Mục 1 — Đối tượng** (radio, 1 chọn):
- 🏢 Tổ chức / Doanh nghiệp → hiện thêm Phần 2 ở STEP 2
- 👨‍💼 Cá nhân thuộc tổ chức / Doanh nghiệp → hiện thêm Phần 2
- 👤 Cá nhân → ẩn Phần 2
- 🏪 Hộ kinh doanh → hiện thêm Phần 2

**Mục 5.1 — Hình thức** (radio, 1 chọn):
- 🆕 Cấp mới
- 🔄 Gia hạn

**Footer**: Nút `Tiếp theo →`

---

### STEP 2 — Thông tin đăng ký

**Card tiêu đề**: "Bước 2 / 4 — Thông tin đăng ký"

#### Phần 2: Thông tin tổ chức / Doanh nghiệp
*(Chỉ hiển thị nếu đối tượng là Tổ chức/DN, Cá nhân thuộc tổ chức, Hộ kinh doanh)*

| Trường | Loại | Bắt buộc | Ghi chú |
|---|---|---|---|
| Tên tổ chức, doanh nghiệp | text | ✅ | Full width |
| Địa chỉ | text | ✅ | |
| Mã số thuế / Mã ngân sách | text | ✅ | |
| Người đại diện pháp luật | text | ✅ | |
| Chức vụ | text | ❌ | |
| CCCD / CMND / Hộ chiếu (NDDPL) | text | ✅ | |
| Ngày cấp (NDDPL) | date | ✅ | |
| Email nhận chứng thư số (DN) | email | ✅ | Validate format |

#### Phần 3: Thông tin cá nhân
*(Người sở hữu chứng thư số — luôn hiển thị)*

| Trường | Loại | Bắt buộc | Ghi chú |
|---|---|---|---|
| Họ và tên | text | ✅ | |
| Chức danh | text | ❌ | |
| Địa chỉ | text | ✅ | Full width |
| CCCD / CMND / Hộ chiếu | text | ✅ | |
| Ngày cấp | date | ✅ | |
| Email nhận chứng thư số | email | ✅ | Validate format |

#### Phần 4: Thông tin liên hệ / Nhận chứng thư số

| Trường | Loại | Bắt buộc | Ghi chú |
|---|---|---|---|
| Người liên hệ / Nhận CTS | text | ✅ | |
| Số điện thoại | tel | ✅ | Validate: bắt đầu `0`, 9–11 số |
| CCCD / CMND | text | ❌ | |
| Ngày cấp | date | ❌ | |

**Validate khi nhấn "Tiếp theo"**:
- Highlight đỏ field lỗi
- Hiện message lỗi bên dưới field
- Scroll tới field lỗi đầu tiên

**Footer**: Nút `← Quay lại` | `Tiếp theo →`

---

### STEP 3 — Chọn gói dịch vụ

**Card tiêu đề**: "Bước 3 / 4 — Chọn gói dịch vụ"

**Mục 5.3 — Loại dịch vụ**:
- ✅ Remote Signing (đã chọn sẵn, không đổi được)
- 🔑 Token (disabled, mờ)
- 🖥️ HSM (disabled, mờ)

**Mục 5.2 — Gói cước** (chọn 1, dạng card):

| Gói | Badge | Ghi chú |
|---|---|---|
| 1 Năm | — | |
| 2 Năm | ⭐ Phổ biến | Highlight |
| 3 Năm | — | |
| Lượt ký | — | Mua theo số lượt |

**Khuyến mại / Cộng bù** (text, không bắt buộc)

**Validate**: Phải chọn gói trước khi tiếp tục.

**Footer**: `← Quay lại` | `Xem lại & Xác nhận →`

---

### STEP 4 — Xác nhận thông tin

**Card tiêu đề**: "Bước 4 / 4 — Xác nhận thông tin"

Hiển thị dạng **bảng review** tất cả dữ liệu đã nhập, gom thành các nhóm:

1. Đối tượng & Hình thức
2. Thông tin tổ chức / DN *(ẩn nếu là Cá nhân)*
3. Thông tin cá nhân
4. Liên hệ & Gói dịch vụ

**Checkbox xác nhận**:
> ☑ Tôi đã đọc và đồng ý với điều khoản dịch vụ và các quy định của CA2 tại www.nacencomm.vn

**Nút Submit**: màu xanh lá `#1a7d4a`, icon 🚀, text "Gửi đăng ký"

---

### STEP 5 — Thành công / Nhận PDF

**Màn hình success**:
- Icon ✅ lớn, màu xanh lá
- Tiêu đề: "Đăng ký thành công!"
- Hiển thị email đã nhập (mock đã gửi)
- Hướng dẫn: "Tải 2 file PDF, ký số điện tử, rồi nhấn Tiếp tục"

**2 nút tải PDF** (mock — alert hoặc tạo PDF trống):
- 📄 `Đăng_Ký_Sử_Dụng.pdf`
- 📄 `Hợp_Đồng_Dịch_Vụ.pdf`

**Nút chính**: `📤 Tiếp tục nộp hồ sơ online →`

---

### STEP 6 — Upload hồ sơ

**Card tiêu đề**: "Upload hồ sơ — 4 loại giấy tờ bắt buộc"

**4 ô upload** (mỗi ô là drop zone):

| # | Tên ô | Định dạng | Bắt buộc |
|---|---|---|---|
| 1 | Đăng ký sử dụng (bản scan/ảnh chụp có chữ ký) | JPG, PNG, PDF | ✅ |
| 2 | Hợp đồng dịch vụ (bản scan/ảnh chụp có chữ ký) | JPG, PNG, PDF | ✅ |
| 3 | Giấy phép kinh doanh – bản gốc | JPG, PNG, PDF | ✅ |
| 4 | CCCD 2 mặt của người đại diện pháp luật | JPG, PNG | ✅ |

**UI mỗi ô upload**:
```
┌─────────────────────────────────────┐
│  ☁️  Kéo thả file vào đây           │
│      hoặc  [Chọn file]              │
│                                     │
│  ✅ ten_file.pdf  ✕                 │  ← sau khi upload
└─────────────────────────────────────┘
```
- Border dashed, khi hover đổi màu navy
- Sau khi chọn file: hiện tên file + nút xoá (✕)
- Khi đủ 4 ô: nút "Hoàn tất & Gửi hồ sơ" sáng lên (enable)

**Validate**: Thiếu ô nào → highlight đỏ ô đó + message "Vui lòng upload [tên giấy tờ]"

**Footer**: `← Quay lại` | `✅ Hoàn tất & Gửi hồ sơ`

---

### STEP 7 — Thẩm định hồ sơ (mock)

**Màn hình chờ** (hiển thị sau khi submit STEP 6):

```
⏳ Hồ sơ của bạn đã được gửi thành công!

CA2 đang tiến hành thẩm định hồ sơ.
Thông báo kết quả sẽ được gửi về: [email]

Thời gian dự kiến: 1 – 2 ngày làm việc
```

**Nút demo** (chỉ dùng cho demo):
- `[✅ Mô phỏng: Duyệt hồ sơ]` → chuyển sang nhánh DUYỆT
- `[❌ Mô phỏng: Từ chối hồ sơ]` → chuyển sang nhánh TỪ CHỐI

**Nhánh DUYỆT**:
```
✅ Hồ sơ đã được duyệt!
Mã kích hoạt của bạn: RS-XXXX-XXXX  (mock random)
Mã đã được gửi về email: [email]

→ Tiếp tục kích hoạt app
```

**Nhánh TỪ CHỐI**:
```
❌ Hồ sơ chưa đạt yêu cầu

Lý do: [dropdown chọn mock lý do]
  - Ảnh CCCD bị mờ, không đọc được
  - Chữ ký không khớp với CCCD
  - GPKD hết hạn
  - Thiếu dấu đỏ của doanh nghiệp

→ Vui lòng upload lại hồ sơ
```
Nút: `🔄 Upload lại hồ sơ` → quay về STEP 6

---

### STEP 8 — Kích hoạt app Remote Signing

**Card tiêu đề**: "Hướng dẫn kích hoạt ứng dụng Remote Signing"

**Bố cục 3 sub-step**:

#### Sub-step 8.1 — Tải ứng dụng
```
Tải ứng dụng CA2 Remote Signing

[App Store]      [Google Play]
(nút giả mock)   (nút giả mock)
```
Checkbox: `☐ Tôi đã tải ứng dụng thành công`

#### Sub-step 8.2 — Nhập mã kích hoạt
```
Mã kích hoạt đã gửi về email: [email]

[ RS - XXXX - XXXX        ] ← input
             [Xác nhận mã]
```
- Input format: tự động thêm dấu `-` sau 2 ký tự đầu
- Validate: khớp với mã mock ở STEP 7
- Nếu sai: "Mã kích hoạt không đúng, vui lòng kiểm tra lại email"

#### Sub-step 8.3 — Tạo mã PIN
```
Tạo mã PIN bảo mật (6 chữ số)

PIN:      [● ● ● ● ● ●]
Nhập lại: [● ● ● ● ● ●]

⚠️ Không chia sẻ PIN với bất kỳ ai
```
- Input type=password, maxlength=6
- Validate: 6 số, 2 ô phải khớp nhau

**Footer**: Nút `🎉 Hoàn tất kích hoạt`

---

### HOÀN TẤT

```
🎉 Chúc mừng! Dịch vụ Remote Signing đã được kích hoạt.

Tên:     [Họ tên KH]
Tổ chức: [Tên DN]
Gói:     [Gói đã chọn]
Hiệu lực: [Ngày hôm nay] → [+1/2/3 năm]

Bạn có thể bắt đầu ký số ngay trên ứng dụng CA2 Remote Signing.

[Về trang chủ]    [Hướng dẫn sử dụng]
```

---

## 🧩 Components cần tạo

```
/components
  Header.html / Header.jsx
  StepIndicator.html        ← thanh tiến trình 5 bước
  FormSection.html          ← wrapper section với title
  RadioCard.html            ← thẻ radio style card
  PackageCard.html          ← card chọn gói cước
  UploadZone.html           ← drag & drop upload
  ReviewTable.html          ← bảng xem lại thông tin
  ModalAlert.html           ← popup thông báo lỗi
  PinInput.html             ← input 6 ô PIN
```

---

## ✅ Validate rules tổng hợp

| Field | Rule |
|---|---|
| Họ và tên | Không rỗng, ≥ 2 ký tự |
| Email | Regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Số điện thoại | Bắt đầu `0`, chỉ số, 9–11 ký tự |
| Mã số thuế | Không rỗng, 10–13 ký tự |
| Ngày cấp | Không rỗng, không tương lai |
| CCCD/CMND | 9 hoặc 12 chữ số |
| Gói cước | Phải chọn 1 |
| Upload | File ≤ 10MB, đúng định dạng |
| Mã PIN | Đúng 6 chữ số, 2 lần nhập khớp |
| Mã kích hoạt | Khớp với mock code |

---

## 📁 Cấu trúc thư mục đề xuất

```
remote-signing-demo/
├── index.html          ← entry point (hoặc App.jsx nếu React)
├── style.css           ← global styles + CSS variables
├── app.js              ← logic điều hướng step + validate
├── mock-data.js        ← dữ liệu giả (mã kích hoạt, lý do từ chối...)
├── pdf-mock.js         ← tạo file PDF mock khi click tải
├── assets/
│   ├── logo-ca2.png
│   └── qr-appstore.png (optional)
└── README.md
```

---

## 🔧 Lưu ý kỹ thuật

1. **Không cần backend**: Toàn bộ dùng `localStorage` hoặc biến JS để lưu trạng thái giữa các step.
2. **PDF mock**: Dùng thư viện `jsPDF` (CDN) để tạo file PDF có điền tên, MST, ngày từ form. Hoặc đơn giản hơn là blob URL từ Blob API.
3. **Upload mock**: Không cần upload thật — chỉ cần lấy `file.name` và hiển thị preview.
4. **Mã kích hoạt mock**: Generate random khi vào STEP 7 nhánh duyệt, lưu vào biến, validate lại ở STEP 8.
5. **Responsive**: Đảm bảo form dùng được trên mobile (grid 1 cột ở < 600px).
6. **Font**: Import từ Google Fonts — `Be Vietnam Pro` weights 400, 500, 600, 700.

---

## 🚀 Lệnh chạy nhanh (nếu dùng file tĩnh)

```bash
# Không cần cài gì — chỉ cần mở trình duyệt
# Hoặc dùng live server:
npx serve .
# hoặc
python -m http.server 3000
```

---

## 📌 Nguồn tham khảo

- Website gốc: https://www.nacencomm.vn
- Bảng giá: https://www.nacencomm.vn/bang-gia
- Form mẫu gốc: `DKSD_MẪU.doc` (đã phân tích ở trên)
- Flow quy trình: Xem sơ đồ 8 bước đã duyệt
