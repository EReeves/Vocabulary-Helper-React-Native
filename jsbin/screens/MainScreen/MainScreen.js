import * as React from "react";
import { Text, View, FlatList, ScrollView, } from "react-native";
import styles from "./Style";
import { IconsLoaded, IconsMap } from "../../util/IconMap";
import IconButton from "../../components/IconButton";
export default class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.itemData = [
            { key: "Pronunciation", value: "nĭ hăo" },
            { key: "Meaning", value: "Hello" },
            { key: "Hint", value: "It's a greeting you idiot..." },
            { key: "Example", value: "你好, 我叫云义多" },
        ];
        this.defineNavButtons(props);
    }
    defineNavButtons(props) {
        IconsLoaded.then(() => {
            props.navigator.setButtons({
                leftButtons: [
                    {
                        id: "navicon",
                        disableIconTint: true,
                        icon: IconsMap["navicon"],
                    },
                ],
                rightButtons: [
                    {
                        id: "search",
                        disableIconTint: true,
                        icon: IconsMap["search"],
                    },
                ],
                animated: true,
            });
        });
        props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
    onNavigatorEvent(event) {
        // this is the onPress handler for the two buttons together
        if (event.type == "NavBarButtonPress") {
            // this is the event type for button presses
            if (event.id == "navicon") {
                // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true,
                });
            }
        }
    }
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(View, { style: styles.card },
                React.createElement(Text, { style: styles.characterText }, "\u4F60\u597D")),
            React.createElement(View, { style: styles.bottomInfo },
                React.createElement(ScrollView, null,
                    React.createElement(FlatList, { data: this.itemData, renderItem: ({ item }) => listItem(item.key, item.value) }),
                    React.createElement(IconButton, { name: "pencil", size: 80, outerStyle: styles.buttonView, onPress: () => { } }))),
            React.createElement(View, { style: styles.bottomBar },
                React.createElement(IconButton, { name: "star", size: 32, outerStyle: styles.bottomBarIcon, onPress: () => { } }),
                React.createElement(IconButton, { name: "chevron-left", size: 32, outerStyle: styles.bottomBarIcon, onPress: () => { } }),
                React.createElement(IconButton, { name: "chevron-right", size: 32, outerStyle: styles.bottomBarIcon, onPress: () => { } }),
                React.createElement(IconButton, { name: "external-link", size: 32, outerStyle: styles.bottomBarIcon, onPress: () => { } }))));
    }
}
function listItem(head, footer) {
    return (React.createElement(View, { style: styles.listItemView },
        React.createElement(Text, { style: styles.listItemLeft }, head + ":"),
        React.createElement(Text, { style: styles.listItemRight }, footer)));
}
//# sourceMappingURL=MainScreen.js.map