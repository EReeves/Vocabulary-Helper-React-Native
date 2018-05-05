import firebase, { Firebase, RNFirebase } from "react-native-firebase";
import { Word } from "./Word";

// Bridges the word list with the database.
export class WordListBridge {

    // uid is used to interface with the database
    public constructor(public uid: string) {
        this.clearUpdates();
    }

    private updates: {};
    public hasUpdates = false;

    private clearUpdates = () => {

        this.updates = {};
        this.hasUpdates = false;
    }

    // gets a users words from the database, asyncro using a callback.
    async load(): Promise<RNFirebase.database.DataSnapshot> {
        const newKey = "/words/" + this.uid;
        return await firebase.database().ref(newKey).once("value");
    }

    // sets or updates a word for update.
    public setWord = (key: number, word: Word) => {
        const newKey = "/words/" + this.uid + "/" + key;
        this.updates[newKey] = word;
        this.hasUpdates = true;

        // TODO: remove, just to test..
        this.update().then(
            () => console.log("wow")
        ).catch(
            (reason) => console.log(reason)
        );
    }

    async update() {
        await firebase.database().ref().update(this.updates).catch((reason) => { throw new Error(reason); });
        this.clearUpdates();
    }

}