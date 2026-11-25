import { StyleSheet, View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function CampoTexto({ label, valor, aoAlterar, erro, icone, ...rest }) {
  return (
    <View style={styles.grupo}>
      <TextInput
        mode="outlined"
        label={label}
        value={valor}
        onChangeText={aoAlterar}
        error={Boolean(erro)}
        left={icone ? <TextInput.Icon icon={icone} /> : undefined}
        {...rest}
      />
      {erro ? <HelperText type="error">{erro}</HelperText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  grupo: { marginBottom: 10 },
});
