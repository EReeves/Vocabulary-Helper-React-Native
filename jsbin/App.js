import React, { PureComponent } from 'react';
import { View } from 'react-native';
export default class App extends PureComponent {
    constructor() {
        super(...arguments);
        this.handlePressSettings = () => {
            alert('Pressed settings!');
        };
    }
    componentWillMount() {
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    component: 'IconButton',
                    passProps: {
                        font: Ionicons,
                        name: 'ion-information-circled',
                        size: 24,
                        color: 'white',
                        onPress: this.handlePressSettings,
                    },
                },
            ],
        });
    }
    render() {
        return (React.createElement(View, { style: { flex: 1 } }));
    }
}
//# sourceMappingURL=App.js.map