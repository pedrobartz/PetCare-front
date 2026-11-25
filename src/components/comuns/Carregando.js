import { ActivityIndicator, StyleSheet, View } from "react-native";

import cores from "../../theme/cores";

export default function Carregando() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={cores.primaria} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", backgroundColor: cores.fundo, flex: 1, justifyContent: "center", padding: 40 },
});
