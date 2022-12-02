import { useState, useRef} from "react"
import { StructogramController } from "structogram";
import {Statement as SStatement} from "structogram/dist/src/Statement"
import "../styles/Statement.scss";
import "../styles/animations/StatementDestroy.scss";
import { useContentEditable } from "./Editable";
import { RefObject } from "react";
import { animateDestruction } from "./StatementDestructor";

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

export function Statement(props: {
    content: string | null,
    mapping: number[],
    controller: RefObject<StructogramController>,
    updateControllerState: () => void
}) {
    const [content, setContent] = useState(props?.content ?? "");
    const ref: RefObject<HTMLDivElement> = useRef(null);

    let id = mappingToId(props.mapping);

    const deleteSelf: () => void = () => {
        animateDestruction(ref, props.mapping, props.controller, props.updateControllerState);
    }

    const updateContent: (content:string)=>void = () =>{
        (props.controller.current?.getElementByMapping(props.mapping) as SStatement).content = content;
        props.updateControllerState();
    }

    return <div className="statement normal" id={id} ref={ref}>
        <div className="content">
            {useContentEditable(content, setContent, id + "_content", updateContent)}
        </div>
        <div className="buttons">
            {useStatementButtons(deleteSelf, () => { })}
        </div>
    </div>;
}

export function IfStatement(props: {
    content: string | null,
    mapping: number[],
    statementBlocks: JSX.Element[][],
    controller: RefObject<StructogramController>,
    updateControllerState: () => void
}) {
    const [content, setContent] = useState(props?.content ?? "");
    const ref: RefObject<HTMLDivElement> = useRef(null);

    let id = mappingToId(props.mapping);

    const deleteSelf: () => void = () => {
        animateDestruction(ref, props.mapping, props.controller, props.updateControllerState);
    }

    return <div className="statement if" id={id} ref={ref}>
        <div className="content">
            <div className="indicator-holder" />
            {useContentEditable(content, setContent, id + "_content")}
        </div>
        <div className="statement-blocks">
            <div className="if-true">
                {props?.statementBlocks[0]}
            </div>
            <div className="if-false">
                {props?.statementBlocks[1]}
            </div>
        </div>
        <div className="buttons">
            {useStatementButtons(deleteSelf, () => { })}
        </div>
    </div>;
}

export function SwitchStatement(props: {
    content: string | null,
    mapping: number[],
    blocks: {
        case: string,
        statements: JSX.Element[]
    }[],
    controller: RefObject<StructogramController>,
    updateControllerState: () => void
}) {
    const ref: RefObject<HTMLDivElement> = useRef(null);

    let id = mappingToId(props.mapping);

    const deleteSelf: () => void = () => {
        animateDestruction(ref, props.mapping, props.controller, props.updateControllerState);
    }

    let blocks = [];
    for (let i = 0; i < props.blocks.length; i++) {
        blocks.push(
            <div className="case" key={`${id}\\${i}`}>
                <div className={props.blocks[i].case.trim() === "else" ? "switch-else" : "switch-case"}>
                    {props.blocks[i].case}
                </div>
                <div className="switch-statements">
                    {props.blocks[i].statements}
                </div>
            </div>
        );
    }

    return <div className="statement switch" id={id} ref={ref}>
        <div className="case-blocks">
            {blocks}
        </div>
        <div className="buttons">
            {useStatementButtons(deleteSelf, () => { })}
        </div>
    </div>;
}

export function LoopStatement(props: {
    content: string | null,
    mapping: number[],
    statements: JSX.Element[],
    controller: RefObject<StructogramController>,
    updateControllerState: () => void
}) {
    const [content, setContent] = useState(props?.content ?? "");
    const ref: RefObject<HTMLDivElement> = useRef(null);

    let id = mappingToId(props.mapping);

    const deleteSelf: () => void = () => {
        animateDestruction(ref, props.mapping, props.controller, props.updateControllerState);
    }

    return <div className="statement loop" id={id} ref={ref}>
        <div className="content">
            {useContentEditable(content, setContent, id + "_content")}
        </div>
        <div className="statements">
            {props?.statements}
        </div>
        <div className="buttons">
            {useStatementButtons(deleteSelf, () => { })}
        </div>
    </div>;
}

export function ReversedLoopStatement(props: {
    content: string | null,
    mapping: number[],
    statements: JSX.Element[],
    controller: RefObject<StructogramController>,
    updateControllerState: () => void
}) {
    const [content, setContent] = useState(props?.content ?? "");
    const ref: RefObject<HTMLDivElement> = useRef(null);

    let id = mappingToId(props.mapping);

    const deleteSelf: () => void = () => {
        animateDestruction(ref, props.mapping, props.controller, props.updateControllerState);
    }

    return <div className="statement loop-reverse" id={id} ref={ref}>
        <div className="content">
            {useContentEditable(content, setContent, id + "_content")}
        </div>
        <div className="statements">
            {props?.statements}
        </div>
        <div className="buttons">
            {useStatementButtons(deleteSelf, () => { })}
        </div>
    </div>;
}