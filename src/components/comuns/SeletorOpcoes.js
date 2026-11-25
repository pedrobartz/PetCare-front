import { ScrollView, StyleSheet, View } from "react-native";
import { Chip } from "react-native-paper";

import cores from "../../theme/cores";

export default function SeletorOpcoes({ opcoes, selecionado, aoSelecionar, rolavel = true }) {
  const chips = opcoes.map((opcao) => {
    const ativo = opcao.valor === selecionado;
    return (
      <Chip
        key={String(opcao.valor)}
        icon={opcao.icone}
        selected={ativo}
        showSelectedCheck={false}
        onPress={() => aoSelecionar(opcao.valor)}
        style={[styles.chip, ativo && styles.chipAtivo]}
        textStyle={ativo ? styles.textoAtivo : styles.texto}
      >
        {opcao.rotulo}
      </Chip>
    );
  });

  if (!rolavel) {
    return <View style={styles.grade}>{chips}</View>;
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.linha}>
      {chips}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linha: { gap: 8, paddingVertical: 4 },
  grade: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { backgroundColor: cores.superficie, borderColor: cores.borda, borderWidth: 1 },
  chipAtivo: { backgroundColor: cores.primaria, borderColor: cores.primaria },
  texto: { color: cores.texto },
  textoAtivo: { color: cores.superficie },
});
