import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { HelperText, Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import SeletorOpcoes from "../../components/comuns/SeletorOpcoes";
import Tela from "../../components/comuns/Tela";
import { ESPECIES } from "../../constants/especies";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import { atualizarPet, criarPet } from "../../services/petService";
import cores from "../../theme/cores";
import {
  dataApiParaBrasileira,
  dataBrasileiraParaApi,
  numeroParaTexto,
  textoParaNumero,
} from "../../utils/formatadores";
import { dataNoFuturo, dataValida, estaVazio, numeroPositivo } from "../../utils/validadores";

function valoresIniciais(pet) {
  return {
    nome: pet?.name || "",
    especie: pet?.species || "",
    raca: pet?.breed || "",
    nascimento: dataApiParaBrasileira(pet?.birthDate),
    peso: numeroParaTexto(pet?.weight),
    observacoes: pet?.notes || "",
  };
}

function validarNascimento(texto) {
  if (estaVazio(texto)) return "";
  const dataApi = dataBrasileiraParaApi(texto);
  if (!dataApi || !dataValida(dataApi)) return "Use o formato DD/MM/AAAA.";
  if (dataNoFuturo(dataApi)) return "A data não pode estar no futuro.";
  return "";
}

function validarPet(valores) {
  const peso = textoParaNumero(valores.peso);
  return {
    nome: estaVazio(valores.nome) ? "Informe o nome do pet." : "",
    especie: estaVazio(valores.especie) ? "Escolha a espécie." : "",
    nascimento: validarNascimento(valores.nascimento),
    peso: peso !== null && !numeroPositivo(peso) ? "Informe um peso válido." : "",
  };
}

function montarPet(valores) {
  return {
    name: valores.nome.trim(),
    species: valores.especie,
    breed: valores.raca.trim() || null,
    birthDate: estaVazio(valores.nascimento) ? null : dataBrasileiraParaApi(valores.nascimento),
    weight: textoParaNumero(valores.peso),
    notes: valores.observacoes.trim() || null,
  };
}

export default function FormularioPet({ route, navigation }) {
  const pet = route.params?.pet;
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario(valoresIniciais(pet), validarPet);
  const { executando, executar } = useAcao();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: pet ? "Editar pet" : "Novo pet" });
  }, [navigation, pet]);

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const dados = montarPet(valores);
    const response = await executar(() => (pet ? atualizarPet(pet.id, dados) : criarPet(dados)), {
      tituloErro: "Não foi possível salvar",
    });
    if (response.success) navigation.goBack();
  }

  return (
    <Tela
      rodape={
        <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
          Salvar
        </Botao>
      }
    >
      <CampoTexto label="Nome *" icone="paw" valor={valores.nome} aoAlterar={alterarCampo("nome")} erro={erros.nome} />

      <Text variant="labelLarge" style={styles.rotulo}>
        Espécie *
      </Text>
      <SeletorOpcoes
        rolavel={false}
        opcoes={ESPECIES}
        selecionado={valores.especie}
        aoSelecionar={alterarCampo("especie")}
      />
      {erros.especie ? <HelperText type="error">{erros.especie}</HelperText> : null}

      <CampoTexto label="Raça" icone="dna" valor={valores.raca} aoAlterar={alterarCampo("raca")} style={styles.espaco} />
      <CampoTexto
        label="Data de nascimento (DD/MM/AAAA)"
        icone="cake-variant-outline"
        valor={valores.nascimento}
        aoAlterar={alterarCampo("nascimento")}
        erro={erros.nascimento}
        keyboardType="numbers-and-punctuation"
        maxLength={10}
      />
      <CampoTexto
        label="Peso (kg)"
        icone="weight-kilogram"
        valor={valores.peso}
        aoAlterar={alterarCampo("peso")}
        erro={erros.peso}
        keyboardType="decimal-pad"
      />
      <CampoTexto
        label="Observações"
        icone="note-text-outline"
        valor={valores.observacoes}
        aoAlterar={alterarCampo("observacoes")}
        multiline
      />
    </Tela>
  );
}

const styles = StyleSheet.create({
  rotulo: { color: cores.texto, marginBottom: 6 },
  espaco: { marginTop: 10 },
});
