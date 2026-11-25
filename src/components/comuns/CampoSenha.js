import { useState } from "react";
import { TextInput } from "react-native-paper";

import CampoTexto from "./CampoTexto";

export default function CampoSenha(props) {
  const [visivel, setVisivel] = useState(false);

  return (
    <CampoTexto
      {...props}
      icone="lock-outline"
      autoCapitalize="none"
      secureTextEntry={!visivel}
      right={
        <TextInput.Icon icon={visivel ? "eye-off-outline" : "eye-outline"} onPress={() => setVisivel(!visivel)} />
      }
    />
  );
}
