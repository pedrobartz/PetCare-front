import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import cores from "../../theme/cores";
import { buscarEspecie } from "../../constants/especies";

export default function AvatarPet({ especie, tamanho = 48 }) {
  const { icone } = buscarEspecie(especie);

  return (
    <View style={[styles.avatar, { borderRadius: tamanho / 2, height: tamanho, width: tamanho }]}>
      <MaterialCommunityIcons name={icone} size={tamanho * 0.55} color={cores.primaria} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: { alignItems: "center", backgroundColor: cores.primariaClara, justifyContent: "center" },
});
