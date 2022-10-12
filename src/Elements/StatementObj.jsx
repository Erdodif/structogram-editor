import React from "react";
import { Component } from "react";
import "./styles/Statement.scss";
import "./StatementItem";
import StatementItem from "./StatementItem";
//import json from"./structogram.json";

export default class StatementObj extends Component {

    constructor(props) {
        super(props);
        this.state = {
            button: this.getButton(),
            main: props.self.getMain() ?? "normal",
            child: props.self.getChild(),
            text: props.self.getText() ?? null
        }
    }

    clearChildren = () => {
        this.setState({ children: null });
        this.setState({ button: this.getButton() });
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
        this.props.self.setMain("Moma");
        return (
            <div className={`statement ${this.props.main} ${this.props.extra}`}>
                <div className="main">
                    {this.getMainPart()}
                    {this.state.button}
                </div>
                <div className="sub-content">
                    {this.getSubContentElements()}
                </div>
                <div className="content">
                    {this.getChildElement()}
                </div>
            </div>
        );
    }

    ToJson = () => this.props.self.ToJson()

    static FromJson(json) {
        return this.FromObject(StatementItem.FromJson(json));
    }

    static FromObject(object) {
        if (object === undefined) {
            return null;
        }
        return <StatementObj self={object}></StatementObj>;
    }

    getChildElement = ()=>{
        return StatementObj.FromObject(this.props.self.child);
    }

    getSubContentElements = () => {
        let subContent = [];
        if (!Array.isArray(this.props.self.subContent)) {
            return null;
        }
        for (const item of this.props.self.subContent) {
            subContent.push(StatementObj.FromObject(item));
        }
        return subContent;
    }
}
