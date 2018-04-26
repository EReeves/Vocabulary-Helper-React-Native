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
        this.iconMap = new IconMap();
        this.wordList = WordList.load(false);

        // Set state
        const state = States.GetMode(props.flashMode);
        state.currentWord = this.wordList.currentWord;
        state.wordData = this.wordList.renderData();
        this.state = state;

        // Bind methods to .this
        this.toReviewMode = this.toReviewMode.bind(this);
        this.toEditMode = this.toEditMode.bind(this);
        this.toRevealedCard = this.toRevealedCard.bind(this);
        this.toNextItem = this.toNextItem.bind(this);
        this.toPreviousItem = this.toPreviousItem.bind(this);
    }

    /** Mode/State switching */

    toRevealedCard() {
        this.setState(States.flashModeRevealed);
    }

    toEditMode = () => {
        this.setState(States.editMode);
    }

    toReviewMode() {
        this.setState(States.reviewMode);
    }

    toNextItem() {
        this.wordList.next();
        this.setState({
            currentWord: this.wordList.currentWord,
            wordData: this.wordList.renderData(),
            reveal: false
        });
        if (this.headerTextRef !== undefined) {
            this.headerTextRef.transition({ opacity: 0 }, { opacity: 1 });
        }
    }

    toPreviousItem() {
        this.wordList.prev();
        this.setState({
            currentWord: this.wordList.currentWord,
            wordData: this.wordList.renderData(),
            reveal: false
        });
        if (this.headerTextRef !== undefined) {
            this.headerTextRef.transition({ opacity: 0 }, { opacity: 1 });
        }
    }

    /** Mode/State switching END */


    render() {
        return (
            <Animatable.View
                animation="fadeIn"
                useNativeDriver={true}
                duration={palette.AnimationDefaultDuration}
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

        const editMode = this.state.editMode;

        return (editMode ?
            // Edit mode

            (<View style={styles.listItemView}>
                <Text style={styles.listItemLeft}>{head + ":"}</Text>
                <TextInput style={styles.listItemRight}>{footer}</TextInput>
            </View>)

            :

            (<View style={styles.listItemView}>
                <Text style={styles.listItemLeft}>{head + ":"}</Text>
                <Text style={styles.listItemRight}>{footer}</Text>
            </View>));

    }


    // Gets the middle view depending on the current mode.
    middleView() {
        let view;
        if (!this.props.flashMode || this.state.reveal) {
            view = (
                <Animatable.View
                    animation="slideInRight"
                    useNativeDriver={true}
                    duration={palette.AnimationDefaultDuration}
                    style={styles.bottomInfo}>

                    <FlatList
                        data={this.state.wordData}
                        extraData={this.state.editMode}
                        renderItem={({ item }) => this.listItem(item.key, item.value)}
                    />
                    {this.editButtons()}
                </Animatable.View>
            );
        } else {
            // View with a question mark button.
            view = (
                <Animatable.View
                    animation="slideInLeft"
                    useNativeDriver={true}
                    duration={palette.AnimationDefaultDuration}
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
                    onPress={() => this.toNextItem}
                />
            </View>
        );
    }

    navBar() {
        if (!this.state.editMode) {
            return (<NavBar
                leftCallback={() => this.toPreviousItem}
                rightCallback={() => this.toNextItem} />);
        }
        return; // Don't want it in edit mode.
    }

    // References needed for header animation. 
    headerRef;
    headerTextRef;

    // The header view, contains the vocab item and tags.
    header() {

        // Are we leaving or entering the view?
        const anim = this.state.editMode ? "bounceOutUp" : "bounceInDown";
        let style = styles.card;

        // Removes styling on the element after it disappears by animation.
        if (this.state.editMode) {
            style = this.state.headerTakeUpSpace ? style : this.state.mutable.headerStyle;
        }

        return (
            <Animatable.View
                animation={anim}
                useNativeDriver={false} // Native animations wont support height :(
                duration={palette.AnimationDefaultDuration}
                style={style}
                ref={handleHeaderRef => this.headerRef = handleHeaderRef}

                onAnimationEnd={() => {

                    if (this.headerRef === null) return;

                    // Full update
                    const newState = Object.assign({}, this.state) as any;
                    newState.headerTakeUpSpace = false;
                    newState.mutable = {
                        headerStyle: { height: 220 }
                    };
                    this.setState(newState);

                    this.headerRef.transition({ height: 220 }, { height: 0 });

                }}>
                <Animatable.Text
                    ref={handleHeaderTextRef => this.headerTextRef = handleHeaderTextRef}
                    duration={palette.AnimationDefaultDuration}
                    transition="opacity" style={styles.characterText}>{this.state.currentWord.header}</Animatable.Text>
                <View style={styles.tagView}>
                    <Text style={styles.tagText}>MyWords</Text>
                    <IconButton name="plus" size={palette.IconSizeTiny} onPress={() => { }} />
                </View>
            </Animatable.View>
        );

    }
}
