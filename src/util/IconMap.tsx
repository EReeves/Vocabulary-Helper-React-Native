import Ionicons from "react-native-vector-icons/Ionicons";
import Evilicons from "react-native-vector-icons/EvilIcons";
import palette from "./Palette";

const icons = {
    settings: [Evilicons, "gear", 32, palette.White],
    plus: [Ionicons, "md-add", 32, palette.White],
    "information-circled": [Ionicons, "information-circled", 32, palette.White],
    navicon: [Evilicons, "navicon", 32, palette.White],
    search: [Evilicons, "search", 32, palette.White],
};

let IconsMap = {};
let IconsLoaded = new Promise((resolve, reject) => {
    Promise.all(
        Object.keys(icons).map(iconName =>
            icons[iconName][0].getImageSource(
                icons[iconName][1],
                icons[iconName][2],
                icons[iconName][3]
            )
        )
    ).then(sources => {
        Object.keys(icons).forEach(
            (iconName, idx) => (IconsMap[iconName] = sources[idx])
        );
        resolve(true);
    });
});

export { IconsMap, IconsLoaded };
