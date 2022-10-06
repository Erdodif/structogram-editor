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

    componentDidMount(){
        this.setState({json: this.ToJson()});
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

    render() {
        return (
            <div className={`statement ${this.props.main}`}>
                <div className="main">
                    {this.getMainPart()}
                </div>
                <div className="content">
                    {this.state.children}
                </div>
                {this.state.button}
            </div>
        );
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
        return <Statement main={json.main} text={json.text} key={key}>{children}</Statement>;
    }

    ArrayToJson = (statements) => {
    }

    // Statement.jsx:111 Uncaught TypeError: _this.state.children.ToJson is not a function
    ToJson = () => {
        return { 
            main: this.state.main, 
            text: this.state.text, 
            children: {} //this.state.children.state.json 
        }
        /*let childrenJson;
        childrenJson = [];
        if (this.state?.children !== undefined && this.state?.children !== null) {
            if (Array.isArray(this.state.children)) {
                for (const child of this.state.children) {
                    childrenJson.push(child.ToJson());
                }
            }
            else {
                console.log(this.state.children);
                childrenJson = this.state.children[0].ToJson();
            }
        }
        return { main: this.state.main, text: this.state.text, children: childrenJson }*/
        //
        /*
        let children;
        if (this.state.children !== undefined) {
            if (Array.isArray(this.state.children) && this.state.children.length > 0) {
                children = [];
                for (const child of this.state.children) {
                    children.push(child.ToJson);
                    if (child.className) {
                    }
                }
            }
            else {
                children = this.state.children.ToJson();
            }
        }
        else {
            children = null;
        }
        return {
            main: this.state.main,
            text: this.state?.text,
            children: children
        };
        */
    }
}
