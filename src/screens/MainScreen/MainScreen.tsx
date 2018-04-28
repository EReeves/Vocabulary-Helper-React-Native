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
        state.wordData = this.wordList.renderData(false);
        this.state = state;

        // onNavigatorEvent
        this.props.navigator.addOnNavigatorEvent((event) => this.onNavigatorEvent(event));
        // Back button handler
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        // Bind methods to .this
        this.toReviewMode = this.toReviewMode.bind(this);
        this.toEditMode = this.toEditMode.bind(this);
        this.toRevealedCard = this.toRevealedCard.bind(this);
        this.toNextItem = this.toNextItem.bind(this);
        this.toPreviousItem = this.toPreviousItem.bind(this);
        this.toggleStar = this.toggleStar.bind(this);
        this.onTextInput = this.onTextInput.bind(this);
    }

    /** Mode/State switching */

    toRevealedCard() {
        this.setState(States.flashModeRevealed);
    }

    toEditMode = () => {
        const newState = Object.assign({}, States.editMode);
        (newState.wordData as any) = this.state.currentWord.renderData(true);
        this.setState(newState);
    }

    toReviewMode() {
        this.setState(States.reviewMode);
    }

    toNextItem() {
        this.wordList.next();
        this.onWordNav();
    }

    toPreviousItem() {
        this.wordList.prev();
        this.onWordNav();
    }

    onWordNav() {
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

    toggleStar() {
        const starState = this.state.starred !== undefined ? !this.state.starred : true;

        this.setState({ starred: starState });
        this.state.currentWord.starred = starState;
    }

    onTextInput(key: string, text: string) {

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
        this.wordList.setWord(cw.id, cw);
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

    handleBackButtonClick() {
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
                    onSubmitEditing={(text) => this.onTextInput(head, text.nativeEvent.text)}
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
                                data={this.state.wordData}
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
                    <Text>Edit Card</Text>
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
                onPress={() => this.toEditMode}
            />
            <Text>New Card</Text>
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
            <Text>Next Card</Text>
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
        const anim = this.state.editMode ? "bounceOutUp" : "bounceInDown";
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

                onAnimationEnd={() => {

                    if (this.headerRef === null) return;

                    // Full update
                    const newState = Object.assign({}, this.state) as any;
                    newState.headerTakeUpSpace = false;
                    this.setState(newState);

                    this.headerRef.transition({ height: 220 }, { height: 0 });

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
