import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import cores from "../../theme/cores";

export default function IndicadorEtapas({ etapas, etapaAtual }) {
  return (
    <View style={styles.container}>
      {etapas.map((etapa, indice) => {
        const concluida = indice <= etapaAtual;
        return (
          <View key={etapa} style={styles.etapa}>
            <View style={[styles.barra, concluida && styles.barraAtiva]} />
            <Text variant="labelSmall" style={[styles.texto, concluida && styles.textoAtivo]}>
              {etapa}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 6, marginBottom: 16 },
  etapa: { flex: 1 },
  barra: { backgroundColor: cores.bordaClara, borderRadius: 2, height: 4, marginBottom: 4 },
  barraAtiva: { backgroundColor: cores.primaria },
  texto: { color: cores.textoSecundario, textAlign: "center" },
  textoAtivo: { color: cores.primaria, fontWeight: "bold" },
});
