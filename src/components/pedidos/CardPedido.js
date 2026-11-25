import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Cartao from "../comuns/Cartao";
import Selo from "../comuns/Selo";
import cores from "../../theme/cores";
import { STATUS_PEDIDO } from "../../constants/statusPedido";
import { formatarDataHora, formatarPreco } from "../../utils/formatadores";

export default function CardPedido({ pedido, aoPressionar, moeda, mostrarCliente }) {
  const status = STATUS_PEDIDO[pedido.status];
  const quantidadeItens = pedido.items.reduce((total, item) => total + item.quantity, 0);
  const valor = moeda ? pedido.totalConvertedPrice : pedido.totalAmount;

  return (
    <Cartao aoPressionar={() => aoPressionar(pedido)}>
      <View style={styles.cabecalho}>
        <Text variant="titleMedium" style={styles.titulo}>
          Pedido #{pedido.id}
        </Text>
        <Selo texto={status.rotulo} cor={status.cor} />
      </View>
      <Text variant="bodySmall" style={styles.secundario}>
        {formatarDataHora(pedido.orderDate)}
      </Text>
      {mostrarCliente ? (
        <Text variant="bodySmall" style={styles.secundario}>
          {pedido.customerEmail}
        </Text>
      ) : null}
      <View style={styles.rodape}>
        <Text variant="bodyMedium" style={styles.secundario}>
          {quantidadeItens} {quantidadeItens === 1 ? "item" : "itens"}
        </Text>
        <Text variant="titleMedium" style={styles.valor}>
          {formatarPreco(valor, moeda)}
        </Text>
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  rodape: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  valor: { color: cores.primaria, fontWeight: "bold" },
});
