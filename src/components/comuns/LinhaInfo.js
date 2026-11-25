import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import cores from "../../theme/cores";

export default function LinhaInfo({ rotulo, valor, destaque }) {
  return (
    <View style={styles.linha}>
      <Text variant="bodyMedium" style={styles.rotulo}>
        {rotulo}
      </Text>
      <Text variant={destaque ? "titleMedium" : "bodyMedium"} style={[styles.valor, destaque && styles.destaque]}>
        {valor}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 },
  rotulo: { color: cores.textoSecundario, flex: 1 },
  valor: { color: cores.texto, flex: 1, textAlign: "right" },
  destaque: { color: cores.primaria, fontWeight: "bold" },
});
