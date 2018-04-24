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

import styles from "./Style";
import Icon from "react-native-vector-icons/EvilIcons";
import palette from "../../util/Palette";
import { IconsLoaded, IconsMap } from "../../util/IconMap";
import IconButton from "../../components/IconButton";
import { GlobalState } from "../../GlobalState";
import { States, IMainState } from "./States";
import * as Animatable from "react-native-animatable";
import { NavigationButtons } from "./NavigationButtons";
import { NavBar } from "./NavBar";

export default class MainScreen extends React.Component<any, IMainState> {
   constructor(public props) {
      super(props);
      new NavigationButtons(props);
      this.state = States.GetMode(props.flashMode);
   }

   //TODO: replace with database data.
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
                  <IconButton name="plus" size={20} onPress={() => {}} />
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

   //Gets the middle view depending on the current mode.
   middleView() {
      let view = null;
      if (!this.props.flashMode || this.state.reveal) {
         view = (
            <Animatable.View
               animation="bounceInRight"
               useNativeDriver={
                  true //View with details.
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
                     onPress={() => {}}
                  />
                  <IconButton
                     name="arrow-right"
                     size={80}
                     outerStyle={styles.buttonView}
                     onPress={() => {}}
                  />
               </View>
            </Animatable.View>
         );
      } else {
         //View with a question mark button.
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
