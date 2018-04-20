var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
const IconButton = (_a) => {
    var { onPress, name, size, font } = _a, props = __rest(_a, ["onPress", "name", "size", "font"]);
    const IconFont = font ? font : Ionicons;
    return (React.createElement(TouchableOpacity, Object.assign({ onPress: onPress }, props),
        React.createElement(IconFont, { name: name, size: size })));
};
Navigation.registerComponent('IconButton', () => IconButton);
//# sourceMappingURL=ScreenIconProps.js.map