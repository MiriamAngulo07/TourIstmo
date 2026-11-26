import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DestinationCard } from "@/components/destination-card";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { loadCatalog } from "@/lib/catalog-source";

export async function CatalogDetail({ id, kind }: { id: string; kind: "destinos" | "planes" }) {
  const catalog = await loadCatalog(kind);
  const item = catalog.find((entry) => String(entry.id) === id);
  if (!item) notFound();

  const isDestination = kind === "destinos";
  const related = catalog.filter((entry) => entry.id !== item.id).slice(0, 3);
  const price = item.precio == null ? (isDestination ? "Gratis" : "Consultar") : `$${item.precio}`;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8">
        <Link href={`/${kind}`} className="mb-5 inline-block font-semibold text-teal-text hover:underline">
          ← Volver a {kind}
        </Link>
        <div className="grid items-stretch gap-6 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-2 md:p-6">
          <div className="relative min-h-60 overflow-hidden rounded-xl md:min-h-80">
            <Image src={item.imagen} alt={item.nombre} fill sizes="(max-width: 768px) 100vw, 560px" className="object-cover" />
          </div>
          <div className="space-y-4 py-2 md:p-5">
            <span className="inline-block rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal-text">
              {isDestination ? item.tipo : `Plan · ${item.tipo}`}
            </span>
            <h1 className="font-display text-3xl font-bold text-navy md:text-4xl">{item.nombre}</h1>
            <p className="text-lg font-semibold text-teal-text">{isDestination ? "Entrada" : "Precio de referencia"} · {price}</p>
            <dl className="space-y-2 border-t border-border pt-4">
              <div className="flex gap-2"><dt className="font-semibold">Valoración</dt><dd>{item.rating}/5</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Provincia</dt><dd>{item.provincia}</dd></div>
            </dl>
          </div>
        </div>
        <nav aria-label="Información de la ficha" className="mt-8 flex gap-5 border-b border-border pb-3 font-semibold text-teal-text">
          <a href="#descripcion" className="hover:underline">Descripción</a>
          <a href="#ubicacion" className="hover:underline">Ubicación</a>
        </nav>
        <section id="descripcion" className="py-6">
          <h2 className="mb-2 font-display text-xl font-bold">Descripción</h2>
          <p className="whitespace-pre-line text-muted">{item.desc?.trim() || "Descripción no disponible."}</p>
        </section>
        <section id="ubicacion" className="border-t border-border py-6">
          <h2 className="mb-2 font-display text-xl font-bold">Ubicación</h2>
          <p className="text-muted">{item.provincia}</p>
        </section>
        {related.length > 0 && (
          <section className="mt-6">
            <h2 className="mb-4 font-display text-xl font-bold">Otros {kind} que te pueden interesar</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((entry) => <DestinationCard key={entry.id} item={entry} kind={kind} />)}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
