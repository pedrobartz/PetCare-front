import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";

export default function CardIndicador({ icone, rotulo, valor, aoPressionar }) {
  return (
    <Cartao aoPressionar={aoPressionar} estilo={styles.cartao}>
      <View style={styles.cabecalho}>
        <MaterialCommunityIcons name={icone} size={20} color={cores.primaria} />
        <Text variant="bodySmall" style={styles.rotulo}>
          {rotulo}
        </Text>
      </View>
      <Text variant="headlineSmall" style={styles.valor}>
        {valor}
      </Text>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  cartao: { flex: 1 },
  cabecalho: { alignItems: "center", flexDirection: "row", gap: 6 },
  rotulo: { color: cores.textoSecundario, flex: 1 },
  valor: { color: cores.texto, fontWeight: "bold", marginTop: 6 },
});
