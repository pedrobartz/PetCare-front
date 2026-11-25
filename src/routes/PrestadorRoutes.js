import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Perfil from "../pages/perfil/Perfil";
import AgendamentosRecebidos from "../pages/prestador/AgendamentosRecebidos";
import Catalogo from "../pages/prestador/Catalogo";
import DadosPetShop from "../pages/prestador/DadosPetShop";
import DetalheAgendamentoRecebido from "../pages/prestador/DetalheAgendamentoRecebido";
import DetalhePedidoRecebido from "../pages/prestador/DetalhePedidoRecebido";
import FormularioProduto from "../pages/prestador/FormularioProduto";
import FormularioServico from "../pages/prestador/FormularioServico";
import HorariosAtendimento from "../pages/prestador/HorariosAtendimento";
import PainelPrestador from "../pages/prestador/PainelPrestador";
import PedidosRecebidos from "../pages/prestador/PedidosRecebidos";
import criarTelaDeAbas from "./criarAbas";
import { opcoesPilha } from "./opcoesNavegacao";
import { TELAS_PERFIL } from "./telasPerfil";

const Pilha = createNativeStackNavigator();
const Abas = createBottomTabNavigator();

const AbasPrestador = criarTelaDeAbas(Abas, [
  { nome: "Painel", componente: PainelPrestador, titulo: "Meu pet shop", rotulo: "Início", icone: "view-dashboard-outline" },
  { nome: "Agenda", componente: AgendamentosRecebidos, titulo: "Agendamentos", rotulo: "Agenda", icone: "calendar-month-outline" },
  { nome: "Pedidos", componente: PedidosRecebidos, titulo: "Pedidos recebidos", rotulo: "Pedidos", icone: "inbox-arrow-down-outline" },
  { nome: "Catalogo", componente: Catalogo, titulo: "Catálogo", rotulo: "Catálogo", icone: "tag-multiple-outline" },
  { nome: "Perfil", componente: Perfil, titulo: "Perfil", rotulo: "Perfil", icone: "account-circle-outline" },
]);

const TELAS_PRESTADOR = [
  { nome: "DadosPetShop", componente: DadosPetShop, titulo: "Dados do pet shop" },
  { nome: "HorariosAtendimento", componente: HorariosAtendimento, titulo: "Horários de atendimento" },
  { nome: "FormularioProduto", componente: FormularioProduto, titulo: "Produto" },
  { nome: "FormularioServico", componente: FormularioServico, titulo: "Serviço" },
  { nome: "DetalhePedidoRecebido", componente: DetalhePedidoRecebido, titulo: "Pedido" },
  { nome: "DetalheAgendamentoRecebido", componente: DetalheAgendamentoRecebido, titulo: "Atendimento" },
  ...TELAS_PERFIL,
];

export default function PrestadorRoutes() {
  return (
    <Pilha.Navigator screenOptions={opcoesPilha}>
      <Pilha.Screen name="Abas" component={AbasPrestador} options={{ headerShown: false }} />
      {TELAS_PRESTADOR.map((tela) => (
        <Pilha.Screen key={tela.nome} name={tela.nome} component={tela.componente} options={{ headerTitle: tela.titulo }} />
      ))}
    </Pilha.Navigator>
  );
}
