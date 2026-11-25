import EstadoVazio from "../../../components/comuns/EstadoVazio";
import ListaPaginada from "../../../components/comuns/ListaPaginada";
import CardProdutoPrestador from "../../../components/prestador/CardProdutoPrestador";
import useListaPaginada from "../../../hooks/useListaPaginada";
import { listarMeusProdutos } from "../../../services/prestador/meusProdutosService";

export default function AbaProdutos({ navigation }) {
  const lista = useListaPaginada((pagina) => listarMeusProdutos({ pagina }), [], { recarregarAoFocar: true });

  return (
    <ListaPaginada
      lista={lista}
      renderizarItem={(produto) => (
        <CardProdutoPrestador produto={produto} aoPressionar={() => navigation.navigate("FormularioProduto", { produto })} />
      )}
      componenteVazio={
        <EstadoVazio
          icone="package-variant"
          titulo="Nenhum produto cadastrado"
          textoAcao="Cadastrar produto"
          aoPressionarAcao={() => navigation.navigate("FormularioProduto")}
        />
      }
    />
  );
}
