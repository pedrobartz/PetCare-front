import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

import ItemMenu from "../../components/comuns/ItemMenu";
import SeletorOpcoes from "../../components/comuns/SeletorOpcoes";
import Tela from "../../components/comuns/Tela";
import TituloSecao from "../../components/comuns/TituloSecao";
import { MOEDAS } from "../../constants/moedas";
import { useAuth } from "../../contexts/AuthContext";
import { useMoeda } from "../../contexts/MoedaContext";
import useCotacao from "../../hooks/useCotacao";
import cores from "../../theme/cores";
import confirmar from "../../utils/confirmar";
import { formatarPreco } from "../../utils/formatadores";

const ITENS_CONTA = [
  { icone: "account-edit-outline", titulo: "Editar nome", destino: "EditarPerfil" },
  { icone: "lock-reset", titulo: "Alterar senha", destino: "AlterarSenha" },
];

const ITENS_CLIENTE = [
  { icone: "map-marker-outline", titulo: "Endereços", subtitulo: "Locais de entrega", destino: "Enderecos" },
  { icone: "shopping-outline", titulo: "Meus pedidos", subtitulo: "Compras da loja", destino: "MeusPedidos" },
  { icone: "receipt-text-outline", titulo: "Histórico de pagamentos", destino: "HistoricoPagamentos" },
];

const ITENS_PRESTADOR = [
  { icone: "storefront-outline", titulo: "Dados do pet shop", subtitulo: "Nome, endereço e telefone", destino: "DadosPetShop" },
  { icone: "clock-outline", titulo: "Horários de atendimento", destino: "HorariosAtendimento" },
];

function iniciais(nome) {
  return nome
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join("");
}

export default function Perfil({ navigation }) {
  const { usuario, ehCliente, sair } = useAuth();
  const { moeda, alterarMoeda } = useMoeda();
  const taxa = useCotacao(moeda);
  const itensPapel = ehCliente ? ITENS_CLIENTE : ITENS_PRESTADOR;

  async function aoSair() {
    const confirmado = await confirmar("Sair", "Deseja sair da sua conta?", "Sair");
    if (confirmado) sair();
  }

  function renderizarItens(itens) {
    return itens.map((item) => (
      <ItemMenu
        key={item.destino}
        icone={item.icone}
        titulo={item.titulo}
        subtitulo={item.subtitulo}
        aoPressionar={() => navigation.navigate(item.destino)}
      />
    ));
  }

  return (
    <Tela>
      <View style={styles.cabecalho}>
        <Avatar.Text size={64} label={iniciais(usuario.name)} style={styles.avatar} />
        <View style={styles.dados}>
          <Text variant="titleLarge" style={styles.nome}>
            {usuario.name}
          </Text>
          <Text variant="bodyMedium" style={styles.secundario}>
            {usuario.email}
          </Text>
          <Text variant="labelMedium" style={styles.tipo}>
            {ehCliente ? "Cliente" : "Pet shop"}
          </Text>
        </View>
      </View>

      <TituloSecao titulo={ehCliente ? "Minha conta" : "Meu pet shop"} />
      <View style={styles.grupo}>{renderizarItens(itensPapel)}</View>

      <TituloSecao titulo="Segurança" />
      <View style={styles.grupo}>{renderizarItens(ITENS_CONTA)}</View>

      {ehCliente ? (
        <>
          <TituloSecao titulo="Moeda de exibição" />
          <SeletorOpcoes opcoes={MOEDAS} selecionado={moeda} aoSelecionar={alterarMoeda} />
          {taxa ? (
            <Text variant="bodyMedium" style={styles.cotacao}>
              Cotação: 1 {moeda} = {formatarPreco(taxa)}
            </Text>
          ) : null}
          <Text variant="bodySmall" style={styles.dica}>
            Os preços são convertidos pela cotação atual. Pagamentos são cobrados em reais.
          </Text>
        </>
      ) : null}

      <View style={[styles.grupo, styles.sair]}>
        <ItemMenu icone="logout" titulo="Sair" cor={cores.perigo} aoPressionar={aoSair} />
      </View>
    </Tela>
  );
}

const styles = StyleSheet.create({
  cabecalho: { alignItems: "center", flexDirection: "row", gap: 16 },
  avatar: { backgroundColor: cores.primaria },
  dados: { flex: 1 },
  nome: { color: cores.texto, fontWeight: "bold" },
  secundario: { color: cores.textoSecundario },
  tipo: { color: cores.primaria, marginTop: 4 },
  grupo: { borderColor: cores.bordaClara, borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  cotacao: { color: cores.primaria, fontWeight: "bold", marginTop: 8 },
  dica: { color: cores.textoSecundario, marginTop: 6 },
  sair: { marginTop: 24 },
});
