import React from "react";
import { Component } from "react";
import Statement from "./Statement";
import StatementObj from "./StatementObj";
import StatementItem from "./StatementItem";
import "./styles/Structogram.scss";
import json from"./structogram.json";

export default class Structogram extends Component {
    constructor(props){
        super(props);
        this.state = {
            structure: StatementItem.FromJson(json)
        };
    }

    render() {
        return (
            <div className="structogram">
                {StatementObj.FromObject(this.state.structure)}
            </div>
        );
    }
}