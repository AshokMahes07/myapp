import Image from "next/image";
import React, { ReactNode } from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white text-black border-b border-gray-300 fixed top-0 left-0 right-0 z-10 h-16 flex items-center px-4">
      <div className="container mx-auto flex justify-between">
        <div className="flex items-center h-screen">
          <Image
            className=""
            src="/logo.png"
            alt="PROINSPEC"
            width={180}
            height={38}
            priority
          />
        </div>
        <div className="flex items-center h-screen space-x-4">
          <Link href="/ViewGallery" className="hover:underline">
            View Gallery
          </Link>
          <Link href="/PdfReport" className="hover:underline">
            PDF Report
          </Link>
          <Link href="/ChangesOnly" className="hover:underline">
            Changes Only
          </Link>
          <Link href="/ActionOnly" className="hover:underline">
            Action Only
          </Link>
          <Link href="/ViewInternal" className="hover:underline">
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
