import { StyleSheet } from "react-native";
import palette from "../../util/palette";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "stretch",
        backgroundColor: palette.BackgroundLight,
        padding: 0
    },
    card: {
        flex: 2,
        backgroundColor: palette.White,
        borderColor: palette.Highlight,
        borderWidth: 6,
        borderRadius: 0,
        margin: 80,
        marginBottom: 0,
        marginTop: 30,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowRadius: 2,
        elevation: 4
    },
    characterText: {
        fontFamily: "NotoSans-Regular",
        fontSize: 68,
        margin: 10,
        color: palette.BackgroundDark,
        textAlignVertical: "center",
        textAlign: "center",
        textShadowColor: "#000",
        textShadowRadius: 4,
        elevation: 4
    },
    bottomInfo: {
        flex: 4,
        justifyContent: "flex-start",
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        marginBottom: 0,
        shadowColor: "#000",
        shadowRadius: 2,
        elevation: 2
    },
    listItemView: {
        flex: 2,
        flexDirection: "row",
        padding: 5,
        justifyContent: "center",
        backgroundColor: palette.BackgroundLight,
        shadowColor: "#555",
        marginBottom: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
        elevation: 1
    },
    listItemLeft: {
        flex: 1,
        justifyContent: "flex-start",
        fontWeight: "bold",
        fontSize: 20,
        color: palette.White,
        alignContent: "stretch",
        textAlignVertical: "bottom",
        textAlign: "left",
        textShadowColor: palette.BackgroundDark,
        textShadowRadius: 2
    },
    listItemRight: {
        flex: 1,
        fontSize: 18,
        color: palette.White,
        textAlign: "left",
        textAlignVertical: "bottom",
        alignContent: "center",
        textShadowColor: palette.BackgroundDark,
        textShadowRadius: 2
    },
    buttonView: {
        backgroundColor: palette.BackgroundLight,
        marginTop: 10,
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignContent: "stretch"
    },
    iconView: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: palette.BackgroundLight,
        padding: 10
    },
    bottomBar: {
        height: 48,
        backgroundColor: palette.BackgroundDark,
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 2,
        paddingLeft: 20,
        paddingRight: 20
    },
    bottomBarIcon: {
        margin: 2,
        justifyContent: "center",
        alignContent: "stretch"
    }
});
export default styles;
//# sourceMappingURL=Style.js.map