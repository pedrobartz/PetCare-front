import EstadoVazio from "../../components/comuns/EstadoVazio";
import ListaPaginada from "../../components/comuns/ListaPaginada";
import CardPedido from "../../components/pedidos/CardPedido";
import { useMoeda } from "../../contexts/MoedaContext";
import useListaPaginada from "../../hooks/useListaPaginada";
import { listarMeusPedidos } from "../../services/pedidoService";

export default function MeusPedidos({ navigation }) {
  const { moeda } = useMoeda();
  const lista = useListaPaginada((pagina) => listarMeusPedidos({ pagina, moeda }), [moeda], { recarregarAoFocar: true });

  return (
    <ListaPaginada
      lista={lista}
      renderizarItem={(pedido) => (
        <CardPedido pedido={pedido} moeda={moeda} aoPressionar={() => navigation.navigate("DetalhePedido", { id: pedido.id })} />
      )}
      componenteVazio={
        <EstadoVazio
          icone="shopping-outline"
          titulo="Você ainda não fez pedidos"
          textoAcao="Ir para a loja"
          aoPressionarAcao={() => navigation.navigate("Abas", { screen: "Loja" })}
        />
      }
    />
  );
}
