export default class StatementItem {
    #main;
    #text;
    #extra;
    #child;
    #subContent

    constructor(main = "normal", text = null,child = null, extra = null, subContent = null) {
        this.#main = main;
        this.#text = text;
        this.#extra = extra;
        this.#child = child;
        this.#subContent = subContent;
    }

    getMain(){
        return this.#main;
    }
    getText(){
        return this.#text;
    }
    getExtra(){
        return this.#extra;
    }
    getChild(){
        return this.#child;
    }
    getSubContent(){
        return this.#subContent;
    }

    setMain(main) {
        this.#main = main;
    }
    setText(text) {
        this.#text = text;
    }
    setExtra(extra) {
        this.#extra = extra;
    }

    clearChildren() {
        this.#child = null;
    }

    setChildRecursive(child) {
        this.#child = new StatementItem(child.main,child.text,this.#child,child.extra)
    }

    appendsubContent(item) {
        if (!Array.isArray(this.#subContent)) {
            this.#subContent = [item];
            return;
        }
        this.#subContent.push(item);
    }

    static FromJsonString(jsonString){
        return StatementItem.FromJson(JSON.parse(jsonString));
    }

    static FromJson(json) {
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

    ToJson() {
        return JSON.stringify(this);
    }

}