import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    ScrollView,
    TouchableNativeFeedback,
    Animated,
    Easing,
    TextInput
} from "react-native";

import { styles } from "./Style";
import Icon from "react-native-vector-icons/EvilIcons";
import palette from "../../util/Palette";
import { IconMap } from "../../util/IconMap";
import IconButton from "../../components/IconButton";
import { NavigationIndex } from "../NavigationIndex";

export default class ListScreen extends React.Component<any, any> {
    constructor(props) {
        super(props)
    }
    render() {
        return <View style={styles.container}>
            <View style={styles.searchView}>
                <TextInput style={styles.textInput} underlineColorAndroid="#fff0" autoFocus={true} placeholder="Type a word or character" />
            </View>
            <View style={styles.listView} />
        </View>;
    }
}