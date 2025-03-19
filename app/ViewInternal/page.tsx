"use client";
import { useState, useEffect } from "react";

const themeData = {
  portraitAreaBgColor: "#f7f4f3",
  textColor: "#393838",
  headerBgColor: "#dc3545",
  tableheaderBgColor: "#3dabf8",
  contentheaderBgColor: "#a0f83d",
};

const tablesData = [
  {
    title: "BedRoom",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["1.1", "Wardrobe", "Brown, Wardrobe, Brown"],
      ["1.2", "Minor", "Chrome Frame"]
    ]
  },
  {
    title: "Living Room",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["2.1", "Sofa", "Leather, Black"],
      ["2.2", "Coffee Table", "Wood, Glass Top"]
    ]
  },
  {
    title: "Kitchen",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["3.1", "Fridge", "Stainless Steel, Double Door"],
      ["3.2", "Microwave", "Black, Digital"]
    ]
  },
  {
    title: "Bathroom",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["4.1", "Shower", "Glass, Enclosed"],
      ["4.2", "Sink", "Porcelain, White"]
    ]
  },
  {
    title: "Dining Room",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["5.1", "Dining Table", "Wood, 6 Seater"],
      ["5.2", "Chairs", "Leather, Black"]
    ]
  },
  {
    title: "Hallway",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["6.1", "Coat Rack", "Metal, Black"],
      ["6.2", "Mirror", "Wall-mounted, Large"]
    ]
  },
  {
    title: "Guest Room",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["7.1", "Bed", "Queen Size, Wooden Frame"],
      ["7.2", "Side Table", "Brown, 2 Drawers"]
    ]
  },
  {
    title: "Study Room",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["8.1", "Desk", "Black, Wooden"],
      ["8.2", "Bookshelf", "5-Tier, White"]
    ]
  },
  {
    title: "Garage",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["9.1", "Toolbox", "Red, Metal"],
      ["9.2", "Storage Shelves", "Plastic, Heavy Duty"]
    ]
  },
  {
    title: "Laundry Room",
    columns: ["Ref No", "Name", "Description"],
    rows: [
      ["10.1", "Washing Machine", "Front Load, White"],
      ["10.2", "Dryer", "Electric, White"]
    ]
  }
];

const ReportPage = () => {
  const [isPortrait, setIsPortrait] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen p-5 print:bg-white" style={{ backgroundColor: "#E6E6FA" }}>
      <div
        className="max-w-4xl mx-auto shadow-lg border border-gray-300 rounded-md overflow-hidden p-2 print:border-0 print:shadow-none"
        style={{ backgroundColor: themeData.portraitAreaBgColor, color: themeData.textColor }}
      >
        <div className="text-center p-5 relative h-100 bg-purple-300 print:bg-white print:text-black">
          <h1 className="text-xl font-bold">Bala Test Company</h1>
          <h2 className="text-sm">Inventory & Schedule of Condition</h2>
          <p className="text-sm">March 3rd, 2025</p>
          <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold opacity-30 transform rotate-45 text-red-500 print:text-gray-400">
            DRAFT
          </div>
        </div>

        {/* Contents Section */}
        <div className="p-1 font-semibold mt-1 print:bg-gray-300 print:text-black"
          style={{ backgroundColor: themeData.contentheaderBgColor, color: themeData.textColor }}
        >
          Contents
        </div>
        <ul className="p-4 text-sm list-disc list-inside print:text-black">
          <li>Areas</li>
          <ul>
            {tablesData.map((table, index) => (
              <li key={index} className="ml-7 p-1">
                <a href={`#${table.title.replace(/\s+/g, '-')}`} className="hover:underline print:text-black"  style={{ color: themeData.textColor }}>
                  {table.title}
                </a>
              </li>
            ))}
          </ul>
          <li>Actions</li>
          <li>Declaration</li>
          <li>Appendices</li>
        </ul>

        {/* Tables Section */}
        {tablesData.map((table, index) => (
          <div key={index} id={table.title.replace(/\s+/g, '-')} className="mt-5 print:mt-2">
            <table className="w-full border-collapse border border-gray-300 text-sm m-0 print:border-black">
              <thead className="print:bg-gray-300 print:text-black" style={{ backgroundColor: themeData.tableheaderBgColor, color: themeData.textColor }}>
                <tr>
                  <th colSpan={table.columns.length} className="border-bottom-0 p-2 print:bg-gray-400 print:text-black"
                    style={{ backgroundColor: themeData.headerBgColor, color: themeData.textColor }}>
                    {table.title}
                  </th>
                </tr>
                <tr>
                  {table.columns.map((col, colIndex) => (
                    <th key={colIndex} className="p-2 border border-gray-300 print:border-black print:text-black">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`border border-gray-300 print:border-black ${rowIndex % 2 === 0 ? "" : "bg-gray-100 print:bg-gray-200"}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="p-2 print:text-black">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
