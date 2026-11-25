import cores from "../theme/cores";

export const STATUS_PEDIDO = {
  PENDING_PAYMENT: { rotulo: "Aguardando pagamento", cor: cores.alerta },
  PAID: { rotulo: "Pago", cor: cores.primaria },
  SHIPPED: { rotulo: "Enviado", cor: cores.primaria },
  DELIVERED: { rotulo: "Entregue", cor: cores.sucesso },
  CANCELED: { rotulo: "Cancelado", cor: cores.perigo },
};

export const PROXIMO_STATUS_PEDIDO = {
  PAID: { status: "SHIPPED", acao: "Marcar como enviado", icone: "truck-delivery" },
  SHIPPED: { status: "DELIVERED", acao: "Marcar como entregue", icone: "package-variant-closed-check" },
};

export const FILTROS_PEDIDO_RECEBIDO = [
  { valor: "", rotulo: "Todos" },
  { valor: "PAID", rotulo: "Pagos" },
  { valor: "SHIPPED", rotulo: "Enviados" },
  { valor: "DELIVERED", rotulo: "Entregues" },
  { valor: "PENDING_PAYMENT", rotulo: "Aguardando" },
  { valor: "CANCELED", rotulo: "Cancelados" },
];
