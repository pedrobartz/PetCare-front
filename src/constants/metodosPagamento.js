export const METODOS_PAGAMENTO = [
  { valor: "PIX", rotulo: "PIX", descricao: "Aprovação imediata", icone: "qrcode" },
  { valor: "CREDIT_CARD", rotulo: "Cartão de crédito", descricao: "Pagamento simulado", icone: "credit-card-outline" },
  { valor: "DEBIT_CARD", rotulo: "Cartão de débito", descricao: "Pagamento simulado", icone: "credit-card-chip-outline" },
  { valor: "BOLETO", rotulo: "Boleto", descricao: "Pagamento simulado", icone: "barcode" },
];

export function rotuloMetodoPagamento(valor) {
  const metodo = METODOS_PAGAMENTO.find((item) => item.valor === valor);
  return metodo ? metodo.rotulo : valor;
}

export const TIPOS_REFERENCIA_PAGAMENTO = {
  ORDER: { rotulo: "Pedido", icone: "shopping-outline" },
  APPOINTMENT: { rotulo: "Agendamento", icone: "calendar-check-outline" },
};
