import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function Selo({ texto, cor }) {
  return (
    <View style={[styles.selo, { borderColor: cor, backgroundColor: `${cor}1A` }]}>
      <Text style={[styles.texto, { color: cor }]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selo: { alignSelf: "flex-start", borderRadius: 12, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 2 },
  texto: { fontSize: 11, fontWeight: "bold" },
});
