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
import { DrawerRouter } from "./DrawerRouter";

// Thrid party dependencies
import Icon from "react-native-vector-icons/EvilIcons";

// Utility
import palette from "../../util/Palette";
import { IconMap } from "../../util/IconMap";

// Components
import IconButton from "../../components/IconButton";
import BasicButton from "../../components/BasicButton";

// Navigation
import { NavigationIndex } from "../NavigationIndex";

/** Import End */

export default class DrawerScreen extends React.Component<any, IDrawerState> {
    router: DrawerRouter;

    constructor(public props) {
        super(props);

        const mode = props.mutable !== undefined &&
            props.mutable.flashMode !== null
            ? props.mutable.flashMode : false;
        this.state = States.GetMode(mode); // Use what's set else open in review mode.

        this.state.mutable.fadeAnim = new Animated.Value(1);

        console.log(this.props);

        this.router = new DrawerRouter();

        // Bind this to callback methods
        this.logOut = this.logOut.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.goFlashcard = this.goFlashcard.bind(this);
        this.goReview = this.goReview.bind(this);
    }

    render() {

        // Need a dynamic style to set opacity from animation
        const topStyle = DynamicStyles.topBar(this.state.mutable.fadeAnim);
        const tru = true;
        const fal = false;

        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Animated.View style={topStyle}>
                        <TouchableNativeFeedback onPress={() => { this.toggleMode(undefined); }} background={
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

                    <BasicButton title="Search" viewStyle={styles.button} textStyle={styles.buttonText} onPress={() => { }}></BasicButton>
                    <BasicButton title="Review" viewStyle={styles.button} textStyle={styles.buttonText} onPress={() => this.goReview}></BasicButton>
                    <BasicButton title="Flashcards" viewStyle={styles.button} textStyle={styles.buttonText} onPress={() => this.goFlashcard}></BasicButton>
                    <BasicButton title="Settings" viewStyle={styles.button} textStyle={styles.buttonText} onPress={() => { }}></BasicButton>
                    <BasicButton title="Logout" viewStyle={styles.button} textStyle={styles.buttonText} onPress={() => this.logOut}></BasicButton>

                </View>
            </View>);
    }

    // Toggle between flashcard and review mode. setMode optional parameter to specify the mode rather than toggle from current.
    toggleMode = (setMode?: boolean) => {

        // Change to opposite state
        const newState = setMode !== undefined ? Object.assign({}, States.GetMode(setMode)) : States.GetMode(!this.state.flashMode);
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

    goFlashcard() {
        this.toggleMode(true);
    }

    goReview() {
        this.toggleMode(false);
    }

    logOut() {
        this.router.logOut(this.props.navigator);
    }
}
