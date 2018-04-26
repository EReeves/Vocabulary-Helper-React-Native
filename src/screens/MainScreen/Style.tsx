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
        padding: palette.Twenty,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowRadius: palette.Two,
        elevation: palette.Elevation,
        marginBottom: 0,
    },
    characterText: {
        fontFamily: "NotoSans-Regular",
        fontSize: 78,
        margin: 0,
        color: palette.Text,
        textAlignVertical: "center",
        textAlign: "center",
        textShadowColor: "#000",
        textShadowRadius: palette.Two,
        elevation: 4,
    },
    tagView: {
        flexDirection: "row",
    },
    tagText: {
        marginRight: palette.Margin,
    },
    bottomInfo: {
        flex: 5,
        borderRadius: palette.CornerRadius,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        alignContent: "stretch",
        margin: palette.Margin,
        shadowColor: "#000",
        shadowRadius: palette.Two,
        elevation: palette.Elevation,
        backgroundColor: palette.BackgroundLight,
        padding: 30,
        paddingBottom: 0,
    },
    listItemView: {
        flex: 2,
        flexDirection: "row",
        padding: palette.Five,
        justifyContent: "center",
        marginBottom: palette.Margin,
        backgroundColor: palette.BackgroundLight,
        elevation: 1,
        shadowRadius: palette.Two,
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
        textShadowRadius: palette.Two,
    },
    listItemRight: {
        flex: 1,
        fontSize: 18,
        color: palette.Text,
        textAlign: "left",
        textAlignVertical: "bottom",
        alignContent: "center",
        textShadowColor: palette.Text,
        textShadowRadius: palette.Two,
    },
    buttonView: {
        backgroundColor: palette.BackgroundLight,
        marginTop: palette.Thirty,
        flexDirection: "row",
        flex: 6,
        margin: 30,
        paddingTop: 30,
        paddingBottom: 30
        ,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    infoButtonHolder: {

        marginBottom: palette.Thirty,
        flexDirection: "row",
        justifyContent: "center"
    },
    questionView: {
        flex: 5,
        borderRadius: palette.CornerRadius,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: palette.Margin,

        shadowColor: "#000",
        shadowRadius: palette.Two,
        elevation: palette.Elevation,
        backgroundColor: palette.BackgroundLight,
        padding: palette.Thirty,
    },
    questionButtonView: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        margin: palette.Thirty,
        padding: palette.Thirty,
    },
    iconView: {
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: palette.BackgroundLight,
        padding: palette.Ten,
    },
    bottomBar: {
        height: palette.BarSizeSmall,
        backgroundColor: palette.BackgroundColor,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: palette.Elevation,
        shadowRadius: palette.Two,
        paddingLeft: palette.Twenty,
        paddingRight: palette.Twenty,
    },
    bottomBarIcon: {
        margin: palette.Two,
        justifyContent: "center",
        alignContent: "stretch",
    },
    invisible: {
        height: 0,
        width: 0
    },
    headerStarView: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    headerStar: {
        margin: palette.Margin,
        marginRight: 0,
        fontSize: 24,
    }
});

export default styles;
