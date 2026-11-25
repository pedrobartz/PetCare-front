import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

import Botao from "../../components/comuns/Botao";
import CampoTexto from "../../components/comuns/CampoTexto";
import Tela from "../../components/comuns/Tela";
import useAcao from "../../hooks/useAcao";
import useFormulario from "../../hooks/useFormulario";
import { atualizarEndereco, criarEndereco } from "../../services/enderecoService";
import { cepValido, estaVazio } from "../../utils/validadores";

const CAMPOS_OBRIGATORIOS = {
  label: "Informe um apelido.",
  street: "Informe a rua.",
  number: "Informe o número.",
  district: "Informe o bairro.",
  city: "Informe a cidade.",
};

function valoresIniciais(endereco) {
  return {
    label: endereco?.label || "",
    zipCode: endereco?.zipCode || "",
    street: endereco?.street || "",
    number: endereco?.number || "",
    complement: endereco?.complement || "",
    district: endereco?.district || "",
    city: endereco?.city || "",
    state: endereco?.state || "",
  };
}

function validarEndereco(valores) {
  const erros = {};
  Object.entries(CAMPOS_OBRIGATORIOS).forEach(([campo, mensagem]) => {
    erros[campo] = estaVazio(valores[campo]) ? mensagem : "";
  });
  erros.zipCode = cepValido(valores.zipCode) ? "" : "CEP inválido.";
  erros.state = valores.state.trim().length === 2 ? "" : "Use a sigla (ex.: RS).";
  return erros;
}

function montarEndereco(valores) {
  return Object.fromEntries(
    Object.entries(valores).map(([campo, valor]) => [campo, campo === "state" ? valor.trim().toUpperCase() : valor.trim()])
  );
}

export default function FormularioEndereco({ route, navigation }) {
  const endereco = route.params?.endereco;
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario(valoresIniciais(endereco), validarEndereco);
  const { executando, executar } = useAcao();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: endereco ? "Editar endereço" : "Novo endereço" });
  }, [navigation, endereco]);

  async function aoSalvar() {
    if (!validarFormulario()) return;
    const dados = montarEndereco(valores);
    const response = await executar(() => (endereco ? atualizarEndereco(endereco.id, dados) : criarEndereco(dados)), {
      tituloErro: "Não foi possível salvar",
    });
    if (response.success) navigation.goBack();
  }

  return (
    <Tela
      rodape={
        <Botao icon="content-save-outline" onPress={aoSalvar} carregando={executando}>
          Salvar endereço
        </Botao>
      }
    >
      <CampoTexto label="Apelido (ex.: Casa)" icone="tag-outline" valor={valores.label} aoAlterar={alterarCampo("label")} erro={erros.label} />
      <CampoTexto
        label="CEP"
        icone="map-search-outline"
        valor={valores.zipCode}
        aoAlterar={alterarCampo("zipCode")}
        erro={erros.zipCode}
        keyboardType="numbers-and-punctuation"
        maxLength={9}
      />
      <CampoTexto label="Rua" valor={valores.street} aoAlterar={alterarCampo("street")} erro={erros.street} />
      <View style={styles.linha}>
        <View style={styles.pequeno}>
          <CampoTexto label="Número" valor={valores.number} aoAlterar={alterarCampo("number")} erro={erros.number} />
        </View>
        <View style={styles.grande}>
          <CampoTexto label="Complemento" valor={valores.complement} aoAlterar={alterarCampo("complement")} />
        </View>
      </View>
      <CampoTexto label="Bairro" valor={valores.district} aoAlterar={alterarCampo("district")} erro={erros.district} />
      <View style={styles.linha}>
        <View style={styles.grande}>
          <CampoTexto label="Cidade" valor={valores.city} aoAlterar={alterarCampo("city")} erro={erros.city} />
        </View>
        <View style={styles.pequeno}>
          <CampoTexto
            label="UF"
            valor={valores.state}
            aoAlterar={alterarCampo("state")}
            erro={erros.state}
            autoCapitalize="characters"
            maxLength={2}
          />
        </View>
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", gap: 10 },
  pequeno: { flex: 1 },
  grande: { flex: 2 },
});
