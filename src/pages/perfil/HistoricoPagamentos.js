import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import CardPagamento from "../../components/pagamentos/CardPagamento";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarPagamentos } from "../../services/pagamentoService";

export default function HistoricoPagamentos() {
  const lista = useListaPaginada((pagina) => listarPagamentos({ pagina }));

  return (
    <ListaPaginada
      lista={lista}
      renderizarItem={(pagamento) => <CardPagamento pagamento={pagamento} />}
      componenteVazio={<EstadoVazio icone="receipt-text-outline" titulo="Nenhum pagamento realizado" />}
    />
  );
}
