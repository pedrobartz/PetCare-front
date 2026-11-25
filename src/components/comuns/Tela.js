import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";

import cores from "../../theme/cores";
import espacamentos from "../../theme/espacamentos";

export default function Tela({ children, rolavel = true, atualizando, aoAtualizar, rodape, estilo }) {
  const refreshControl = aoAtualizar ? (
    <RefreshControl refreshing={Boolean(atualizando)} onRefresh={aoAtualizar} />
  ) : undefined;

  return (
    <View style={styles.fundo}>
      {rolavel ? (
        <ScrollView
          contentContainerStyle={[styles.conteudo, estilo]}
          keyboardShouldPersistTaps="handled"
          refreshControl={refreshControl}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.conteudo, styles.fixo, estilo]}>{children}</View>
      )}
      {rodape ? <View style={styles.rodape}>{rodape}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: { backgroundColor: cores.fundo, flex: 1 },
  conteudo: { padding: espacamentos.grande, paddingBottom: espacamentos.extraGrande },
  fixo: { flex: 1 },
  rodape: {
    backgroundColor: cores.superficie,
    borderTopColor: cores.bordaClara,
    borderTopWidth: 1,
    padding: espacamentos.medio,
  },
});
