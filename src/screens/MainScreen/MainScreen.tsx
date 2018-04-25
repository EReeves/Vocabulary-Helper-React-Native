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
import { GlobalState } from "../../GlobalState";
import * as Animatable from "react-native-animatable";

// Generic Components
import IconButton from "../../components/IconButton";

/** Import End */

export default class MainScreen extends React.Component<any, IMainState> {

    iconMap: IconMap;

    constructor(public props) {
        super(props);
        const _ = new NavigationButtons(props);
        this.state = States.GetMode(props.flashMode);

        this.iconMap = new IconMap();
    }

    // TODO: replace with database data.
    itemData = [
        { key: "Pronunciation", value: "nĭ hăo" },
        { key: "Meaning", value: "Hello" },
        { key: "Hint", value: "It's a greeting.." },
        { key: "Example", value: "你好, 我叫云义多" },
    ];

    render() {
        return (
            <View style={styles.container}>
                {/*Main card with vocab item*/}
                <View style={styles.card}>
                    <Text style={styles.characterText}>你好</Text>
                    <View style={styles.tagView}>
                        <Text style={styles.tagText}>Chinese</Text>
                        <IconButton name="plus" size={20} onPress={() => { }} />
                    </View>
                </View>

                {/*Info below the vocab item*/}
                {this.middleView()}

                {/*Navigation like bar docked at the bottom*/}
                <NavBar />
            </View>
        );
    }

    listItem(head: string, footer: string) {
        return (
            <View style={styles.listItemView}>
                <Text style={styles.listItemLeft}>{head + ":"}</Text>
                <Text style={styles.listItemRight}>{footer}</Text>
            </View>
        );
    }

    revealCard() {
        this.setState(States.FlashModeRevealed);
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
                    <FlatList
                        data={this.itemData}
                        renderItem={({ item }) => this.listItem(item.key, item.value)}
                    />
                    <View style={styles.infoButtonHolder}>
                        <IconButton
                            name="pencil"
                            size={80}
                            outerStyle={styles.buttonView}
                            onPress={() => { }}
                        />
                        <IconButton
                            name="arrow-right"
                            size={80}
                            outerStyle={styles.buttonView}
                            onPress={() => { }}
                        />
                    </View>
                </Animatable.View>
            );
        } else {
            // View with a question mark button.
            view = (
                <View style={styles.questionView}>
                    <IconButton
                        name="question"
                        size={100}
                        outerStyle={styles.questionButtonView}
                        onPress={() => this.revealCard.bind(this)}
                    />
                </View>
            );
        }
        return view;
    }
}
