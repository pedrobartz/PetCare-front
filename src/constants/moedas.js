export const MOEDA_PADRAO = "BRL";

export const MOEDAS = [
  { valor: "BRL", rotulo: "Real", simbolo: "R$" },
  { valor: "USD", rotulo: "Dólar", simbolo: "US$" },
  { valor: "EUR", rotulo: "Euro", simbolo: "€" },
  { valor: "GBP", rotulo: "Libra", simbolo: "£" },
];

export function simboloMoeda(valor) {
  const moeda = MOEDAS.find((item) => item.valor === valor);
  return moeda ? moeda.simbolo : valor;
}
