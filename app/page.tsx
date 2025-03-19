import React, { ReactNode } from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">Gallery App</div>
        <div className="space-x-4">
          <Link href="/ViewGallery" className="text-white hover:underline">
            View Gallery
          </Link>
          <Link href="/PdfReport" className="text-white hover:underline">
            PDF Report
          </Link>
          <Link href="/ChangesOnly" className="text-white hover:underline">
            Changes Only
          </Link>
          <Link href="/ActionOnly" className="text-white hover:underline">
            Action Only
          </Link>
          <Link href="/ViewInternal" className="text-white hover:underline">
            View Internal
          </Link>
        </div>
      </div>
    </nav>
  );
};

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
