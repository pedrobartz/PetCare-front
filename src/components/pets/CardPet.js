import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import AvatarPet from "./AvatarPet";
import cores from "../../theme/cores";
import { descreverPet } from "../../utils/formatadores";

export default function CardPet({ pet, aoPressionar, selecionado }) {
  return (
    <Cartao aoPressionar={() => aoPressionar(pet)} estilo={selecionado && styles.selecionado}>
      <View style={styles.linha}>
        <AvatarPet especie={pet.species} />
        <View style={styles.info}>
          <Text variant="titleMedium" style={styles.nome}>
            {pet.name}
          </Text>
          <Text variant="bodySmall" style={styles.descricao}>
            {descreverPet(pet)}
          </Text>
        </View>
        <MaterialCommunityIcons
          name={selecionado ? "check-circle" : "chevron-right"}
          size={24}
          color={selecionado ? cores.primaria : cores.textoSecundario}
        />
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row" },
  info: { flex: 1, marginLeft: 12 },
  nome: { color: cores.texto, fontWeight: "bold" },
  descricao: { color: cores.textoSecundario, marginTop: 2 },
  selecionado: { backgroundColor: cores.primariaClara, borderColor: cores.primaria },
});
