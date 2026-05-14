(function () {
  function sanitizePdfText(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/[^\x20-\x7E]/g, "?");
  }

  function buildSimplePdf(lines) {
    const text = lines.map((line) => `(${sanitizePdfText(line)}) Tj`).join(" T* ");
    const stream = `BT /F1 12 Tf 50 760 Td 16 TL ${text} ET`;
    const objects = [
      "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
      "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
      "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
      `4 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`,
      "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj",
    ];

    let pdf = "%PDF-1.4\n";
    const offsets = [0];

    for (const object of objects) {
      offsets.push(pdf.length);
      pdf += `${object}\n`;
    }

    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n`;
    pdf += "0000000000 65535 f \n";
    for (let index = 1; index < offsets.length; index += 1) {
      pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
    }
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
    return pdf;
  }

  function triggerDownload(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  window.pdfMock = {
    downloadRegistrationPdf(payload) {
      const lines = [
        "CA2 REMOTE SIGNING DEMO",
        "Phieu dang ky su dung dich vu",
        `Khach hang: ${payload.fullName || "N/A"}`,
        `To chuc: ${payload.orgName || "N/A"}`,
        `Ma so thue: ${payload.taxCode || "N/A"}`,
        `Email: ${payload.email || "N/A"}`,
        `Ngay tao: ${new Date().toLocaleDateString("vi-VN")}`,
      ];
      triggerDownload("Dang_Ky_Su_Dung.pdf", buildSimplePdf(lines), "application/pdf");
    },
    downloadContractPdf(payload) {
      const lines = [
        "CA2 REMOTE SIGNING DEMO",
        "Hop dong dich vu",
        `Khach hang: ${payload.fullName || "N/A"}`,
        `Goi cuoc: ${payload.packageTitle || "N/A"}`,
        `Hinh thuc: ${payload.methodTitle || "N/A"}`,
        `Lien he: ${payload.contactName || "N/A"} - ${payload.contactPhone || "N/A"}`,
        `Ngay tao: ${new Date().toLocaleDateString("vi-VN")}`,
      ];
      triggerDownload("Hop_Dong_Dich_Vu.pdf", buildSimplePdf(lines), "application/pdf");
    },
  };
})();
