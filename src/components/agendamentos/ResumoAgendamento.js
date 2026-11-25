import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import Cartao from "../comuns/Cartao";
import LinhaInfo from "../comuns/LinhaInfo";
import Selo from "../comuns/Selo";
import TituloSecao from "../comuns/TituloSecao";
import AvatarPet from "../pets/AvatarPet";
import { buscarEspecie } from "../../constants/especies";
import { STATUS_AGENDAMENTO } from "../../constants/statusAgendamento";
import cores from "../../theme/cores";
import { formatarData, formatarDataHora, formatarHora, formatarPreco } from "../../utils/formatadores";

export default function ResumoAgendamento({ agendamento, petShop, mostrarCliente }) {
  const status = STATUS_AGENDAMENTO[agendamento.status];
  const pago = Boolean(agendamento.paymentId);

  return (
    <>
      <Cartao>
        <View style={styles.cabecalho}>
          <Text variant="titleLarge" style={styles.titulo}>
            {agendamento.petService.name}
          </Text>
          <Selo texto={status.rotulo} cor={status.cor} />
        </View>
        <LinhaInfo rotulo="Data" valor={formatarData(agendamento.startAt)} />
        <LinhaInfo rotulo="Horário" valor={`${formatarHora(agendamento.startAt)} às ${formatarHora(agendamento.endAt)}`} />
        <LinhaInfo rotulo="Duração" valor={`${agendamento.petService.durationMinutes} min`} />
        {petShop ? <LinhaInfo rotulo="Pet shop" valor={petShop.name} /> : null}
        {petShop ? <LinhaInfo rotulo="Endereço" valor={petShop.address} /> : null}
        {mostrarCliente ? <LinhaInfo rotulo="Cliente" valor={agendamento.customerEmail} /> : null}
      </Cartao>

      <TituloSecao titulo="Pet" />
      <Cartao>
        <View style={styles.pet}>
          <AvatarPet especie={agendamento.petSpecies} />
          <View>
            <Text variant="titleMedium" style={styles.titulo}>
              {agendamento.petName}
            </Text>
            <Text variant="bodySmall" style={styles.secundario}>
              {buscarEspecie(agendamento.petSpecies).rotulo}
            </Text>
          </View>
        </View>
      </Cartao>

      <TituloSecao titulo="Pagamento" />
      <Cartao>
        <LinhaInfo rotulo="Valor" valor={formatarPreco(agendamento.priceAtBooking)} destaque />
        <LinhaInfo rotulo="Situação" valor={pago ? `Pago em ${formatarDataHora(agendamento.paidAt)}` : "Não pago"} />
      </Cartao>
    </>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", flexDirection: "row", gap: 8, justifyContent: "space-between", marginBottom: 8 },
  titulo: { color: cores.texto, flexShrink: 1, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  pet: { alignItems: "center", flexDirection: "row", gap: 12 },
});
