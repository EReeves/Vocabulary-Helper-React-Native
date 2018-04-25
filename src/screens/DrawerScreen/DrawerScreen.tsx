// React
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
} from "react-native";

// DrawerScreen direct dependencies
import { styles, DynamicStyles } from "./Style";
import { States, IDrawerState } from "./States";

// Thrid party dependencies
import Icon from "react-native-vector-icons/EvilIcons";

// Utility
import palette from "../../util/Palette";
import { IconMap } from "../../util/IconMap";

// Components
import IconButton from "../../components/IconButton";

// Navigation
import { NavigationIndex } from "../NavigationIndex";

/** Import End */

export default class DrawerScreen extends React.Component<any, IDrawerState> {
    constructor(public props) {
        super(props);
        this.state = States.GetMode(props.mutable.flashMode);
        this.state.mutable.fadeAnim = new Animated.Value(1);
    }

    render() {

        // Need a dynamic style to set opacity from animation
        const topStyle = DynamicStyles.topBar(this.state.mutable.fadeAnim);

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Animated.View style={topStyle}>
                        <TouchableNativeFeedback onPress={this.toggleMode} background={
                            TouchableNativeFeedback.Ripple(palette.Black, true)
                            // Ripple color // Ripple outside bounds
                        }>
                            <View style={styles.topBarContainer}>
                                <Icon name={this.state.modeIcon} size={72} color={palette.White} />
                                <Text style={styles.topButtonText}>
                                    {this.state.modeText}
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </Animated.View>
                </View>

                {/** Navigation buttons */}

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Vocab List</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Review</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Flashcards</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Settings</Text>
                    </View>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>About</Text>
                    </View>
                </View>
            </View>);
    }

    // Toggle between flashcard and review mode.
    toggleMode = () => {

        // Change to opposite state
        const newState = States.GetMode(!this.state.flashMode);
        newState.mutable.fadeAnim = new Animated.Value(0);
        this.setState(newState);

        // Animation
        Animated.timing(newState.mutable.fadeAnim, {
            toValue: 1,
            duration: 600,
        }).start();

        // Reset navigation to reload MainScreen
        this.props.navigator.resetTo(NavigationIndex.getScreenConfig({ flashMode: newState.flashMode }, "screens.MainScreen", "Vocabulary Helper"));
    }
}