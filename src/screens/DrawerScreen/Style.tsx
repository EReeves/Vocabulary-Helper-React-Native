import { StyleSheet } from "react-native";
import palette from "../../util/Palette";

export class DynamicStyles {
    public static topBar(opacityVal: number) {
        return {
            height: 168,
            backgroundColor: palette.BackgroundColor,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            elevation: palette.Elevation + 2,
            shadowColor: "#000",
            shadowRadius: 2,
            paddingLeft: 20,
            paddingRight: 20,
            marginBottom: 0,
            opacity: opacityVal,
        };
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "stretch",
        backgroundColor: palette.BackgroundDark,
        padding: 0,
    },
    topBar: {
        height: 168,
        backgroundColor: palette.BackgroundColor,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
        alignItems: "stretch",
        elevation: palette.Elevation + 2,
        shadowColor: "#000",
        shadowRadius: 2,

        marginBottom: 0,
    },
    topBarContainer: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    topButtonText: {
        color: palette.White,
        fontSize: 24,
        textAlign: "center",
    },
    buttonContainer: {
        flex: 1,
        marginTop: palette.Margin,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        backgroundColor: palette.BackgroundLight,
    },
    button: {
        height: 48,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
    },
    buttonText: {
        color: palette.Text,
        fontSize: 24,
        textAlign: "center",
    },
    bottomView: {
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
        backgroundColor: palette.BackgroundLight,
    },
    bottomIcon: {},
});
