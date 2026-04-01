import { StyleSheet } from "react-native";

export const repositoryDetailInfoCardStyles = StyleSheet.create({
  card: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 14,
    padding: 20,
    marginBottom: 20,
  },
  name: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  fullName: {
    color: "#818cf8",
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    color: "#94a3b8",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statLabel: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    color: "#cbd5e1",
    fontSize: 14,
  },
});
