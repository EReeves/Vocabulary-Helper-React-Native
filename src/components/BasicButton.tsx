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
    viewStyle: {};
    textStyle: {};
}
/// Full fledged button using a vector icon and a ripple effect.
export default class BasicButton extends React.Component<IProps, {}> {

    render() {
        // ripple properties
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress()}
                background={TouchableNativeFeedback.Ripple(
                    palette.Black,
                    false
                )}>

            <View style={this.props.viewStyle}>

            <Text style={this.props.textStyle}>{this.props.title}</Text>

            </View>

            </TouchableNativeFeedback> 
        );
    }
}
