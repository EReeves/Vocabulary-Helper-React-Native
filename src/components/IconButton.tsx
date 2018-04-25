import * as React from "react";
import {
    View,
    TouchableNativeFeedback,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import palette from "../util/Palette";

interface IProps {
    name: string;
    onPress: Function;
    color?: string;
    size: number;
    outerStyle?: {};
    innerStyle?: {};
    borderless?: boolean; // will ripple through outer border by default.
    rippleColor?: string;
}
/// Full fledged button using a vector icon and a ripple effect.
export default class IconButton extends React.Component<IProps, {}> {
    styles = StyleSheet.create({
        buttonView: {
            backgroundColor: palette.BackgroundLight,
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
        },
        iconView: {
            justifyContent: "center",
            alignContent: "center",
        },
    });

    render() {
        // ripple properties
        const borderless = this.props.borderless || true;
        const rippleColor = this.props.rippleColor || palette.Black;

        return (
            <View style={this.props.outerStyle || this.styles.buttonView}>
                <TouchableNativeFeedback
                    onPress={this.props.onPress()}
                    background={TouchableNativeFeedback.Ripple(
                        rippleColor,
                        borderless
                    )}
                >
                    <View style={this.props.innerStyle || this.styles.iconView}>
                        <Icon
                            name={this.props.name}
                            color={this.props.color || palette.Text}
                            size={this.props.size}
                        />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
