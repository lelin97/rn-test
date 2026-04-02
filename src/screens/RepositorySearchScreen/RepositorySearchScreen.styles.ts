import { StyleSheet } from "react-native";

export const repositorySearchScreenStyles = StyleSheet.create({
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
    marginBottom: 16,
  },
  resultsArea: {
    flex: 1,
    marginTop: 14,
  },
  listContent: {
    paddingBottom: 24,
  },
  resultSummary: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 12,
  },
  loadMoreWrap: {
    paddingTop: 8,
    paddingBottom: 8,
    alignItems: "center",
  },
  loadMoreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4f46e5",
    backgroundColor: "#0f172a",
    minWidth: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  loadMoreButtonPressed: {
    opacity: 0.85,
  },
  loadMoreText: {
    color: "#818cf8",
    fontSize: 15,
    fontWeight: "700",
  },
});
