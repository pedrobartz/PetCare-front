import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Botao from "./Botao";
import cores from "../../theme/cores";

export default function MensagemErro({ mensagem, aoTentarNovamente }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle-outline" size={44} color={cores.perigo} />
      <Text variant="bodyLarge" style={styles.texto}>
        {mensagem}
      </Text>
      {aoTentarNovamente ? (
        <Botao variante="secundario" icon="refresh" onPress={aoTentarNovamente}>
          Tentar novamente
        </Botao>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", backgroundColor: cores.fundo, flex: 1, justifyContent: "center", padding: 32 },
  texto: { color: cores.texto, marginVertical: 14, textAlign: "center" },
});
