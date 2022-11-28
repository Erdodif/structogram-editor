import { useState } from "react";
import { StructogramController } from "structogram";
import {
    Statement as RStatement,
    IfStatement as RIfStatement,
    SwitchStatement as RSwitchStatement,
    LoopStatement as RLoopStatement,
    ReversedLoopStatement as RReversedLoopStatement,
    mappingToId
} from "./Statement";
import { IfStatement, LoopStatement, Statement, StatementType, SwitchStatement } from "structogram/dist/src/Statement";
import "../styles/Structogram.scss";
import "../styles/Statement.scss";

export function statementToJSX(statement: Statement, mapping: number[]) {
    let statements: JSX.Element[];
    switch (statement.type()) {
        case StatementType.S_NORMAL:
            return <RStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} />
        case StatementType.S_IF://TODO
            let sIf = statement as IfStatement;
            let truePart: JSX.Element[] = [];
            if (sIf.statementBlocks.length > 0) {
                for (let i = 0; i < sIf.statementBlocks[0].length; i++) {
                    truePart.push(statementToJSX(sIf.statementBlocks[0][i], [...mapping, 0, i]));
                }
            }
            let falsePart: JSX.Element[] = [];
            if (sIf.statementBlocks.length > 1) {
                for (let i = 0; i < sIf.statementBlocks[1].length; i++) {
                    falsePart.push(statementToJSX(sIf.statementBlocks[1][i], [...mapping, 1, i]));
                }
            }
            return <RIfStatement key={mappingToId(mapping)} mapping={mapping} content={sIf.content} statementBlocks={[truePart, falsePart]} />
        case StatementType.S_SWITCH://TODO
            let sSwitch = statement as SwitchStatement;
            let blocks: { case: string, statements: JSX.Element[] }[] = [];
            for (let i = 0; i < sSwitch.blocks.length; i++) {
                let statements: JSX.Element[] = [];
                for (let j = 0; j < sSwitch.blocks[i].statements.length; j++) {
                    statements.push(statementToJSX(sSwitch.blocks[i].statements[j], [...mapping, i, j]))
                }
                blocks.push({ case: sSwitch.blocks[i].case, statements: statements });
            }
            return <RSwitchStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} blocks={blocks} />
        case StatementType.S_LOOP:
            let sLoop = statement as LoopStatement;
            statements = [];
            for (let i = 0; i < sLoop.statements.length; i++) {
                let subMap = [...mapping];
                subMap.push(Number(i));
                statements.push(statementToJSX(sLoop.statements[i], subMap));
            }
            return <RLoopStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} statements={statements} />
        case StatementType.S_LOOP_REVERSE:
            let sRLoop = statement as LoopStatement;
            statements = [];
            for (const index in sRLoop.statements) {
                let subMap = [...mapping];
                subMap.push(Number(index));
                statements.push(statementToJSX(sRLoop.statements[index], subMap));
            }
            return <RReversedLoopStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} statements={statements} />
        default://TODO
            return <RStatement key={mappingToId(mapping)} content={null} mapping={mapping} />
    }
}

export function Structogram(props: any): JSX.Element {
    const [locked, setLocked] = useState(props?.locked ?? false);
    const [scope, setScope] = useState<Number[]>([]);
    const [controller, setController] = useState<StructogramController>(props?.controller ?? new StructogramController());
    const getStatements = () => {
        let list: JSX.Element[] = [];
        let statements: Statement[] = controller.structogram.statements;
        for (const index in statements) {
            list.push(statementToJSX(statements[index], [Number(index)]));
        }
        return list;
    }

    const getId: () => string = () => {
        let name = controller.structogram.name?.replaceAll(" ", "_").replaceAll("-", "_");
        return `structogram_${name}`
    }


    let classList = "structogram";
    if (locked) {
        classList = classList.concat(" locked");
    }
    let hasSignature = false;
    if (controller.structogram.name !== null && scope.length === 0) {
        classList = classList.concat(" with-signature");
        hasSignature = true;
    }
    let element = document.getElementById(`signature_${getId()}`);
    if (element === null) {
        element = document.getElementById(getId())!;
    }
    if (element) {
        element.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    return (
        <div className={classList} id={getId()}>
            {hasSignature ? <div className="structogram-signature" id={`signature_${getId()}`}>{controller.structogram.name}</div> : null}
            <div className="content">
                {controller.structogram?.renderStart ? <div className="statement statement-start" id={`start_${getId()}`}>START</div> : null}
                <div className="structogram-scope">
                    {getStatements()}
                </div>
                {controller.structogram?.renderStart ? <div className="statement statement-end" id={`end_${getId()}`}>END</div> : null}
            </div>
        </div>
    );
}