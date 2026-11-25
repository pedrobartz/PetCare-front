import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import cores from "../../theme/cores";

const MODOS = {
  primario: { mode: "contained" },
  secundario: { mode: "outlined" },
  texto: { mode: "text" },
  perigo: { mode: "outlined", textColor: cores.perigo },
};

export default function Botao({ children, variante = "primario", carregando = false, disabled, estilo, ...rest }) {
  const configuracao = MODOS[variante];

  return (
    <Button
      {...configuracao}
      loading={carregando}
      disabled={disabled || carregando}
      style={[styles.botao, variante === "perigo" && styles.perigo, estilo]}
      contentStyle={styles.conteudo}
      {...rest}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  botao: { marginVertical: 4 },
  conteudo: { paddingVertical: 4 },
  perigo: { borderColor: cores.perigo },
});
