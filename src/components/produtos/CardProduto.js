import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Cartao from "../comuns/Cartao";
import ImagemProduto from "./ImagemProduto";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

export default function CardProduto({ produto, aoPressionar }) {
  const semEstoque = produto.stock <= 0;

  return (
    <Cartao aoPressionar={() => aoPressionar(produto)}>
      <View style={styles.linha}>
        <ImagemProduto uri={produto.image} />
        <View style={styles.info}>
          <Text variant="titleSmall" numberOfLines={2} style={styles.nome}>
            {produto.name}
          </Text>
          {produto.brand ? (
            <Text variant="bodySmall" style={styles.secundario}>
              {produto.brand}
            </Text>
          ) : null}
          <Text variant="titleMedium" style={styles.preco}>
            {formatarPreco(produto.convertedPrice, produto.targetCurrency)}
          </Text>
          {semEstoque ? (
            <Text variant="labelSmall" style={styles.esgotado}>
              Sem estoque
            </Text>
          ) : null}
        </View>
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row" },
  info: { flex: 1, marginLeft: 14 },
  nome: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  preco: { color: cores.primaria, fontWeight: "bold", marginTop: 4 },
  esgotado: { color: cores.perigo, marginTop: 2 },
});
