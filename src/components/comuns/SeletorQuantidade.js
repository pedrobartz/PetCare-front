import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import cores from "../../theme/cores";

export default function SeletorQuantidade({ quantidade, aoAlterar, minimo = 1, maximo, desabilitado }) {
  const podeDiminuir = !desabilitado && quantidade > minimo;
  const podeAumentar = !desabilitado && (maximo === undefined || quantidade < maximo);

  return (
    <View style={styles.container}>
      <IconButton icon="minus" size={16} disabled={!podeDiminuir} onPress={() => aoAlterar(quantidade - 1)} />
      <Text variant="titleSmall" style={styles.valor}>
        {quantidade}
      </Text>
      <IconButton icon="plus" size={16} disabled={!podeAumentar} onPress={() => aoAlterar(quantidade + 1)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderColor: cores.borda,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
  },
  valor: { minWidth: 22, textAlign: "center" },
});
