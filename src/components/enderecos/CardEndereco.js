import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";
import { formatarEndereco } from "../../utils/formatadores";

export default function CardEndereco({ endereco, aoPressionar, aoEditar, aoRemover, selecionado }) {
  return (
    <Cartao aoPressionar={aoPressionar ? () => aoPressionar(endereco) : undefined} estilo={selecionado && styles.selecionado}>
      <View style={styles.linha}>
        <MaterialCommunityIcons
          name={selecionado ? "radiobox-marked" : "map-marker-outline"}
          size={22}
          color={cores.primaria}
        />
        <View style={styles.textos}>
          <Text variant="titleSmall" style={styles.titulo}>
            {endereco.label}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {formatarEndereco(endereco)}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            CEP {endereco.zipCode}
          </Text>
        </View>
        {aoEditar ? <IconButton icon="pencil-outline" size={20} onPress={() => aoEditar(endereco)} /> : null}
        {aoRemover ? (
          <IconButton icon="trash-can-outline" size={20} iconColor={cores.perigo} onPress={() => aoRemover(endereco)} />
        ) : null}
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row", gap: 10 },
  textos: { flex: 1 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario, marginTop: 2 },
  selecionado: { backgroundColor: cores.primariaClara, borderColor: cores.primaria },
});
