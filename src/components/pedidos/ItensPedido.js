import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";

import Cartao from "../comuns/Cartao";
import LinhaInfo from "../comuns/LinhaInfo";
import cores from "../../theme/cores";
import { formatarPreco } from "../../utils/formatadores";

export default function ItensPedido({ pedido, moeda }) {
  const total = moeda ? pedido.totalConvertedPrice : pedido.totalAmount;

  return (
    <Cartao>
      {pedido.items.map((item) => {
        const preco = moeda ? item.convertedPrice : item.priceAtPurchase;
        const moedaItem = moeda || item.currencyAtPurchase;
        return (
          <View key={item.id} style={styles.item}>
            <View style={styles.nome}>
              <Text variant="bodyMedium" style={styles.texto}>
                {item.productName}
              </Text>
              <Text variant="bodySmall" style={styles.secundario}>
                {item.quantity} x {formatarPreco(preco, moedaItem)}
              </Text>
            </View>
            <Text variant="titleSmall" style={styles.texto}>
              {formatarPreco(preco * item.quantity, moedaItem)}
            </Text>
          </View>
        );
      })}
      <Divider style={styles.divisor} />
      <LinhaInfo rotulo="Total" valor={formatarPreco(total, moeda)} destaque />
    </Cartao>
  );
}

const styles = StyleSheet.create({
  item: { alignItems: "center", flexDirection: "row", paddingVertical: 6 },
  nome: { flex: 1 },
  texto: { color: cores.texto },
  secundario: { color: cores.textoSecundario },
  divisor: { marginVertical: 8 },
});
