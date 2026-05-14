(function () {
  const STORAGE_KEY = "nacencomm-demo-site-state";
  const app = document.getElementById("app");
  const footer = document.getElementById("site-footer");
  const data = window.nacencommData;
  const products = data.products;

  const defaultState = {
    mobileMenuOpen: false,
    activeFaq: "",
    activeProductFilter: "all",
    drafts: {},
  };

  const defaultDraft = (product) => ({
    slug: product.slug,
    flowType: product.flowType,
    step: 1,
    packageChoice: "",
    paymentMethod: "bank",
    agreedTerms: false,
    submitted: false,
    uploaded: false,
    salesCode: "",
    statusStep: 0,
    statusUpdatedAt: new Date().toISOString(),
    uploads: {},
    activationCode: "",
    activationInput: "",
    activationConfirmed: false,
    appDownloaded: false,
    pin: "",
    pinConfirm: "",
    reviewStatus: "waiting",
    rejectionReason: data.remoteSigning.rejectionReasons[0],
    remoteStep: 1,
    remote: {
      target: "",
      method: "",
      orgName: "",
      orgAddress: "",
      taxCode: "",
      legalRep: "",
      legalRole: "",
      legalId: "",
      legalIssueDate: "",
      orgEmail: "",
      fullName: "",
      title: "",
      personalAddress: "",
      personalId: "",
      personalIssueDate: "",
      personalEmail: "",
      contactName: "",
      contactPhone: "",
      contactId: "",
      contactIssueDate: "",
      promoCode: "",
    },
    form: {
      businessName: "",
      taxCode: "",
      contactName: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
      accountingSoftware: "",
      invoiceVolume: "",
      userCount: "",
      currentSoftware: "",
      employeeCount: "",
      attendanceDevice: "",
      systemDescription: "",
      systemScale: "",
      surveyDate: "",
      industry: "",
      businessScale: "",
      currentProblem: "",
      schoolOrg: "",
      studentCount: "",
      interestedCourse: "",
    },
    errors: {},
  });

  let state = loadState();

  window.addEventListener("hashchange", render);
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);

  if (!window.location.hash) {
    window.location.hash = "#/";
  } else {
    render();
  }

  function loadState() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      return saved ? hydrateState(saved) : structuredClone(defaultState);
    } catch (error) {
      return structuredClone(defaultState);
    }
  }

  function hydrateState(saved) {
    const next = structuredClone(defaultState);
    next.mobileMenuOpen = Boolean(saved.mobileMenuOpen);
    next.activeFaq = saved.activeFaq || "";
    next.activeProductFilter = saved.activeProductFilter || "all";
    next.drafts = saved.drafts || {};
    return next;
  }

  function persist() {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function parseRoute() {
    const hash = window.location.hash.replace(/^#/, "") || "/";
    const [path, query] = hash.split("?");
    const segments = path.split("/").filter(Boolean);
    return { path, segments, query: new URLSearchParams(query || "") };
  }

  function render() {
    const route = parseRoute();
    renderFooter();
    app.innerHTML = renderRoute(route);
    syncHeader(route);
  }

  function renderRoute(route) {
    const { segments } = route;
    if (segments.length === 0) return renderHome();

    if (segments[0] === "products" && segments.length === 1) return renderProductsPage();
    if (segments[0] === "products" && segments[1]) return renderProductDetail(getProduct(segments[1]));

    if (segments[0] === "register" && segments[1] && segments.length === 2) {
      return renderRegister(getProduct(segments[1]));
    }
    if (segments[0] === "register" && segments[1] && segments[2] === "upload") {
      return renderUpload(getProduct(segments[1]));
    }
    if (segments[0] === "register" && segments[1] && segments[2] === "status") {
      return renderStatus(getProduct(segments[1]));
    }
    if (segments[0] === "register" && segments[1] && segments[2] === "activate") {
      return renderActivate(getProduct(segments[1]));
    }

    if (segments[0] === "support") return renderSupport();
    if (segments[0] === "about") return renderAbout();

    return renderNotFound();
  }

  function syncHeader(route) {
    const nav = document.getElementById("site-nav");
    if (!nav) return;
    Array.from(nav.querySelectorAll("a")).forEach((link) => {
      link.classList.toggle("active", route.path === link.getAttribute("href")?.replace(/^#/, ""));
    });
    nav.classList.toggle("open", state.mobileMenuOpen);
  }

  function renderFooter() {
    footer.innerHTML = `
      <div class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="brand footer-brand">
              <div class="brand-badge">CA2</div>
              <div>
                <p class="brand-kicker">Website Demo</p>
                <h3>NACENCOMM</h3>
              </div>
            </div>
            <p class="muted">Demo website tái thiết kế theo spec nội bộ, tập trung vào nút MUA NGAY và quy trình tự đăng ký online toàn sản phẩm.</p>
          </div>
          <div>
            <h4>Điều hướng</h4>
            <a href="#/">Trang chủ</a>
            <a href="#/products">Danh mục sản phẩm</a>
            <a href="#/support">Hỗ trợ & tải xuống</a>
            <a href="#/about">Giới thiệu công ty</a>
          </div>
          <div>
            <h4>Liên hệ</h4>
            <a href="tel:1900545407">Hotline: 1900 5454 07</a>
            <a href="#/support">Email mock: sale@nacencomm.vn</a>
            <span class="muted">63 tỉnh thành • 200.000+ khách hàng • 28 năm kinh nghiệm</span>
          </div>
        </div>
      </div>
    `;
  }

  function renderHome() {
    const featured = products.slice(0, 8);
    return `
      <section class="hero hero-site">
        <div class="hero-inner">
          <div class="hero-copy">
            <span class="eyebrow">TOP 3 nhà cung cấp chữ ký số tại Việt Nam</span>
            <h2>Nền tảng số toàn diện cho doanh nghiệp Việt</h2>
            <p>CA2 Nacencomm – Hơn 200.000 khách hàng tin dùng. Phủ sóng 63 tỉnh thành với hệ sinh thái PKI, kế toán, bảo hiểm, an ninh mạng và chuyển đổi số.</p>
            <div class="hero-actions">
              <a class="danger-button" href="#/products">🛒 Đăng ký online ngay</a>
              <a class="ghost-button" href="#/products">Xem sản phẩm ↓</a>
            </div>
            <div class="pill-row">
              <span class="fact-pill">✓ Được cấp phép Bộ TT&TT</span>
              <span class="fact-pill">✓ 28 năm kinh nghiệm</span>
              <span class="fact-pill">✓ Thành viên Tập đoàn HANEL</span>
              <span class="fact-pill">✓ 20+ sản phẩm & dịch vụ</span>
            </div>
          </div>
          <div class="hero-metrics">
            <article class="metric-card"><strong>14</strong><span>Sản phẩm có nút MUA NGAY và flow đăng ký riêng.</span></article>
            <article class="metric-card"><strong>7</strong><span>Loại flow khác nhau theo tính chất sản phẩm.</span></article>
            <article class="metric-card"><strong>8 bước</strong><span>Remote Signing giữ nguyên luồng đặc biệt để demo sâu.</span></article>
            <article class="metric-card"><strong>Mock end-to-end</strong><span>Form, thanh toán, upload, status, activate đều chạy ngay trên client.</span></article>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="screen-header">
          <div>
            <div class="section-tag">Danh mục sản phẩm</div>
            <h2>Website được thiết kế để chốt đơn ngay từ từng sản phẩm</h2>
            <p class="screen-description">Mỗi card có cả đường đi tìm hiểu và nút mua ngay. Detail page, form đăng ký và trạng thái hồ sơ đều bám theo slug của sản phẩm.</p>
          </div>
          <a class="primary-button" href="#/products">Xem đủ 14 sản phẩm</a>
        </div>
        <div class="product-grid">
          ${featured.map(renderProductCard).join("")}
        </div>
      </section>

      <section class="panel soft-panel">
        <div class="section-tag">Tại sao chọn Nacencomm</div>
        <h2>Thiết kế cho cả demo sếp lẫn blueprint triển khai thật</h2>
        <div class="strength-grid">
          ${[
            ["🏢", "Hệ sinh thái đầy đủ", "Một website demo cho cả PKI, kế toán, bảo hiểm, giáo dục và an ninh mạng."],
            ["⚡", "Flow chốt nhanh", "Nút MUA NGAY được đưa vào mọi điểm chạm quan trọng."],
            ["🧭", "Route rõ ràng", "Home, products, detail, register, upload, status, activate, support, about."],
            ["🧪", "Mock toàn bộ", "Không cần backend vẫn trình diễn được payment, email, hồ sơ và bàn giao."],
          ].map(([icon, title, desc]) => `
            <article class="feature-card">
              <div class="feature-icon">${icon}</div>
              <h3>${title}</h3>
              <p class="muted">${desc}</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="section-tag">Khách hàng & đối tác</div>
        <h2>Logo carousel mock cho phần social proof</h2>
        <div class="logo-marquee">
          ${["HANEL", "BIDV", "Viettel", "VNPT", "MISA", "VCCI", "BHXH", "Gov"].map((name) => `<span>${name}</span>`).join("")}
        </div>
      </section>

      <section class="panel cta-panel">
        <div>
          <div class="section-tag">Sẵn sàng chuyển đổi số?</div>
          <h2>Đăng ký ngay hôm nay để KD tiếp nhận và chốt hồ sơ điện tử</h2>
        </div>
        <div class="dual-actions">
          <a class="danger-button" href="#/products">🛒 Đăng ký online</a>
          <a class="neutral-button" href="tel:1900545407">📞 Gọi tư vấn miễn phí</a>
        </div>
      </section>
    `;
  }

  function renderProductsPage() {
    const groups = ["all", ...new Set(products.map((item) => item.group))];
    const filtered = state.activeProductFilter === "all"
      ? products
      : products.filter((item) => item.group === state.activeProductFilter);

    return `
      <section class="panel page-intro">
        <div class="section-tag">/products</div>
        <h2>Danh mục sản phẩm đầy đủ</h2>
        <p class="screen-description">Grid 4 cột desktop, 2 cột tablet và 1 cột mobile. Mỗi sản phẩm đều có slug, trang chi tiết và flow đăng ký riêng.</p>
        <div class="filter-row">
          ${groups.map((group) => `
            <button class="chip-button ${state.activeProductFilter === group ? "selected-chip" : ""}" type="button" data-action="filter-group" data-value="${escapeHtml(group)}">
              ${group === "all" ? "Tất cả" : escapeHtml(group)}
            </button>
          `).join("")}
        </div>
      </section>
      <section class="panel">
        <div class="product-grid">
          ${filtered.map(renderProductCard).join("")}
        </div>
      </section>
    `;
  }

  function renderProductCard(product) {
    return `
      <article class="product-card">
        <div class="product-head">
          <div class="option-icon large-icon">${product.icon}</div>
          <span class="badge">${escapeHtml(product.group)}</span>
        </div>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="muted">${escapeHtml(product.description)}</p>
        <div class="product-actions">
          <a class="neutral-button" href="#/products/${product.slug}">Tìm hiểu thêm</a>
          <a class="danger-button" href="#/register/${product.slug}">🛒 Mua ngay</a>
        </div>
      </article>
    `;
  }

  function renderProductDetail(product) {
    if (!product) return renderNotFound();
    return `
      <section class="hero product-hero">
        <div class="hero-inner">
          <div class="hero-copy">
            <span class="eyebrow">${escapeHtml(product.group)} • /products/${escapeHtml(product.slug)}</span>
            <h2>${product.icon} ${escapeHtml(product.name)}</h2>
            <p>${escapeHtml(product.tagline)}</p>
            <div class="hero-actions">
              <a class="danger-button" href="#/register/${product.slug}">🛒 MUA NGAY</a>
              <button class="ghost-button" type="button" data-action="download-brochure" data-value="${product.slug}">📥 Tải tài liệu</button>
            </div>
          </div>
          <div class="status-panel">
            <strong>Mô tả ngắn</strong>
            <div class="muted">${escapeHtml(product.description)}</div>
          </div>
        </div>
      </section>

      <section class="panel">
        <div class="section-tag">Tính năng nổi bật</div>
        <div class="strength-grid">
          ${product.features.map((feature) => `
            <article class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>${escapeHtml(feature)}</h3>
              <p class="muted">Điểm nhấn trình bày ngắn gọn để hỗ trợ nhân viên kinh doanh thuyết trình và chốt nhu cầu.</p>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="section-tag">Bảng giá / Gói cước</div>
        <div class="package-grid product-package-grid">
          ${product.packages.map((pkg, index) => `
            <article class="card-option ${index === 1 ? "selected" : ""}">
              <header>
                <div>
                  <h4 class="option-title">${escapeHtml(pkg)}</h4>
                  <p class="option-subtitle">Liên hệ báo giá hoặc hiển thị mock giá trong giai đoạn demo.</p>
                </div>
                ${index === 1 ? '<span class="badge">⭐ Phổ biến</span>' : ""}
              </header>
              <a class="danger-button full-width-button" href="#/register/${product.slug}?package=${encodeURIComponent(pkg)}">🛒 Mua gói này</a>
            </article>
          `).join("")}
        </div>
      </section>

      <section class="panel">
        <div class="section-tag">Quy trình đăng ký</div>
        <div class="timeline-lite">
          ${renderFlowPreview(product)}
        </div>
      </section>

      <section class="panel">
        <div class="section-tag">FAQ</div>
        <div class="faq-list">
          ${product.faqs.map((faq, index) => {
            const key = `${product.slug}-${index}`;
            const isOpen = state.activeFaq === key;
            return `
              <article class="faq-item ${isOpen ? "open" : ""}">
                <button class="faq-toggle" type="button" data-action="toggle-faq" data-value="${key}">
                  <span>${escapeHtml(faq.q)}</span>
                  <span>${isOpen ? "−" : "+"}</span>
                </button>
                <div class="faq-answer ${isOpen ? "" : "hidden"}">${escapeHtml(faq.a)}</div>
              </article>
            `;
          }).join("")}
        </div>
      </section>

      <div class="sticky-mobile-cta">
        <a class="danger-button full-width-button" href="#/register/${product.slug}">🛒 MUA NGAY</a>
      </div>
    `;
  }

  function renderFlowPreview(product) {
    if (product.flowType === "remote_signing") {
      return [
        "Chọn đối tượng & hình thức",
        "Điền thông tin doanh nghiệp / cá nhân",
        "Chọn gói cước Remote Signing",
        "Xác nhận điều khoản",
        "Nhận PDF và nộp hồ sơ",
        "Thẩm định hồ sơ",
        "Nhận mã kích hoạt",
        "Kích hoạt app & tạo PIN",
      ].map(renderTimelineStep).join("");
    }

    return flowLabels(product.flowType).map(renderTimelineStep).join("");
  }

  function renderTimelineStep(label, index) {
    return `<div class="timeline-row"><span class="timeline-dot">${index + 1}</span><div>${escapeHtml(label)}</div></div>`;
  }

  function renderRegister(product) {
    if (!product) return renderNotFound();
    ensureDraft(product);
    const draft = draftFor(product);

    if (product.flowType === "remote_signing") {
      return renderRemoteRegister(product, draft);
    }

    return renderStandardRegister(product, draft);
  }

  function renderStandardRegister(product, draft) {
    const labels = flowLabels(product.flowType);
    const step = draft.step;
    return `
      ${renderRegisterHeader(product, labels, step)}
      <section class="screen-card">
        <div class="section-tag">/register/${escapeHtml(product.slug)}</div>
        <h2>${escapeHtml(product.name)} — Form đăng ký</h2>
        <p class="screen-description">Form chung theo slug sản phẩm. Trường hiển thị được điều chỉnh theo flow type và nhóm nghiệp vụ.</p>
        ${step === 1 ? renderStandardStepPackage(product, draft) : ""}
        ${step === 2 ? renderStandardStepInfo(product, draft) : ""}
        ${step === 3 ? renderStandardStepPayment(product, draft) : ""}
        ${step === 4 ? renderStandardStepReview(product, draft) : ""}
        <div class="footer-actions">
          ${step > 1 ? '<button class="neutral-button" type="button" data-action="prev-standard-step">← Quay lại</button>' : '<a class="neutral-button" href="#/products">← Danh mục sản phẩm</a>'}
          <button class="${step === labels.length ? "success-button" : "primary-button"}" type="button" data-action="next-standard-step">${step === labels.length ? "Gửi hồ sơ →" : "Tiếp theo →"}</button>
        </div>
      </section>
    `;
  }

  function renderRegisterHeader(product, labels, step) {
    return `
      <section class="stepper-shell">
        <div class="register-breadcrumb">Website / ${escapeHtml(product.shortName)} / đăng ký</div>
        <div class="stepper standard-stepper">
          ${labels.map((label, index) => {
            const number = index + 1;
            const klass = number === step ? "step-pill active" : number < step ? "step-pill done" : "step-pill";
            return `<article class="${klass}"><small>Bước ${number}</small><strong>${escapeHtml(label)}</strong></article>`;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderStandardStepPackage(product, draft) {
    return `
      <div class="section-block">
        <h3>Chọn gói đăng ký</h3>
        <div class="package-grid product-package-grid">
          ${product.packages.map((pkg, index) => `
            <article class="card-option ${draft.packageChoice === pkg ? "selected" : ""}" data-action="select-package" data-value="${escapeHtml(pkg)}">
              <header>
                <div>
                  <h4 class="option-title">${escapeHtml(pkg)}</h4>
                  <p class="option-subtitle">Liên hệ báo giá hoặc mock giá theo demo.</p>
                </div>
                ${index === 1 ? '<span class="badge">⭐ Phổ biến</span>' : ""}
              </header>
            </article>
          `).join("")}
        </div>
        ${renderError(draft, "packageChoice")}
      </div>
    `;
  }

  function renderStandardStepInfo(product, draft) {
    return `
      <div class="section-block">
        <h3>Thông tin cơ bản</h3>
        <div class="form-grid">
          ${renderDraftField(draft, "businessName", "Tên doanh nghiệp / cá nhân", "text", true)}
          ${renderDraftField(draft, "taxCode", "Mã số thuế", "text", true)}
          ${renderDraftField(draft, "contactName", "Người liên hệ", "text", true)}
          ${renderDraftField(draft, "phone", "Số điện thoại", "tel", true)}
          ${renderDraftField(draft, "email", "Email", "email", true)}
          ${renderDraftField(draft, "address", "Địa chỉ", "text", true, "full")}
          ${renderProductExtraFields(product, draft)}
          ${renderDraftField(draft, "notes", "Ghi chú", "textarea", false, "full")}
        </div>
      </div>
    `;
  }

  function renderStandardStepPayment(product, draft) {
    return `
      <div class="section-block">
        <h3>Thanh toán mock</h3>
        <div class="inline-banner">
          <strong>Tổng thanh toán</strong>
          <div class="muted">${escapeHtml(draft.packageChoice || "Chưa chọn gói")} • Giá demo hiển thị theo nhu cầu trình bày, hiện ở chế độ "Liên hệ báo giá".</div>
        </div>
        <div class="service-grid payment-grid">
          ${data.paymentMethods.map((method) => `
            <article class="card-option ${draft.paymentMethod === method.value ? "selected" : ""}" data-action="select-payment" data-value="${method.value}">
              <h4 class="option-title">${escapeHtml(method.title)}</h4>
              <p class="option-subtitle">${escapeHtml(method.note)}</p>
            </article>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderStandardStepReview(product, draft) {
    return `
      <div class="review-grid">
        ${renderReviewGroup("Thông tin đăng ký", {
          "Sản phẩm": product.name,
          "Gói đăng ký": draft.packageChoice,
          "Tên doanh nghiệp / cá nhân": draft.form.businessName,
          "Mã số thuế": draft.form.taxCode,
          "Người liên hệ": draft.form.contactName,
          "Số điện thoại": draft.form.phone,
          "Email": draft.form.email,
          "Địa chỉ": draft.form.address,
          "Phương thức thanh toán": paymentTitle(draft.paymentMethod),
        })}
        <label class="checkline">
          <input type="checkbox" name="agreedTerms" ${draft.agreedTerms ? "checked" : ""} />
          <span>Tôi đồng ý để hệ thống chuyển hồ sơ điện tử cho kinh doanh phụ trách mã KD mặc định trên website.</span>
        </label>
        ${renderError(draft, "agreedTerms")}
      </div>
    `;
  }

  function renderUpload(product) {
    if (!product) return renderNotFound();
    ensureDraft(product);
    const draft = draftFor(product);
    if (!product.requireUpload) {
      return `
        <section class="screen-card">
          <h2>Sản phẩm này không yêu cầu upload hồ sơ</h2>
          <div class="screen-actions"><a class="primary-button" href="#/register/${product.slug}/status">Xem trạng thái hồ sơ</a></div>
        </section>
      `;
    }

    return `
      <section class="screen-card">
        <div class="section-tag">/register/${escapeHtml(product.slug)}/upload</div>
        <h2>Upload hồ sơ điện tử</h2>
        <p class="screen-description">Danh sách hồ sơ được điều chỉnh theo sản phẩm. Website chỉ mock tên file và kiểm tra định dạng/kích thước.</p>
        <div class="upload-grid">
          ${product.uploadDocs.map((doc, index) => renderGenericUploadCard(draft, doc, index)).join("")}
        </div>
        <div class="footer-actions">
          <a class="neutral-button" href="#/register/${product.slug}/status">← Xem trạng thái trước</a>
          <button class="success-button" type="button" data-action="submit-generic-uploads">✅ Hoàn tất & gửi hồ sơ</button>
        </div>
      </section>
    `;
  }

  function renderGenericUploadCard(draft, doc, index) {
    const key = `doc${index}`;
    const file = draft.uploads[key];
    const error = draft.errors[key];
    return `
      <article class="upload-card ${file ? "filled" : ""} ${error ? "error" : ""}">
        <header>
          <div>
            <h4 class="option-title">${escapeHtml(doc)}</h4>
            <div class="upload-meta">JPG, PNG hoặc PDF • tối đa 10MB</div>
          </div>
        </header>
        <div class="upload-drop">
          <div>☁️ Kéo thả hoặc chọn file</div>
          <div class="upload-trigger">
            <label class="chip-button" for="${key}">Chọn file</label>
            <input id="${key}" type="file" accept=".jpg,.jpeg,.png,.pdf" data-upload-key="${key}" />
          </div>
          ${file ? `<div class="file-row"><span class="file-name">✅ ${escapeHtml(file.name)} (${file.sizeLabel})</span><button type="button" data-action="remove-upload" data-value="${key}">✕</button></div>` : ""}
        </div>
        ${error ? `<div class="error-text">${error}</div>` : ""}
      </article>
    `;
  }

  function renderStatus(product) {
    if (!product) return renderNotFound();
    ensureDraft(product);
    const draft = draftFor(product);
    const labels = ["Đăng ký thành công", "Đang xử lý", "Ký hợp đồng", "Bàn giao dịch vụ"];

    return `
      <section class="screen-card">
        <div class="section-tag">/register/${escapeHtml(product.slug)}/status</div>
        <h2>Trạng thái hồ sơ</h2>
        <p class="screen-description">Mã KD mặc định: <strong>${escapeHtml(draft.salesCode || "NCM-000000")}</strong> • Hồ sơ mock được chuyển cho kinh doanh để tiếp nhận và chốt.</p>
        <div class="status-timeline">
          ${labels.map((label, index) => `
            <div class="status-row ${index <= draft.statusStep ? "done" : ""}">
              <div class="status-mark">${index < draft.statusStep ? "✓" : index === draft.statusStep ? "⏳" : "○"}</div>
              <div>
                <strong>${escapeHtml(label)}</strong>
                <div class="muted">${index <= draft.statusStep ? formatDateTime(draft.statusUpdatedAt) : "Chờ xử lý"}</div>
              </div>
            </div>
          `).join("")}
        </div>
        <div class="screen-actions">
          ${draft.statusStep < 3 ? '<button class="primary-button" type="button" data-action="advance-status">✅ Mô phỏng: Tiến lên bước tiếp theo</button>' : ""}
          ${product.requireUpload && !draft.uploaded ? `<a class="neutral-button" href="#/register/${product.slug}/upload">Bổ sung hồ sơ</a>` : ""}
          ${product.slug === "remote-signing" && draft.statusStep >= 2 ? `<a class="success-button" href="#/register/${product.slug}/activate">Kích hoạt dịch vụ</a>` : ""}
        </div>
      </section>
    `;
  }

  function renderActivate(product) {
    if (!product) return renderNotFound();
    ensureDraft(product);
    const draft = draftFor(product);
    if (product.slug !== "remote-signing") {
      return `
        <section class="screen-card">
          <h2>Route activate chỉ áp dụng cho Remote Signing trong bản demo này.</h2>
          <div class="screen-actions"><a class="primary-button" href="#/register/${product.slug}/status">Về trạng thái hồ sơ</a></div>
        </section>
      `;
    }
    return renderRemoteActivationStandalone(product, draft);
  }

  function renderSupport() {
    return `
      <section class="panel page-intro">
        <div class="section-tag">/support</div>
        <h2>Hỗ trợ & tải xuống</h2>
        <p class="screen-description">Trang tổng hợp tài liệu, hotline và hướng dẫn cho khách hàng sau khi đăng ký online.</p>
        <div class="strength-grid">
          <article class="feature-card"><div class="feature-icon">📄</div><h3>Tài liệu PDF</h3><p class="muted">Mock download brochure sản phẩm và bộ biểu mẫu.</p></article>
          <article class="feature-card"><div class="feature-icon">📞</div><h3>Hotline</h3><p class="muted">1900 5454 07 luôn hiện ở header để hỗ trợ chốt nhanh.</p></article>
          <article class="feature-card"><div class="feature-icon">📥</div><h3>Hướng dẫn upload</h3><p class="muted">Checklist hồ sơ theo từng nhóm sản phẩm.</p></article>
          <article class="feature-card"><div class="feature-icon">📱</div><h3>Kích hoạt app</h3><p class="muted">Riêng Remote Signing có màn hình mã kích hoạt và tạo PIN.</p></article>
        </div>
      </section>
    `;
  }

  function renderAbout() {
    return `
      <section class="panel page-intro">
        <div class="section-tag">/about</div>
        <h2>Giới thiệu công ty</h2>
        <p class="screen-description">Nacencomm được trình bày như một đơn vị cung cấp nền tảng số toàn diện: từ chữ ký số CA2, hóa đơn điện tử, kế toán, nhân sự đến an ninh mạng và chuyển đổi số.</p>
        <div class="summary-grid">
          <article class="summary-item"><strong>28 năm</strong><span>Kinh nghiệm triển khai và vận hành dịch vụ CNTT.</span></article>
          <article class="summary-item"><strong>200.000+</strong><span>Khách hàng tin dùng trên toàn quốc.</span></article>
          <article class="summary-item"><strong>63 tỉnh thành</strong><span>Mạng lưới hỗ trợ và triển khai rộng khắp.</span></article>
          <article class="summary-item"><strong>20+ sản phẩm</strong><span>Danh mục số hóa nhiều nghiệp vụ doanh nghiệp.</span></article>
        </div>
      </section>
    `;
  }

  function renderNotFound() {
    return `
      <section class="screen-card">
        <h2>Không tìm thấy trang</h2>
        <p class="screen-description">Hash route hiện tại chưa tồn tại trong demo website.</p>
        <div class="screen-actions"><a class="primary-button" href="#/">Về trang chủ</a></div>
      </section>
    `;
  }

  function renderRemoteRegister(product, draft) {
    const labels = ["Đối tượng", "Thông tin", "Gói dịch vụ", "Xác nhận", "Nhận PDF", "Upload hồ sơ", "Thẩm định", "Kích hoạt"];
    const step = draft.remoteStep;
    return `
      <section class="stepper-shell">
        <div class="register-breadcrumb">Website / Remote Signing / đăng ký</div>
        <div class="stepper">
          ${labels.map((label, index) => {
            const number = index + 1;
            const klass = number === step ? "step-pill active" : number < step ? "step-pill done" : "step-pill";
            return `<article class="${klass}"><small>Bước ${number}</small><strong>${escapeHtml(label)}</strong></article>`;
          }).join("")}
        </div>
      </section>
      <section class="screen-card">
        <div class="section-tag">/register/remote-signing</div>
        <h2>Remote Signing — flow 8 bước đặc biệt</h2>
        <p class="screen-description">Luồng này giữ riêng để trình bày chiều sâu nghiệp vụ CA2, khác với form chung của các sản phẩm còn lại.</p>
        ${renderRemoteScreen(draft, product)}
      </section>
    `;
  }

  function renderRemoteScreen(draft, product) {
    switch (draft.remoteStep) {
      case 1: return renderRemoteStep1(draft);
      case 2: return renderRemoteStep2(draft);
      case 3: return renderRemoteStep3(draft);
      case 4: return renderRemoteStep4(draft);
      case 5: return renderRemoteStep5(draft);
      case 6: return renderRemoteStep6(draft, product);
      case 7: return renderRemoteStep7(draft);
      case 8: return renderRemoteStep8(draft);
      default: return renderRemoteStep1(draft);
    }
  }

  function renderRemoteStep1(draft) {
    return `
      <div class="section-block">
        <h3>Mục 1 — Đối tượng</h3>
        <div class="radio-grid">
          ${data.remoteSigning.targetOptions.map((option) => renderOptionCard("remote-target", option.value, draft.remote.target, option)).join("")}
        </div>
        ${renderError(draft, "remote.target")}
      </div>
      <div class="section-block">
        <h3>Mục 5.1 — Hình thức</h3>
        <div class="grid-2">
          ${data.remoteSigning.methodOptions.map((option) => renderOptionCard("remote-method", option.value, draft.remote.method, option)).join("")}
        </div>
        ${renderError(draft, "remote.method")}
      </div>
      <div class="footer-actions">
        <a class="neutral-button" href="#/products/remote-signing">← Trang sản phẩm</a>
        <button class="primary-button" type="button" data-action="next-remote-step">Tiếp theo →</button>
      </div>
    `;
  }

  function renderRemoteStep2(draft) {
    const requiresOrg = selectedRemoteTarget(draft)?.requiresOrg;
    return `
      ${requiresOrg ? `
        <div class="section-block">
          <h3>Phần 2: Thông tin tổ chức / Doanh nghiệp</h3>
          <div class="form-grid">
            ${renderRemoteField(draft, "orgName", "Tên tổ chức, doanh nghiệp", "text", true, "full")}
            ${renderRemoteField(draft, "orgAddress", "Địa chỉ", "text", true, "full")}
            ${renderRemoteField(draft, "taxCode", "Mã số thuế / Mã ngân sách", "text", true)}
            ${renderRemoteField(draft, "legalRep", "Người đại diện pháp luật", "text", true)}
            ${renderRemoteField(draft, "legalRole", "Chức vụ", "text", false)}
            ${renderRemoteField(draft, "legalId", "CCCD / CMND / Hộ chiếu (NDDPL)", "text", true)}
            ${renderRemoteField(draft, "legalIssueDate", "Ngày cấp (NDDPL)", "date", true)}
            ${renderRemoteField(draft, "orgEmail", "Email nhận chứng thư số (DN)", "email", true)}
          </div>
        </div>
      ` : ""}
      <div class="section-block">
        <h3>Phần 3: Thông tin cá nhân</h3>
        <div class="form-grid">
          ${renderRemoteField(draft, "fullName", "Họ và tên", "text", true)}
          ${renderRemoteField(draft, "title", "Chức danh", "text", false)}
          ${renderRemoteField(draft, "personalAddress", "Địa chỉ", "text", true, "full")}
          ${renderRemoteField(draft, "personalId", "CCCD / CMND / Hộ chiếu", "text", true)}
          ${renderRemoteField(draft, "personalIssueDate", "Ngày cấp", "date", true)}
          ${renderRemoteField(draft, "personalEmail", "Email nhận chứng thư số", "email", true)}
        </div>
      </div>
      <div class="section-block">
        <h3>Phần 4: Thông tin liên hệ / Nhận chứng thư số</h3>
        <div class="form-grid">
          ${renderRemoteField(draft, "contactName", "Người liên hệ / Nhận CTS", "text", true)}
          ${renderRemoteField(draft, "contactPhone", "Số điện thoại", "tel", true)}
          ${renderRemoteField(draft, "contactId", "CCCD / CMND", "text", false)}
          ${renderRemoteField(draft, "contactIssueDate", "Ngày cấp", "date", false)}
        </div>
      </div>
      <div class="footer-actions">
        <button class="neutral-button" type="button" data-action="prev-remote-step">← Quay lại</button>
        <button class="primary-button" type="button" data-action="next-remote-step">Tiếp theo →</button>
      </div>
    `;
  }

  function renderRemoteStep3(draft) {
    return `
      <div class="section-block">
        <h3>Mục 5.3 — Loại dịch vụ</h3>
        <div class="service-grid">
          ${data.remoteSigning.serviceTypes.map((service) => renderServiceCard(service)).join("")}
        </div>
      </div>
      <div class="section-block">
        <h3>Mục 5.2 — Gói cước</h3>
        <div class="package-grid product-package-grid">
          ${["1 Năm", "2 Năm", "3 Năm", "Lượt ký"].map((pkg, index) => `
            <article class="card-option ${draft.packageChoice === pkg ? "selected" : ""}" data-action="select-package" data-value="${escapeHtml(pkg)}">
              <header>
                <div><h4 class="option-title">${escapeHtml(pkg)}</h4><p class="option-subtitle">${index === 3 ? "Mua theo số lượt" : "Hiệu lực theo năm"}</p></div>
                ${index === 1 ? '<span class="badge">⭐ Phổ biến</span>' : ""}
              </header>
            </article>
          `).join("")}
        </div>
        ${renderError(draft, "packageChoice")}
      </div>
      <div class="section-block">
        ${renderRemoteField(draft, "promoCode", "Khuyến mại / Cộng bù", "text", false, "full")}
      </div>
      <div class="footer-actions">
        <button class="neutral-button" type="button" data-action="prev-remote-step">← Quay lại</button>
        <button class="primary-button" type="button" data-action="next-remote-step">Xem lại & xác nhận →</button>
      </div>
    `;
  }

  function renderRemoteStep4(draft) {
    return `
      <div class="review-grid">
        ${renderReviewGroup("1. Đối tượng & Hình thức", {
          "Đối tượng": selectedRemoteTarget(draft)?.title || "Chưa chọn",
          "Hình thức": selectedRemoteMethod(draft)?.title || "Chưa chọn",
        })}
        ${selectedRemoteTarget(draft)?.requiresOrg ? renderReviewGroup("2. Thông tin tổ chức / DN", {
          "Tên tổ chức, doanh nghiệp": draft.remote.orgName,
          "Địa chỉ": draft.remote.orgAddress,
          "Mã số thuế": draft.remote.taxCode,
          "Người đại diện pháp luật": draft.remote.legalRep,
          "Email DN": draft.remote.orgEmail,
        }) : ""}
        ${renderReviewGroup("3. Thông tin cá nhân", {
          "Họ và tên": draft.remote.fullName,
          "Địa chỉ": draft.remote.personalAddress,
          "CCCD / CMND": draft.remote.personalId,
          "Email": draft.remote.personalEmail,
        })}
        ${renderReviewGroup("4. Liên hệ & Gói dịch vụ", {
          "Người liên hệ": draft.remote.contactName,
          "Số điện thoại": draft.remote.contactPhone,
          "Gói cước": draft.packageChoice,
          "Khuyến mại / Cộng bù": draft.remote.promoCode || "Không có",
        })}
        <label class="checkline">
          <input type="checkbox" name="agreedTerms" ${draft.agreedTerms ? "checked" : ""} />
          <span>Tôi đã đọc và đồng ý với điều khoản dịch vụ và các quy định của CA2 tại www.nacencomm.vn</span>
        </label>
        ${renderError(draft, "agreedTerms")}
      </div>
      <div class="footer-actions">
        <button class="neutral-button" type="button" data-action="prev-remote-step">← Quay lại</button>
        <button class="success-button" type="button" data-action="next-remote-step">🚀 Gửi đăng ký</button>
      </div>
    `;
  }

  function renderRemoteStep5(draft) {
    return `
      <div class="success-screen">
        <div class="success-icon">✓</div>
        <h2>Đăng ký thành công!</h2>
        <p class="screen-description">Hồ sơ demo đã ghi nhận và email mock đã gửi tới <strong>${escapeHtml(remotePrimaryEmail(draft))}</strong>.</p>
        <div class="pdf-actions">
          <button class="neutral-button" type="button" data-action="download-remote-registration-pdf">📄 Đăng_Ký_Sử_Dụng.pdf</button>
          <button class="neutral-button" type="button" data-action="download-remote-contract-pdf">📄 Hợp_Đồng_Dịch_Vụ.pdf</button>
        </div>
        <div class="screen-actions">
          <button class="primary-button" type="button" data-action="next-remote-step">📤 Tiếp tục nộp hồ sơ online →</button>
        </div>
      </div>
    `;
  }

  function renderRemoteStep6(draft, product) {
    return `
      <div class="section-block">
        <h3>Upload hồ sơ — 4 loại giấy tờ bắt buộc</h3>
        <div class="upload-grid">
          ${data.remoteSigning.uploadRequirements.map((requirement) => renderRemoteUploadCard(draft, requirement)).join("")}
        </div>
      </div>
      <div class="footer-actions">
        <button class="neutral-button" type="button" data-action="prev-remote-step">← Quay lại</button>
        <button class="success-button" type="button" data-action="next-remote-step">✅ Hoàn tất & Gửi hồ sơ</button>
        <a class="chip-button" href="#/register/${product.slug}/status">Mở route status riêng</a>
      </div>
    `;
  }

  function renderRemoteStep7(draft) {
    if (draft.reviewStatus === "approved" && draft.activationCode) {
      return `
        <div class="success-screen">
          <div class="success-icon">✓</div>
          <h2>Hồ sơ đã được duyệt!</h2>
          <p class="screen-description">Mã kích hoạt: <strong>${escapeHtml(draft.activationCode)}</strong> • Email: <strong>${escapeHtml(remotePrimaryEmail(draft))}</strong></p>
          <div class="screen-actions">
            <button class="primary-button" type="button" data-action="next-remote-step">→ Tiếp tục kích hoạt app</button>
          </div>
        </div>
      `;
    }
    if (draft.reviewStatus === "rejected") {
      return `
        <div class="status-icon rejected">!</div>
        <h2>Hồ sơ chưa đạt yêu cầu</h2>
        <div class="field ${draft.errors.rejectionReason ? "error" : ""}">
          <label for="rejectionReason">Lý do</label>
          <select id="rejectionReason" name="rejectionReason">
            ${data.remoteSigning.rejectionReasons.map((reason) => `<option value="${escapeHtml(reason)}" ${draft.rejectionReason === reason ? "selected" : ""}>${escapeHtml(reason)}</option>`).join("")}
          </select>
          ${renderError(draft, "rejectionReason")}
        </div>
        <div class="screen-actions">
          <button class="danger-button" type="button" data-action="retry-remote-review">🔄 Upload lại hồ sơ</button>
          <button class="neutral-button" type="button" data-action="approve-remote-review">✅ Mô phỏng: Duyệt hồ sơ</button>
        </div>
      `;
    }
    return `
      <div class="status-icon waiting">⏳</div>
      <h2>Thẩm định hồ sơ (mock)</h2>
      <p class="screen-description">CA2 đang tiến hành thẩm định hồ sơ và sẽ gửi kết quả về email <strong>${escapeHtml(remotePrimaryEmail(draft))}</strong>.</p>
      <div class="approval-actions">
        <button class="success-button" type="button" data-action="approve-remote-review">✅ Mô phỏng: Duyệt hồ sơ</button>
        <button class="danger-button" type="button" data-action="reject-remote-review">❌ Mô phỏng: Từ chối hồ sơ</button>
      </div>
    `;
  }

  function renderRemoteStep8(draft) {
    return `
      <div class="grid-3">
        <article class="sub-step ${draft.appDownloaded ? "active" : ""}">
          <h3>8.1 — Tải ứng dụng</h3>
          <p class="muted">Tải CA2 Remote Signing trên App Store hoặc Google Play.</p>
          <div class="app-links">
            <button class="neutral-button" type="button">App Store</button>
            <button class="neutral-button" type="button">Google Play</button>
          </div>
          <label class="checkline" style="margin-top:16px;">
            <input type="checkbox" name="appDownloaded" ${draft.appDownloaded ? "checked" : ""} />
            <span>Tôi đã tải ứng dụng thành công</span>
          </label>
        </article>
        <article class="sub-step ${draft.activationConfirmed ? "active" : ""}">
          <h3>8.2 — Nhập mã kích hoạt</h3>
          <div class="field ${draft.errors.activationInput ? "error" : ""}">
            <label for="activationInput">Mã kích hoạt</label>
            <input id="activationInput" name="activationInput" type="text" value="${escapeHtml(draft.activationInput)}" placeholder="RS-XXXX-XXXX" maxlength="12" />
            ${renderError(draft, "activationInput")}
          </div>
          <div class="screen-actions">
            <button class="primary-button" type="button" data-action="confirm-remote-activation">Xác nhận mã</button>
          </div>
        </article>
        <article class="sub-step ${draft.pin && draft.pin === draft.pinConfirm ? "active" : ""}">
          <h3>8.3 — Tạo mã PIN</h3>
          <div class="pin-grid">
            ${renderStandaloneField(draft, "pin", "PIN", "password")}
            ${renderStandaloneField(draft, "pinConfirm", "Nhập lại PIN", "password")}
          </div>
          <p class="hint">Không chia sẻ PIN với bất kỳ ai.</p>
        </article>
      </div>
      <div class="footer-actions">
        <button class="neutral-button" type="button" data-action="prev-remote-step">← Quay lại</button>
        <button class="success-button" type="button" data-action="complete-remote-flow">🎉 Hoàn tất kích hoạt</button>
      </div>
    `;
  }

  function renderRemoteActivationStandalone(product, draft) {
    return `
      <section class="screen-card">
        <div class="section-tag">/register/${escapeHtml(product.slug)}/activate</div>
        <h2>Kích hoạt dịch vụ Remote Signing</h2>
        <p class="screen-description">Route riêng để trình diễn bước activate ngoài flow 8 bước.</p>
        ${renderRemoteStep8(draft)}
      </section>
    `;
  }

  function renderRemoteUploadCard(draft, requirement) {
    const file = draft.uploads[requirement.key];
    const error = draft.errors[requirement.key];
    return `
      <article class="upload-card ${file ? "filled" : ""} ${error ? "error" : ""}">
        <header>
          <div>
            <h4 class="option-title">${escapeHtml(requirement.title)}</h4>
            <div class="upload-meta">${escapeHtml(requirement.description)}</div>
          </div>
          <span class="badge">${requirement.extensions.join(", ").toUpperCase()}</span>
        </header>
        <div class="upload-drop">
          <div>☁️ Kéo thả file vào đây</div>
          <div class="upload-trigger">
            <label class="chip-button" for="upload-${requirement.key}">Chọn file</label>
            <input id="upload-${requirement.key}" type="file" accept="${requirement.accept}" data-upload-key="${requirement.key}" />
          </div>
          ${file ? `<div class="file-row"><span class="file-name">✅ ${escapeHtml(file.name)} (${file.sizeLabel})</span><button type="button" data-action="remove-upload" data-value="${requirement.key}">✕</button></div>` : ""}
        </div>
        ${error ? `<div class="error-text">${error}</div>` : ""}
      </article>
    `;
  }

  function renderProductExtraFields(product, draft) {
    if (!product.extraFields?.length) return "";
    return product.extraFields.map((field) => {
      const meta = extraFieldMeta(field);
      return renderDraftField(draft, field, meta.label, meta.type, false, meta.full ? "full" : "");
    }).join("");
  }

  function renderDraftField(draft, key, label, type, required, extraClass = "") {
    const error = draft.errors[key];
    const classes = ["field"];
    if (extraClass) classes.push(extraClass);
    if (error) classes.push("error");
    if (type === "textarea") {
      return `<div class="${classes.join(" ")}"><label for="${key}">${escapeHtml(label)}${required ? " *" : ""}</label><textarea id="${key}" name="${key}" rows="4">${escapeHtml(draft.form[key] || "")}</textarea>${error ? `<div class="error-text">${error}</div>` : ""}</div>`;
    }
    return `<div class="${classes.join(" ")}"><label for="${key}">${escapeHtml(label)}${required ? " *" : ""}</label><input id="${key}" name="${key}" type="${type}" value="${escapeHtml(draft.form[key] || "")}" />${error ? `<div class="error-text">${error}</div>` : ""}</div>`;
  }

  function renderRemoteField(draft, key, label, type, required, extraClass = "") {
    const error = draft.errors[`remote.${key}`];
    const classes = ["field"];
    if (extraClass) classes.push(extraClass);
    if (error) classes.push("error");
    return `<div class="${classes.join(" ")}"><label for="remote-${key}">${escapeHtml(label)}${required ? " *" : ""}</label><input id="remote-${key}" name="remote.${key}" type="${type}" value="${escapeHtml(draft.remote[key] || "")}" ${key === "pin" ? 'maxlength="6"' : ""} />${error ? `<div class="error-text">${error}</div>` : ""}</div>`;
  }

  function renderStandaloneField(draft, key, label, type) {
    const error = draft.errors[key];
    return `<div class="field ${error ? "error" : ""}"><label for="${key}">${escapeHtml(label)}</label><input id="${key}" name="${key}" type="${type}" value="${escapeHtml(draft[key] || "")}" maxlength="6" />${error ? `<div class="error-text">${error}</div>` : ""}</div>`;
  }

  function renderOptionCard(action, value, selectedValue, option) {
    return `
      <article class="card-option ${selectedValue === value ? "selected" : ""}" data-action="${action}" data-value="${escapeHtml(value)}">
        <header><div class="option-icon">${option.icon}</div></header>
        <h4 class="option-title">${escapeHtml(option.title)}</h4>
        <p class="option-subtitle">${escapeHtml(option.subtitle)}</p>
      </article>
    `;
  }

  function renderServiceCard(service) {
    return `
      <article class="service-card ${service.selected ? "selected" : ""} ${service.disabled ? "disabled" : ""}">
        <h4 class="option-title">${escapeHtml(service.title)}</h4>
        <p class="option-subtitle">${escapeHtml(service.subtitle)}</p>
      </article>
    `;
  }

  function renderReviewGroup(title, rows) {
    return `
      <section class="panel compact-panel">
        <div class="section-tag">${escapeHtml(title)}</div>
        <table class="review-table">
          <tbody>
            ${Object.entries(rows).map(([label, value]) => `<tr><th>${escapeHtml(label)}</th><td>${escapeHtml(value || "Chưa nhập")}</td></tr>`).join("")}
          </tbody>
        </table>
      </section>
    `;
  }

  function renderError(draft, key) {
    return draft.errors[key] ? `<div class="error-text">${draft.errors[key]}</div>` : "";
  }

  function handleClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const { action, value } = target.dataset;
    const route = parseRoute();
    const product = route.segments[1] ? getProduct(route.segments[1]) : null;
    if (product) ensureDraft(product);
    const draft = product ? draftFor(product) : null;

    switch (action) {
      case "toggle-menu":
        state.mobileMenuOpen = !state.mobileMenuOpen;
        persist();
        syncHeader(route);
        return;
      case "filter-group":
        state.activeProductFilter = value;
        persist();
        render();
        return;
      case "toggle-faq":
        state.activeFaq = state.activeFaq === value ? "" : value;
        persist();
        render();
        return;
      case "download-brochure":
        window.pdfMock.downloadContractPdf({ fullName: "Khách hàng demo", packageTitle: getProduct(value)?.name || "", methodTitle: "Brochure", contactName: "Nacencomm", contactPhone: data.company.hotline });
        return;
      case "select-package":
        if (draft) {
          draft.packageChoice = value;
          draft.errors.packageChoice = "";
          saveDraft(product, draft);
          render();
        }
        return;
      case "select-payment":
        if (draft) {
          draft.paymentMethod = value;
          saveDraft(product, draft);
          render();
        }
        return;
      case "next-standard-step":
        handleNextStandardStep(product, draft);
        return;
      case "prev-standard-step":
        draft.step = Math.max(1, draft.step - 1);
        saveDraft(product, draft);
        render();
        return;
      case "submit-generic-uploads":
        handleSubmitGenericUploads(product, draft);
        return;
      case "advance-status":
        draft.statusStep = Math.min(3, draft.statusStep + 1);
        draft.statusUpdatedAt = new Date().toISOString();
        if (product.slug === "remote-signing" && draft.statusStep >= 2 && !draft.activationCode) {
          draft.activationCode = generateActivationCode();
        }
        saveDraft(product, draft);
        render();
        return;
      case "remote-target":
        draft.remote.target = value;
        draft.errors["remote.target"] = "";
        saveDraft(product, draft);
        render();
        return;
      case "remote-method":
        draft.remote.method = value;
        draft.errors["remote.method"] = "";
        saveDraft(product, draft);
        render();
        return;
      case "next-remote-step":
        handleNextRemoteStep(product, draft);
        return;
      case "prev-remote-step":
        draft.remoteStep = Math.max(1, draft.remoteStep - 1);
        saveDraft(product, draft);
        render();
        return;
      case "download-remote-registration-pdf":
        window.pdfMock.downloadRegistrationPdf(buildRemotePdfPayload(draft));
        return;
      case "download-remote-contract-pdf":
        window.pdfMock.downloadContractPdf(buildRemotePdfPayload(draft));
        return;
      case "approve-remote-review":
        draft.reviewStatus = "approved";
        draft.activationCode = draft.activationCode || generateActivationCode();
        saveDraft(product, draft);
        render();
        return;
      case "reject-remote-review":
        draft.reviewStatus = "rejected";
        saveDraft(product, draft);
        render();
        return;
      case "retry-remote-review":
        draft.reviewStatus = "waiting";
        draft.remoteStep = 6;
        saveDraft(product, draft);
        render();
        return;
      case "confirm-remote-activation":
        handleConfirmRemoteActivation(product, draft);
        return;
      case "complete-remote-flow":
        handleCompleteRemoteFlow(product, draft);
        return;
      case "remove-upload":
        if (draft) {
          delete draft.uploads[value];
          draft.errors[value] = "";
          saveDraft(product, draft);
          render();
        }
        return;
      default:
        return;
    }
  }

  function handleInput(event) {
    const input = event.target;
    if (!(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement || input instanceof HTMLSelectElement)) return;
    const route = parseRoute();
    const product = route.segments[1] ? getProduct(route.segments[1]) : null;
    if (!product) return;
    ensureDraft(product);
    const draft = draftFor(product);

    if (input.name.startsWith("remote.")) {
      const key = input.name.replace("remote.", "");
      draft.remote[key] = input.value;
      draft.errors[input.name] = "";
      saveDraft(product, draft);
      return;
    }

    if (input.name in draft.form) {
      draft.form[input.name] = input.value;
      draft.errors[input.name] = "";
      saveDraft(product, draft);
      return;
    }

    if (input.name === "activationInput") {
      draft.activationInput = formatActivationInput(input.value.toUpperCase());
      draft.errors.activationInput = "";
      saveDraft(product, draft);
      input.value = draft.activationInput;
      return;
    }

    if (input.name === "pin" || input.name === "pinConfirm") {
      draft[input.name] = input.value.replace(/\D/g, "").slice(0, 6);
      draft.errors[input.name] = "";
      saveDraft(product, draft);
      input.value = draft[input.name];
    }
  }

  function handleChange(event) {
    const input = event.target;
    const route = parseRoute();
    const product = route.segments[1] ? getProduct(route.segments[1]) : null;
    if (!product) return;
    ensureDraft(product);
    const draft = draftFor(product);

    if (input.name === "agreedTerms" || input.name === "appDownloaded") {
      draft[input.name] = input.checked;
      draft.errors[input.name] = "";
      saveDraft(product, draft);
      return;
    }

    if (input.name === "rejectionReason") {
      draft.rejectionReason = input.value;
      draft.errors.rejectionReason = "";
      saveDraft(product, draft);
      return;
    }

    if (input.matches("input[type='file'][data-upload-key]")) {
      handleUpload(product, draft, input.dataset.uploadKey, input.files?.[0]);
      input.value = "";
      return;
    }
  }

  function handleNextStandardStep(product, draft) {
    draft.errors = {};
    const maxStep = flowLabels(product.flowType).length;
    if (draft.step === 1 && !draft.packageChoice) draft.errors.packageChoice = "Vui lòng chọn gói đăng ký.";
    if (draft.step === 2) validateStandardInfo(product, draft);
    if (draft.step === 4 && !draft.agreedTerms) draft.errors.agreedTerms = "Bạn cần xác nhận điều khoản trước khi gửi.";

    if (Object.keys(draft.errors).length) {
      saveDraft(product, draft);
      render();
      return;
    }

    if (draft.step >= maxStep) {
      draft.submitted = true;
      draft.salesCode = draft.salesCode || randomSalesCode();
      draft.statusStep = 0;
      draft.statusUpdatedAt = new Date().toISOString();
      saveDraft(product, draft);
      window.location.hash = product.requireUpload ? `#/register/${product.slug}/upload` : `#/register/${product.slug}/status`;
      return;
    }

    draft.step += 1;
    saveDraft(product, draft);
    render();
  }

  function handleSubmitGenericUploads(product, draft) {
    draft.errors = {};
    product.uploadDocs.forEach((_, index) => {
      const key = `doc${index}`;
      if (!draft.uploads[key]) draft.errors[key] = "Vui lòng upload giấy tờ này.";
    });
    if (Object.keys(draft.errors).length) {
      saveDraft(product, draft);
      render();
      return;
    }
    draft.uploaded = true;
    draft.statusStep = Math.max(draft.statusStep, 1);
    draft.statusUpdatedAt = new Date().toISOString();
    saveDraft(product, draft);
    window.location.hash = `#/register/${product.slug}/status`;
  }

  function handleNextRemoteStep(product, draft) {
    draft.errors = {};
    if (draft.remoteStep === 1) validateRemoteStep1(draft);
    if (draft.remoteStep === 2) validateRemoteStep2(draft);
    if (draft.remoteStep === 3 && !draft.packageChoice) draft.errors.packageChoice = "Vui lòng chọn gói cước.";
    if (draft.remoteStep === 4 && !draft.agreedTerms) draft.errors.agreedTerms = "Bạn cần đồng ý điều khoản.";
    if (draft.remoteStep === 6) validateRemoteUploads(draft);

    if (Object.keys(draft.errors).length) {
      saveDraft(product, draft);
      render();
      return;
    }

    if (draft.remoteStep === 6) {
      draft.uploaded = true;
      draft.statusStep = 1;
      draft.statusUpdatedAt = new Date().toISOString();
    }
    if (draft.remoteStep === 7 && draft.reviewStatus !== "approved") {
      draft.errors.rejectionReason = "Hãy mô phỏng duyệt hồ sơ trước khi tiếp tục kích hoạt.";
      saveDraft(product, draft);
      render();
      return;
    }

    if (draft.remoteStep >= 8) {
      handleCompleteRemoteFlow(product, draft);
      return;
    }

    draft.remoteStep += 1;
    draft.submitted = draft.remoteStep >= 5;
    draft.salesCode = draft.salesCode || randomSalesCode();
    saveDraft(product, draft);
    render();
  }

  function handleConfirmRemoteActivation(product, draft) {
    draft.errors = {};
    if (!draft.activationInput) draft.errors.activationInput = "Vui lòng nhập mã kích hoạt.";
    else if (draft.activationInput !== draft.activationCode) draft.errors.activationInput = "Mã kích hoạt không đúng, vui lòng kiểm tra lại email.";
    else draft.activationConfirmed = true;
    saveDraft(product, draft);
    render();
  }

  function handleCompleteRemoteFlow(product, draft) {
    draft.errors = {};
    if (!draft.appDownloaded) draft.errors.appDownloaded = "Vui lòng xác nhận đã tải ứng dụng.";
    if (!draft.activationConfirmed) draft.errors.activationInput = "Bạn cần xác nhận đúng mã kích hoạt.";
    if (!/^\d{6}$/.test(draft.pin)) draft.errors.pin = "PIN phải gồm đúng 6 chữ số.";
    if (!/^\d{6}$/.test(draft.pinConfirm)) draft.errors.pinConfirm = "Vui lòng nhập lại PIN gồm đúng 6 chữ số.";
    else if (draft.pin !== draft.pinConfirm) draft.errors.pinConfirm = "Hai mã PIN chưa khớp.";

    if (Object.keys(draft.errors).length) {
      saveDraft(product, draft);
      render();
      return;
    }

    draft.statusStep = 3;
    draft.statusUpdatedAt = new Date().toISOString();
    saveDraft(product, draft);
    window.location.hash = `#/register/${product.slug}/status`;
  }

  function validateStandardInfo(product, draft) {
    const fields = ["businessName", "taxCode", "contactName", "phone", "email", "address"];
    fields.forEach((field) => {
      if (!String(draft.form[field] || "").trim()) draft.errors[field] = "Trường này là bắt buộc.";
    });
    if (draft.form.businessName.trim() && draft.form.businessName.trim().length < 2) draft.errors.businessName = "Tên phải có ít nhất 2 ký tự.";
    if (draft.form.taxCode && !/^\d{10,13}$/.test(draft.form.taxCode.trim())) draft.errors.taxCode = "Mã số thuế phải có 10–13 chữ số.";
    if (draft.form.phone && !/^0\d{8,10}$/.test(draft.form.phone.trim())) draft.errors.phone = "Số điện thoại phải bắt đầu bằng 0 và có 9–11 số.";
    if (draft.form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.form.email.trim())) draft.errors.email = "Email chưa đúng định dạng.";
  }

  function validateRemoteStep1(draft) {
    if (!draft.remote.target) draft.errors["remote.target"] = "Vui lòng chọn đối tượng đăng ký.";
    if (!draft.remote.method) draft.errors["remote.method"] = "Vui lòng chọn hình thức đăng ký.";
  }

  function validateRemoteStep2(draft) {
    const requiresOrg = selectedRemoteTarget(draft)?.requiresOrg;
    const required = ["fullName", "personalAddress", "personalId", "personalIssueDate", "personalEmail", "contactName", "contactPhone"];
    if (requiresOrg) {
      required.push("orgName", "orgAddress", "taxCode", "legalRep", "legalId", "legalIssueDate", "orgEmail");
    }
    required.forEach((field) => {
      if (!String(draft.remote[field] || "").trim()) draft.errors[`remote.${field}`] = "Trường này là bắt buộc.";
    });
    if (draft.remote.fullName.trim() && draft.remote.fullName.trim().length < 2) draft.errors["remote.fullName"] = "Họ và tên phải có ít nhất 2 ký tự.";
    if (draft.remote.taxCode && !/^\d{10,13}$/.test(draft.remote.taxCode.trim())) draft.errors["remote.taxCode"] = "MST phải có 10–13 chữ số.";
    if (draft.remote.contactPhone && !/^0\d{8,10}$/.test(draft.remote.contactPhone.trim())) draft.errors["remote.contactPhone"] = "Số điện thoại phải bắt đầu bằng 0 và có 9–11 số.";
    ["orgEmail", "personalEmail"].forEach((field) => {
      const value = draft.remote[field].trim();
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) draft.errors[`remote.${field}`] = "Email chưa đúng định dạng.";
    });
    ["legalId", "personalId", "contactId"].forEach((field) => {
      const value = draft.remote[field].trim();
      if (value && !/^(\d{9}|\d{12})$/.test(value)) draft.errors[`remote.${field}`] = "CCCD/CMND phải có 9 hoặc 12 chữ số.";
    });
  }

  function validateRemoteUploads(draft) {
    data.remoteSigning.uploadRequirements.forEach((requirement) => {
      if (!draft.uploads[requirement.key]) draft.errors[requirement.key] = `Vui lòng upload ${requirement.title}.`;
    });
  }

  function handleUpload(product, draft, key, file) {
    if (!file) return;
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    const allowed = key.startsWith("doc") ? ["jpg", "jpeg", "png", "pdf"] : (data.remoteSigning.uploadRequirements.find((item) => item.key === key)?.extensions || []);
    draft.errors[key] = "";
    if (!allowed.includes(extension)) {
      draft.errors[key] = `Định dạng không hợp lệ. Chỉ chấp nhận ${allowed.join(", ").toUpperCase()}.`;
      saveDraft(product, draft);
      render();
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      draft.errors[key] = "File vượt quá 10MB.";
      saveDraft(product, draft);
      render();
      return;
    }
    draft.uploads[key] = { name: file.name, sizeLabel: formatFileSize(file.size) };
    saveDraft(product, draft);
    render();
  }

  function ensureDraft(product) {
    if (!state.drafts[product.slug]) {
      state.drafts[product.slug] = defaultDraft(product);
      const presetPackage = parseRoute().query.get("package");
      if (presetPackage) state.drafts[product.slug].packageChoice = presetPackage;
      persist();
    }
  }

  function draftFor(product) {
    return state.drafts[product.slug];
  }

  function saveDraft(product, draft) {
    state.drafts[product.slug] = draft;
    persist();
  }

  function getProduct(slug) {
    return products.find((item) => item.slug === slug);
  }

  function flowLabels(flowType) {
    switch (flowType) {
      case "standard_form": return ["Chọn gói", "Thông tin", "Thanh toán", "Xác nhận"];
      case "standard_upload": return ["Chọn gói", "Thông tin", "Thanh toán", "Xác nhận"];
      case "consult": return ["Thông tin", "Xác nhận"];
      case "consult_schedule": return ["Chọn gói", "Thông tin", "Xác nhận"];
      case "consult_survey": return ["Chọn gói", "Thông tin", "Xác nhận"];
      case "course_register": return ["Chọn gói", "Thông tin", "Thanh toán", "Xác nhận"];
      default: return ["Chọn gói", "Thông tin", "Thanh toán", "Xác nhận"];
    }
  }

  function paymentTitle(value) {
    return data.paymentMethods.find((item) => item.value === value)?.title || "Chưa chọn";
  }

  function selectedRemoteTarget(draft) {
    return data.remoteSigning.targetOptions.find((item) => item.value === draft.remote.target);
  }

  function selectedRemoteMethod(draft) {
    return data.remoteSigning.methodOptions.find((item) => item.value === draft.remote.method);
  }

  function remotePrimaryEmail(draft) {
    return draft.remote.personalEmail || draft.remote.orgEmail || "demo@nacencomm.vn";
  }

  function buildRemotePdfPayload(draft) {
    return {
      fullName: draft.remote.fullName,
      orgName: draft.remote.orgName,
      taxCode: draft.remote.taxCode,
      email: remotePrimaryEmail(draft),
      packageTitle: draft.packageChoice,
      methodTitle: selectedRemoteMethod(draft)?.title,
      contactName: draft.remote.contactName,
      contactPhone: draft.remote.contactPhone,
    };
  }

  function extraFieldMeta(key) {
    const map = {
      accountingSoftware: { label: "Phần mềm kế toán đang dùng", type: "text" },
      invoiceVolume: { label: "Số lượng hóa đơn dự kiến / tháng", type: "text" },
      userCount: { label: "Số lượng người dùng", type: "text" },
      currentSoftware: { label: "Phần mềm hiện tại", type: "text" },
      employeeCount: { label: "Số lượng nhân viên", type: "text" },
      attendanceDevice: { label: "Thiết bị chấm công hiện tại", type: "text" },
      systemDescription: { label: "Mô tả nhu cầu / hệ thống", type: "textarea", full: true },
      systemScale: { label: "Quy mô hệ thống", type: "text" },
      surveyDate: { label: "Đặt lịch khảo sát", type: "date" },
      industry: { label: "Lĩnh vực hoạt động", type: "text" },
      businessScale: { label: "Quy mô doanh nghiệp", type: "text" },
      currentProblem: { label: "Vấn đề hiện tại", type: "textarea", full: true },
      schoolOrg: { label: "Trường / tổ chức", type: "text" },
      studentCount: { label: "Số lượng học viên", type: "text" },
      interestedCourse: { label: "Khóa học quan tâm", type: "text" },
    };
    return map[key] || { label: key, type: "text" };
  }

  function randomSalesCode() {
    return `NCM-${Math.floor(100000 + Math.random() * 900000)}`;
  }

  function generateActivationCode() {
    const segment = () => Math.floor(1000 + Math.random() * 9000).toString();
    return `RS-${segment()}-${segment()}`;
  }

  function formatActivationInput(value) {
    const clean = value.replace(/[^A-Z0-9]/g, "").slice(0, 10);
    if (clean.length <= 2) return clean;
    if (clean.length <= 6) return `${clean.slice(0, 2)}-${clean.slice(2)}`;
    return `${clean.slice(0, 2)}-${clean.slice(2, 6)}-${clean.slice(6)}`;
  }

  function formatDateTime(value) {
    return new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
  }

  function formatFileSize(size) {
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
