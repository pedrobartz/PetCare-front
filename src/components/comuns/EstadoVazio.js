import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Botao from "./Botao";
import cores from "../../theme/cores";

export default function EstadoVazio({ icone, titulo, descricao, textoAcao, aoPressionarAcao }) {
  return (
    <View style={styles.container}>
      <View style={styles.circulo}>
        <MaterialCommunityIcons name={icone} size={36} color={cores.primaria} />
      </View>
      <Text variant="titleMedium" style={styles.titulo}>
        {titulo}
      </Text>
      {descricao ? (
        <Text variant="bodyMedium" style={styles.descricao}>
          {descricao}
        </Text>
      ) : null}
      {textoAcao ? (
        <Botao icon="plus" onPress={aoPressionarAcao} estilo={styles.botao}>
          {textoAcao}
        </Botao>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", paddingHorizontal: 24, paddingVertical: 48 },
  circulo: {
    alignItems: "center",
    backgroundColor: cores.primariaClara,
    borderRadius: 40,
    height: 80,
    justifyContent: "center",
    marginBottom: 16,
    width: 80,
  },
  titulo: { color: cores.texto, fontWeight: "bold", textAlign: "center" },
  descricao: { color: cores.textoSecundario, marginTop: 6, textAlign: "center" },
  botao: { marginTop: 18 },
});
