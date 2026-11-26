import { Catalog } from "@/components/catalog";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { loadCatalog } from "@/lib/catalog-source";

export default async function PlanesPage() {
  const items = await loadCatalog("planes");

  return (
    <div className="fade-in">
      <Navbar />
      <Catalog items={items} kind="planes" />
      <Footer />
    </div>
  );
}
