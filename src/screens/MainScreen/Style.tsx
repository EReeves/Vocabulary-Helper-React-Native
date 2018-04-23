import { StyleSheet } from "react-native";
import palette from "../../util/Palette";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
        backgroundColor: palette.BackgroundDark,
        padding: 0,
    },
    card: {
        flex: 2,
        backgroundColor: palette.BackgroundLight,
        borderRadius: palette.CornerRadius,
        margin: palette.Margin,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowRadius: 2,
        elevation: palette.Elevation,
    },
    characterText: {
        fontFamily: "NotoSans-Regular",
        fontSize: 78,
        margin: 0,
        color: palette.Text,
        textAlignVertical: "center",
        textAlign: "center",
        textShadowColor: "#000",
        textShadowRadius: 4,
        elevation: 4,
    },
    tagView: {
        flexDirection: 'row',
    },
    tagText: {
        marginRight: 10,       
    },
    bottomInfo: {
        flex: 3,
        borderRadius: palette.CornerRadius,
        justifyContent: "flex-start",
        margin: palette.Margin,
        marginTop: 0,
        shadowColor: "#000",
        shadowRadius: 2,
        elevation: palette.Elevation,
        backgroundColor: palette.BackgroundLight,
        padding: 30
    },
    listItemView: {
        flex: 2,
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
        marginBottom: 10,
        backgroundColor: palette.BackgroundLight,
        elevation: 1,
        shadowRadius: 2,
    },
    listItemLeft: {
        flex: 1,
        justifyContent: "flex-start",
        fontWeight: "bold",
        fontSize: 20,
        color: palette.Text,
        alignContent: "stretch",
        textAlignVertical: "bottom",
        textAlign: "left",
        textShadowColor: palette.Text,
        textShadowRadius: 2,
    },
    listItemRight: {
        flex: 1,
        fontSize: 18,
        color: palette.Text,
        textAlign: "left",
        textAlignVertical: "bottom",
        alignContent: "center",
        textShadowColor: palette.Text,
        textShadowRadius: 2,
    },
    buttonView: {
        backgroundColor: palette.BackgroundLight,
        marginTop: 25,
        flexDirection: "row",
        flex: 2,
        justifyContent: "center",
        alignContent: "center",
    },
    iconView: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: palette.BackgroundLight,
        padding: 10,
    },
    bottomBar: {
        height: 48,
        backgroundColor: palette.BackgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: palette.Elevation,
        shadowRadius: 2,
        paddingLeft: 20,
        paddingRight: 20,
    },
    bottomBarIcon: {
        margin: 2,
        justifyContent: "center",
        alignContent: "stretch",
    },
});

export default styles;
