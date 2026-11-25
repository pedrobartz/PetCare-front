import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import Selo from "../../components/comuns/Selo";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import EnderecoEntrega from "../../components/pedidos/EnderecoEntrega";
import ItensPedido from "../../components/pedidos/ItensPedido";
import { MOEDA_PADRAO } from "../../constants/moedas";
import { PROXIMO_STATUS_PEDIDO, STATUS_PEDIDO } from "../../constants/statusPedido";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { atualizarStatusPedido, buscarPedidoRecebido } from "../../services/prestador/pedidosRecebidosService";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";
import { formatarDataHora } from "../../utils/formatadores";

export default function DetalhePedidoRecebido({ route }) {
  const { id } = route.params;
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => buscarPedidoRecebido(id), [id]);

  async function aoAvancar(proximo) {
    const confirmado = await confirmar("Atualizar pedido", `${proximo.acao}?`, "Confirmar");
    if (!confirmado) return;
    const response = await executar(() => atualizarStatusPedido(id, proximo.status));
    if (response.success) requisicao.recarregar();
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(pedido) => {
        const status = STATUS_PEDIDO[pedido.status];
        const proximo = PROXIMO_STATUS_PEDIDO[pedido.status];

        return (
          <Tela
            rodape={
              proximo ? (
                <Botao icon={proximo.icone} onPress={() => aoAvancar(proximo)} carregando={executando}>
                  {proximo.acao}
                </Botao>
              ) : null
            }
          >
            <Cartao>
              <View style={styles.cabecalho}>
                <Text variant="titleLarge" style={styles.titulo}>
                  Pedido #{pedido.id}
                </Text>
                <Selo texto={status.rotulo} cor={status.cor} />
              </View>
              <LinhaInfo rotulo="Cliente" valor={pedido.customerEmail} />
              <LinhaInfo rotulo="Data" valor={formatarDataHora(pedido.orderDate)} />
              {pedido.paidAt ? <LinhaInfo rotulo="Pago em" valor={formatarDataHora(pedido.paidAt)} /> : null}
            </Cartao>

            <TituloSecao titulo="Itens" />
            <ItensPedido pedido={pedido} moeda={MOEDA_PADRAO} />

            <TituloSecao titulo="Enviar para" />
            <EnderecoEntrega pedido={pedido} />

            {pedido.status === "PENDING_PAYMENT" ? (
              <Text variant="bodySmall" style={styles.aviso}>
                Aguardando o pagamento do cliente para liberar o envio.
              </Text>
            ) : null}
          </Tela>
        );
      }}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  aviso: { color: cores.textoSecundario, textAlign: "center" },
});
