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
    KeyboardAvoidingView,
    BackHandler,
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
import RNExitApp from "react-native-exit-app";

// Generic Components
import FloatingSideButton from "../../components/FloatingSideButton";
import IconButton from "../../components/IconButton";
import { WordList } from "../../backend/WordList";
import { IWordRenderData } from "../../backend/Word";

/** Import End */

interface IProps {
    navigator: Navigator;
    wordList: WordList;
    wordKey: number;
}

export default class MainScreen extends React.Component<IProps, IMainState> {

    wordList: WordList;
    iconMap: IconMap;
    navButtons: NavigationButtons;

    constructor(public props) {
        super(props);

        // Set up
        this.wordList = WordList.load(false);
        this.props.wordList = this.wordList;
        this.navButtons = new NavigationButtons({ navigator: this.props.navigator, words: this.wordList.words });
        this.iconMap = new IconMap();


        // Set state
        const state = States.GetMode(props.flashMode);
        if (this.props.wordKey !== undefined) {
            this.wordList.toKey(this.props.wordKey);
        }
        state.currentWord = this.wordList.currentWord;
        state.wordData = this.wordList.renderData(false);
        this.state = state;

        console.log("constructor", this.props);


        // onNavigatorEvent
        this.props.navigator.addOnNavigatorEvent((event) => this.onNavigatorEvent(event));
        // Back button handler

    }

    /** Mode/State switching */

    toRevealedCard = () => {
        this.setState(States.flashModeRevealed);
    }

    toEditMode = () => {
        const newState = Object.assign({}, States.editMode);
        newState.headerTakeUpSpace = false;
        newState.currentWord = this.wordList.currentWord;
        (newState.wordData as any) = this.wordList.currentWord.renderData(true);
        this.setState(newState);

        if (this.headerRef === null) return;
        this.headerRef.transition({ height: 220 }, { height: 0 });
    }

    // This is just edit mode but we add a blank vocab item in.
    toAddMode = () => {
        const word = this.wordList.addNewPlaceholder();     

        this.toEditMode();
    }

    toReviewMode = () => {
        // Need to refresh word data too
        const newState = Object.assign({}, States.reviewMode);
        newState.currentWord = this.wordList.currentWord;
        newState.wordData = this.wordList.currentWord.renderData(false) as ReadonlyArray<any>;
        newState.starred = newState.currentWord.starred;
        this.setState(newState);
    }

    toNextItem = () => {
        this.wordList.next();
        this.onWordNav();
    }

    toPreviousItem = () => {
        this.wordList.prev();
        this.onWordNav();
    }

    onWordNav = () => {
        this.setState({
            currentWord: this.wordList.currentWord,
            wordData: this.wordList.renderData(this.state.editMode),
            reveal: false,
            starred: this.wordList.currentWord.starred
        });

        if (this.headerTextRef !== undefined) {
            this.headerTextRef.transition({ opacity: 0 }, { opacity: 1 });
        }
    }

    toggleStar = () => {
        const starState = this.state.starred !== undefined ? !this.state.starred : true;

        this.setState({ starred: starState });
        this.state.currentWord.starred = starState;
    }

    onTextInput = (key: string, text: string) => {

        console.log(key + text);
        const cw = this.state.currentWord;

        switch (key) {
            case "Word":
                cw.header = text;
                break;
            case "Pronunciation":
                cw.pronunciation = text;
                break;
            case "Meaning":
                cw.meaning = text;
                break;
            case "Note":
                cw.hint = text;
                break;
            case "Example":
                cw.example = text;
                break;
        }
        this.wordList.setWord(cw.key, cw);
        const data = cw.renderData(true) as any;
        const newState = Object.assign({}, this.state) as IMainState;
        newState.currentWord = cw;
        newState.wordData = data;
        this.setState(newState);
    }

    /** Mode/State switching END */

    /** Component overrides */

 

    componentWillMount() {

    }

    componentWillUnmount() {

    }

    onNavigatorEvent(event) {
        console.log(event);
        if (event.id === "backWithCheck" || event.id === "backPress") {
            this.handleBackButtonClick();
        }
    }

    /** Component overrides END */

    handleBackButtonClick = () => {
        if (this.state.editMode) {
            const newState = Object.assign({}, States.GetMode(this.state.flashMode));
            newState.editMode = false;
            newState.reveal = false;
            this.setState(newState);
            console.log("asd");
            return;
        }
        if (!this.state.reveal) {
            const newState = Object.assign({}, this.state) as IMainState;
            newState.reveal = true;
            this.setState(newState);
            return;
        }

        RNExitApp.exitApp();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animatable.View
                    animation="fadeIn"
                    useNativeDriver={true}
                    duration={palette.AnimationDefaultDuration}
                    style={styles.container}
                >



                    {/*Main card with vocab item*/}
                    {this.header()}

                    {/*Info below the vocab item*/}
                    {this.middleView()}

                    {/*Navigation like bar docked at the bottom*/}
                    {this.navBar()}



                </Animatable.View>

            </View>
        );
    }

    /** Views */

    // Individual list item elements.
    listItem(head: string, footer: string) {

        const editMode = this.state.editMode;

        return (editMode ?
            // Edit mode

            (<View style={styles.listItemViewEdit}>
                <Text style={styles.listItemLeft}>{head + ":"}</Text>
                <TextInput
                    onEndEditing={(text) => this.onTextInput(head, text.nativeEvent.text)}
                    style={styles.listItemRight}>{footer}</TextInput>
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
        const bottomInnerStyle = this.state.editMode ? {} : styles.bottomInfoInner;
        if (!this.props.flashMode || this.state.reveal) {
            view = (
                <Animatable.View
                    animation="slideInRight"
                    useNativeDriver={true}
                    duration={palette.AnimationDefaultDuration}
                    style={styles.bottomInfo}>
                    <View style={bottomInnerStyle}>
                        <KeyboardAvoidingView>
                            <FlatList
                                data={this.state.wordData as any}
                                extraData={this.state.editMode}
                                renderItem={({ item }) => this.listItem(item.key, item.value)}
                            />
                        </KeyboardAvoidingView>
                    </View>
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
                <View
                    style={styles.editCheckView}>

                    <IconButton
                        name="check"
                        size={palette.IconSize}
                        outerStyle={styles.buttonView}
                        onPress={() => this.toReviewMode}
                        borderless={false}
                    />

                </View>
            );
        }

        // All other modes(except flashcard mode(handled elsewhere)) have two.
        return (
            <View style={styles.infoButtonHolder}>
                <View style={styles.buttonTextPair}>
                    <IconButton
                        name="pencil"
                        size={palette.IconSize}
                        outerStyle={styles.buttonView}
                        onPress={() => this.toEditMode}
                    />
                    <Text style={styles.tagTextNoMargin}>Edit Card</Text>
                </View>
                {this.addButton()}
                {this.nextButton()}

            </View>
        );
    }

    addButton() {
        if (this.state.flashMode) return;

        return <View style={styles.buttonTextPair}>
            <IconButton
                name="plus"
                size={palette.IconSize}
                outerStyle={styles.buttonView}
                onPress={() => this.toAddMode}
            />
            <Text style={styles.tagTextNoMargin}>New Card</Text>
        </View>;
    }

    nextButton() {
        if (!this.state.flashMode) return;

        return <View style={styles.buttonTextPair}>
            <IconButton
                name="arrow-right"
                size={palette.IconSize}
                outerStyle={styles.buttonView}
                onPress={() => this.toNextItem}
            />
            <Text style={styles.tagTextNoMargin}>Next Card</Text>
        </View>;
    }

    navBar() {
        if (!this.state.editMode) {
            return (<NavBar
                leftCallback={() => this.toPreviousItem}
                rightCallback={() => this.toNextItem}
                starred={this.state.starred}
                starCallback={() => this.toggleStar} />);
        }
        return; // Don't want it in edit mode.
    }

    // References needed for header animation. 
    headerRef;
    headerTextRef;

    // The header view, contains the vocab item and tags.
    header() {

        // Are we leaving or entering the view?
        const anim = this.state.editMode ? "" : "bounceInDown"; // only animate in
        let style = styles.card;

        // Removes styling on the element after it disappears by animation.
        if (this.state.editMode) {
            style = this.state.headerTakeUpSpace ? styles.card : styles.editCard;
        }

        const star = this.state.starred ? "★" : "  ";
        const blank = "  ";

        return (
            <Animatable.View
                animation={anim}
                useNativeDriver={false} // Native animations wont support height :(
                duration={palette.AnimationDefaultDuration}
                style={style}
                ref={handleHeaderRef => this.headerRef = handleHeaderRef}
                onAnimationBegin={() => {

                }}>
                <View style={styles.headerStarView}>
                    <Text style={styles.headerStar}>{blank}</Text>
                    {this.headerText()}
                    <Text style={styles.headerStar}>{star}</Text>
                </View>
                <View style={styles.tagView}>
                    <Text style={styles.tagText}>MyWords</Text>
                    <IconButton name="plus" size={palette.IconSizeTiny} onPress={() => { }} />
                </View>
            </Animatable.View >
        );

    }

    headerText() {
        if (this.state.editMode) {
            return <TextInput>{this.state.currentWord.header}</TextInput>;
        }
        else {
            return <Animatable.Text
                ref={handleHeaderTextRef => this.headerTextRef = handleHeaderTextRef}
                duration={palette.AnimationDefaultDuration}
                transition="opacity" style={styles.characterText}>{this.state.currentWord.header}</Animatable.Text>;
        }
    }
}
