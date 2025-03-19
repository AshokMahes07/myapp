"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export default function Home() {
  const addWatermark = (doc, text = "Draft") => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setFontSize(160);
    doc.setTextColor(237, 224, 245, 0.5); // 0.5 is 50% opacity

    // Get text width
    const textWidth = doc.getTextWidth(text);

    // Calculate centered position
    const xPosition = (pageWidth - textWidth) / 2;
    const yPosition = pageHeight / 2;

    // Apply watermark
    doc.text(text, xPosition, yPosition, { angle: 45 });
  };

  const generatePDF = (withWatermark = true) => {
    try {
      const doc = new jsPDF();
      const imgFormat = "jpeg";
      const pageWidth = doc.internal.pageSize.getWidth();
      const xPosition = (pageWidth - 43) / 2;

      // Add Logo
      doc.addImage("/logo.png", "png", xPosition, 10, 0, 0);

      // Add Main Image
      doc.addImage("/property2.jpeg", imgFormat, 14, 60, 182, 80);

      // Add Table
      autoTable(doc, {
        startY: 140,
        theme: "grid",
        styles: { fontSize: 12, cellPadding: 4 },
        columnStyles: { 0: { fillColor: [252, 235, 207] } },
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
