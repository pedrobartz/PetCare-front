import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

import Botao from "../../components/comuns/Botao";
import CampoSenha from "../../components/comuns/CampoSenha";
import CampoTexto from "../../components/comuns/CampoTexto";
import MensagemFormulario from "../../components/comuns/MensagemFormulario";
import { useAuth } from "../../contexts/AuthContext";
import useFormulario from "../../hooks/useFormulario";
import cores from "../../theme/cores";
import { emailValido, estaVazio } from "../../utils/validadores";

const LOGO = require("../../../assets/splash-icon.png");

function validarLogin({ email, senha }) {
  return {
    email: estaVazio(email) ? "Informe o e-mail." : !emailValido(email) ? "E-mail inválido." : "",
    senha: estaVazio(senha) ? "Informe a senha." : "",
  };
}

export default function Login({ navigation }) {
  const { entrar } = useAuth();
  const { valores, erros, alterarCampo, validarFormulario } = useFormulario({ email: "", senha: "" }, validarLogin);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function aoEntrar() {
    setErro("");
    if (!validarFormulario()) return;

    setCarregando(true);
    const response = await entrar(valores.email.trim(), valores.senha);
    setCarregando(false);

    if (!response.success) {
      setErro(response.message);
    }
  }

  return (
    <SafeAreaView style={styles.fundo}>
      <KeyboardAvoidingView style={styles.fundo} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.marca}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
            <Text variant="bodyMedium" style={styles.subtitulo}>
              Banho, tosa e produtos para o seu pet
            </Text>
          </View>

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

          <MensagemFormulario texto={erro} />

          <Botao icon="login" onPress={aoEntrar} carregando={carregando} estilo={styles.botao}>
            Entrar
          </Botao>

          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Cadastro")}>
            <Text variant="bodyMedium" style={styles.textoLink}>
              Não tem conta? <Text style={styles.destaque}>Criar cadastro</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fundo: { backgroundColor: cores.superficie, flex: 1 },
  container: { flexGrow: 1, justifyContent: "center", padding: 28 },
  marca: { alignItems: "center", marginBottom: 32 },
  logo: { height: 150, width: 150 },
  subtitulo: { color: cores.textoSecundario, marginTop: 4 },
  botao: { marginTop: 8 },
  link: { alignItems: "center", marginTop: 20 },
  textoLink: { color: cores.textoSecundario },
  destaque: { color: cores.primaria, fontWeight: "bold" },
});
