import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import CardAgendamento from "../../components/agendamentos/CardAgendamento";
import ConteudoRequisicao from "../../components/comuns/ConteudoRequisicao";
import EstadoVazio from "../../components/comuns/EstadoVazio";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import CardIndicador from "../../components/prestador/CardIndicador";
import { useAuth } from "../../contexts/AuthContext";
import useRequisicao from "../../hooks/useRequisicao";
import { listarAgendamentosRecebidos } from "../../services/prestador/agendamentosRecebidosService";
import { buscarMeuPetShop, STATUS_SEM_PET_SHOP } from "../../services/prestador/meuPetShopService";
import { listarMeusProdutos } from "../../services/prestador/meusProdutosService";
import { listarPedidosRecebidos } from "../../services/prestador/pedidosRecebidosService";
import cores from "../../theme/cores";
import { dataParaApi } from "../../utils/formatadores";

const QUANTIDADE_AGENDAMENTOS_RESUMO = 50;

function totalDaPagina(response) {
  return response.success ? response.data.totalElements : 0;
}

async function carregarPainel() {
  const petShop = await buscarMeuPetShop();
  if (!petShop.success) return petShop;

  const [aEnviar, produtos, agendamentos] = await Promise.all([
    listarPedidosRecebidos({ pagina: 0, status: "PAID" }),
    listarMeusProdutos({ pagina: 0 }),
    listarAgendamentosRecebidos({ pagina: 0, tamanho: QUANTIDADE_AGENDAMENTOS_RESUMO }),
  ]);

  const hoje = dataParaApi(new Date());
  const agendamentosHoje = agendamentos.success
    ? agendamentos.data.content
        .filter((item) => item.startAt.startsWith(hoje) && item.status !== "CANCELADO")
        .sort((a, b) => a.startAt.localeCompare(b.startAt))
    : [];

  return {
    success: true,
    data: {
      petShop: petShop.data,
      pedidosAEnviar: totalDaPagina(aEnviar),
      totalProdutos: totalDaPagina(produtos),
      totalAgendamentos: totalDaPagina(agendamentos),
      agendamentosHoje,
    },
  };
}

export default function PainelPrestador({ navigation }) {
  const { usuario } = useAuth();
  const requisicao = useRequisicao(carregarPainel, [], { recarregarAoFocar: true });

  if (requisicao.status === STATUS_SEM_PET_SHOP) {
    return (
      <Tela>
        <EstadoVazio
          icone="storefront-outline"
          titulo={`Bem-vindo, ${usuario.name.split(" ")[0]}!`}
          descricao="Para começar, cadastre os dados do seu pet shop. Sem isso não é possível cadastrar produtos nem serviços."
          textoAcao="Cadastrar pet shop"
          aoPressionarAcao={() => navigation.navigate("DadosPetShop")}
        />
      </Tela>
    );
  }

  return (
    <ConteudoRequisicao requisicao={requisicao}>
      {(painel) => (
        <Tela atualizando={requisicao.atualizando} aoAtualizar={requisicao.atualizar}>
          <Text variant="headlineSmall" style={styles.nome}>
            {painel.petShop.name}
          </Text>
          <Text variant="bodyMedium" style={styles.secundario}>
            {painel.petShop.address}
          </Text>

          <View style={styles.indicadores}>
            <CardIndicador
              icone="truck-delivery-outline"
              rotulo="Pedidos a enviar"
              valor={painel.pedidosAEnviar}
              aoPressionar={() => navigation.navigate("Pedidos")}
            />
            <CardIndicador
              icone="calendar-today"
              rotulo="Atendimentos hoje"
              valor={painel.agendamentosHoje.length}
              aoPressionar={() => navigation.navigate("Agenda")}
            />
          </View>
          <View style={styles.indicadores}>
            <CardIndicador
              icone="package-variant"
              rotulo="Produtos"
              valor={painel.totalProdutos}
              aoPressionar={() => navigation.navigate("Catalogo")}
            />
            <CardIndicador
              icone="calendar-multiple-check"
              rotulo="Agendamentos"
              valor={painel.totalAgendamentos}
              aoPressionar={() => navigation.navigate("Agenda")}
            />
          </View>

          <TituloSecao titulo="Agenda de hoje" />
          {painel.agendamentosHoje.length === 0 ? (
            <EstadoVazio icone="calendar-blank-outline" titulo="Nenhum atendimento para hoje" />
          ) : (
            painel.agendamentosHoje.map((agendamento) => (
              <CardAgendamento
                key={agendamento.id}
                agendamento={agendamento}
                mostrarCliente
                aoPressionar={() => navigation.navigate("DetalheAgendamentoRecebido", { id: agendamento.id })}
              />
            ))
          )}
        </Tela>
      )}
    </ConteudoRequisicao>
  );
}

const styles = StyleSheet.create({
  nome: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario, marginBottom: 12 },
  indicadores: { flexDirection: "row", gap: 10 },
});
