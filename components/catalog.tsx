"use client";

import { useState } from "react";
import { DestinationCard, type Destination } from "@/components/destination-card";

function normalizeSearch(value: string) {
  return value.trim().toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}

export function Catalog({
  items,
  kind,
}: {
  items: Destination[];
  kind: "destinos" | "planes";
}) {
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [type, setType] = useState("");
  const query = normalizeSearch(search);
  const provinces = [...new Set(items.map((item) => item.provincia))];
  const types = [...new Set(items.map((item) => item.tipo))];
  const filtered = items.filter((item) =>
    (!province || item.provincia === province) &&
    (!type || item.tipo === type) &&
    [item.nombre, item.provincia, item.tipo].some((value) =>
      normalizeSearch(value).includes(query),
    ),
  );

  function clearFilters() {
    setSearch("");
    setProvince("");
    setType("");
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-6 pb-16 sm:px-8">
      <h1 className="mb-7 text-center font-display text-[26px] font-bold text-[#283951]">
        {kind === "destinos" ? "Explora destinos en Panamá" : "Planes turísticos en Panamá"}
      </h1>
      <div className="mb-7 flex flex-col items-center gap-3.5">
        <input
          type="search"
          aria-label="Buscar por nombre, provincia o tipo"
          placeholder="Busca por nombre, provincia o tipo"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="catalog-control w-full max-w-md"
        />
        <div className="flex flex-wrap justify-center gap-2.5">
          <select aria-label="Provincia" className="catalog-control" value={province}
            onChange={(event) => setProvince(event.target.value)}>
            <option value="">Todas las provincias</option>
            {provinces.map((value) => <option key={value}>{value}</option>)}
          </select>
          <select aria-label="Tipo" className="catalog-control" value={type}
            onChange={(event) => setType(event.target.value)}>
            <option value="">Todos los tipos</option>
            {types.map((value) => <option key={value}>{value}</option>)}
          </select>
        </div>
      </div>
      <p role="status" className="mb-4 text-sm text-[#5A6B7D]">
        {filtered.length === 0 ? `No se encontraron ${kind}.` :
          `${filtered.length} ${filtered.length === 1 ? kind.slice(0, -1) : kind}`}
      </p>
      {filtered.length === 0 ? (
        <button type="button" className="catalog-control cursor-pointer" onClick={clearFilters}>
          Limpiar búsqueda y filtros
        </button>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => <DestinationCard key={item.id} item={item} kind={kind} />)}
        </div>
      )}
    </main>
  );
}
