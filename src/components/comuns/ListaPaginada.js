import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import Carregando from "./Carregando";
import MensagemErro from "./MensagemErro";
import cores from "../../theme/cores";
import espacamentos from "../../theme/espacamentos";

export default function ListaPaginada({ lista, renderizarItem, componenteVazio, cabecalho, chave = "id" }) {
  const { itens, carregando, carregandoMais, atualizando, erro, recarregar, atualizar, carregarMais } = lista;

  if (carregando && itens.length === 0) return <Carregando />;
  if (erro && itens.length === 0) return <MensagemErro mensagem={erro} aoTentarNovamente={recarregar} />;

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.conteudo}
      data={itens}
      keyExtractor={(item) => String(item[chave])}
      renderItem={({ item }) => renderizarItem(item)}
      ListHeaderComponent={cabecalho}
      ListEmptyComponent={componenteVazio}
      ListFooterComponent={carregandoMais ? <ActivityIndicator color={cores.primaria} style={styles.rodape} /> : null}
      onEndReached={carregarMais}
      onEndReachedThreshold={0.3}
      refreshing={atualizando}
      onRefresh={atualizar}
    />
  );
}

const styles = StyleSheet.create({
  lista: { backgroundColor: cores.fundo },
  conteudo: { flexGrow: 1, padding: espacamentos.grande },
  rodape: { marginVertical: 16 },
});
