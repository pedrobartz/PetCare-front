import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import cores from "../../theme/cores";

const TIPOS = {
  erro: { cor: cores.perigo, fundo: cores.perigoClaro, icone: "alert-circle-outline" },
  alerta: { cor: cores.alerta, fundo: cores.alertaClaro, icone: "information-outline" },
  sucesso: { cor: cores.sucesso, fundo: cores.sucessoClaro, icone: "check-circle-outline" },
};

export default function MensagemFormulario({ texto, tipo = "erro" }) {
  if (!texto) return null;
  const estilo = TIPOS[tipo];

  return (
    <View style={[styles.caixa, { backgroundColor: estilo.fundo, borderColor: estilo.cor }]}>
      <MaterialCommunityIcons name={estilo.icone} size={20} color={estilo.cor} />
      <Text variant="bodyMedium" style={[styles.texto, { color: estilo.cor }]}>
        {texto}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caixa: { alignItems: "center", borderRadius: 10, borderWidth: 1, flexDirection: "row", gap: 8, marginVertical: 8, padding: 10 },
  texto: { flex: 1 },
});
