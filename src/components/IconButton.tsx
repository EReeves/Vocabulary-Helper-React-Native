import PropTypes from "prop-types";
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

interface Props {
    name: string;
    onPress: Function;
    color?: string;
    size: number;
    outerStyle?: {};
    innerStyle?: {};
    borderless?: boolean; //will ripple through outer border by default.
    rippleColor?: string;
}
///Full fledged button using a vector icon and a ripple effect.
export default class IconButton extends React.Component<Props, {}> {
    styles = StyleSheet.create({
        buttonView: {
            backgroundColor: palette.BackgroundLight,
            marginTop: 30,
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignContent: "stretch",
        },
        iconView: {
            justifyContent: "center",
            alignContent: "center",
            padding: 10,
        },
    });

    render() {
        //ripple properties
        let borderless = this.props.borderless || true;
        let rippleColor = this.props.rippleColor || palette.White;

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
                            color={this.props.color || palette.White}
                            size={this.props.size}
                        />
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
