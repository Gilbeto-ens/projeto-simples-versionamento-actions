// Codigos WMO usados pela Open-Meteo.
const CONDICOES: Record<number, string> = {
  0: "Ceu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Nevoeiro com geada",
  51: "Garoa fraca",
  53: "Garoa moderada",
  55: "Garoa intensa",
  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva forte",
  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve forte",
  80: "Pancadas de chuva fracas",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",
  95: "Trovoada",
  96: "Trovoada com granizo",
  99: "Trovoada com granizo forte",
};

export function descreverTempo(codigo: number): string {
  return CONDICOES[codigo] ?? "Condicao desconhecida";
}
