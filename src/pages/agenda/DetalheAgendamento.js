import { StyleSheet, View } from "react-native";

import ResumoAgendamento from "../../components/agendamentos/ResumoAgendamento";
import Botao from "../../components/comuns/Botao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import Tela from "../../components/comuns/Tela";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarAgendamento, cancelarAgendamento } from "../../services/agendamentoService";
import { buscarPetShop } from "../../services/petShopService";
import confirmar from "../../utils/confirmar";

async function carregarAgendamentoComLoja(id) {
  const response = await buscarAgendamento(id);
  if (!response.success) return response;
  const loja = await buscarPetShop(response.data.establishmentId);
  return { ...response, data: { ...response.data, petShop: loja.success ? loja.data : null } };
}

export default function DetalheAgendamento({ route, navigation }) {
  const { id } = route.params;
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => carregarAgendamentoComLoja(id), [id], { recarregarAoFocar: true });

  async function aoCancelar() {
    const confirmado = await confirmar("Cancelar agendamento", "Deseja cancelar este agendamento?", "Cancelar agendamento");
    if (!confirmado) return;
    const response = await executar(() => cancelarAgendamento(id));
    if (response.success) requisicao.recarregar();
  }

  function irParaPagamento(agendamento) {
    navigation.navigate("Pagamento", { tipo: "agendamento", id: agendamento.id, valor: agendamento.priceAtBooking });
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(agendamento) => {
        const ativo = agendamento.status === "AGENDADO";
        const pago = Boolean(agendamento.paymentId);

        return (
          <Tela>
            <ResumoAgendamento agendamento={agendamento} petShop={agendamento.petShop} />
            {ativo ? (
              <View style={styles.acoes}>
                {!pago ? (
                  <Botao icon="credit-card-outline" onPress={() => irParaPagamento(agendamento)}>
                    Pagar agendamento
                  </Botao>
                ) : null}
                <Botao variante="perigo" icon="close" onPress={aoCancelar} carregando={executando}>
                  Cancelar agendamento
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
  acoes: { marginTop: 12 },
});
