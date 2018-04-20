import * as React from "react";
import { View, TouchableNativeFeedback, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import palette from "../util/palette";
export default class IconButton extends React.Component {
    constructor() {
        super(...arguments);
        this.styles = StyleSheet.create({
            buttonView: {
                backgroundColor: palette.BackgroundLight,
                marginTop: 30,
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                alignContent: "stretch"
            },
            iconView: {
                justifyContent: "center",
                alignContent: "center",
                padding: 10
            }
        });
    }
    render() {
        //ripple properties
        let borderless = this.props.borderless || true;
        let rippleColor = this.props.rippleColor || palette.White;
        return React.createElement(View, { style: this.props.outerStyle || this.styles.buttonView },
            React.createElement(TouchableNativeFeedback, { onPress: this.props.onPress(), background: TouchableNativeFeedback.Ripple(rippleColor, borderless) },
                React.createElement(View, { style: this.props.innerStyle || this.styles.iconView },
                    React.createElement(Icon, { name: this.props.name, color: this.props.color || palette.White, size: this.props.size }))));
    }
}
//# sourceMappingURL=IconButton.js.map