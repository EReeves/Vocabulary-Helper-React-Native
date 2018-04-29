import { IconMap } from "../../util/IconMap";
import { NavigationIndex } from "../NavigationIndex";
import { Alert } from "react-native";
import * as React from "react";

// Helper to define buttons in the nabigation bar.
export class NavigationButtons {

    constructor(public props) {
        console.log(props);
        const iconMap = new IconMap();

        iconMap.iconsLoaded.then(() => {
            props.navigator.setButtons({
                leftButtons: [
                    {
                        id: "navicon",
                        disableIconTint: true,
                        icon: iconMap.map["navicon"],
                    },
                ],
                rightButtons: [
                    {
                        id: "searchpress",
                        disableIconTint: true,
                        icon: iconMap.map["search"],
                    },
                ],
                animated: true,
            });
        });

        props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        // this is the onPress handler for the two buttons together
        if (event.type === "NavBarButtonPress") {
            // this is the event type for button presses
            if (event.id === "navicon") {
                // this is the same id field from the static navigatorButtons definition
                this.props.navigator.toggleDrawer({
                    side: "left",
                    animated: true,
                });
            }


            if (event.id === "searchpress") {
                this.props.navigator.push(NavigationIndex.getScreenConfig({words: this.props.words}, "screens.ListScreen", "Search"));
            }
        }
    }

}
