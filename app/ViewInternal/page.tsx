"use client";
import { useState, useEffect } from "react";

const themeData = {
    portraitAreaBgColor: "#f9f9f9",
    textColor: "#333333",
    headerBgColor: "#dc3545",
    tableheaderBgColor: "#dc3541",
};

const ReportPage = () => {
    const [isPortrait, setIsPortrait] = useState<boolean>(true);

    useEffect(() => {
        const handleResize = () => {
            setIsPortrait(window.innerHeight > window.innerWidth);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen p-5" style={{ backgroundColor: "#E6E6FA" }}>
            <div
                className="max-w-4xl mx-auto shadow-lg border border-gray-300 rounded-md overflow-hidden p-2"
                style={{ backgroundColor: themeData.portraitAreaBgColor, color: themeData.textColor }}
            >
                <div
                    className="text-center p-5 relative h-100 bg-purple-300"
                >
                    <h1 className="text-xl font-bold">Bala Test Company</h1>
                    <h2 className="text-sm">Inventory & Schedule of Condition</h2>
                    <p className="text-sm">March 3rd, 2025</p>
                    <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold opacity-30 transform rotate-45 text-red-500">
                        DRAFT
                    </div>
                </div>

                <div className="p-1 font-semibold mt-1"
                    style={{ backgroundColor: themeData.headerBgColor, color: themeData.textColor }}
                >Contents</div>
                <ul className="p-4 text-sm list-disc list-inside">
                    <li>Areas</li>
                    <li>Actions</li>
                    <li>Declaration</li>
                    <li>Appendices</li>
                </ul>

                <div className=""
                    style={{ backgroundColor: themeData.headerBgColor, color: themeData.textColor }}
                >Contents</div>
                <table className="w-full border-collapse border border-gray-300  text-sm">
                    <thead style={{ backgroundColor: themeData.tableheaderBgColor, color: themeData.textColor }}
                    >
                        <tr>
                            <th>Field</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-gray-300">
                            <td className="p-2 font-semibold">Property Name</td>
                            <td className="p-2">123 Sample Street</td>
                        </tr>
                        <tr className="border border-gray-300 bg-gray-100">
                            <td className="p-2 font-semibold">Inspection Date</td>
                            <td className="p-2">March 3rd, 2025</td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    );
};

export default ReportPage;