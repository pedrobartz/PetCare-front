import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";

export default function CardPetShop({ petShop, aoPressionar }) {
  return (
    <Cartao aoPressionar={() => aoPressionar(petShop)}>
      <View style={styles.linha}>
        <View style={styles.icone}>
          <MaterialCommunityIcons name="storefront-outline" size={26} color={cores.primaria} />
        </View>
        <View style={styles.textos}>
          <Text variant="titleMedium" style={styles.titulo}>
            {petShop.name}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {petShop.address}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {petShop.phone}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={24} color={cores.textoSecundario} />
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row", gap: 12 },
  icone: {
    alignItems: "center",
    backgroundColor: cores.primariaClara,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  textos: { flex: 1 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario, marginTop: 2 },
});
