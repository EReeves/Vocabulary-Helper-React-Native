import Ionicons from "react-native-vector-icons/Ionicons";
import Evilicons from "react-native-vector-icons/EvilIcons";
import palette from "./Palette";

export class IconMap {

    public icons = {
        settings: [Evilicons, "gear", 32, palette.White],
        plus: [Ionicons, "md-add", 32, palette.White],
        "information-circled": [Ionicons, "information-circled", 32, palette.White],
        navicon: [Evilicons, "navicon", 32, palette.White],
        search: [Evilicons, "search", 32, palette.White],
        eye: [Evilicons, "eye", 32, palette.White],
    };

    public map = {};
    public iconsLoaded = new Promise((resolve, reject) => {
        Promise.all(
            Object.keys(this.icons).map(iconName =>
                this.icons[iconName][0].getImageSource(
                    this.icons[iconName][1],
                    this.icons[iconName][2],
                    this.icons[iconName][3]
                )
            )
        ).then(sources => {
            Object.keys(this.icons).forEach(
                (iconName, idx) => (this.map[iconName] = sources[idx])
            );
            resolve(true);
        });
    });
}

