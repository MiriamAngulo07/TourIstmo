import { resolve } from "node:path";
import { connection } from "next/server";
import type { Destination } from "@/components/destination-card";
import { DESTINATIONS, PLANS } from "@/lib/data";

type CatalogKind = "destinos" | "planes";

type CatalogDatabase = {
  prepare(sql: string): {
    all(kind: CatalogKind): (Omit<Destination, "desc"> & { desc: string | null })[];
  };
  close(): void;
};

type SQLiteModule = {
  DatabaseSync: new (path: string, options: { readOnly: boolean }) => CatalogDatabase;
};

export async function loadCatalog(kind: CatalogKind): Promise<Destination[]> {
  if (process.env.TOURISTMO_CATALOG_SOURCE !== "sqlite") {
    return kind === "destinos" ? DESTINATIONS : PLANS;
  }

  await connection();
  const sqlite = process.getBuiltinModule?.("node:sqlite") as SQLiteModule | undefined;
  if (!sqlite) {
    throw new Error("El catálogo SQLite requiere Node.js 24 o superior.");
  }

  const database = new sqlite.DatabaseSync(resolve("data", "touristmo.sqlite"), {
    readOnly: true,
  });

  try {
    return database.prepare(`
      SELECT id, nombre, provincia, tipo, precio, valoracion AS rating,
             imagen, descripcion AS "desc"
      FROM catalogo
      WHERE categoria = ?
      ORDER BY id
    `).all(kind).map((row) => ({ ...row, desc: row.desc ?? undefined }));
  } finally {
    database.close();
  }
}
