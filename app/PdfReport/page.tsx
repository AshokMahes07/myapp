"use client";

import { jsPDF } from "jspdf";
import { autoTable, ThemeType } from "jspdf-autotable";

// 🔹 Configurable Settings
const config = {
  logo: {
    src: "/logo.png",
    format: "png",
    width: 0,
    height: 0,
    x: 80, // Centered dynamically
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
    headerColor: [252, 235, 207], // Light orange (Must have exactly 3 values)
  },
  watermark: {
    text: "Draft",
    fontSize: 160,
    color: [237, 224, 245], // Light Purple (Must have exactly 3 values)
    opacity: 0.5, // Opacity should be set separately
    angle: 45,
  },
  footer: {
    text: "Powered by PROINSPEC",
    fontSize: 10,
    serialNumberStart: 1000,
  },
};

// 🔹 Function to Add a Watermark
const addWatermark = (doc: jsPDF, text = config.watermark.text) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(config.watermark.fontSize);
  doc.setTextColor(
    config.watermark.color[0],
    config.watermark.color[1],
    config.watermark.color[2]
  ); // Pass only [R, G, B]

  // Set opacity separately (Fix for TypeScript)
  if (doc.setGState) {
    doc.setGState({ opacity: config.watermark.opacity });
  }

  // Get text width
  const textWidth = doc.getTextWidth(text);

  // Calculate centered position
  const xPosition = (pageWidth - textWidth) / 2;
  const yPosition = pageHeight / 2;

  // Apply watermark
  doc.text(text, xPosition, yPosition, { angle: config.watermark.angle });

  // Reset opacity to 1 (fix for future elements)
  if (doc.setGState) {
    doc.setGState({ opacity: 1 });
  }
};

// 🔹 Function to Add Footer
const addFooter = (doc: jsPDF) => {
  const pageCount = doc.internal.pages.length - 1;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(config.footer.fontSize);

    // Page number on the left
    doc.text(`Page ${i} of ${pageCount}`, 10, pageHeight - 10);

    // Centered "Powered by"
    doc.text(config.footer.text, pageWidth / 2, pageHeight - 10, {
      align: "center",
    });

    // Serial number on the right
    doc.text(
      `Report ID: ${config.footer.serialNumberStart + i}`,
      pageWidth - 30,
      pageHeight - 10
    );
  }
};

// 🔹 Function to Generate PDF
const generatePDF = (withWatermark = true) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Center logo dynamically
    config.logo.x = (pageWidth - config.logo.width) / 2.5;

    // Add Corner Image
    doc.addImage(
      config.cornerImage.src,
      config.cornerImage.format,
      config.cornerImage.x,
      config.cornerImage.y,
      config.cornerImage.width,
      config.cornerImage.height
    );

    // Add Logo
    doc.addImage(
      config.logo.src,
      config.logo.format,
      config.logo.x,
      config.logo.y,
      config.logo.width,
      config.logo.height
    );

    // Add Main Image
    doc.addImage(
      config.mainImage.src,
      config.mainImage.format,
      config.mainImage.x,
      config.mainImage.y,
      config.mainImage.width,
      config.mainImage.height
    );

    // Add Table
    autoTable(doc, {
      startY: config.table.startY,
      theme: config.table.theme as ThemeType,
      styles: {
        fontSize: config.table.fontSize,
        cellPadding: config.table.cellPadding,
      },
      columnStyles: {
        0: { fillColor: config.table.headerColor as [number, number, number] },
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

    // Add Footer
    addFooter(doc);

    // Add Watermark if enabled
    if (withWatermark) {
      addWatermark(doc);
    }

    // Save PDF
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
        Download PDF (With Watermark)
      </button>
      <button
        onClick={() => generatePDF(false)}
        className="px-6 py-2 mt-2 bg-gray-500 text-white rounded shadow-md hover:bg-gray-700"
      >
        Download PDF (Without Watermark)
      </button>
    </div>
  );
}
