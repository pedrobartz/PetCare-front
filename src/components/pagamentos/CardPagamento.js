import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";
import { rotuloMetodoPagamento, TIPOS_REFERENCIA_PAGAMENTO } from "../../constants/metodosPagamento";
import { formatarDataHora, formatarPreco } from "../../utils/formatadores";

export default function CardPagamento({ pagamento }) {
  const referencia = TIPOS_REFERENCIA_PAGAMENTO[pagamento.referenceType];

  return (
    <Cartao>
      <View style={styles.linha}>
        <MaterialCommunityIcons name={referencia.icone} size={26} color={cores.primaria} />
        <View style={styles.textos}>
          <Text variant="titleSmall" style={styles.titulo}>
            {referencia.rotulo} #{pagamento.referenceId}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {rotuloMetodoPagamento(pagamento.method)} - {formatarDataHora(pagamento.createdAt)}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            Transação {pagamento.transactionCode}
          </Text>
        </View>
        <Text variant="titleSmall" style={styles.valor}>
          {formatarPreco(pagamento.amount, pagamento.currency)}
        </Text>
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { alignItems: "center", flexDirection: "row", gap: 12 },
  textos: { flex: 1 },
  titulo: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario, marginTop: 2 },
  valor: { color: cores.primaria, fontWeight: "bold" },
});
