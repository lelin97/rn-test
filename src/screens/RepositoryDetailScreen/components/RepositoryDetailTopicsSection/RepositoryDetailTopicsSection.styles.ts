import { StyleSheet } from "react-native";

export const repositoryDetailTopicsSectionStyles = StyleSheet.create({
  sectionTitle: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 10,
  },
  topicsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicBadge: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
    color: "#818cf8",
    fontSize: 13,
    fontWeight: "500",
  },
});
