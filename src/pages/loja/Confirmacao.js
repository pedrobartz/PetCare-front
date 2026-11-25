import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Botao from "../../components/comuns/Botao";
import Tela from "../../components/comuns/Tela";
import cores from "../../theme/cores";

const CONFIGURACOES = {
  pedido: {
    titulo: "Pedido confirmado!",
    descricao: "Pagamento aprovado. A loja já foi avisada e vai preparar o envio.",
    destino: "DetalhePedido",
    textoDetalhe: "Ver pedido",
  },
  agendamento: {
    titulo: "Reserva confirmada!",
    descricao: "Pagamento aprovado. Seu pet está com horário garantido.",
    destino: "DetalheAgendamento",
    textoDetalhe: "Ver agendamento",
  },
};

export default function Confirmacao({ route, navigation }) {
  const { tipo, id } = route.params;
  const configuracao = CONFIGURACOES[tipo];

  function verDetalhe() {
    navigation.popToTop();
    navigation.navigate(configuracao.destino, { id });
  }

  return (
    <Tela estilo={styles.container}>
      <View style={styles.circulo}>
        <MaterialCommunityIcons name="check-bold" size={52} color={cores.superficie} />
      </View>
      <Text variant="headlineSmall" style={styles.titulo}>
        {configuracao.titulo}
      </Text>
      <Text variant="bodyMedium" style={styles.descricao}>
        {configuracao.descricao}
      </Text>
      <Text variant="titleMedium" style={styles.codigo}>
        #{id}
      </Text>
      <View style={styles.botoes}>
        <Botao icon="file-document-outline" onPress={() => verDetalhe()}>
          {configuracao.textoDetalhe}
        </Botao>
        <Botao variante="secundario" icon="home-outline" onPress={() => navigation.popToTop()}>
          Voltar ao início
        </Botao>
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flexGrow: 1, justifyContent: "center" },
  circulo: {
    alignItems: "center",
    backgroundColor: cores.sucesso,
    borderRadius: 50,
    height: 100,
    justifyContent: "center",
    marginBottom: 20,
    width: 100,
  },
  titulo: { color: cores.texto, fontWeight: "bold", textAlign: "center" },
  descricao: { color: cores.textoSecundario, marginTop: 8, textAlign: "center" },
  codigo: { color: cores.primaria, marginTop: 12 },
  botoes: { alignSelf: "stretch", marginTop: 28 },
});
