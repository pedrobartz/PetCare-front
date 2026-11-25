import { useState } from "react";
import { StyleSheet } from "react-native";
import { SegmentedButtons, Text } from "react-native-paper";

import Botao from "../../components/comuns/Botao";
import CampoSenha from "../../components/comuns/CampoSenha";
import CampoTexto from "../../components/comuns/CampoTexto";
import MensagemFormulario from "../../components/comuns/MensagemFormulario";
import Tela from "../../components/comuns/Tela";
import { TIPO_CLIENTE, TIPO_PRESTADOR } from "../../constants/tiposUsuario";
import { useAuth } from "../../contexts/AuthContext";
import useFormulario from "../../hooks/useFormulario";
import { TAMANHO_MINIMO_SENHA } from "../../constants/regras";
import cores from "../../theme/cores";
import { emailValido, estaVazio } from "../../utils/validadores";

function validarCadastro({ nome, email, senha, confirmacao }) {
  return {
    nome: estaVazio(nome) ? "Informe o nome." : "",
    email: estaVazio(email) ? "Informe o e-mail." : !emailValido(email) ? "E-mail inválido." : "",
    senha: senha.length < TAMANHO_MINIMO_SENHA ? `A senha deve ter ao menos ${TAMANHO_MINIMO_SENHA} caracteres.` : "",
    confirmacao: confirmacao !== senha ? "As senhas não conferem." : "",
  };
}

export default function Cadastro() {
  const { cadastrar } = useAuth();
  const [tipo, setTipo] = useState(String(TIPO_CLIENTE));
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario(
    { nome: "", email: "", senha: "", confirmacao: "" },
    validarCadastro
  );

  async function aoCadastrar() {
    setErro("");
    if (!validarFormulario()) return;

    setCarregando(true);
    const dados = { name: valores.nome.trim(), email: valores.email.trim(), password: valores.senha };
    const response = await cadastrar(dados, Number(tipo));
    setCarregando(false);

    if (!response.success) setErro(response.message);
  }

  return (
    <Tela>
      <Text variant="headlineSmall" style={styles.titulo}>
        Criar conta
      </Text>
      <Text variant="bodyMedium" style={styles.subtitulo}>
        Escolha como você vai usar o PetCare
      </Text>

      <SegmentedButtons
        value={tipo}
        onValueChange={setTipo}
        style={styles.tipos}
        buttons={[
          { value: String(TIPO_CLIENTE), label: "Sou cliente", icon: "account-heart-outline" },
          { value: String(TIPO_PRESTADOR), label: "Sou pet shop", icon: "storefront-outline" },
        ]}
      />

      <CampoTexto label="Nome completo" icone="account-outline" valor={valores.nome} aoAlterar={alterarCampo("nome")} erro={erros.nome} />
      <CampoTexto
        label="E-mail"
        icone="email-outline"
        valor={valores.email}
        aoAlterar={alterarCampo("email")}
        erro={erros.email}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <CampoSenha label="Senha" valor={valores.senha} aoAlterar={alterarCampo("senha")} erro={erros.senha} />
      <CampoSenha
        label="Confirmar senha"
        valor={valores.confirmacao}
        aoAlterar={alterarCampo("confirmacao")}
        erro={erros.confirmacao}
      />

      <MensagemFormulario texto={erro} />

      <Botao icon="check" onPress={aoCadastrar} carregando={carregando}>
        Criar conta
      </Botao>
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: { color: cores.texto, fontWeight: "bold" },
  subtitulo: { color: cores.textoSecundario, marginBottom: 16, marginTop: 4 },
  tipos: { marginBottom: 18 },
});
