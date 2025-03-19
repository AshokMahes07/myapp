"use client";
import { useState, useEffect } from "react";

const ReportPage = () => {
  const [isPortrait, setIsPortrait] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`min-h-screen p-5 ${isPortrait ? "bg-white" : "bg-gray-200"}`}>
      <div className="max-w-4xl mx-auto shadow-lg border border-gray-300 rounded-md overflow-hidden">
        {/* Header */}
        <div className="bg-purple-300 text-center p-5 relative">
          <h1 className="text-xl font-bold text-red-600">Bala Test Company</h1>
          <h2 className="text-sm">Inventory & Schedule of Condition</h2>
          <p className="text-sm text-gray-700">March 3rd, 2025</p>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-red-300 opacity-30">
            DRAFT
          </div>
        </div>

        {/* Table of Contents */}
        <div className="p-4 bg-red-600 text-white font-semibold">Contents</div>
        <ul className="p-4 text-sm">
          <li>Areas</li>
          <li>Actions</li>
          <li>Declaration</li>
          <li>Appendices</li>
        </ul>

        {/* Sections */}
        <div className="p-4">
          <h3 className="font-bold text-lg">General Information</h3>
          <table className="w-full border-collapse border border-gray-300 mt-2">
            <tbody>
              <tr className="border border-gray-300">
                <td className="p-2 bg-gray-100">Property Name</td>
                <td className="p-2">123 Sample Street</td>
              </tr>
              <tr className="border border-gray-300">
                <td className="p-2 bg-gray-100">Inspection Date</td>
                <td className="p-2">March 3rd, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signature Section */}
        <div className="p-4 bg-gray-100">
          <h3 className="font-bold">Declaration</h3>
          <div className="border-t border-gray-300 mt-2 pt-2">
            <p className="text-sm">Signed by: ___________</p>
            <p className="text-sm mt-1">Date: ___________</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
