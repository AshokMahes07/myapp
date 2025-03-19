import React, { ReactNode } from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">Gallery App</div>
        <div className="space-x-4">
          <Link href="/viewgallery" className="text-white hover:underline">
            View Gallery
          </Link>

          <Link href="/changes-only" className="text-white hover:underline">
            Changes Only
          </Link>
          <Link href="/edit-gallery" className="text-white hover:underline">
            Edit Gallery
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
