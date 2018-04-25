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
        flex: 2,
        backgroundColor: palette.BackgroundLight,
        borderRadius: palette.CornerRadius,
        margin: palette.Margin,
        padding: palette.Twenty,
        justifyContent: "center",
        alignItems: "center",
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
});