# 🌐 Nacencomm.vn – Website Demo Spec
## Tích hợp nút "MUA NGAY" – Quy trình tự đăng ký Online toàn sản phẩm

> **Mục tiêu**: Demo website nacencomm.vn tái thiết kế, thêm nút **MUA NGAY** trên từng sản phẩm. Khách hàng tự điền form → hệ thống chuyển hồ sơ → nhân viên kinh doanh tiếp nhận & chốt → bàn giao.  
> **Dùng để**: Trình sếp, demo đối tác, làm blueprint phát triển thực tế.

---

## 🎨 Design System

| Token | Giá trị |
|---|---|
| Font | `Be Vietnam Pro` (Google Fonts, weights 300–700) |
| Navy chính | `#003087` |
| Navy đậm (header/footer) | `#001f5c` |
| Navy nhạt (bg section) | `#e8eef8` |
| Đỏ accent (CA2 brand) | `#d62b2b` |
| Xanh lá (success) | `#1a7d4a` |
| Vàng (badge) | `#f5a623` |
| Xám nền | `#f0f2f7` |
| Border | `#d0d5e0` |
| Card radius | `12px` |
| Input radius | `6px` |
| Shadow card | `0 2px 12px rgba(0,48,135,0.10)` |
| **Nút MUA NGAY** | bg `#d62b2b`, text trắng, hover `#b02020`, icon 🛒 |

---

## 🏗️ Cấu trúc trang (Pages / Routes)

```
/ ──────────────── Trang chủ (Home)
/products ────────── Danh mục sản phẩm
/products/:slug ──── Trang chi tiết sản phẩm (có nút MUA NGAY)
/register/:slug ──── Form đăng ký theo từng sản phẩm
/register/:slug/upload ── Upload hồ sơ
/register/:slug/status ── Trạng thái hồ sơ
/register/:slug/activate ─ Kích hoạt dịch vụ (nếu có)
/support ─────────── Hỗ trợ & Tải xuống
/about ───────────── Giới thiệu công ty
```

---

## 🧭 Header / Navigation

```
┌──────────────────────────────────────────────────────────────────┐
│ [CA2 badge đỏ]  NACENCOMM            Sản phẩm  Hỗ trợ  Liên hệ │
│                 Tổng Công ty Truyền thông       [☎ 1900 5454 07] │
│                                                 [ĐĂNG KÝ ONLINE] │
└──────────────────────────────────────────────────────────────────┘
```

- Background: `#001f5c`
- Sticky top, z-index cao
- Mobile: hamburger menu
- Nút **"ĐĂNG KÝ ONLINE"**: màu đỏ, nổi bật, luôn hiện

---

## 🏠 Trang chủ – Sections

### Section 1: Hero Banner
```
[Background: gradient navy dark → navy xanh, overlay nhẹ]

TIÊU ĐỀ LỚN: "Nền tảng số toàn diện cho doanh nghiệp Việt"
Sub: "CA2 Nacencomm – TOP 3 Nhà cung cấp Chữ ký số tại Việt Nam.
     Hơn 200.000 khách hàng tin dùng. Phủ sóng 63 tỉnh thành."

[🛒 ĐĂNG KÝ ONLINE NGAY]   [Xem sản phẩm ↓]

Badges: ✓ Được cấp phép Bộ TT&TT  ✓ 28 năm kinh nghiệm
        ✓ Thành viên Tập đoàn HANEL  ✓ 20+ sản phẩm & dịch vụ
```

### Section 2: Danh mục sản phẩm (Product Grid)
**Grid 4 cột desktop / 2 cột mobile**

Mỗi product card gồm:
```
┌─────────────────────┐
│  [Icon sản phẩm]    │
│  Tên sản phẩm       │
│  Mô tả ngắn 1 dòng  │
│  ─────────────────  │
│  [Tìm hiểu thêm]    │
│  [🛒 MUA NGAY]      │  ← đỏ, nổi bật
└─────────────────────┘
```

### Section 3: Tại sao chọn Nacencomm
4 điểm mạnh dạng icon + text

### Section 4: Khách hàng & Đối tác
Logo carousel (mock)

### Section 5: CTA cuối trang
```
"Sẵn sàng chuyển đổi số? Đăng ký ngay hôm nay!"
[🛒 ĐĂNG KÝ ONLINE]   [📞 Gọi tư vấn miễn phí]
```

---

## 📦 Danh mục sản phẩm đầy đủ

> Mỗi sản phẩm có `slug` riêng, dùng để route form đăng ký.

| # | Tên sản phẩm | Slug | Nhóm | Flow đặc biệt |
|---|---|---|---|---|
| 1 | Chữ ký số USB Token | `chu-ky-so-token` | PKI | Upload GPKD, CCCD |
| 2 | Remote Signing (Ký số từ xa) | `remote-signing` | PKI | 8 bước (đã spec) |
| 3 | CA2 Sign Platform | `ca2-sign-platform` | PKI | Tư vấn enterprise |
| 4 | Hóa đơn điện tử CA2-EInvoice | `hoa-don-dien-tu` | Kế toán - Thuế | Upload GPKD |
| 5 | Phần mềm kế toán | `phan-mem-ke-toan` | Kế toán - Thuế | Chọn gói, demo |
| 6 | Phần mềm bảo hiểm | `phan-mem-bao-hiem` | Bảo hiểm | Chọn gói |
| 7 | Chấm công – Tính lương | `cham-cong-tinh-luong` | HR | Chọn gói, số nhân viên |
| 8 | Rà soát lỗ hổng – Security | `security-pentest` | Security | Tư vấn, đặt lịch khảo sát |
| 9 | Tư vấn hạ tầng an ninh | `tu-van-ha-tang-anninh` | Security | Liên hệ tư vấn |
| 10 | Tài khoản đấu thầu | `dau-thau-online` | Chính phủ điện tử | Upload hồ sơ pháp lý |
| 11 | Dịch vụ chuyển đổi số | `chuyen-doi-so` | CĐS | Khảo sát nhu cầu |
| 12 | STEM Học tập | `stem-hoc-tap` | Giáo dục | Đăng ký khóa học |
| 13 | CA2 CO-VAN (Khai báo CO) | `ca2-co-van` | Xuất nhập khẩu | Upload hồ sơ |
| 14 | eKYC – Xác thực điện tử | `ekyc` | PKI | Demo API |

---

## 🔄 Flow mua hàng tổng quát (từ sơ đồ)

```
[Website – KH thao tác]
        │
        ▼
① KH truy cập trang sản phẩm → nhấn [🛒 MUA NGAY]
        │
        ▼
② Chọn gói (đơn giản, dễ nhìn) + Để lại thông tin
   [Tên, SĐT, Email, Tên DN, MST, Địa chỉ]
        │
        ▼
③ Thanh toán (mock: chuyển khoản / QR / Ví điện tử)
        │
        ▼
④ Ký hợp đồng qua VNeID (nếu có / optional)
        │
        ▼
⑤ Gửi mail xác nhận thanh toán thành công
        │
        ▼ [Hệ thống → Kinh doanh]
⑥ Chuyển hồ sơ điện tử → Mã KD mặc định gắn trên web
        │
        ▼
⑦ Nhân viên KD liên hệ KH theo thông tin nhận được
   Ký hợp đồng + cung cấp dịch vụ
        │
        ▼
⑧ KD bàn giao – Hướng dẫn KH sử dụng
        │
        ▼
[✅ HOÀN TẤT]
```

---

## 📄 Chi tiết từng trang sản phẩm

### Layout trang sản phẩm (`/products/:slug`)

```
┌─────────────────────────────────────────────────────┐
│  HERO: Tên SP + tagline + icon lớn (navy gradient)  │
│  [🛒 MUA NGAY]   [📥 Tải tài liệu]                 │
├─────────────────────────────────────────────────────┤
│  SECTION: Tính năng nổi bật (3–4 điểm, icon card)  │
├─────────────────────────────────────────────────────┤
│  SECTION: Bảng giá / Gói cước                       │
│  [Gói 1]  [Gói 2 – Phổ biến★]  [Gói 3]             │
│  Mỗi gói có nút [🛒 Mua gói này]                    │
├─────────────────────────────────────────────────────┤
│  SECTION: Quy trình đăng ký (timeline 4–8 bước)     │
├─────────────────────────────────────────────────────┤
│  SECTION: Câu hỏi thường gặp (FAQ accordion)        │
├─────────────────────────────────────────────────────┤
│  CTA sticky bottom mobile: [🛒 MUA NGAY]            │
└─────────────────────────────────────────────────────┘
```

---

## 📝 Form đăng ký chung (`/register/:slug`)

> Mỗi sản phẩm dùng form này. Các trường thay đổi tùy `slug`.

### Phần bắt buộc mọi sản phẩm:

| Trường | Loại | Validate |
|---|---|---|
| Tên doanh nghiệp / cá nhân | text | Không rỗng |
| Mã số thuế | text | 10–13 ký tự số |
| Người liên hệ | text | Không rỗng |
| Số điện thoại | tel | Bắt đầu 0, 9–11 số |
| Email | email | Regex email |
| Địa chỉ | text | Không rỗng |
| Gói đăng ký | select/card | Phải chọn |
| Ghi chú (nếu có) | textarea | Không bắt buộc |

### Phần bổ sung theo sản phẩm:

**Remote Signing / Chữ ký số**:
- Người ĐDPL, CCCD, Ngày cấp → (xem spec riêng đã có)

**Hóa đơn điện tử**:
- Phần mềm kế toán đang dùng (dropdown)
- Số lượng hóa đơn dự kiến/tháng

**Phần mềm kế toán / Bảo hiểm / Chấm công**:
- Số lượng nhân viên/người dùng
- Phần mềm hiện tại

**Security / Tư vấn hạ tầng**:
- Mô tả nhu cầu (textarea dài)
- Đặt lịch khảo sát (date picker)
- Quy mô hệ thống (dropdown)

**Đấu thầu online**:
- Tên đơn vị mời thầu
- Lĩnh vực đấu thầu

**STEM Học tập**:
- Trường / tổ chức
- Số lượng học viên
- Khóa học quan tâm

---

## 💳 Màn hình chọn gói & Thanh toán

### Chọn gói (Step 1 của form)

```
┌──────────────┬──────────────────┬──────────────┐
│   Gói Cơ bản │  Gói Tiêu chuẩn  │   Gói Pro    │
│              │   ⭐ Phổ biến     │              │
│  Mô tả ngắn │  Mô tả ngắn      │  Mô tả ngắn  │
│              │                  │              │
│  Liên hệ    │  Liên hệ         │  Liên hệ     │
│  báo giá    │  báo giá         │  báo giá     │
│             │                  │              │
│ [Chọn gói] │  [Chọn gói]      │  [Chọn gói] │
└──────────────┴──────────────────┴──────────────┘
* Giá cụ thể sẽ hiện sau khi KH liên hệ / theo bảng giá
```

> **Note**: Nacencomm hiện bán qua tư vấn. Demo hiển thị "Liên hệ báo giá" hoặc mock giá. Nếu cần hiện giá thật, cần bổ sung sau.

### Thanh toán (Step thanh toán – mock)

```
Tổng thanh toán:  [Hiển thị gói đã chọn]
                  ─────────────────────
Phương thức:
  ◉ Chuyển khoản ngân hàng
  ○ QR Code (VietQR)
  ○ Ví điện tử (MoMo / ZaloPay)
  ○ Thanh toán sau (với hợp đồng)

[Xác nhận & Thanh toán →]
```

**Sau thanh toán mock**:
- Hiện màn hình success
- Gửi "email" mock xác nhận
- Chuyển hồ sơ (mock) → nhân viên KD nhận

---

## 📊 Trạng thái hồ sơ (`/register/:slug/status`)

Timeline dọc, 4 trạng thái:

```
✅ Đăng ký thành công    [15/01/2025 10:30]
⏳ Đang xử lý           [Dự kiến: 1-2 ngày làm việc]
○  Ký hợp đồng          [Chờ xử lý]
○  Bàn giao dịch vụ     [Chờ xử lý]
```

Nút mock demo (chỉ hiển thị khi demo):
- `[✅ Mô phỏng: Tiến lên bước tiếp theo]`

---

## ⚙️ Cấu trúc thư mục dự án

```
nacencomm-demo/
├── index.html                  ← Trang chủ
├── products.html               ← Danh mục sản phẩm
├── product-detail.html         ← Chi tiết SP (template)
├── register.html               ← Form đăng ký (universal)
├── register-upload.html        ← Upload hồ sơ
├── register-status.html        ← Trạng thái hồ sơ
├── register-activate.html      ← Kích hoạt dịch vụ
├── style/
│   ├── global.css              ← CSS variables + reset
│   ├── header.css
│   ├── home.css
│   ├── product.css
│   ├── register.css
│   └── components.css          ← Cards, Buttons, Forms...
├── js/
│   ├── router.js               ← Hash-based routing
│   ├── products-data.js        ← Dữ liệu 14 sản phẩm
│   ├── form-validator.js       ← Validate rules
│   ├── step-controller.js      ← Multi-step form logic
│   ├── mock-api.js             ← Giả lập API / email
│   └── pdf-mock.js             ← Sinh PDF mock (jsPDF)
├── assets/
│   ├── logo-ca2.svg
│   ├── icons/                  ← SVG icons từng sản phẩm
│   └── images/
└── README.md
```

---

## 🗂️ Data: 14 sản phẩm (products-data.js)

```javascript
const PRODUCTS = [
  {
    slug: "chu-ky-so-token",
    name: "Chữ ký số USB Token",
    shortName: "Chữ ký số",
    icon: "🔑",
    group: "PKI",
    tagline: "Chứng thư số công cộng CA2 – Ký văn bản điện tử pháp lý",
    description: "Chữ ký số CA2 Nacencomm giúp cá nhân, doanh nghiệp ký hồ sơ điện tử, kê khai thuế, hải quan, BHXH và các giao dịch điện tử có giá trị pháp lý.",
    features: ["Kê khai thuế điện tử", "Hải quan điện tử", "BHXH điện tử", "Ký hợp đồng online"],
    packages: ["1 Năm", "2 Năm", "3 Năm"],
    flowType: "standard_upload",   // có upload hồ sơ
    requireUpload: true,
    uploadDocs: ["GPKD", "CCCD 2 mặt NDDPL", "Giấy đăng ký"]
  },
  {
    slug: "remote-signing",
    name: "Remote Signing",
    shortName: "Ký số từ xa",
    icon: "📱",
    group: "PKI",
    tagline: "Ký số từ xa qua điện thoại – Không cần USB Token",
    description: "Giải pháp chữ ký số từ xa CA2 Remote Signing: ký tài liệu mọi lúc mọi nơi chỉ bằng smartphone, đảm bảo an toàn và hợp pháp theo Nghị định 130/2018/NĐ-CP.",
    features: ["Không cần USB Token", "Ký mọi nơi qua app", "Xác thực sinh trắc học", "Tích hợp VNeID"],
    packages: ["1 Năm", "2 Năm", "3 Năm", "Lượt ký"],
    flowType: "remote_signing",    // 8 bước đặc biệt
    requireUpload: true,
    uploadDocs: ["ĐKSD (scan)", "Hợp đồng (scan)", "GPKD gốc", "CCCD 2 mặt"]
  },
  {
    slug: "ca2-sign-platform",
    name: "CA2 Sign Platform",
    shortName: "Sign Platform",
    icon: "🏗️",
    group: "PKI",
    tagline: "Nền tảng ký số tập trung cho doanh nghiệp & tổ chức lớn",
    description: "CA2 Platform cung cấp giải pháp ký số quy mô lớn, tích hợp API, quản lý tập trung, phù hợp ngân hàng, bảo hiểm, cơ quan nhà nước.",
    features: ["API tích hợp hệ thống", "Quản lý tập trung", "Batch signing", "Audit log"],
    packages: ["Enterprise – Liên hệ"],
    flowType: "consult",           // chỉ form liên hệ tư vấn
    requireUpload: false
  },
  {
    slug: "hoa-don-dien-tu",
    name: "Hóa đơn điện tử CA2-EInvoice",
    shortName: "Hóa đơn điện tử",
    icon: "🧾",
    group: "Kế toán - Thuế",
    tagline: "Phát hành hóa đơn điện tử đúng chuẩn Nghị định 123/2020/NĐ-CP",
    description: "CA2-EInvoice hỗ trợ doanh nghiệp phát hành, quản lý hóa đơn điện tử có mã xác thực của cơ quan thuế, tích hợp trực tiếp với hệ thống kế toán.",
    features: ["Kết nối cơ quan thuế", "Phát hành tức thì", "Lưu trữ điện tử", "Tích hợp phần mềm kế toán"],
    packages: ["Gói 300 HD/năm", "Gói 1.000 HD/năm", "Gói Không giới hạn"],
    flowType: "standard_form",
    requireUpload: true,
    uploadDocs: ["GPKD", "Quyết định sử dụng HĐĐT"]
  },
  {
    slug: "phan-mem-ke-toan",
    name: "Phần mềm kế toán",
    shortName: "Kế toán",
    icon: "📊",
    group: "Kế toán - Thuế",
    tagline: "Quản lý tài chính kế toán toàn diện cho doanh nghiệp vừa và nhỏ",
    description: "Phần mềm kế toán CA2 giúp doanh nghiệp quản lý sổ sách, lập báo cáo tài chính, kê khai thuế nhanh chóng và chính xác.",
    features: ["Kê khai thuế tự động", "Báo cáo tài chính chuẩn", "Quản lý công nợ", "Kết nối ngân hàng"],
    packages: ["Gói Cơ bản", "Gói Tiêu chuẩn", "Gói Nâng cao"],
    flowType: "standard_form",
    requireUpload: false,
    extraFields: ["so_nguoi_dung", "phan_mem_cu"]
  },
  {
    slug: "phan-mem-bao-hiem",
    name: "Phần mềm bảo hiểm",
    shortName: "Bảo hiểm",
    icon: "🛡️",
    group: "Bảo hiểm",
    tagline: "Quản lý hợp đồng bảo hiểm & kê khai BHXH trực tuyến",
    description: "Giải pháp phần mềm quản lý bảo hiểm xã hội, bảo hiểm y tế, khai báo điện tử và kết nối cơ quan BHXH.",
    features: ["Kê khai BHXH điện tử", "Quản lý hợp đồng", "Nhắc nhở đóng bảo hiểm", "Báo cáo tự động"],
    packages: ["Theo số nhân viên", "Gói doanh nghiệp"],
    flowType: "standard_form",
    requireUpload: false,
    extraFields: ["so_nhan_vien"]
  },
  {
    slug: "cham-cong-tinh-luong",
    name: "Chấm công – Tính lương",
    shortName: "HR",
    icon: "⏰",
    group: "Nhân sự",
    tagline: "Tự động hóa chấm công, tính lương và quản lý nhân sự",
    description: "Hệ thống chấm công điện tử tích hợp tính lương tự động, quản lý phép nghỉ, hợp đồng lao động và báo cáo nhân sự.",
    features: ["Chấm công khuôn mặt / vân tay", "Tính lương tự động", "Quản lý ca làm việc", "Báo cáo thuế TNCN"],
    packages: ["≤ 20 NV", "≤ 100 NV", "Không giới hạn"],
    flowType: "standard_form",
    requireUpload: false,
    extraFields: ["so_nhan_vien", "thiet_bi_cham_cong"]
  },
  {
    slug: "security-pentest",
    name: "Rà soát lỗ hổng – Security",
    shortName: "Security",
    icon: "🔍",
    group: "An ninh mạng",
    tagline: "Kiểm thử bảo mật & đánh giá rủi ro hệ thống CNTT",
    description: "Dịch vụ pentest, rà soát lỗ hổng bảo mật, đánh giá an toàn thông tin theo tiêu chuẩn ISO 27001 và quy định của Bộ TT&TT.",
    features: ["Pentest Web App", "Pentest hạ tầng mạng", "Đánh giá ATTT", "Báo cáo & khuyến nghị"],
    packages: ["Gói Cơ bản", "Gói Toàn diện", "Gói Doanh nghiệp"],
    flowType: "consult_schedule",  // có đặt lịch khảo sát
    requireUpload: false,
    extraFields: ["mo_ta_he_thong", "quy_mo", "ngay_khao_sat"]
  },
  {
    slug: "tu-van-ha-tang-anninh",
    name: "Tư vấn & Xây dựng hạ tầng An ninh",
    shortName: "Hạ tầng ATTT",
    icon: "🏛️",
    group: "An ninh mạng",
    tagline: "Thiết kế và triển khai hạ tầng an toàn thông tin cho tổ chức",
    description: "Nacencomm tư vấn, thiết kế và triển khai hạ tầng PKI, HSM, hệ thống xác thực điện tử và an ninh mạng cho cơ quan nhà nước và doanh nghiệp lớn.",
    features: ["Thiết kế PKI nội bộ", "Triển khai HSM", "Xác thực 2 lớp", "Đào tạo an toàn thông tin"],
    packages: ["Liên hệ tư vấn"],
    flowType: "consult",
    requireUpload: false
  },
  {
    slug: "dau-thau-online",
    name: "Cung cấp tài khoản đấu thầu",
    shortName: "Đấu thầu",
    icon: "📋",
    group: "Chính phủ điện tử",
    tagline: "Đăng ký tài khoản hệ thống đấu thầu quốc gia muasamcong.mpi.gov.vn",
    description: "Hỗ trợ doanh nghiệp đăng ký, cấp và gia hạn tài khoản tham gia đấu thầu điện tử trên hệ thống mua sắm công quốc gia.",
    features: ["Đăng ký tài khoản nhanh", "Hỗ trợ hồ sơ pháp lý", "Tư vấn thủ tục", "Gia hạn tài khoản"],
    packages: ["Cấp mới", "Gia hạn"],
    flowType: "standard_upload",
    requireUpload: true,
    uploadDocs: ["GPKD/Quyết định thành lập", "CCCD NDDPL", "Giấy ủy quyền (nếu có)"]
  },
  {
    slug: "chuyen-doi-so",
    name: "Dịch vụ chuyển đổi số",
    shortName: "CĐS",
    icon: "🚀",
    group: "Chuyển đổi số",
    tagline: "Đồng hành toàn diện trên hành trình chuyển đổi số doanh nghiệp",
    description: "Nacencomm cung cấp giải pháp chuyển đổi số tổng thể: từ tư vấn chiến lược, triển khai hệ thống đến đào tạo nhân sự.",
    features: ["Tư vấn chiến lược CĐS", "Triển khai hệ thống", "Đào tạo nhân sự", "Hỗ trợ vận hành"],
    packages: ["Khảo sát miễn phí", "Gói triển khai"],
    flowType: "consult_survey",    // form khảo sát nhu cầu
    requireUpload: false,
    extraFields: ["linh_vuc", "quy_mo_dn", "van_de_hien_tai"]
  },
  {
    slug: "stem-hoc-tap",
    name: "STEM Học tập",
    shortName: "STEM",
    icon: "🎓",
    group: "Giáo dục",
    tagline: "Nền tảng học STEM & công nghệ số cho học sinh, sinh viên",
    description: "Chương trình đào tạo STEM, lập trình, an toàn thông tin và kỹ năng số dành cho trường học, trung tâm và cá nhân.",
    features: ["Lập trình cơ bản – nâng cao", "Kỹ năng số", "An toàn thông tin", "Chứng chỉ kỹ năng số"],
    packages: ["Gói Cá nhân", "Gói Trường học", "Gói Trung tâm"],
    flowType: "course_register",
    requireUpload: false,
    extraFields: ["truong_to_chuc", "so_hoc_vien", "khoa_hoc"]
  },
  {
    slug: "ca2-co-van",
    name: "CA2 CO-VAN – Khai báo CO",
    shortName: "CO-VAN",
    icon: "📦",
    group: "Xuất nhập khẩu",
    tagline: "Số hóa quy trình kê khai Giấy chứng nhận xuất xứ (CO) điện tử",
    description: "CA2 CO-VAN giúp doanh nghiệp XNK số hóa hoàn toàn quy trình khai báo CO, kết nối hệ thống tiếp nhận tập trung VCCI, giảm chi phí và thời gian.",
    features: ["Khai báo CO điện tử", "Kết nối VCCI tự động", "Lưu trữ pháp lý lâu dài", "Cập nhật chuẩn thông điệp"],
    packages: ["Gói Doanh nghiệp nhỏ", "Gói Tiêu chuẩn", "Gói Lớn"],
    flowType: "standard_upload",
    requireUpload: true,
    uploadDocs: ["GPKD", "Hợp đồng thương mại", "Tờ khai hải quan mẫu"]
  },
  {
    slug: "ekyc",
    name: "eKYC – Xác thực điện tử",
    shortName: "eKYC",
    icon: "🪪",
    group: "PKI",
    tagline: "Xác thực danh tính điện tử tích hợp VNeID & sinh trắc học",
    description: "Giải pháp eKYC tích hợp nhận diện khuôn mặt, đọc chip CCCD, xác thực qua VNeID – phù hợp ngân hàng, bảo hiểm, fintech và cơ quan nhà nước.",
    features: ["Nhận diện khuôn mặt", "Đọc chip CCCD/hộ chiếu", "Tích hợp VNeID", "API linh hoạt"],
    packages: ["Demo API miễn phí", "Gói sản xuất"],
    flowType: "consult",
    requireUpload: false
  }
];
```

---

## 🔁 Các loại flow type

| flowType | Mô tả | Số bước |
|---|---|---|
| `standard_form` | Form thông tin + chọn gói + xác nhận → gửi hồ sơ | 4 |
| `standard_upload` | Form + chọn gói + xác nhận + **upload hồ sơ** | 5 |
| `remote_signing` | 8 bước đặc biệt đã spec riêng (Remote Signing) | 8 |
| `consult` | Form thông tin ngắn → hẹn tư vấn | 2 |
| `consult_schedule` | Form + mô tả hệ thống + **đặt lịch khảo sát** | 3 |
| `consult_survey` | Form + khảo sát nhu cầu CĐS | 3 |
| `course_register` | Form + chọn khóa học + thanh toán | 4 |

---

## 🧩 Components cần build

### Global
- `<Header>` — sticky, nav, nút ĐĂNG KÝ ONLINE
- `<Footer>` — địa chỉ, hotline, sitemap
- `<ProductCard>` — card sản phẩm grid (icon, tên, mô tả, 2 nút)
- `<StepIndicator>` — thanh tiến trình multi-step
- `<FieldGroup>` — wrapper section có title đánh số
- `<RadioCard>` — thẻ radio kiểu card
- `<PackageCard>` — card chọn gói cước (có badge "Phổ biến")
- `<UploadZone>` — drag & drop + preview tên file
- `<ReviewTable>` — bảng tóm tắt thông tin đã nhập
- `<StatusTimeline>` — timeline dọc trạng thái hồ sơ
- `<ModalSuccess>` — popup thành công
- `<PinInput>` — 6 ô PIN riêng biệt

---

## ✅ Validate rules tổng hợp

| Field | Rule |
|---|---|
| Họ và tên / Tên DN | Không rỗng, ≥ 2 ký tự |
| Email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Số điện thoại | Bắt đầu `0`, chỉ số, 9–11 ký tự |
| Mã số thuế | 10–13 ký tự số |
| Ngày cấp | Không rỗng, không phải ngày tương lai |
| CCCD/CMND | 9 hoặc 12 chữ số |
| Gói cước | Bắt buộc chọn 1 |
| File upload | ≤ 10MB, JPG/PNG/PDF |
| PIN | 6 chữ số, 2 lần nhập phải khớp |

---

## 🚀 Lệnh khởi động localhost

```bash
# Cách 1 – Không cần cài (Python)
python -m http.server 3000
# Mở: http://localhost:3000

# Cách 2 – Node.js
npx serve .
# Mở: http://localhost:3000

# Nếu dùng React/Vite:
npm create vite@latest nacencomm-demo -- --template react
cd nacencomm-demo && npm install && npm run dev
```

---

## 📌 Ghi chú kỹ thuật

1. **Routing**: Dùng hash-based routing (`#/products/remote-signing`) để chạy trên file tĩnh, không cần server
2. **State management**: Lưu form state vào `sessionStorage` để không mất khi reload
3. **PDF mock**: Dùng `jsPDF` (CDN: `https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js`) sinh PDF điền tên, MST từ form
4. **Email mock**: `alert()` hoặc hiện overlay "Đã gửi email tới [email]"
5. **Mã KD**: Gắn mặc định `NCM-` + 6 số random vào mỗi hồ sơ
6. **Responsive**: Mobile-first, breakpoint `600px` (1 cột) và `900px` (2 cột)
7. **Không cần backend**: Mọi logic đều mock phía client

---

## 🗓️ Thứ tự build đề xuất (cho Codex)

```
Sprint 1 – Core layout
  ├── index.html + Header + Footer + Home sections
  └── products.html + ProductCard grid (14 sản phẩm)

Sprint 2 – Product detail
  ├── product-detail.html (template động theo slug)
  └── Bảng giá, features, FAQ, CTA sticky

Sprint 3 – Form đăng ký
  ├── register.html – StepIndicator + Form chung
  ├── Logic ẩn/hiện theo flowType
  └── Validate + ReviewTable

Sprint 4 – Upload & Status
  ├── register-upload.html – UploadZone x4
  └── register-status.html – StatusTimeline + mock nhánh

Sprint 5 – Activate + Hoàn tất
  └── register-activate.html – Mã kích hoạt + PIN

Sprint 6 – Polish
  ├── Animation nhẹ (fade-in section)
  ├── Mobile responsive hoàn chỉnh
  └── PDF mock + email mock
```

---

## 📎 Tài liệu tham khảo

- Website gốc: https://www.nacencomm.vn
- Bảng giá: https://www.nacencomm.vn/bang-gia
- CA2 CO-VAN: https://www.nacencomm.vn/product/ca2-co-van
- Flow Remote Signing: `remote-signing-demo-spec.md` (đã có)
- Form mẫu ĐKSD: `DKSD_MẪU.doc` (đã phân tích)
- Sơ đồ quy trình mua hàng: ảnh sơ đồ 4 bước (đã đính kèm)
