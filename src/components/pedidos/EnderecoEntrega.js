import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import cores from "../../theme/cores";

export default function EnderecoEntrega({ pedido }) {
  const complemento = pedido.deliveryComplement ? `, ${pedido.deliveryComplement}` : "";

  return (
    <Cartao>
      <View style={styles.linha}>
        <MaterialCommunityIcons name="map-marker-outline" size={22} color={cores.primaria} />
        <View style={styles.textos}>
          <Text variant="bodyMedium" style={styles.texto}>
            {pedido.deliveryStreet}, {pedido.deliveryNumber}
            {complemento}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            {pedido.deliveryDistrict} - {pedido.deliveryCity}/{pedido.deliveryState}
          </Text>
          <Text variant="bodySmall" style={styles.secundario}>
            CEP {pedido.deliveryZipCode}
          </Text>
        </View>
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", gap: 10 },
  textos: { flex: 1 },
  texto: { color: cores.texto },
  secundario: { color: cores.textoSecundario, marginTop: 2 },
});
