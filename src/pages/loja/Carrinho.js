import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import ItemCarrinho from "../../components/carrinho/ItemCarrinho";
import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import Tela from "../../components/comuns/Tela";
import { useMoeda } from "../../contexts/MoedaContext";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { alterarQuantidade, buscarCarrinho, esvaziarCarrinho, removerItem } from "../../services/carrinhoService";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";
import { formatarPreco } from "../../utils/formatadores";

export default function Carrinho({ navigation }) {
  const { moeda } = useMoeda();
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => buscarCarrinho(moeda), [moeda], { recarregarAoFocar: true });

  async function atualizarCarrinho(acao) {
    const response = await executar(acao);
    if (response.success) requisicao.setDados(response.data);
  }

  async function aoEsvaziar() {
    const confirmado = await confirmar("Esvaziar carrinho", "Deseja remover todos os itens do carrinho?", "Esvaziar");
    if (!confirmado) return;
    const response = await executar(esvaziarCarrinho);
    if (response.success) requisicao.recarregar();
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(carrinho) => {
        if (carrinho.items.length === 0) {
          return (
            <Tela>
              <EstadoVazio
                icone="cart-outline"
                titulo="Seu carrinho está vazio"
                descricao="Adicione produtos da loja para continuar."
                textoAcao="Ver produtos"
                aoPressionarAcao={() => navigation.navigate("Abas", { screen: "Loja" })}
              />
            </Tela>
          );
        }

        const possuiIndisponivel = carrinho.items.some((item) => !item.available);

        return (
          <Tela
            rodape={
              <Botao
                icon="arrow-right"
                disabled={possuiIndisponivel || executando}
                onPress={() => navigation.navigate("Checkout")}
              >
                Finalizar pedido
              </Botao>
            }
          >
            <View style={styles.cabecalho}>
              <Text variant="titleMedium" style={styles.titulo}>
                Produtos
              </Text>
              <Botao variante="texto" icon="delete-sweep-outline" onPress={aoEsvaziar} disabled={executando}>
                Esvaziar
              </Botao>
            </View>

            {carrinho.items.map((item) => (
              <ItemCarrinho
                key={item.productId}
                item={item}
                moeda={carrinho.targetCurrency}
                desabilitado={executando}
                aoAlterarQuantidade={(itemAtual, quantidade) =>
                  atualizarCarrinho(() => alterarQuantidade(itemAtual.productId, quantidade, moeda))
                }
                aoRemover={(itemAtual) => atualizarCarrinho(() => removerItem(itemAtual.productId, moeda))}
              />
            ))}

            <Cartao>
              <LinhaInfo rotulo="Total" valor={formatarPreco(carrinho.total, carrinho.targetCurrency)} destaque />
            </Cartao>
          </Tela>
        );
      }}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 6 },
  titulo: { color: cores.texto, fontWeight: "bold" },
});
