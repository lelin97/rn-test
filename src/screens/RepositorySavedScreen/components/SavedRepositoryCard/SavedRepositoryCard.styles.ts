import { StyleSheet } from "react-native";

export const savedRepositoryCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardContent: {
    flex: 1,
    marginRight: 12,
  },
  owner: {
    color: "#818cf8",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 2,
  },
  name: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  description: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 20,
  },
  starIcon: {
    paddingTop: 2,
  },
  deleteAction: {
    backgroundColor: "#7f1d1d",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    marginLeft: 10,
    marginBottom: 12,
  },
});
