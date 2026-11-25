import { useState } from "react";
import { StyleSheet } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

import GradeHorarios from "../../components/agendamentos/GradeHorarios";
import SeletorData from "../../components/agendamentos/SeletorData";
import Botao from "../../components/comuns/Botao";
import Cartao from "../../components/comuns/Cartao";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import IndicadorEtapas from "../../components/comuns/IndicadorEtapas";
import LinhaInfo from "../../components/comuns/LinhaInfo";
import MensagemFormulario from "../../components/comuns/MensagemFormulario";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import CardPet from "../../components/pets/CardPet";
import { ETAPAS_AGENDAMENTO } from "../../constants/regras";
import useAcao from "../../hooks/useAcao";
import useHorariosLivres from "../../hooks/useHorariosLivres";
import useRequisicao from "../../hooks/useRequisicao";
import { criarAgendamento } from "../../services/agendamentoService";
import { listarPets } from "../../services/petService";
import cores from "../../theme/cores";
import { dataParaApi, formatarData, formatarPreco, montarDataHora } from "../../utils/formatadores";

function calcularEtapa(horario, petId) {
  if (horario && petId) return 2;
  if (horario) return 1;
  return 0;
}

export default function NovoAgendamento({ route, navigation }) {
  const { petShop, servico } = route.params;
  const [data, setData] = useState(dataParaApi(new Date()));
  const [horario, setHorario] = useState(null);
  const [petId, setPetId] = useState(null);
  const { executando, executar } = useAcao();
  const pets = useRequisicao(listarPets, [], { recarregarAoFocar: true });
  const horariosLivres = useHorariosLivres(petShop.id, servico.id, data);

  function aoSelecionarData(novaData) {
    setData(novaData);
    setHorario(null);
  }

  async function aoConfirmar() {
    const response = await executar(
      () => criarAgendamento({ petShopId: petShop.id, servicoId: servico.id, inicio: montarDataHora(data, horario), petId }),
      { tituloErro: "Não foi possível agendar" }
    );
    if (!response.success) return;

    navigation.replace("Pagamento", { tipo: "agendamento", id: response.data.id, valor: response.data.priceAtBooking });
  }

  return (
    <ConteudoRequisicao requisicao={pets}>
      {(listaPets) => (
        <Tela
          rodape={
            <Botao icon="check" onPress={aoConfirmar} carregando={executando} disabled={!horario || !petId}>
              Confirmar e pagar
            </Botao>
          }
        >
          <IndicadorEtapas etapas={ETAPAS_AGENDAMENTO} etapaAtual={calcularEtapa(horario, petId)} />

          <Cartao>
            <Text variant="titleMedium" style={styles.titulo}>
              {servico.name}
            </Text>
            <LinhaInfo rotulo="Pet shop" valor={petShop.name} />
            <LinhaInfo rotulo="Duração" valor={`${servico.durationMinutes} min`} />
            <LinhaInfo rotulo="Valor" valor={formatarPreco(servico.price)} destaque />
          </Cartao>

          <TituloSecao titulo="Escolha a data" />
          <SeletorData dataSelecionada={data} aoSelecionar={aoSelecionarData} />

          <TituloSecao titulo={`Horários livres em ${formatarData(data)}`} />
          {horariosLivres.carregando ? (
            <ActivityIndicator color={cores.primaria} />
          ) : horariosLivres.erro ? (
            <MensagemFormulario texto={horariosLivres.erro} />
          ) : horariosLivres.horarios.length === 0 ? (
            <MensagemFormulario tipo="alerta" texto="Nenhum horário livre nesta data. Escolha outro dia." />
          ) : (
            <GradeHorarios horarios={horariosLivres.horarios} selecionado={horario} aoSelecionar={setHorario} />
          )}

          <TituloSecao titulo="Qual pet vai?" />
          {listaPets.length === 0 ? (
            <EstadoVazio
              icone="paw"
              titulo="Você ainda não cadastrou pets"
              descricao="Cadastre seu pet para concluir o agendamento."
              textoAcao="Cadastrar pet"
              aoPressionarAcao={() => navigation.navigate("FormularioPet")}
            />
          ) : (
            listaPets.map((pet) => (
              <CardPet key={pet.id} pet={pet} selecionado={pet.id === petId} aoPressionar={() => setPetId(pet.id)} />
            ))
          )}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  titulo: { color: cores.texto, fontWeight: "bold", marginBottom: 4 },
});
