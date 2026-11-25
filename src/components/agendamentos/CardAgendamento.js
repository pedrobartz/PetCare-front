import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Cartao from "../comuns/Cartao";
import Selo from "../comuns/Selo";
import cores from "../../theme/cores";
import { STATUS_AGENDAMENTO } from "../../constants/statusAgendamento";
import { formatarData, formatarHora, formatarPreco } from "../../utils/formatadores";

export default function CardAgendamento({ agendamento, aoPressionar, mostrarCliente }) {
  const status = STATUS_AGENDAMENTO[agendamento.status];
  const aguardandoPagamento = agendamento.status === "AGENDADO" && !agendamento.paymentId;

  return (
    <Cartao aoPressionar={() => aoPressionar(agendamento)}>
      <View style={styles.cabecalho}>
        <Text variant="titleMedium" style={styles.titulo} numberOfLines={1}>
          {agendamento.petService.name} - {agendamento.petName}
        </Text>
        <Selo texto={status.rotulo} cor={status.cor} />
      </View>
      <View style={styles.linha}>
        <MaterialCommunityIcons name="calendar-clock" size={16} color={cores.textoSecundario} />
        <Text variant="bodySmall" style={styles.secundario}>
          {formatarData(agendamento.startAt)} - {formatarHora(agendamento.startAt)} às {formatarHora(agendamento.endAt)}
        </Text>
      </View>
      {mostrarCliente ? (
        <View style={styles.linha}>
          <MaterialCommunityIcons name="account-outline" size={16} color={cores.textoSecundario} />
          <Text variant="bodySmall" style={styles.secundario}>
            {agendamento.customerEmail}
          </Text>
        </View>
      ) : null}
      <View style={styles.rodape}>
        <Text variant="bodySmall" style={aguardandoPagamento ? styles.pendente : styles.secundario}>
          {agendamento.paymentId ? "Pago" : aguardandoPagamento ? "Aguardando pagamento" : "Não pago"}
        </Text>
        <Text variant="titleMedium" style={styles.valor}>
          {formatarPreco(agendamento.priceAtBooking)}
        </Text>
      </View>
    </Cartao>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", flexDirection: "row", gap: 8, justifyContent: "space-between", marginBottom: 6 },
  titulo: { color: cores.texto, flex: 1, fontWeight: "bold" },
  linha: { alignItems: "center", flexDirection: "row", gap: 6, marginTop: 2 },
  secundario: { color: cores.textoSecundario },
  pendente: { color: cores.alerta, fontWeight: "bold" },
  rodape: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  valor: { color: cores.primaria, fontWeight: "bold" },
});
