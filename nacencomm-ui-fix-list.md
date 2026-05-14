# 🛠️ UI Fix List – Nacencomm Demo
> Đọc file này và áp dụng toàn bộ fix theo thứ tự ưu tiên bên dưới.

---

## ❌ FIX 1 — Xóa debug text (Ưu tiên cao nhất)

Trên tất cả các trang form đăng ký, xóa 2 đoạn text kỹ thuật không dành cho người dùng:

```
- Dòng hiển thị slug path: "/REGISTER/CHU-KY-SO-TOKEN" (to, đậm, ngay trên tiêu đề)
- Dòng mô tả: "Form chung theo slug sản phẩm. Trường hiển thị được điều chỉnh theo flow type và nhóm nghiệp vụ."
```

**Cách fix**: Xóa hoặc `display: none` 2 element đó. Tiêu đề form chỉ nên hiển thị tên sản phẩm + "– Form đăng ký".

---

## ❌ FIX 2 — Bước Thanh toán: BẮT BUỘC xác nhận trước khi qua bước tiếp theo

### Vấn đề
Hiện tại bấm "Tiếp theo" ở bước Thanh toán là nhảy thẳng sang bước Xác nhận — **sai nghiệp vụ**. Phải xác nhận thanh toán xong mới được đi tiếp.

### Yêu cầu fix

**Bước 1 – Validate chọn phương thức:**
- Nút "Tiếp theo" mặc định `disabled`
- Chỉ enable sau khi người dùng click chọn 1 trong 4 payment card
- Payment card được chọn phải có visual rõ ràng: `border: 2px solid #003087; background: #e8eef8` + dấu ✓

**Bước 2 – Mock payment flow khi nhấn "Tiếp theo":**
Không next step ngay. Thay vào đó hiện modal theo trình tự:

```
[1] Modal mở ra
    → Icon ⏳ + text "Đang xử lý thanh toán..."
    → Chờ 1500ms (setTimeout)

[2] Sau 1500ms chuyển sang:
    → Icon ✅ + text "Thanh toán thành công!"
    → Sub-text: "Email xác nhận đã gửi về hòm thư của bạn."
    → Nút: "Tiếp tục hoàn tất hồ sơ →"

[3] Người dùng nhấn nút đó → đóng modal → mới chuyển sang Bước 4 Xác nhận
```

**HTML modal cần thêm:**
```html
<div id="payment-modal" style="display:none; position:fixed; inset:0;
  background:rgba(0,0,0,0.5); z-index:999;
  align-items:center; justify-content:center">
  <div style="background:white; border-radius:16px; padding:40px;
    text-align:center; max-width:400px; width:90%">

    <div id="pm-processing">
      <div style="font-size:40px; margin-bottom:16px">⏳</div>
      <div style="font-size:18px; font-weight:600; color:#003087">
        Đang xử lý thanh toán...
      </div>
      <div style="color:#666; margin-top:8px; font-size:14px">
        Vui lòng chờ trong giây lát
      </div>
    </div>

    <div id="pm-success" style="display:none">
      <div style="font-size:48px; margin-bottom:16px">✅</div>
      <div style="font-size:20px; font-weight:700; color:#1a7d4a">
        Thanh toán thành công!
      </div>
      <div style="color:#666; margin-top:8px; font-size:14px">
        Email xác nhận đã gửi về hòm thư của bạn.
      </div>
      <button id="pm-continue-btn"
        style="margin-top:24px; background:#003087; color:white;
        border:none; padding:12px 32px; border-radius:8px;
        font-size:15px; font-weight:600; cursor:pointer">
        Tiếp tục hoàn tất hồ sơ →
      </button>
    </div>

  </div>
</div>
```

**JS logic:**
```javascript
// Disable nút Tiếp theo mặc định
const paymentNextBtn = document.querySelector('#step-payment .btn-next');
paymentNextBtn.disabled = true;
paymentNextBtn.style.opacity = '0.5';
paymentNextBtn.style.cursor = 'not-allowed';

// Enable khi chọn phương thức
document.querySelectorAll('.payment-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.payment-card').forEach(c =>
      c.classList.remove('selected'));
    card.classList.add('selected');
    paymentNextBtn.disabled = false;
    paymentNextBtn.style.opacity = '1';
    paymentNextBtn.style.cursor = 'pointer';
  });
});

// Nhấn Tiếp theo → mở modal thay vì next step
paymentNextBtn.addEventListener('click', () => {
  const modal = document.getElementById('payment-modal');
  modal.style.display = 'flex';
  document.getElementById('pm-processing').style.display = 'block';
  document.getElementById('pm-success').style.display = 'none';
  setTimeout(() => {
    document.getElementById('pm-processing').style.display = 'none';
    document.getElementById('pm-success').style.display = 'block';
  }, 1500);
});

// Nút "Tiếp tục" trong modal → đóng modal → chuyển bước 4
document.getElementById('pm-continue-btn').addEventListener('click', () => {
  document.getElementById('payment-modal').style.display = 'none';
  goToStep(4); // gọi hàm điều hướng step hiện có trong app
});
```

---

## ❌ FIX 3 — Step Indicator: phân biệt trạng thái rõ hơn

Hiện tại 4 bước trông như nhau, không rõ bước nào đang active.

**Yêu cầu:**

| Trạng thái | Style |
|---|---|
| **Done** (đã qua) | Background xanh lá `#1a7d4a`, text trắng, hiện dấu `✓` thay số |
| **Active** (đang ở) | Background navy `#003087`, text trắng, in đậm, có border highlight |
| **Pending** (chưa đến) | Background trắng, text xám `#8891a4`, border xám nhạt |

```css
.step-item.done   { background: #1a7d4a; color: white; border-color: #1a7d4a; }
.step-item.active { background: #003087; color: white; border-color: #003087; font-weight: 600; }
.step-item.pending{ background: white;   color: #8891a4; border-color: #d0d5e0; }
```

---

## ❌ FIX 4 — Badge "Phổ biến" trên Package Card

**Vấn đề:** Badge hiện ra như hình oval beige to bất thường.

**Fix:** Đổi thành pill nhỏ đặt absolute top-center của card:

```css
.pkg-card .badge-popular {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  background: #f5a623;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 12px;
  border-radius: 20px;
  white-space: nowrap;
}
```

```html
<!-- Trong card "2 Năm" -->
<div class="pkg-card" style="position:relative">
  <span class="badge-popular">⭐ Phổ biến</span>
  ...
</div>
```

---

## ❌ FIX 5 — Package Card: thêm Selected State

Khi click vào gói → card cần phản hồi trực quan rõ ràng.

```css
.pkg-card.selected {
  border: 2px solid #003087;
  background: #e8eef8;
}
.pkg-card.selected .pkg-check::after {
  content: '✓';
  color: white;
  font-size: 12px;
}
.pkg-card.selected .pkg-check {
  background: #003087;
  border-color: #003087;
}
```

```javascript
document.querySelectorAll('.pkg-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.pkg-card').forEach(c =>
      c.classList.remove('selected'));
    card.classList.add('selected');
  });
});
```

---

## ❌ FIX 6 — Upload Grid: sửa layout 2x2

**Vấn đề:** Hiện 3 ô upload (2 trên + 1 dưới lẻ). Phải là 4 ô, grid 2 cột đều nhau.

**Kiểm tra:** Đảm bảo đủ 4 upload zone theo spec:
1. Đăng ký sử dụng (scan/ảnh)
2. Hợp đồng dịch vụ (scan/ảnh)
3. Giấy phép kinh doanh – bản gốc
4. CCCD 2 mặt của người đại diện pháp luật

**CSS fix:**
```css
.upload-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

---

## ❌ FIX 7 — Upload: Disable nút "Hoàn tất" cho đến khi đủ 4 file

```javascript
const uploadBtn = document.querySelector('.btn-upload-submit');
uploadBtn.disabled = true;
uploadBtn.style.opacity = '0.5';

let uploadedCount = 0;
const totalRequired = 4;

document.querySelectorAll('.upload-zone input[type="file"]').forEach(input => {
  input.addEventListener('change', () => {
    if (input.files.length > 0) uploadedCount++;
    else uploadedCount = Math.max(0, uploadedCount - 1);

    if (uploadedCount >= totalRequired) {
      uploadBtn.disabled = false;
      uploadBtn.style.opacity = '1';
    } else {
      uploadBtn.disabled = true;
      uploadBtn.style.opacity = '0.5';
    }
  });
});
```

---

## ❌ FIX 8 — Hero: sửa màu nền

**Vấn đề:** Góc trên phải hero có màu hồng/beige — sai brand.

```css
.hero-section {
  background: linear-gradient(135deg, #001f5c 0%, #0a52c4 100%);
  /* Xóa bất kỳ gradient nào có màu hồng, beige, hay warm tone */
}
```

---

## ❌ FIX 9 — Hero Cards: text rõ hơn

4 card bên phải hero bị text mờ không đọc được.

```css
.hero-product-card {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 16px;
  color: white;
}
.hero-product-card .card-title {
  font-size: 14px;
  font-weight: 600;
  color: white;
  margin-bottom: 4px;
}
.hero-product-card .card-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.75);
}
```

---

## ✅ Thứ tự áp dụng fix

```
1. FIX 1  → Xóa debug text (2 phút)
2. FIX 2  → Payment modal + validate (quan trọng nhất)
3. FIX 3  → Step indicator active/done/pending
4. FIX 4  → Badge "Phổ biến"
5. FIX 5  → Package card selected state
6. FIX 6  → Upload grid 2x2 + đủ 4 ô
7. FIX 7  → Disable upload button
8. FIX 8  → Hero background màu navy
9. FIX 9  → Hero cards text rõ
```

---

## 📌 Ghi chú cho Codex

- `goToStep(n)` → gọi đúng tên hàm điều hướng step đang dùng trong codebase
- Tất cả class name (`.payment-card`, `.pkg-card`, `.upload-zone`...) → map sang class thực tế trong code
- Fix 2 là **bắt buộc** trước khi demo — các fix còn lại là polish
