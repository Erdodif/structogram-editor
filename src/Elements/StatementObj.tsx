import React, { ReactHTMLElement } from "react";
import { Component } from "react";
import "./styles/Statement.scss";
import "./StatementItem";
import StatementItem from "./StatementItem";
//import json from"./structogram.json";

export default class StatementObj extends Component<{ self: StatementItem }, { self: StatementItem, button }> {

    constructor(props) {
        super(props);
        this.state = {
            self: props.self as StatementItem,
            button: this.getButton()
        }
    }

    clearChildren: () => void = () => {
        let self = this.state.self;
        self.clearChildren();
        this.setState({ self: self });
        this.setState({ button: this.getButton() });
    }

    getButton: () => JSX.Element | Array<JSX.Element> = () => {
        let buttons = [
            <div className="action-button" key="clear" onClick={this.clearChildren}>🗑</div>,
            /*<div className="action-button" key="modify" onClick={this.modifine}>🛠</div>,*/
            <div className="action-button" key="log" onClick={() => console.log(this.ToJson())}>log</div>
        ]
        buttons.push(<div className="action-button" key="add" onClick={() => this.state.self.setChildRecursive}>📎</div>);
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

    render(): JSX.Element {
        //this.props.self.setMain("Moma");
        console.log(this.state.self)
        return (
            <div className={`statement ${this.state.self.getMain()} ${this.state.self.getExtra()}`}>
                <div className="main">
                    {this.state.self.getMainPart()}
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

    ToJson: () => String = () => this.state.self.ToJson()

    static FromJson(json): JSX.Element | null {
        return this.FromObject(StatementItem.FromJson(json));
    }

    static FromObject(object): JSX.Element | null {
        if (object === undefined) {
            return null;
        }
        return <StatementObj self={object}></StatementObj>;
    }

    getChildElement: () => JSX.Element | null = () => {
        return StatementObj.FromObject(this.props.self.getChild());
    }

    getSubContentElements: () => Array<JSX.Element> | null = () => {
        let subContent: JSX.Element[] = [];
        if (!Array.isArray(this.state.self.getSubContent())) {
            return null;
        }
        for (const item of this.state.self.getSubContent() ?? []) {
            subContent.push((StatementObj.FromObject(item))!);
        }
        return subContent;
    }
}
