import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

export default function CardServico({ servico, aoPressionar, acao }) {
  return (
    <Cartao aoPressionar={aoPressionar ? () => aoPressionar(servico) : undefined}>
      <View style={styles.linha}>
        <View style={styles.icone}>
          <MaterialCommunityIcons name="content-cut" size={22} color={cores.primaria} />
        </View>
        <View style={styles.textos}>
          <Text variant="titleSmall" style={styles.titulo}>
            {servico.name}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            Duração: {servico.durationMinutes} min
          </Text>
        </View>
        <Text variant="titleSmall" style={styles.preco}>
          {formatarPreco(servico.price)}
        </Text>
        {acao}
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row", gap: 12 },
  icone: {
    alignItems: "center",
    backgroundColor: cores.primariaClara,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  textos: { flex: 1 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario, marginTop: 2 },
  preco: { color: cores.primaria, fontWeight: "bold" },
});
