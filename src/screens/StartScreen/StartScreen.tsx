import * as React from "react";
import { View } from "react-native";
import firebase from "react-native-firebase";
// Components to display when the user is LoggedIn and LoggedOut
// Screens for logged in/out - outside the scope of this tutorial
import MainScreen from "../MainScreen/MainScreen";
import LoginScreen from "../LoginScreen/LoginScreen";

interface IStartProperties {
   loading: boolean;
   user: any;
}

export default class StartScreen extends React.Component<{}, IStartProperties> {
   authSubscription: () => void;

   constructor(props) {
      super(props);
      this.state = {
         loading: true,
         user: null,
      };
   }
   /**
    * When the App component mounts, we listen for any authentication
    * state changes in Firebase.
    * Once subscribed, the 'user' parameter will either be null
    * (logged out) or an Object (logged in)
    */
   componentDidMount() {
      this.authSubscription = firebase.auth().onAuthStateChanged(user => {
         this.setState({
            loading: false,
            user,
         });
      });
   }
   /**
    * Don't forget to stop listening for authentication state changes
    * when the component unmounts.
    */
   componentWillUnmount() {
      this.authSubscription();
   }

   render() {
      // The application is initialising
      if (this.state.loading) return <LoginScreen />;
      // The user is an Object, so they're logged in
      if (this.state.user != null) return <MainScreen />;
      // The user is null, so they're logged out
      return <LoginScreen />;
   }
}
