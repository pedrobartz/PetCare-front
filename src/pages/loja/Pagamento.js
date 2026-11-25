import { useState } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import IndicadorEtapas from "../../components/comuns/IndicadorEtapas";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import OpcaoPagamento from "../../components/pagamentos/OpcaoPagamento";
import { METODOS_PAGAMENTO } from "../../constants/metodosPagamento";
import { ETAPAS_AGENDAMENTO, ETAPAS_PEDIDO } from "../../constants/regras";
import useAcao from "../../hooks/useAcao";
import { pagarAgendamento } from "../../services/agendamentoService";
import { pagarPedido } from "../../services/pedidoService";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

const ESTRATEGIAS_PAGAMENTO = {
  pedido: { pagar: pagarPedido, titulo: "Pedido", etapas: ETAPAS_PEDIDO },
  agendamento: { pagar: pagarAgendamento, titulo: "Agendamento", etapas: ETAPAS_AGENDAMENTO },
};

export default function Pagamento({ route, navigation }) {
  const { tipo, id, valor } = route.params;
  const estrategia = ESTRATEGIAS_PAGAMENTO[tipo];
  const [metodo, setMetodo] = useState(METODOS_PAGAMENTO[0].valor);
  const { executando, executar } = useAcao();

  async function aoPagar() {
    const response = await executar(() => estrategia.pagar(id, metodo), { tituloErro: "Pagamento não realizado" });
    if (response.success) navigation.replace("Confirmacao", { tipo, id });
  }

  return (
    <Tela
      rodape={
        <Botao icon="lock-check-outline" onPress={aoPagar} carregando={executando}>
          Pagar {formatarPreco(valor)}
        </Botao>
      }
    >
      <IndicadorEtapas etapas={estrategia.etapas} etapaAtual={estrategia.etapas.length - 1} />
      <Cartao>
        <LinhaInfo rotulo={estrategia.titulo} valor={`#${id}`} />
        <LinhaInfo rotulo="Valor" valor={formatarPreco(valor)} destaque />
      </Cartao>

      <TituloSecao titulo="Como você quer pagar?" />
      {METODOS_PAGAMENTO.map((item) => (
        <OpcaoPagamento key={item.valor} metodo={item} selecionado={item.valor === metodo} aoSelecionar={setMetodo} />
      ))}

      <Text variant="bodySmall" style={styles.aviso}>
        Pagamento simulado, cobrado em reais (BRL). Nenhum dado de cartão é solicitado ou armazenado.
      </Text>
    </Tela>
  );
}

const styles = StyleSheet.create({
  aviso: { color: cores.textoSecundario, marginTop: 6, textAlign: "center" },
});
