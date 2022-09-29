import React from "react";
import { Component } from "react";
import "./styles/Statement.scss";

export default class Statement extends Component {

    constructor(props) {
        super(props);
        let children = null;
        if (props.children !== undefined) {
            children = props.children;
        }
        this.state = {
            button: this.getButton(),
            children: children,
        }
    }

    clearChildren = () => {
        this.setState({ children: null });
        this.setState({ button: this.getButton() });
    }

    addChildren = () => {
        let children = this.state.children;
        this.setState({children: children.push(<Statement key={children.length.toString}/>)});
    }

    getMainPart = () => {
        switch (this.props.main) {
            case 'start':
            default:
                return 'START';
        }
    }

    getButton = () => {
        /*if (this.state.children.length === 0) {
            return (<div>+</div>);
        }*/
        let buttons = [<div className="action-button" onClick={this.clearChildren}>X</div>];
        buttons.push(<div className="action-button" onClick={this.clearChildren}>+</div>);
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
