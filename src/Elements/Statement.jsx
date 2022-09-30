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
        let children = null;
        if (props.children !== undefined && props.children !== null) {
            children = props.children
        }
        this.state = {
            button: this.getButton(),
            children: children,
            text: text,
        }
    }

    clearChildren = () => {
        this.setState({ children: null });
        this.setState({ button: this.getButton() });
    }

    addChildren = (children = this.state.children) => {
        if (children === undefined || children === null) return;
        this.setState({ children: (<Statement key={this.prop.key + 1}>{children}</Statement>)});
    }

    getMainPart = () => {
        switch (this.props.main) {
            case 'start':
                return "START";
            case 'if':
                return "IF STATEMENT"
            default:
                return this.state.text??"EMPTY STATEMENT";
        }
    }

    getButton = () => {
        let buttons = [<div className="action-button" onClick={this.clearChildren}>X</div>];
        buttons.push(<div className="action-button" onClick={this.addChildren}>+</div>);
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
