import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

import cores from "../../theme/cores";

export default function GradeHorarios({ horarios, selecionado, aoSelecionar }) {
  return (
    <View style={styles.grade}>
      {horarios.map((horario) => {
        const ativo = horario === selecionado;
        return (
          <TouchableOpacity key={horario} style={[styles.horario, ativo && styles.ativo]} onPress={() => aoSelecionar(horario)}>
            <Text variant="titleSmall" style={ativo ? styles.textoAtivo : styles.texto}>
              {horario}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grade: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  horario: {
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 10,
    width: "30%",
  },
  ativo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  texto: { color: cores.texto },
  textoAtivo: { color: cores.superficie },
});
