import { StyleSheet, TouchableOpacity, View } from "react-native";

import cores from "../../theme/cores";

export default function Cartao({ children, aoPressionar, estilo, desabilitado }) {
  const estilos = [styles.cartao, desabilitado && styles.desabilitado, estilo];

  if (aoPressionar) {
    return (
      <TouchableOpacity style={estilos} onPress={aoPressionar} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={estilos}>{children}</View>;
}

const styles = StyleSheet.create({
  cartao: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  desabilitado: { opacity: 0.55 },
});
