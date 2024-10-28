// src/app/layout.tsx
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
         <main>{children}</main>
      <Footer />
    </div>
  );
}
