import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import cores from "../../theme/cores";

export default function ImagemProduto({ uri, tamanho = 72 }) {
  const [falhou, setFalhou] = useState(false);
  const dimensao = { height: tamanho, width: tamanho };

  if (!uri || falhou) {
    return (
      <View style={[styles.padrao, dimensao]}>
        <MaterialCommunityIcons name="package-variant" size={tamanho / 2} color={cores.textoSecundario} />
      </View>
    );
  }

  return <Image source={{ uri }} style={[styles.imagem, dimensao]} resizeMode="contain" onError={() => setFalhou(true)} />;
}

const styles = StyleSheet.create({
  padrao: { alignItems: "center", backgroundColor: cores.bordaClara, borderRadius: 10, justifyContent: "center" },
  imagem: { borderRadius: 10 },
});
