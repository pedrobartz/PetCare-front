import { StyleSheet, View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import Cartao from "../comuns/Cartao";
import SeletorQuantidade from "../comuns/SeletorQuantidade";
import ImagemProduto from "../produtos/ImagemProduto";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

export default function ItemCarrinho({ item, moeda, aoAlterarQuantidade, aoRemover, desabilitado }) {
  return (
    <Cartao>
      <View style={[styles.linha, !item.available && styles.indisponivel]}>
        <ImagemProduto uri={item.image} tamanho={56} />
        <View style={styles.info}>
          <Text variant="titleSmall" numberOfLines={2} style={styles.nome}>
            {item.name}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {formatarPreco(item.unitPrice, moeda)} cada
          </Text>
          <Text variant="titleSmall" style={styles.subtotal}>
            {formatarPreco(item.subtotal, moeda)}
          </Text>
        </View>
        <IconButton icon="trash-can-outline" iconColor={cores.perigo} disabled={desabilitado} onPress={() => aoRemover(item)} />
      </View>
      {item.available ? (
        <View style={styles.quantidade}>
          <SeletorQuantidade
            quantidade={item.quantity}
            desabilitado={desabilitado}
            aoAlterar={(quantidade) => aoAlterarQuantidade(item, quantidade)}
          />
        </View>
      ) : (
        <Text variant="bodySmall" style={styles.aviso}>
          Produto indisponível. Remova-o para finalizar o pedido.
        </Text>
      )}
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row" },
  indisponivel: { opacity: 0.5 },
  info: { flex: 1, marginLeft: 12 },
  nome: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  subtotal: { color: cores.primaria, marginTop: 2 },
  quantidade: { alignItems: "flex-end", marginTop: 6 },
  aviso: { color: cores.perigo, marginTop: 6 },
});
