"use client";

import { jsPDF } from "jspdf";
import { autoTable, ThemeType } from "jspdf-autotable";

// 🔹 Configurable Settings
const config = {
  backgroundColor: [255, 252, 247] as [number, number, number], // Light background
  logo: {
    src: "/logo.png",
    format: "png",
    width: 0,
    height: 0,
    x: 0, // Centered dynamically
    y: 15,
  },
  cornerImage: {
    src: "/report-template-cornor.png",
    format: "png",
    width: 50,
    height: 50,
    x: 1,
    y: 1,
  },
  mainImage: {
    src: "/property2.jpeg",
    format: "jpeg",
    width: 182,
    height: 80,
    x: 14,
    y: 45,
  },
  table: {
    startY: 125,
    theme: "grid",
    fontSize: 12,
    cellPadding: 4,
    headerColor: [252, 235, 207] as [number, number, number], // Light orange
  },
  watermark: {
    text: "Draft",
    fontSize: 160,
    color: [237, 224, 245] as [number, number, number], // Light Purple
    opacity: 0.5,
    angle: 45,
  },
  footer: {
    text: "Powered by PROINSPEC",
    fontSize: 10,
    serialNumberStart: 1000,
    backgroundColor: [84, 122, 167] as [number, number, number], // Footer Background Color
    textColor: [255, 255, 255] as [number, number, number], // Footer Text Color (White)
    borderColor: [0, 0, 0] as [number, number, number], // Footer Border Color (Black)
  },
};

// 🔹 Function to Add Footer with Background & Border
const addFooter = (doc: jsPDF) => {
  const pageCount = doc.internal.pages.length - 1;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const footerHeight = 12; // Fixed footer height

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // 🔹 Draw footer background color
    doc.setFillColor(...config.footer.backgroundColor);
    doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");

    // 🔹 Draw footer border
    doc.setDrawColor(...config.footer.borderColor);
    doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "S"); // "S" means Stroke (border)

    // 🔹 Set footer text color
    doc.setTextColor(...config.footer.textColor);
    doc.setFontSize(config.footer.fontSize);

    // 🔹 Page number on the left
    doc.text(`Page ${i} of ${pageCount}`, 10, pageHeight - 4);

    // 🔹 Centered "Powered by"
    doc.text(config.footer.text, pageWidth / 2, pageHeight - 4, {
      align: "center",
    });

    // 🔹 Serial number on the right
    doc.text(
      `Report ID: ${config.footer.serialNumberStart + i}`,
      pageWidth - 50,
      pageHeight - 4
    );
  }

  // Reset text color to black for the rest of the document
  doc.setTextColor(0, 0, 0);
};

// 🔹 Function to Generate PDF
const generatePDF = (withWatermark = true) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // 🔹 Apply Background Color
    doc.setFillColor(...config.backgroundColor);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // 🔹 Center logo dynamically
    config.logo.x = (pageWidth - config.logo.width) / 2.5;

    // 🔹 Add Corner Image
    doc.addImage(
      config.cornerImage.src,
      config.cornerImage.format,
      config.cornerImage.x,
      config.cornerImage.y,
      config.cornerImage.width,
      config.cornerImage.height
    );

    // 🔹 Add Logo
    doc.addImage(
      config.logo.src,
      config.logo.format,
      config.logo.x,
      config.logo.y,
      config.logo.width,
      config.logo.height
    );

    // 🔹 Add Main Image
    doc.addImage(
      config.mainImage.src,
      config.mainImage.format,
      config.mainImage.x,
      config.mainImage.y,
      config.mainImage.width,
      config.mainImage.height
    );

    // 🔹 Add Table
    autoTable(doc, {
      startY: config.table.startY,
      theme: config.table.theme as ThemeType,
      styles: {
        fontSize: config.table.fontSize,
        cellPadding: config.table.cellPadding,
      },
      columnStyles: {
        0: { fillColor: config.table.headerColor },
      },
      body: [
        ["Type", "Inventory & Check In"],
        [
          "Property Address",
          "9 Skylark Court, 14 Swan Street, London, SE1 1BJ",
        ],
        ["Report Completed", "10 Jan 2025 10:42 am"],
        ["Report Completed by", "Nancy Lee"],
      ],
    });

    // 🔹 Add Footer
    addFooter(doc);

    // 🔹 Save PDF
    doc.save("Property_Report.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF.");
  }
};

// 🔹 React Component
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={() => generatePDF(true)}
        className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
}
