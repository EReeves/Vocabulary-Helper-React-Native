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
        flex: 4,
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
    editCard: {
        height: 220,
        backgroundColor: palette.BackgroundLight,
        borderRadius: palette.CornerRadius,
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
        textShadowColor: palette.TextShadowColor,
        textShadowOffset: palette.TextShadowOffset,
        textShadowRadius: palette.TextShadowRadius,
    },
    tagView: {
        flexDirection: "row",
    },
    tagText: {
        marginRight: palette.Margin,
        textShadowColor: palette.TextShadowColor,
        textShadowOffset: palette.TextShadowOffset,
        textShadowRadius: palette.TextShadowRadius,
    },
    tagTextNoMargin: {
        marginTop: palette.Margin,
        textShadowColor: palette.TextShadowColor,
        textShadowOffset: palette.TextShadowOffset,
        textShadowRadius: palette.TextShadowRadius,
    },
    bottomInfo: {
        flex: 7,
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
        padding: 20,
        paddingBottom: 0,

    },
    bottomInfoInner: {
        height: 200,
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
    listItemViewEdit: {
        flex: 2,
        flexDirection: "column",
        padding: palette.Five,
        justifyContent: "flex-start",
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
        textShadowColor: palette.TextShadowColor,
        textShadowOffset: palette.TextShadowOffset,
        textShadowRadius: palette.TextShadowRadius,
    },
    listItemRight: {
        flex: 1,
        fontSize: 18,
        color: palette.Text,
        textAlign: "left",
        textAlignVertical: "bottom",
        alignContent: "center",
        textShadowColor: palette.TextShadowColor,
        textShadowOffset: palette.TextShadowOffset,
        textShadowRadius: palette.TextShadowRadius,
    },
    buttonView: {
        backgroundColor: palette.BackgroundLight,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    infoButtonHolder: {
        flex: 5,
        margin: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
    },
    buttonTextPair: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    questionView: {
        flex: 7,
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
        margin: palette.Twenty,
        padding: palette.Ten,
    },
    editCheckView: {
        flex: 2,
        margin: palette.Margin,
        padding: palette.Margin,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
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
        margin: palette.Five,
        marginRight: 0,
        fontSize: 28,
        color: palette.BackgroundColor,
    }
});

export default styles;
