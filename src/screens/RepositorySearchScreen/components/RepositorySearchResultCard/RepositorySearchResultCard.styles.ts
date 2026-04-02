import { StyleSheet } from "react-native";

export const repositorySearchResultCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  cardName: {
    color: "#f8fafc",
    fontSize: 17,
    fontWeight: "700",
  },
  cardOwner: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  cardMetaRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 12,
  },
  cardMeta: {
    color: "#a5b4fc",
    fontSize: 12,
    fontWeight: "600",
  },
});
