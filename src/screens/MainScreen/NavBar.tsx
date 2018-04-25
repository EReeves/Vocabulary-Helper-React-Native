import * as React from "react";
import {
    View,
    TouchableNativeFeedback,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import palette from "../../util/Palette";
import styles from "./Style";
import IconButton from "../../components/IconButton";


// Navigation bar for the MainScreen;
export class NavBar extends React.Component<{}, {}> {

    render() {
        const iconSize = 38;

        return <View style={styles.bottomBar}>
              <IconButton name="star" color={palette.White} size={iconSize} outerStyle={styles.bottomBarIcon} onPress={() => {}} />
              <IconButton name="chevron-left" color={palette.White} size={iconSize} outerStyle={styles.bottomBarIcon} onPress={() => {}} />
              <IconButton name="chevron-right" color={palette.White} size={iconSize} outerStyle={styles.bottomBarIcon} onPress={() => {}} />
              <IconButton name="external-link" color={palette.White} size={iconSize} outerStyle={styles.bottomBarIcon} onPress={() => {}} />
           </View>;
    }
}