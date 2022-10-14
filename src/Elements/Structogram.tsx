import React from "react";
import { Component } from "react";
import Statement from "./Statement";
import StatementObj from "./StatementObj";
import StatementItem from "./StatementItem";
import "./styles/Structogram.scss";

export default class Structogram extends Component<{json:any},{structure: StatementItem | null}> {
    constructor(props){
        super(props);
        this.state = {
            structure: StatementItem.FromJson(props.json)
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