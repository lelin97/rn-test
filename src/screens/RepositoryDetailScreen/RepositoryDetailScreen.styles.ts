import { StyleSheet } from "react-native";

export const repositoryDetailScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090d1a",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
    gap: 6,
  },
  backText: {
    color: "#818cf8",
    fontSize: 18,
    fontWeight: "600",
  },
});
