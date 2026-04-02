import { StyleSheet } from "react-native";

export const repositorySavedScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090d1a",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  title: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 15,
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 24,
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    paddingVertical: 14,
    marginTop: 4,
  },
  swipeHintText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },
});
