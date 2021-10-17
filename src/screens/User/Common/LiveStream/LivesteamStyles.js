import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default LiveStreamStyles = StyleSheet.create({
    contentWrapAll: {
        flex: 1,
        backgroundColor: "#111",
    },
    contentVideoWrap: {
        height,
    },
    contentWrapPadding: {
        flex: 1,
        backgroundColor: "#111",
        padding: 16
    },
    textBranco: {
        color: "#fff"
    },
    textCinza: {
        color: "#999"
    },
    horizontalAlign: {
        flexDirection: "row",
        alignItems: "center"
    },
    horizontalAlignJustify: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
    },
    flexJustify: {
        flex: 1,
        justifyContent: 'space-between',
    },
    flexSimple: {
        flex: 1,
    },
    titleModal: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff"
    },
    iconButtons: {
        padding: 16
    },
    inputs: {
        color: "#fff",
        paddingLeft: 16,
        paddingRight: 16,
        padding: Platform.OS === "ios" ? 16 : null,
        borderRadius: 10,
        backgroundColor: "#333",
        marginTop: 12,
        marginBottom: 12
    },
});