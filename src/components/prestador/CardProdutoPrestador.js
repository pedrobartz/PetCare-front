import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Cartao from "../comuns/Cartao";
import Selo from "../comuns/Selo";
import ImagemProduto from "../produtos/ImagemProduto";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

export default function CardProdutoPrestador({ produto, aoPressionar }) {
  return (
    <Cartao aoPressionar={() => aoPressionar(produto)} desabilitado={!produto.active}>
      <View style={styles.linha}>
        <ImagemProduto uri={produto.image} tamanho={56} />
        <View style={styles.info}>
          <Text variant="titleSmall" numberOfLines={2} style={styles.nome}>
            {produto.name}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            Estoque: {produto.stock} {produto.category ? `- ${produto.category}` : ""}
          </Text>
          <Text variant="titleSmall" style={styles.preco}>
            {formatarPreco(produto.price, produto.currency)}
          </Text>
        </View>
        {produto.active ? null : <Selo texto="Inativo" cor={cores.perigo} />}
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row" },
  info: { flex: 1, marginLeft: 12 },
  nome: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario, marginTop: 2 },
  preco: { color: cores.primaria, marginTop: 2 },
});
