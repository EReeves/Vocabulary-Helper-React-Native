import * as React from "react";
import {
    View,
    TouchableNativeFeedback,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import palette from "../util/Palette";

interface IProps {
    title: string;
    onPress: Function;
}
/// Full fledged button using a vector icon and a ripple effect.
export default class FloatingSideButton extends React.Component<IProps, {}> {

    render() {
        // ripple properties
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress()}
                background={TouchableNativeFeedback.Ripple(
                    palette.DarkGrey,
                    false
                )}>

                <View style={this.styles.buttonStyle}>

                    <Text numberOfLines={1} style={this.styles.textStyle}>{this.props.title}</Text>

                </View>

            </TouchableNativeFeedback>
        );
    }

    styles = StyleSheet.create({
        buttonStyle: {
            backgroundColor: palette.BackgroundColor,
            height: 100,
            width: 84,
            borderRadius: palette.CornerRadius,
            alignItems: "flex-start",
            alignContent: "flex-start",
            padding: 0,
            marginBottom: 0,
            justifyContent: "center",
            position: "absolute",
            right: -50,
            top: 150,
            shadowColor: "#000000",
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            },
        
        },
        textStyle: {
            color: palette.White,
            transform: [{ rotate: "90deg" }, { translateY: 15}],
        
            textAlign: "left",
            margin:  0,
        }
    });
}
