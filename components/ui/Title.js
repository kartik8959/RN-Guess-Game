import { Text, StyleSheet } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    borderColor: "white",
    borderWidth: 2,
    padding: 12,
    color: "white",
    textAlign: "center",
    fontFamily: "open-sans-bold",
  },
});
