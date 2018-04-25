import * as React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";

export class LoadingScreen extends React.Component {

render() {
    return (
        <View>
            <Icon name="spinner-2" size = {64} />
        </View>
    );
}

}