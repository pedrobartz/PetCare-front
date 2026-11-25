import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import Tela from "../../components/comuns/Tela";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import { atualizarServico, criarServico, desativarServico } from "../../services/prestador/meusServicosService";
import confirmar from "../../utils/confirmar";
import { numeroParaTexto, textoParaNumero } from "../../utils/formatadores";
import { estaVazio, numeroPositivo } from "../../utils/validadores";

function valoresIniciais(servico) {
  return {
    nome: servico?.name || "",
    duracao: servico ? String(servico.durationMinutes) : "",
    preco: numeroParaTexto(servico?.price),
  };
}

function validarServico(valores) {
  const duracao = textoParaNumero(valores.duracao);
  return {
    nome: estaVazio(valores.nome) ? "Informe o nome do serviço." : "",
    duracao: Number.isInteger(duracao) && duracao > 0 ? "" : "Informe a duração em minutos.",
    preco: numeroPositivo(textoParaNumero(valores.preco)) ? "" : "Informe um preço válido.",
  };
}

export default function FormularioServico({ route, navigation }) {
  const servico = route.params?.servico;
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario(valoresIniciais(servico), validarServico);
  const { executando, executar } = useAcao();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: servico ? "Editar serviço" : "Novo serviço" });
  }, [navigation, servico]);

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const dados = {
      name: valores.nome.trim(),
      durationMinutes: textoParaNumero(valores.duracao),
      price: textoParaNumero(valores.preco),
    };
    const response = await executar(() => (servico ? atualizarServico(servico.id, dados) : criarServico(dados)), {
      tituloErro: "Não foi possível salvar",
    });
    if (response.success) navigation.goBack();
  }

  async function aoDesativar() {
    const confirmado = await confirmar(
      "Remover serviço",
      "O serviço deixará de aparecer para agendamento. Agendamentos já feitos não são afetados.",
      "Remover"
    );
    if (!confirmado) return;
    const response = await executar(() => desativarServico(servico.id));
    if (response.success) navigation.goBack();
  }

  return (
    <Tela>
      <CampoTexto label="Nome do serviço *" icone="content-cut" valor={valores.nome} aoAlterar={alterarCampo("nome")} erro={erros.nome} />
      <View style={styles.linha}>
        <View style={styles.coluna}>
          <CampoTexto
            label="Duração (min) *"
            icone="timer-outline"
            valor={valores.duracao}
            aoAlterar={alterarCampo("duracao")}
            erro={erros.duracao}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.coluna}>
          <CampoTexto
            label="Preço (R$) *"
            valor={valores.preco}
            aoAlterar={alterarCampo("preco")}
            erro={erros.preco}
            keyboardType="decimal-pad"
          />
        </View>
      </View>
      <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
        Salvar serviço
      </Botao>
      {servico ? (
        <Botao variante="perigo" icon="trash-can-outline" onPress={aoDesativar} disabled={executando}>
          Remover serviço
        </Botao>
      ) : null}
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", gap: 10 },
  coluna: { flex: 1 },
});
