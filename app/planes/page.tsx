import { Catalog } from "@/components/catalog";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PLANS } from "@/lib/data";

export default function PlanesPage() {
  return (
    <div className="fade-in">
      <Navbar />
      <Catalog items={PLANS} kind="planes" />
      <Footer />
    </div>
  );
}
