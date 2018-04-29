import { StyleSheet } from "react-native";
import palette from "../../util/Palette";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
        backgroundColor: palette.BackgroundDark,
        padding: 0,
    },
    listView: {
        flex: 5,
        backgroundColor: palette.BackgroundLight,
        borderRadius: palette.CornerRadius,
        margin: palette.Margin,
        padding: palette.Twenty,
        justifyContent: "center",
        alignItems: "stretch",
        alignContent: "flex-start",
        shadowColor: "#000",
        shadowRadius: palette.Two,
        elevation: palette.Elevation,
    },
    searchView: {
        height: palette.BarSizeSmall,
        margin: palette.Margin,
        marginBottom: 0,
        backgroundColor: palette.BackgroundLight,
        borderRadius: palette.CornerRadius,
        elevation: palette.Elevation,
    },
    textInput: {
        padding: palette.Ten,
        fontSize: 22,
    },
    textView: {
        padding: palette.Ten,
        backgroundColor: palette.BackgroundLight,
        elevation: 1,
        shadowRadius: palette.Two,
        borderRadius: palette.CornerRadius
    },
    textItem: {
        fontSize: 28,
        textAlign: "center",
        elevation: 1,
        shadowRadius: palette.Two,
        marginBottom: palette.Five,
    }
});