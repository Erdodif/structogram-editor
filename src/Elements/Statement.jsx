import React from "react";
import { Component } from "react";
import "./styles/Statement.scss";

export default class Statement extends Component {

    constructor(props) {
        super(props);
        let children = null;
        if(props.children !== undefined){
            children = props.children;
        }
        this.state = {
            button: this.getButton(),
            children: children,
        }
    }

    clearChildren = () => {
        this.setState({ children: [] });
        this.setState({ button: this.getButton() });
    }

    getMainPart = () => {
        switch (this.props.main){
            case 'start':
            default:
                return 'START';
        }
    }

    getButton = () => {
        if (this.state.children.length === 0) {
            return (<div>+</div>);
        }
        return (<div onClick={this.clearChildren}>X</div>);
    }

    render() {
        return (
            <div className="statement">
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
