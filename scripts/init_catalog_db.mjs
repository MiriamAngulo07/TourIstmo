import { mkdirSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import { DESTINATIONS, PLANS } from "../lib/data.ts";

const dataDirectory = new URL("../data/", import.meta.url);
const databasePath = new URL("touristmo.sqlite", dataDirectory);
mkdirSync(dataDirectory, { recursive: true });

const database = new DatabaseSync(databasePath);

try {
  database.exec("BEGIN");
  database.exec(`
    CREATE TABLE IF NOT EXISTS catalogo (
      categoria TEXT NOT NULL CHECK (categoria IN ('destinos', 'planes')),
      id INTEGER NOT NULL,
      nombre TEXT NOT NULL,
      provincia TEXT NOT NULL,
      tipo TEXT NOT NULL,
      precio REAL,
      valoracion REAL NOT NULL,
      imagen TEXT NOT NULL,
      descripcion TEXT,
      PRIMARY KEY (categoria, id)
    ) STRICT
  `);

  const insert = database.prepare(`
    INSERT INTO catalogo (
      categoria, id, nombre, provincia, tipo, precio, valoracion, imagen, descripcion
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT (categoria, id) DO NOTHING
  `);

  for (const [category, items] of [["destinos", DESTINATIONS], ["planes", PLANS]]) {
    for (const item of items) {
      insert.run(category, item.id, item.nombre, item.provincia, item.tipo,
        item.precio, item.rating, item.imagen, item.desc ?? null);
    }
  }
  database.exec("COMMIT");

  const counts = database.prepare(
    "SELECT categoria, COUNT(*) AS total FROM catalogo GROUP BY categoria",
  ).all();
  console.log("Base local disponible en data/touristmo.sqlite");
  console.table(counts);
} finally {
  database.close();
}
