import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";

export default function OpcaoPagamento({ metodo, selecionado, aoSelecionar }) {
  return (
    <Cartao aoPressionar={() => aoSelecionar(metodo.valor)} estilo={selecionado && styles.selecionado}>
      <View style={styles.linha}>
        <MaterialCommunityIcons name={metodo.icone} size={26} color={cores.primaria} />
        <View style={styles.textos}>
          <Text variant="titleSmall" style={styles.titulo}>
            {metodo.rotulo}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {metodo.descricao}
          </Text>
        </View>
        <MaterialCommunityIcons
          name={selecionado ? "radiobox-marked" : "radiobox-blank"}
          size={22}
          color={selecionado ? cores.primaria : cores.borda}
        />
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row", gap: 12 },
  textos: { flex: 1 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  selecionado: { backgroundColor: cores.primariaClara, borderColor: cores.primaria },
});
