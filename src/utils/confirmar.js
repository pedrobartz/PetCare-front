import { Alert } from "react-native";

export default function confirmar(titulo, mensagem, textoConfirmar = "Confirmar") {
  return new Promise((resolve) => {
    Alert.alert(titulo, mensagem, [
      { text: "Voltar", style: "cancel", onPress: () => resolve(false) },
      { text: textoConfirmar, style: "destructive", onPress: () => resolve(true) },
    ]);
  });
}
