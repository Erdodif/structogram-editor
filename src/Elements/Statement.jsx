import React from "react";
import { Component } from "react";
import "./styles/Statement.scss";
//import json from"./structogram.json";

export default class Statement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            button: this.getButton(),
            main: props?.main ?? "normal",
            children: props?.children,
            text: props?.text ?? null
        }
    }

    componentDidMount() {
        this.setState({ json: this.ToJson() });
    }

    clearChildren = () => {
        this.setState({ children: null });
        this.setState({ button: this.getButton() });
    }

    addChildren = () => {
        if (this.state.main === "if") {
            switch (this.state.children?.count) {
                case 2:
                    return;
                case 1:
                    this.setState({ children: [this.state.children, <Statement key={1} />] });
                    return;
                default:
                    this.setState({ children: [<Statement key={0} />, <Statement key={1} />] });
                    return;
            }
        }
        this.setState({ children: (<Statement>{this.state.children}</Statement>) });
    }

    getMainPart = () => {
        switch (this.state.main) {
            case 'start':
                return "START";
            case 'if':
                return this.state.text ?? "IF STATEMENT"
            case 'switch':
                return this.state.text ?? "SWITCH STATEMENT"
            case 'loop':
                return this.state.text ?? "WHILE LOOP";
            case 'loop-reverse':
                return this.state.text ?? "DO-WHILE LOOP";
            case 'skip':
                return "SKIP"
            case 'empty':
                return "-"
            default:
                return this.state.text ?? "EMPTY STATEMENT";
        }
    }

    getButton = () => {
        let buttons = [
            <div className="action-button" key="clear" onClick={this.clearChildren}>🗑</div>,
            <div className="action-button" key="modify" onClick={this.modifine}>🛠</div>,
            <div className="action-button" key="log" onClick={() => console.log(this.ToJson())}>log</div>
        ];
        buttons.push(<div className="action-button" key="add" onClick={this.addChildren}>📎</div>);
        return (
            <div className="buttons">
                {buttons}
            </div>
        );
    }

    ensureStartingElements() {
        //TODO, 
        //ifs and switches needs to have at least 3 children
        //loops should have 2 at least
    }

    render() {
        return (
            <div className={`statement ${this.props.main} ${this.props.extra}`}>
                <div className="main">
                    {this.getMainPart()}
                    {this.state.button}
                </div>
                <div className="sub-content">
                    {this.getContent().subContent}
                </div>
                <div className="content">
                    {this.getContent().onlyChild}
                </div>
            </div>
        );
    }

    getContent = () => {
        let out = {children:null,onlyChild:null}
        if (Array.isArray(this.state.children)) {
            out.children = [];
            let length = this.state.children.length;
            if (this.state.main === "if"){
                switch (length){
                    case 0:
                        return {
                            children: [<Statement main="empty" key={0}/>,<Statement main="empty" key={-1}/>],
                            onlyChild: out.onlyChild
                        }
                    case 1:
                        out.children = this.state.children;
                        out.children.push(<Statement main="empty" key="-1"/>);
                        return { subContent: this.state.children, onlyChild: out.onlyChild };
                    case 2:
                        return { subContent: this.state.children, onlyChild: out.onlyChild };
                    default:
                }
            }
            if (this.state.main === "switch" && length < 3) {
                return { subContent: this.state.children, onlyChild: out.onlyChild }

            }
            for (const child of this.state.children) {
                out.children.push(child);
            }
            out.onlyChild = out.children[out.children.length - 1]
            out.children.pop();
        }
        else {
            out.onlyChild = this.state.children;
        }
        return { subContent: out.children, onlyChild: out.onlyChild }
    }

    static FromJson(json, key = 0) {
        if (json === undefined) {
            return null;
        }
        let children;
        if (Array.isArray(json.children) && json.children.length > 0) {
            children = [];
            for (let index in json?.children) {
                children.push(this.FromJson(json.children[index], index));
            }
        }
        else {
            children = this.FromJson(json.children, 0);
        }
        return <Statement main={json.main} text={json.text} key={key} extra={json.extra}>{children}</Statement>;
    }

    ToJson = () => {
        return {
            main: this.state.main,
            text: this.state.text,
            children: {
                //TODO
            }
        }
    }
}
