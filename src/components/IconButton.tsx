import * as React from "react";
import {
    View,
    TouchableNativeFeedback,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
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
    ionIcon?: boolean;
}
/// Full fledged button using a vector icon and a ripple effect.
export default class IconButton extends React.Component<IProps, {}> {
    styles = StyleSheet.create({
        buttonView: {
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
        },
        iconView: {
            justifyContent: "center",
            alignContent: "center",
        },
    });

    constructor(props) {
        super(props);

        this.iconView = this.iconView.bind(this);
    }

    render() {
        // ripple properties
        const borderless = this.props.borderless || true;
        const rippleColor = this.props.rippleColor || palette.Black;

        return (
            <View >
                <TouchableNativeFeedback
                    onPress={this.props.onPress()}
                    background={TouchableNativeFeedback.Ripple(
                        rippleColor,
                        borderless
                    )}
                >
                    <View style={this.props.outerStyle || this.styles.buttonView}>
                        {this.iconView()}
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }

    iconView() {
        if (this.props.ionIcon !== undefined && this.props.ionIcon) {
            return (<IonIcon
                name={this.props.name}
                color={this.props.color || palette.Text}
                size={this.props.size}
            />);
        }
        else {
            return (<Icon
                name={this.props.name}
                color={this.props.color || palette.Text}
                size={this.props.size}
            />);
        }

    }
}
