import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import cores from "../../theme/cores";

export default function TituloSecao({ titulo, acao }) {
  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.titulo}>
        {titulo}
      </Text>
      {acao}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 10, marginTop: 14 },
  titulo: { color: cores.texto, fontWeight: "bold" },
});
