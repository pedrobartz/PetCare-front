import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import cores from "../../theme/cores";

export default function ItemMenu({ icone, titulo, subtitulo, aoPressionar, cor = cores.texto }) {
  return (
    <TouchableOpacity style={styles.item} onPress={aoPressionar} activeOpacity={0.7}>
      <View style={styles.icone}>
        <MaterialCommunityIcons name={icone} size={22} color={cor === cores.texto ? cores.primaria : cor} />
      </View>
      <View style={styles.textos}>
        <Text variant="titleSmall" style={{ color: cor }}>
          {titulo}
        </Text>
        {subtitulo ? (
          <Text variant="bodySmall" style={styles.subtitulo}>
            {subtitulo}
          </Text>
        ) : null}
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} color={cores.textoSecundario} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderBottomColor: cores.bordaClara,
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  icone: {
    alignItems: "center",
    backgroundColor: cores.fundo,
    borderRadius: 18,
    height: 36,
    justifyContent: "center",
    marginRight: 12,
    width: 36,
  },
  textos: { flex: 1 },
  subtitulo: { color: cores.textoSecundario, marginTop: 2 },
});
