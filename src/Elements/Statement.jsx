import React from "react";
import { Component } from "react";
import "./styles/Statement.scss";

export default class Statement extends Component {

    constructor(props) {
        super(props);
        let text = null;
        if (props.text !== undefined) {
            text = props.children;
        }
        this.state = {
            button: this.getButton(),
            children: props?.children,
            text: text,
        }
    }

    clearChildren = () => {
        this.setState({ children: null });
        this.setState({ button: this.getButton() });
    }

    addChildren = () => {
        console.log(this.state.children);
        console.log(<Statement>{this.state.children}</Statement>);
        this.setState({ children: (<Statement>{this.state.children}</Statement>)});
    }

    getMainPart = () => {
        switch (this.props.main) {
            case 'start':
                return "START";
            case 'if':
                return "IF STATEMENT"
            case 'skip':
                return "SKIP"
            default:
                return this.state.text??"EMPTY STATEMENT";
        }
    }

    getButton = () => {
        let buttons = [
            <div className="action-button" key="clear" onClick={this.clearChildren}>🗑</div>,
            <div className="action-button" key="modify" onClick={this.modifine}>🛠</div>
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
}
