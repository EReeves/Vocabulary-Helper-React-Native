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
    TextInput,
    KeyboardAvoidingView
} from "react-native";

// MainScreen direct dependencies
import styles from "./Style";
import { States, IMainState } from "./States";
import { NavigationButtons } from "./NavigationButtons";
import { NavBar } from "./NavBar";

// Utility
import palette from "../../util/Palette";
import { IconMap } from "../../util/IconMap";

// Third party
import Icon from "react-native-vector-icons/EvilIcons";
import * as Animatable from "react-native-animatable";

// Generic Components
import IconButton from "../../components/IconButton";
import { WordList } from "../../backend/WordList";

/** Import End */

export default class MainScreen extends React.Component<any, IMainState> {

    wordList: WordList;
    iconMap: IconMap;

    constructor(public props) {
        super(props);

        // Set up
        const _ = new NavigationButtons(props);
        this.state = States.GetMode(props.flashMode);
        this.iconMap = new IconMap();
        this.wordList = WordList.load(false);

        // Bind methods to .this
        this.toReviewMode = this.toReviewMode.bind(this);
        this.toEditMode = this.toEditMode.bind(this);
        this.toRevealedCard = this.toRevealedCard.bind(this);
    }

    /** Mode/State switching */

    toRevealedCard() {
        this.setState(States.flashModeRevealed);
    }

    toEditMode() {
        this.setState(States.editMode);
    }

    toReviewMode() {
        this.setState(States.reviewMode);
    }

    /** Mode/State switching END */


    render() {
        return (
            <Animatable.View
                animation="fadeIn"
                useNativeDriver={true}
                duration={500} // TODO: Store animation durations somewhere better.
                style={styles.container}>
                {/*Main card with vocab item*/}
                {this.header()}

                {/*Info below the vocab item*/}
                {this.middleView()}

                {/*Navigation like bar docked at the bottom*/}
                {this.navBar()}
            </Animatable.View>
        );
    }

    /** Views */

    // Individual list item elements.
    listItem(head: string, footer: string) {
        if (!this.state.editMode) {
            return (
                <View style={styles.listItemView}>
                    <Text style={styles.listItemLeft}>{head + ":"}</Text>
                    <Text style={styles.listItemRight}>{footer}</Text>
                </View>
            );
        }

        // Edit mode
        return (
            <View style={styles.listItemView}>
                <Text style={styles.listItemLeft}>{head + ":"}</Text>
                <TextInput style={styles.listItemRight}>{footer}</TextInput>
            </View>
        );
    }

    // Gets the middle view depending on the current mode.
    middleView() {
        let view;
        if (!this.props.flashMode || this.state.reveal) {
            view = (
                <Animatable.View
                    animation="bounceInRight"
                    useNativeDriver={
                        true // View with details.
                    }
                    duration={500}
                    style={styles.bottomInfo}>
                    <KeyboardAvoidingView
                        behavior="padding"
                    >
                        <FlatList
                            data={this.wordList.renderData()}
                            renderItem={({ item }) => this.listItem(item.key, item.value)}
                        />
                    </KeyboardAvoidingView>
                    {this.editButtons()}
                </Animatable.View>
            );
        } else {
            // View with a question mark button.
            view = (
                <Animatable.View
                    animation="fadeIn"
                    useNativeDriver={true}
                    duration={500}
                    style={styles.questionView}>
                    <IconButton
                        name="question"
                        size={palette.IconSizeHuge}
                        outerStyle={styles.questionButtonView}
                        onPress={() => this.toRevealedCard}
                    />
                </Animatable.View>
            );
        }
        return view;
    }

    // The large buttons placed just above the nav bar.
    editButtons() {
        // Edit mode only has a check button
        if (this.state.editMode) {
            return (
                <View style={styles.infoButtonHolder}>
                    <IconButton
                        name="check"
                        size={palette.IconSize}
                        outerStyle={styles.buttonView}
                        onPress={() => this.toReviewMode}
                    />
                </View>
            );
        }

        // All other modes(except flashcard mode(handled elsewhere)) have two.
        return (
            <View style={styles.infoButtonHolder}>
                <IconButton
                    name="pencil"
                    size={palette.IconSize}
                    outerStyle={styles.buttonView}
                    onPress={() => this.toEditMode}
                />
                <IconButton
                    name="arrow-right"
                    size={palette.IconSize}
                    outerStyle={styles.buttonView}
                    onPress={() => { }}
                />
            </View>
        );
    }

    navBar() {
        if (!this.state.editMode) {
            return (<NavBar />);
        }
        return; // Don't want it in edit mode.
    }

    // References needed for header animation. 
    // Syntax is a little strange but this is how it's done according to the docs.
    headerRef;
    handleHeaderRef = ref => this.headerRef = ref;

    // The header view, contains the vocab item and tags.
    header() {

        // Are we leaving or entering the view?
        const anim = this.state.editMode ? "bounceOutUp" : "bounceInDown";
        let style = styles.card;

        // Removes styling on the element after it disappears by animation.
        if (this.state.editMode) {
            style = this.state.mutable.headerTakeUpSpace ? style : this.state.mutable.headerStyle;
        }

        return (
            <Animatable.View
                animation={anim}
                useNativeDriver={false} // Native animations wont support height :(
                duration={400}
                style={style}
                ref={this.handleHeaderRef}
                onAnimationEnd={() => {
                    // Theres no great way to make this disappear. But this height estimation looks pretty good when in motion on any screen.
                    // First erase the style, removes the margins etc and replaces it with a static height.
                    this.setState({ mutable: { headerTakeUpSpace: false, headerStyle: { height: 220 } } });
                    // Then transition away smoothly.
                    this.headerRef.transition({ height: 220 }, { height: 0 });
                }}>
                <Text style={styles.characterText}>{this.wordList.currentWord.header}</Text>
                <View style={styles.tagView}>
                    <Text style={styles.tagText}>Chinese</Text>
                    <IconButton name="plus" size={palette.IconSizeTiny} onPress={() => { }} />
                </View>
            </Animatable.View>
        );
    }
}
