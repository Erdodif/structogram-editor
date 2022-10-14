export default class StatementItem {
    #main: String;
    #text: String | null;
    #extra: String | null;
    #child: StatementItem | null;
    #subContent: Array<StatementItem> | null;

    constructor(
        main: String = "normal",
        text: String | null = null,
        child: StatementItem | null = null,
        extra: String | null = null,
        subContent: Array<StatementItem> | null = null
    ) {
        this.#main = main;
        this.#text = text;
        this.#extra = extra;
        this.#child = child;
        this.#subContent = subContent;
    }

    getMain(): String {
        return this.#main;
    }
    getText(): String | null {
        return this.#text;
    }
    getExtra(): String | null {
        return this.#extra;
    }
    getChild(): StatementItem | null {
        return this.#child;
    }
    getSubContent(): Array<StatementItem> | null {
        return this.#subContent;
    }

    setMain(main): void {
        this.#main = main;
    }
    setText(text): void {
        this.#text = text;
    }
    setExtra(extra): void {
        this.#extra = extra;
    }

    clearChildren(): void {
        this.#child = null;
    }

    setChildRecursive(child): void {
        if (child === undefined) {
            child = { main: "empty" };
        }
        this.#child = new StatementItem(child.main, child.text, this.#child, child.extra)
    }

    appendsubContent(item): void {
        if (!Array.isArray(this.#subContent)) {
            this.#subContent = [item];
            return;
        }
        this.#subContent.push(item);
    }

    getMainPart(): String {
        switch (this.#main) {
            case 'start':
                return "START";
            case 'stop':
                return "STOP";
            case 'if':
                return this.#text ?? "IF STATEMENT"
            case 'switch':
                return this.#text ?? "SWITCH STATEMENT"
            case 'loop':
                return this.#text ?? "WHILE LOOP";
            case 'loop-reverse':
                return this.#text ?? "DO-WHILE LOOP";
            case 'skip':
                return "SKIP"
            case 'empty':
                return "-"
            default:
                return this.#text ?? "EMPTY STATEMENT";
        }
    }

    ToJson(): String {
        return JSON.stringify(this);
    }

    static FromJsonString(jsonString: string): StatementItem | null {
        return StatementItem.FromJson(JSON.parse(jsonString));
    }

    static FromJson(json: any): StatementItem | null {
        if (json === undefined) {
            return null;
        }
        let subContent;
        if (Array.isArray(json.subContent) && json.subContent.length > 0) {
            subContent = [];
            for (let item of json.subContent) {
                subContent.push(StatementItem.FromJson(item));
            }
        }
        else {
            subContent = StatementItem.FromJson(json.subContent);
        }
        return new StatementItem(json.main, json.text, json.child, json.extra, subContent);
    }

}