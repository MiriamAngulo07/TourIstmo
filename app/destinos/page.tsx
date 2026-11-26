import { Catalog } from "@/components/catalog";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { loadCatalog } from "@/lib/catalog-source";

export default async function DestinosPage() {
  const items = await loadCatalog("destinos");

  return (
    <div className="fade-in">
      <Navbar />
      <Catalog items={items} kind="destinos" />
      <Footer />
    </div>
  );
}
