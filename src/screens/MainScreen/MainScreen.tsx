import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ScrollView,
  TouchableNativeFeedback
} from "react-native";

import styles from "./Style";
import Icon from "react-native-vector-icons/MaterialIcons";
import palette from "../../util/palette";
import { IconsLoaded, IconsMap } from "../../util/IconMap";
import IconButton from "../../components/IconButton";

export default class MainScreen extends React.Component {
  constructor(public props) {
    super(props);
    this.defineNavButtons(props);
  }

  defineNavButtons(props) {
    IconsLoaded.then(() => {
      props.navigator.setButtons({
        leftButtons: [
          {
            id: "navicon",
            disableIconTint: true,
            icon: IconsMap["navicon"]
          }
        ],
        rightButtons: [
          {
            id: "search",
            disableIconTint: true,
            icon: IconsMap["search"]
          }
        ],
        animated: true
      });
    });

    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    // this is the onPress handler for the two buttons together
    if (event.type == "NavBarButtonPress") {
      // this is the event type for button presses
      if (event.id == "navicon") {
        // this is the same id field from the static navigatorButtons definition
        this.props.navigator.toggleDrawer({
          side: "left", // the side of the drawer since you can have two, 'left' / 'right'
          animated: true // does the toggle have transition animation or does it happen immediately (optional)
        });
      }
    }
  }

  itemData = [
    { key: "Pronunciation", value: "nĭ hăo" },
    { key: "Meaning", value: "Hello" },
    { key: "Hint", value: "It's a greeting you idiot..." },
    { key: "Example", value: "你好, 我叫云义多" }
  ];

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.characterText}>你好</Text>
        </View>

        <View style={styles.bottomInfo}>
          <ScrollView>
            <FlatList
              data={this.itemData}
              renderItem={({ item }) => listItem(item.key, item.value)}
            />
            <IconButton
              name="pencil"
              size={80}
              outerStyle={styles.buttonView}
              onPress={() => {}}
            />
          </ScrollView>
        </View>
        <View style={styles.bottomBar}>
          <IconButton
            name="star"
            size={32}
            outerStyle={styles.bottomBarIcon}
            onPress={() => {}}
          />
          <IconButton
            name="chevron-left"
            size={32}
            outerStyle={styles.bottomBarIcon}
            onPress={() => {}}
          />
          <IconButton
            name="chevron-right"
            size={32}
            outerStyle={styles.bottomBarIcon}
            onPress={() => {}}
          />
          <IconButton
            name="external-link"
            size={32}
            outerStyle={styles.bottomBarIcon}
            onPress={() => {}}
          />
        </View>
      </View>
    );
  }
}

function listItem(head: string, footer: string) {
  return (
    <View style={styles.listItemView}>
      <Text style={styles.listItemLeft}>{head + ":"}</Text>
      <Text style={styles.listItemRight}>{footer}</Text>
    </View>
  );
}
