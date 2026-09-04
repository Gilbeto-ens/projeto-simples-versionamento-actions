import { NextResponse } from "next/server";
import { descreverTempo } from "@/lib/tempo";

export async function GET(request: Request) {
  const cidade = new URL(request.url).searchParams.get("cidade")?.trim();

  if (!cidade) {
    return NextResponse.json({ erro: "informe uma cidade" }, { status: 400 });
  }

  const geoUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
  geoUrl.searchParams.set("name", cidade);
  geoUrl.searchParams.set("count", "1");
  geoUrl.searchParams.set("language", "pt");
  geoUrl.searchParams.set("format", "json");

  const geoRes = await fetch(geoUrl, { cache: "no-store" });
  if (!geoRes.ok) {
    return NextResponse.json(
      { erro: "falha ao buscar a cidade" },
      { status: 502 },
    );
  }

  const geo = await geoRes.json();
  const local = geo.results?.[0];
  if (!local) {
    return NextResponse.json(
      { erro: "cidade nao encontrada" },
      { status: 404 },
    );
  }

  const climaUrl = new URL("https://api.open-meteo.com/v1/forecast");
  climaUrl.searchParams.set("latitude", String(local.latitude));
  climaUrl.searchParams.set("longitude", String(local.longitude));
  climaUrl.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
  );
  climaUrl.searchParams.set("timezone", "auto");

  const climaRes = await fetch(climaUrl, { cache: "no-store" });
  if (!climaRes.ok) {
    return NextResponse.json(
      { erro: "falha ao buscar o clima" },
      { status: 502 },
    );
  }

  const clima = await climaRes.json();
  const atual = clima.current;

  return NextResponse.json({
    cidade: local.name,
    pais: local.country,
    temperatura: atual.temperature_2m,
    umidade: atual.relative_humidity_2m,
    vento: atual.wind_speed_10m,
    condicao: descreverTempo(atual.weather_code),
  });
}
