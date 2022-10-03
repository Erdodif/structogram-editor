import React from "react";
import { Component } from "react";
import Statement from "./Statement";
import "./styles/Structogram.scss";

export default class Structogram extends Component {
    render() {
        return (
            <div className="structogram">
                <Statement main="start">
                    <Statement main="if">
                        <Statement main="normal">
                        </Statement>
                        <Statement main="normal">
                        </Statement>
                    </Statement>
                </Statement>
            </div>
        );
    }
}
