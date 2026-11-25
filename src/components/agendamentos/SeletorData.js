import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import cores from "../../theme/cores";
import { dataParaApi, descreverDia, proximosDias } from "../../utils/formatadores";

const DIAS_EXIBIDOS = 21;

export default function SeletorData({ dataSelecionada, aoSelecionar }) {
  const dias = proximosDias(DIAS_EXIBIDOS);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.linha}>
      {dias.map((data) => {
        const valor = dataParaApi(data);
        const ativo = valor === dataSelecionada;
        const { diaSemana, dia, mes } = descreverDia(data);
        return (
          <TouchableOpacity key={valor} style={[styles.dia, ativo && styles.diaAtivo]} onPress={() => aoSelecionar(valor)}>
            <Text variant="labelSmall" style={ativo ? styles.textoAtivo : styles.secundario}>
              {diaSemana}
            </Text>
            <Text variant="titleMedium" style={[styles.numero, ativo && styles.textoAtivo]}>
              {dia}
            </Text>
            <Text variant="labelSmall" style={ativo ? styles.textoAtivo : styles.secundario}>
              {mes}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linha: { gap: 8, paddingVertical: 4 },
  dia: {
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 8,
    width: 58,
  },
  diaAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  numero: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  textoAtivo: { color: cores.superficie },
});
