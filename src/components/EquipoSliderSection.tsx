"use client";
import { useEffect, useState } from "react";
import { EquipoSlider } from "@/components/EquipoSlider";
import type { EquipoProfile } from "@/components/EquipoCard";

export default function EquipoSliderSection() {
  const [profiles, setProfiles] = useState<EquipoProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/profiles.json")
      .then((res) => {
        if (!res.ok) throw new Error("No se pudo cargar el equipo");
        return res.json();
      })
      .then((data) => setProfiles(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando equipo...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return <EquipoSlider profiles={profiles} />;
}
