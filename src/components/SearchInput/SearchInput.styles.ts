import { StyleSheet } from "react-native";

export const searchInputStyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
    marginBottom: 16,
    paddingLeft: 12,
    paddingRight: 14,
    minHeight: 52,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#f8fafc",
    fontSize: 18,
    paddingVertical: 22,
    paddingHorizontal: 0,
  },
});
