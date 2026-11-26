import { Catalog } from "@/components/catalog";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { DESTINATIONS } from "@/lib/data";

export default function DestinosPage() {
  return (
    <div className="fade-in">
      <Navbar />
      <Catalog items={DESTINATIONS} kind="destinos" />
      <Footer />
    </div>
  );
}
