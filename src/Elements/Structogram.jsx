import React from "react";
import { Component } from "react";
import Statement from "./Statement";
import "./styles/Structogram.scss";

export default class Structogram extends Component {
    render() {
        return (
            <div className="structogram">
                <Statement main="if" key={"0"}>
                <Statement main="start" key={"0"}>
                <Statement main="normal" key={"0"}>
                <Statement main="normal" key={"0"}>
                </Statement>
                </Statement>
                </Statement>
                </Statement>
            </div>
        );
    }
}
