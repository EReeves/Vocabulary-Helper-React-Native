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
    TextInput,
    Keyboard
} from "react-native";

import { styles } from "./Style";
import Icon from "react-native-vector-icons/EvilIcons";
import palette from "../../util/Palette";
import { IconMap } from "../../util/IconMap";
import IconButton from "../../components/IconButton";
import BasicButton from "../../components/BasicButton";
import { NavigationIndex } from "../NavigationIndex";
import { WordList } from "../../backend/WordList";
import { Word } from "../../backend/Word";

interface IProps {
    wordList: WordList;
    navigator: Navigator;
}

export default class ListScreen extends React.Component<IProps, any> {
    constructor(public props) {
        super(props);
        this.state = {
            visibleWords: this.props.words
        };

        this.props.navigator.addOnNavigatorEvent((event) => this.onNavigatorEvent(event));

        this.onTextChanged = this.onTextChanged.bind(this);
        this.list = this.list.bind(this);
        this.onNavigatorEvent = this.onNavigatorEvent.bind(this);
    }
    render() {
        return <View style={styles.container}>
            <View style={styles.searchView}>
                <TextInput style={styles.textInput} underlineColorAndroid="#fff0" autoFocus={true} placeholder="Type a word or character" onChangeText={(text) => this.onTextChanged(text)} />
            </View>
            <View style={styles.listView} >
                {this.list()}
            </View>
        </View>;
    }

    list() {
        if (this.state.visibleWords !== undefined) {
            console.log(this.state.visibleWords);
            return (<FlatList style={{}}
                data={this.state.visibleWords}
                keyExtractor={(item, index) => item.key.toString()}
                renderItem={({ item, index }) => this.listItem(item)}
                keyboardShouldPersistTaps="always"
            ></FlatList>);
        }

        return undefined;
    }

    onTextChanged(text: string) {

        if (text === "" || text === undefined) {
            this.setState({ visibleWords: this.props.words });
        }

        text = text.toLowerCase();
        const words = this.props.words;
        const visible = [];
        for (let i = 0; i < this.props.words.length; i++) {
            const word = words[i];
            if (word.header.toLowerCase().includes(text) || word.meaning.toLowerCase().includes(text)) {
                visible.push(word);
            }
        }
        this.setState({ visibleWords: visible });
    }


    listItem(item: Word) {

        // man I had JS lambdas/react-natives function binding. 
        // The class function was buggy about passing properties to react-native-navigation for whatever reason. This works.
        const fun = () => {
            Keyboard.dismiss();
            const key = item.key;
            this.props.navigator.resetTo(NavigationIndex.getScreenConfig({ flashMode: false, wordKey: key }, "screens.MainScreen", "Vocabulary Helper"));
        };

        return (<View>
            <BasicButton title={item.header} onPress={() => fun} viewStyle={styles.textView} textStyle={styles.textItem} />
        </View>);
    }

    onNavigatorEvent(event) {
        if (event.id === "backWithCheck" || event.id === "backPress") {
            Keyboard.dismiss();

            this.props.navigator.resetTo(NavigationIndex.getScreenConfig({ flashMode: false }, "screens.MainScreen", "Vocabulary Helper"));
        }
    }
} 