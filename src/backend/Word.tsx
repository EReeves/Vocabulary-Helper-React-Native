
export interface IWordRenderData {
    [index: number]: { key: string, value: string };
}

export class Word {
    header: string;
    tags?: string[];
    meaning: string;
    pronunciation?: string;
    hint?: string;
    example?: string;
    starred: boolean;
    

    constructor(init?: Partial<Word>) {
        Object.assign(this, init);
    }

    renderData?(): IWordRenderData {
        return [
            { key: "Pronunciation", value: this.pronunciation || "" },
            { key: "Meaning", value: this.meaning },
            { key: "Hint", value: this.hint || "" },
            { key: "Example", value: this.example || "" },
        ];
    }
}