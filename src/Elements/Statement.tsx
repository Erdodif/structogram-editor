import { DOMElement, useRef, useState } from "react"
import { renderIntoDocument } from "react-dom/test-utils";
import "../styles/Statement.scss";

export function mappingToId(mapping: number[]): string {
    let id: string = "S".concat(String(mapping[0]));
    for (let i = 1; i < mapping.length; i++) {
        id = id.concat(`_${mapping[i]}`);
    }
    return id;
}

function useStatementButtons(remove: (() => void) | null = null, convert: (() => void) | null = null) {
    let buttons = [];
    if (remove !== null) {
        buttons.push(<div className="action-button" key="remove" onClick={remove}>🗑</div>);
    }
    if (convert !== null) {
        <div className="action-button" key="modify" onClick={convert}>🛠</div>
    }
    return (
        <div className="buttons">
            {buttons}
        </div>
    );
}//TODO: rework, maybe removed in sake of contextmenu

function ActionButton(props: { name: string, action: () => void }) {
    return <div className="actionButton" onClick={props.action}>
        {props.name}
    </div>
}//TODO

function ContextMenu(props: { buttons: JSX.Element[] }) {
    return <div id="context-menu">
        {props.buttons}
    </div>
}//TODO


export function Statement(props: { content: string | null, mapping: number[] }) {
    const [content, setContent] = useState(props?.content ?? "");

    return <div className="statement normal" id={mappingToId(props.mapping)}>
        <div className="content">
            {content}
        </div>
        <div className="buttons">
            {useStatementButtons(() => { }, () => { })}
        </div>
    </div>;
}

export function IfStatement(props: { content: string | null, mapping: number[], statementBlocks: JSX.Element[][] }) {
    const [content, setContent] = useState(props?.content ?? "");
    return <div className="statement if">
        <div className="content">
            {content}
        </div>
        <div className="statement-blocks">
            <div className="if-true">
                {props?.statementBlocks[0]}
            </div>
            <div className="if-false">
                {props?.statementBlocks[1]}
            </div>
        </div>
    </div>;
}

export function SwitchStatement(props: { content: string | null, mapping: number[], blocks: { case: string, statements: JSX.Element[] }[] }) {
    const [content, setContent] = useState(props?.content ?? "");
    let blocks = [];
    for (let i = 0; i < props.blocks.length; i++) {
        blocks.push(
            <div className="case" key={`${props.mapping}\\${i}`}>
                <div className={props.blocks[i].case === "switch-else" ? "switch-else" : "switch-case"}>
                    {props.blocks[i].case}
                </div>
                <div className="switch-statements">
                    {props.blocks[i].statements}
                </div>
            </div>
        );
    }

    return <div className="statement switch">
        <div className="case-blocks">
            {blocks}
        </div>
    </div>;
}

export function LoopStatement(props: { content: string | null, mapping: number[], statements: JSX.Element[] }) {
    const [content, setContent] = useState(props?.content ?? "");
    return <div className="statement loop">
        <div className="content">
            {content}
        </div>
        <div className="statements">
            {props?.statements}
        </div>
        <div className="buttons">
            {useStatementButtons(() => { }, () => { })}
        </div>
    </div>;
}

export function ReversedLoopStatement(props: { content: string | null, mapping: number[], statements: JSX.Element[] }) {
    const [content, setContent] = useState(props?.content ?? "");
    return <div className="statement loop-reverse">
        <div className="content">
            {content}
        </div>
        <div className="statements">
            {props?.statements}
        </div>
    </div>;
}