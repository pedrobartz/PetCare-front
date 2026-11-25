import { StyleSheet, View } from "react-native";

import ResumoAgendamento from "../../components/agendamentos/ResumoAgendamento";
import Botao from "../../components/comuns/Botao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import Tela from "../../components/comuns/Tela";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { buscarAgendamento, cancelarAgendamento } from "../../services/agendamentoService";
import { concluirAgendamento } from "../../services/prestador/agendamentosRecebidosService";
import confirmar from "../../utils/confirmar";

export default function DetalheAgendamentoRecebido({ route }) {
  const { id } = route.params;
  const { executando, executar } = useAcao();
  const requisicao = useRequisicao(() => buscarAgendamento(id), [id]);

  async function executarComConfirmacao(titulo, mensagem, acao) {
    const confirmado = await confirmar(titulo, mensagem, "Confirmar");
    if (!confirmado) return;
    const response = await executar(acao);
    if (response.success) requisicao.setDados(response.data);
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(agendamento) => (
        <Tela>
          <ResumoAgendamento agendamento={agendamento} mostrarCliente />
          {agendamento.status === "AGENDADO" ? (
            <View style={styles.acoes}>
              <Botao
                icon="check-circle-outline"
                carregando={executando}
                onPress={() =>
                  executarComConfirmacao("Concluir atendimento", "Marcar este atendimento como concluído?", () =>
                    concluirAgendamento(id)
                  )
                }
              >
                Concluir atendimento
              </Botao>
              <Botao
                variante="perigo"
                icon="close"
                disabled={executando}
                onPress={() =>
                  executarComConfirmacao("Cancelar agendamento", "Deseja cancelar este agendamento?", () =>
                    cancelarAgendamento(id)
                  )
                }
              >
                Cancelar agendamento
              </Botao>
            </View>
          ) : null}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  acoes: { marginTop: 12 },
});
