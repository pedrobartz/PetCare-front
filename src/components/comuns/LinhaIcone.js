import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import cores from "../../theme/cores";

export default function LinhaIcone({ icone, texto }) {
  return (
    <View style={styles.linha}>
      <MaterialCommunityIcons name={icone} size={18} color={cores.textoSecundario} />
      <Text variant="bodyMedium" style={styles.texto}>
        {texto}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row", gap: 8, marginTop: 4 },
  texto: { color: cores.textoSecundario, flex: 1 },
});
