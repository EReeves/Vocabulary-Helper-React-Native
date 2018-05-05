import { Word, IWordRenderData } from "./Word";
import firebase, { Firebase, RNFirebase } from "react-native-firebase";
import { Authentication } from "../backend/authentication/Authentication";
import { WordListBridge } from "./WordListBridge";


export class WordList {
    public words: Word[];
    public currentWord: Word;
    public currentWordPosition: number;
    private bridge: WordListBridge;

    private static _instance: WordList;
    public static instance(): WordList {

        if (WordList._instance === undefined) {
            throw new Error("WordList has yet to be loaded.");
        }
        return WordList._instance;
    }

    // Database
    private updates: Map<string, any>;
    private uid: string;
    public hasUpdates = false;

    private constructor(uid: string) {
        this.words = [];
        this.uid = uid;
        this.bridge = new WordListBridge(this.uid);

        this.bridge.load().then(
            (snapshot: RNFirebase.database.DataSnapshot) => {

                const value = snapshot.val();
                console.log(value);

                // Go though each item in the database for the user
                for (let i = 0; i < value.length; i++) {

                    const val = value[i];
                    if (val === null) continue; // blank item.

                    // Create a word and copy all its properties over.
                    const word = new Word();
                    for (const k in val) {
                        word[k] = val[k];
                    }
                    // Finally set
                    this.words[word.key] = word;
                }

                console.log(this.words);

            }
        );


    }

    public static load(replaceCurrent: boolean): WordList {

        // To be safe make sure it's explicity declared if we want to replace the wordlist if it already exists.
        if (!replaceCurrent && this._instance !== undefined) {
            return this._instance;
        }

        const auth = Authentication.instance();
        if (auth.user === undefined) {
            // This shouldn't happen, but crash anyway if they open the activity directly.
            throw new Error("Not logged in");
        }

        const wordList = new WordList(auth.user.uid);
        // TODO: populate;

        const bonjour = new Word({
            key: 0,
            header: "bonjour",
            meaning: "Hello",
            pronunciation: "/bɒn.ˈʒʊə/;",
            hint: "The greeting..",
            example: "Bonjour et Bonsoir",
            starred: false
        });

        const nihao = new Word({
            key: 1,
            header: "你好",
            meaning: "hello",
            pronunciation: "nĭ hăo",
            hint: "The greeting..",
            example: "你好，今天过得怎么样？",
            starred: true
        });

        wordList.words.push(bonjour);
        wordList.words.push(nihao);

        wordList.currentWordPosition = 0;
        wordList.currentWord = wordList.words[wordList.currentWordPosition];
        this._instance = wordList;
        return wordList;
    }

    // Adds a blank word and sets to the current word.
    public addNewPlaceholder(): Word {
        const newWord = new Word();
        newWord.key = this.words.length; // This is the last item + 1
        this.words.push(newWord);
        this.currentWordPosition = this.words.length;
        this.currentWord = this.words[this.words.length - 1];
        return this.currentWord;
    }

    // Sets a word in the list, also prepares word for database update if not otherwise specified.
    public setWord(key: number, word: Word, update?: boolean) {
        this.words[key] = word;

        if (update !== undefined && !update) return;
        this.bridge.setWord(key, word);
    }


    // Go to next word, wrap to the first item if none left.
    public next(): Word {
        this.currentWordPosition++;
        if (this.currentWordPosition > this.words.length - 1) {
            this.currentWordPosition = 0;
        }
        this.currentWord = this.words[this.currentWordPosition];
        return this.currentWord;
    }

    // Go to previous word, wrap to the last word if at the start.
    public prev(): Word {
        this.currentWordPosition--;
        if (this.currentWordPosition < 0) {


            this.currentWordPosition = this.words.length - 1;
        }
        this.currentWord = this.words[this.currentWordPosition];
        return this.currentWord;
    }

    // navigate to a certain key
    public toKey(key: number): Word {
        this.currentWordPosition = key;
        this.currentWord = this.words[this.currentWordPosition];
        return this.currentWord;
    }

}