import React from "react";
import { Component } from "react";
import Statement from "./Statement";
import "./styles/Structogram.scss";
import json from"./structogram.json";

export default class Structogram extends Component {
    render() {
        return (
            <div className="structogram">
                {Statement.FromJson(json)}
            </div>
        );
    }
}