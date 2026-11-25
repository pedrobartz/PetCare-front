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
import { STATUS_PEDIDO } from "../../constants/statusPedido";
import { useMoeda } from "../../contexts/MoedaContext";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarPetShop } from "../../services/petShopService";
import { buscarPedido, cancelarPedido } from "../../services/pedidoService";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";
import { formatarDataHora } from "../../utils/formatadores";

async function carregarPedidoComLoja(id, moeda) {
  const response = await buscarPedido(id, moeda);
  if (!response.success) return response;
  const loja = await buscarPetShop(response.data.establishmentId);
  return { ...response, data: { ...response.data, nomeLoja: loja.success ? loja.data.name : null } };
}

export default function DetalhePedido({ route, navigation }) {
  const { id } = route.params;
  const { moeda } = useMoeda();
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => carregarPedidoComLoja(id, moeda), [id, moeda], { recarregarAoFocar: true });

  async function aoCancelar() {
    const confirmado = await confirmar("Cancelar pedido", "Tem certeza que deseja cancelar este pedido?", "Cancelar pedido");
    if (!confirmado) return;
    const response = await executar(() => cancelarPedido(id));
    if (response.success) requisicao.recarregar();
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(pedido) => {
        const status = STATUS_PEDIDO[pedido.status];
        const aguardandoPagamento = pedido.status === "PENDING_PAYMENT";

        return (
          <Tela>
            <Cartao>
              <View style={styles.cabecalho}>
                <Text variant="titleLarge" style={styles.titulo}>
                  Pedido #{pedido.id}
                </Text>
                <Selo texto={status.rotulo} cor={status.cor} />
              </View>
              {pedido.nomeLoja ? <LinhaInfo rotulo="Loja" valor={pedido.nomeLoja} /> : null}
              <LinhaInfo rotulo="Data" valor={formatarDataHora(pedido.orderDate)} />
              {pedido.paidAt ? <LinhaInfo rotulo="Pago em" valor={formatarDataHora(pedido.paidAt)} /> : null}
            </Cartao>

            <TituloSecao titulo="Itens" />
            <ItensPedido pedido={pedido} moeda={moeda} />

            <TituloSecao titulo="Entrega" />
            <EnderecoEntrega pedido={pedido} />

            {aguardandoPagamento ? (
              <View style={styles.acoes}>
                <Botao
                  icon="credit-card-outline"
                  onPress={() =>
                    navigation.navigate("Pagamento", { tipo: "pedido", id: pedido.id, valor: pedido.totalAmount })
                  }
                >
                  Pagar pedido
                </Botao>
                <Botao variante="perigo" icon="close" onPress={aoCancelar} carregando={executando}>
                  Cancelar pedido
                </Botao>
              </View>
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
  acoes: { marginTop: 12 },
});
