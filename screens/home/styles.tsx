import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
      },
      markerWrap: {
        alignItems: "center",
        justifyContent: "center",
      },
      ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
      }
});