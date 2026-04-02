import { StyleSheet } from "react-native";

export const repositoryFavoriteToggleStyles = StyleSheet.create({
  favoriteAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 14,
    marginBottom: 18,
  },
  favoriteActionSaved: {
    backgroundColor: "#1e1b4b",
    borderColor: "#4f46e5",
  },
  favoriteActionUnsaved: {
    backgroundColor: "#0f172a",
    borderColor: "#4f46e5",
  },
  favoriteActionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#c4b5fd",
  },
});
