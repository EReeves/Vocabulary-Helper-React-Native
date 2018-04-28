
export interface IWordRenderData {
    [index: number]: { key: string, value: string };
}

export class Word {
    id: number;
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

    renderData?(isEditData: boolean): IWordRenderData {
        let arr = isEditData ? [{key: "Word", value: this.header || ""}] : [];
        arr = arr.concat(
        [
            { key: "Pronunciation", value: this.pronunciation || "" },
            { key: "Meaning", value: this.meaning || "" },
            { key: "Note", value: this.hint || "" },
            { key: "Example", value: this.example || "" },
        ]);
        return arr;
    }
}