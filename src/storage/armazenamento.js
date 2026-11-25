import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_SESSAO = "@petcare:sessao";
const CHAVE_MOEDA = "@petcare:moeda";

async function lerJson(chave) {
  try {
    const valor = await AsyncStorage.getItem(chave);
    return valor ? JSON.parse(valor) : null;
  } catch {
    return null;
  }
}

async function salvarJson(chave, valor) {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    return;
  }
}

async function remover(chave) {
  try {
    await AsyncStorage.removeItem(chave);
  } catch {
    return;
  }
}

export const sessaoStorage = {
  carregar: () => lerJson(CHAVE_SESSAO),
  salvar: (sessao) => salvarJson(CHAVE_SESSAO, sessao),
  limpar: () => remover(CHAVE_SESSAO),
};

export const moedaStorage = {
  carregar: () => lerJson(CHAVE_MOEDA),
  salvar: (moeda) => salvarJson(CHAVE_MOEDA, moeda),
};
