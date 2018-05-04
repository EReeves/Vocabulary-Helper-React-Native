import { Word, IWordRenderData } from "./Word";

export class WordList {
    public words: Word[];

    public currentWord: Word;
    public currentWordPosition: number;

    private static _instance: WordList;
    public static instance(): WordList {

        if (WordList._instance === undefined) {
            throw new Error("WordList has yet to be loaded.");
        }
        return WordList._instance;
    }

    constructor() {
        this.words = [];
    }

    public static load(replaceCurrent: boolean): WordList {

        // To be safe make sure it's explicity declared if we want to replace the wordlist if it already exists.
        if (!replaceCurrent && this._instance !== undefined) {
            return;
        }

        const wordList = new WordList();
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
        return wordList;
    }

    // Adds a blank word and sets to the current word.
    public addNewPlaceholder(): Word {
        const newWord = new Word();
        newWord.key = this.words.length - 1;
        this.words.push(newWord);
        this.currentWordPosition = this.words.length;
        this.currentWord = this.words[this.words.length - 1];
        return this.currentWord;
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

    public setWord(key: number, word: Word) {
        this.words[key] = word;
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

    public toKey(key: number): Word {
        this.currentWordPosition = key;
        this.currentWord = this.words[this.currentWordPosition];
        return this.currentWord;
    }

    public renderData(isEditMode: boolean): ReadonlyArray<any> {
        return this.currentWord.renderData(isEditMode) as ReadonlyArray<any>;
    }

}