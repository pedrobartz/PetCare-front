import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import CampoTexto from "../../components/comuns/CampoTexto";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import MensagemFormulario from "../../components/comuns/MensagemFormulario";
import Tela from "../../components/comuns/Tela";
import { DIAS_SEMANA } from "../../constants/diasSemana";
import useAcao from "../../hooks/useAcao";
import useRequisicao from "../../hooks/useRequisicao";
import { listarHorariosAtendimento, salvarHorariosAtendimento } from "../../services/prestador/meuPetShopService";
import cores from "../../theme/cores";
import avisar from "../../utils/avisar";
import { formatarHora } from "../../utils/formatadores";
import { horaValida } from "../../utils/validadores";

const INICIO_PADRAO = "09:00";
const FIM_PADRAO = "18:00";

function montarGrade(horariosSalvos) {
  return DIAS_SEMANA.map((dia) => {
    const salvo = horariosSalvos.find((item) => item.dayOfWeek === dia.valor);
    return {
      dia: dia.valor,
      ativo: Boolean(salvo),
      inicio: salvo ? formatarHora(salvo.startTime) : INICIO_PADRAO,
      fim: salvo ? formatarHora(salvo.endTime) : FIM_PADRAO,
    };
  });
}

function validarGrade(grade) {
  const invalido = grade.find(
    (item) => item.ativo && (!horaValida(item.inicio) || !horaValida(item.fim) || item.inicio >= item.fim),
  );
  if (!invalido) return "";
  const nomeDia = DIAS_SEMANA.find((dia) => dia.valor === invalido.dia).rotulo;
  return `${nomeDia}: use HH:MM e um início anterior ao fim.`;
}

export default function HorariosAtendimento({ navigation }) {
  const requisicao = useRequisicao(listarHorariosAtendimento);
  const [grade, setGrade] = useState(montarGrade([]));
  const [erro, setErro] = useState("");
  const { executando, executar } = useAcao();

  useEffect(() => {
    if (requisicao.dados) setGrade(montarGrade(requisicao.dados));
  }, [requisicao.dados]);

  function alterarDia(dia, campo, valor) {
    setErro("");
    setGrade((anterior) => anterior.map((item) => (item.dia === dia ? { ...item, [campo]: valor } : item)));
  }

  async function aoSalvar() {
    const mensagem = validarGrade(grade);
    if (mensagem) {
      setErro(mensagem);
      return;
    }

    const horarios = grade
      .filter((item) => item.ativo)
      .map((item) => ({ dayOfWeek: item.dia, startTime: item.inicio, endTime: item.fim }));

    const response = await executar(() => salvarHorariosAtendimento(horarios), {
      tituloErro: "Não foi possível salvar",
    });
    if (!response.success) return;

    avisar("Horários salvos", "A grade de atendimento foi atualizada.");
    navigation.goBack();
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {() => (
        <Tela
          rodape={
            <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
              Salvar horários
            </Botao>
          }
        >
          <Text variant="bodyMedium" style={styles.aviso}>
            Ative os dias em que o pet shop atende. Os horários livres para agendamento são calculados a partir desta
            grade.
          </Text>
          <MensagemFormulario texto={erro} />
          {grade.map((item) => {
            const dia = DIAS_SEMANA.find((opcao) => opcao.valor === item.dia);
            return (
              <Cartao key={item.dia}>
                <View style={styles.cabecalho}>
                  <Text variant="titleSmall" style={styles.dia}>
                    {dia.rotulo}
                  </Text>
                  <Switch
                    value={item.ativo}
                    onValueChange={(valor) => alterarDia(item.dia, "ativo", valor)}
                    color={cores.primaria}
                  />
                </View>
                {item.ativo ? (
                  <View style={styles.horas}>
                    <View style={styles.campo}>
                      <CampoTexto
                        label="Abre"
                        valor={item.inicio}
                        aoAlterar={(valor) => alterarDia(item.dia, "inicio", valor)}
                        keyboardType="numbers-and-punctuation"
                        maxLength={5}
                        dense
                      />
                    </View>
                    <View style={styles.campo}>
                      <CampoTexto
                        label="Fecha"
                        valor={item.fim}
                        aoAlterar={(valor) => alterarDia(item.dia, "fim", valor)}
                        keyboardType="numbers-and-punctuation"
                        maxLength={5}
                        dense
                      />
                    </View>
                  </View>
                ) : (
                  <Text variant="bodySmall" style={styles.fechado}>
                    Fechado
                  </Text>
                )}
              </Cartao>
            );
          })}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  aviso: { color: cores.textoSecundario, marginBottom: 10 },
  cabecalho: { alignItems: "center", flexDirection: "row", justifyContent: "space-between" },
  dia: { color: cores.texto, fontWeight: "bold" },
  horas: { flexDirection: "row", gap: 10, marginTop: 8 },
  campo: { flex: 1 },
  fechado: { color: cores.textoSecundario },
});
