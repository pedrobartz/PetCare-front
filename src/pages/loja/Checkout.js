import { useEffect, useState } from "react";
import { Text } from "react-native-paper";
import { StyleSheet } from "react-native";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import CardEndereco from "../../components/enderecos/CardEndereco";
import { useMoeda } from "../../contexts/MoedaContext";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarCarrinho } from "../../services/carrinhoService";
import { listarEnderecos } from "../../services/enderecoService";
import { finalizarPedido } from "../../services/pedidoService";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

async function carregarDadosCheckout(moeda) {
  const [enderecos, carrinho] = await Promise.all([listarEnderecos(), buscarCarrinho(moeda)]);
  if (!enderecos.success) return enderecos;
  if (!carrinho.success) return carrinho;
  return { success: true, data: { enderecos: enderecos.data, carrinho: carrinho.data } };
}

export default function Checkout({ navigation }) {
  const { moeda } = useMoeda();
  const [enderecoId, setEnderecoId] = useState(null);
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => carregarDadosCheckout(moeda), [moeda], { recarregarAoFocar: true });

  useEffect(() => {
    const enderecos = requisicao.dados?.enderecos;
    if (enderecos && enderecos.length > 0 && !enderecoId) setEnderecoId(enderecos[0].id);
  }, [requisicao.dados]);

  async function aoFinalizar() {
    const response = await executar(() => finalizarPedido(enderecoId), { tituloErro: "Não foi possível finalizar" });
    if (!response.success) return;

    const pedido = response.data;
    navigation.replace("Pagamento", {
      tipo: "pedido",
      id: pedido.id,
      valor: pedido.totalAmount,
    });
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {({ enderecos, carrinho }) => (
        <Tela
          rodape={
            <Botao icon="check" onPress={aoFinalizar} carregando={executando} disabled={!enderecoId}>
              Confirmar pedido
            </Botao>
          }
        >
          <TituloSecao
            titulo="Endereço de entrega"
            acao={
              <Botao variante="texto" icon="plus" onPress={() => navigation.navigate("FormularioEndereco")}>
                Novo
              </Botao>
            }
          />
          {enderecos.length === 0 ? (
            <EstadoVazio
              icone="map-marker-plus-outline"
              titulo="Nenhum endereço cadastrado"
              descricao="Cadastre um endereço para receber o pedido."
            />
          ) : (
            enderecos.map((endereco) => (
              <CardEndereco
                key={endereco.id}
                endereco={endereco}
                selecionado={endereco.id === enderecoId}
                aoPressionar={() => setEnderecoId(endereco.id)}
              />
            ))
          )}

          <TituloSecao titulo="Resumo" />
          <Cartao>
            {carrinho.items.map((item) => (
              <LinhaInfo
                key={item.productId}
                rotulo={`${item.quantity}x ${item.name}`}
                valor={formatarPreco(item.subtotal, carrinho.targetCurrency)}
              />
            ))}
            <LinhaInfo rotulo="Total" valor={formatarPreco(carrinho.total, carrinho.targetCurrency)} destaque />
          </Cartao>
          <Text variant="bodySmall" style={styles.aviso}>
            O pedido será criado aguardando pagamento. Você escolhe a forma de pagamento na próxima etapa.
          </Text>
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  aviso: { color: cores.textoSecundario, marginTop: 6 },
});
