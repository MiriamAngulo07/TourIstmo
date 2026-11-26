import { CatalogDetail } from "@/components/catalog-detail";

export default async function DestinoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CatalogDetail id={id} kind="destinos" />;
}
