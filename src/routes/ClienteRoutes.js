import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetalheAgendamento from "../pages/agenda/DetalheAgendamento";
import DetalhePetShop from "../pages/agenda/DetalhePetShop";
import MeusAgendamentos from "../pages/agenda/MeusAgendamentos";
import NovoAgendamento from "../pages/agenda/NovoAgendamento";
import PetShops from "../pages/agenda/PetShops";
import HomeCliente from "../pages/cliente/HomeCliente";
import Carrinho from "../pages/loja/Carrinho";
import Checkout from "../pages/loja/Checkout";
import Confirmacao from "../pages/loja/Confirmacao";
import DetalhePedido from "../pages/loja/DetalhePedido";
import DetalheProduto from "../pages/loja/DetalheProduto";
import MeusPedidos from "../pages/loja/MeusPedidos";
import Pagamento from "../pages/loja/Pagamento";
import Produtos from "../pages/loja/Produtos";
import Enderecos from "../pages/perfil/Enderecos";
import FormularioEndereco from "../pages/perfil/FormularioEndereco";
import HistoricoPagamentos from "../pages/perfil/HistoricoPagamentos";
import Perfil from "../pages/perfil/Perfil";
import DetalhePet from "../pages/pets/DetalhePet";
import FormularioPet from "../pages/pets/FormularioPet";
import MeusPets from "../pages/pets/MeusPets";
import criarTelaDeAbas from "./criarAbas";
import { opcoesPilha } from "./opcoesNavegacao";
import { TELAS_PERFIL } from "./telasPerfil";

const Pilha = createNativeStackNavigator();
const Abas = createBottomTabNavigator();

const AbasCliente = criarTelaDeAbas(Abas, [
  { nome: "Inicio", componente: HomeCliente, titulo: "PetCare", rotulo: "Início", icone: "home-outline" },
  { nome: "Agenda", componente: MeusAgendamentos, titulo: "Meus agendamentos", rotulo: "Agenda", icone: "calendar-month-outline" },
  { nome: "Loja", componente: Produtos, titulo: "Loja", rotulo: "Loja", icone: "shopping-outline" },
  { nome: "Pets", componente: MeusPets, titulo: "Meus pets", rotulo: "Pets", icone: "paw" },
  { nome: "Perfil", componente: Perfil, titulo: "Perfil", rotulo: "Perfil", icone: "account-circle-outline" },
]);

const TELAS_CLIENTE = [
  { nome: "DetalheProduto", componente: DetalheProduto, titulo: "Produto" },
  { nome: "ProdutosDoPetShop", componente: Produtos, titulo: "Produtos da loja" },
  { nome: "Carrinho", componente: Carrinho, titulo: "Carrinho" },
  { nome: "Checkout", componente: Checkout, titulo: "Finalizar pedido" },
  { nome: "Pagamento", componente: Pagamento, titulo: "Pagamento" },
  { nome: "Confirmacao", componente: Confirmacao, titulo: "Confirmado", semVoltar: true },
  { nome: "MeusPedidos", componente: MeusPedidos, titulo: "Meus pedidos" },
  { nome: "DetalhePedido", componente: DetalhePedido, titulo: "Pedido" },
  { nome: "PetShops", componente: PetShops, titulo: "Escolha o pet shop" },
  { nome: "DetalhePetShop", componente: DetalhePetShop, titulo: "Pet shop" },
  { nome: "NovoAgendamento", componente: NovoAgendamento, titulo: "Agendamento" },
  { nome: "DetalheAgendamento", componente: DetalheAgendamento, titulo: "Agendamento" },
  { nome: "DetalhePet", componente: DetalhePet, titulo: "Perfil do pet" },
  { nome: "FormularioPet", componente: FormularioPet, titulo: "Pet" },
  { nome: "Enderecos", componente: Enderecos, titulo: "Endereços" },
  { nome: "FormularioEndereco", componente: FormularioEndereco, titulo: "Endereço" },
  { nome: "HistoricoPagamentos", componente: HistoricoPagamentos, titulo: "Pagamentos" },
  ...TELAS_PERFIL,
];

export default function ClienteRoutes() {
  return (
    <Pilha.Navigator screenOptions={opcoesPilha}>
      <Pilha.Screen name="Abas" component={AbasCliente} options={{ headerShown: false }} />
      {TELAS_CLIENTE.map((tela) => (
        <Pilha.Screen
          key={tela.nome}
          name={tela.nome}
          component={tela.componente}
          options={{ headerTitle: tela.titulo, headerBackVisible: !tela.semVoltar, gestureEnabled: !tela.semVoltar }}
        />
      ))}
    </Pilha.Navigator>
  );
}
