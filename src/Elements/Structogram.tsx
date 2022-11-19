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
            if (sIf.statementBlocks[0]?.length > 0) {

            }
            return <RIfStatement key={mappingToId(mapping)} mapping={mapping} content={sIf.content} /*blocks={sIf.statementBlocks}*/ />
        case StatementType.S_SWITCH://TODO
            let sSwitch = statement as SwitchStatement;
            let blocks: JSX.Element[] = [];
            for (const index in sSwitch.blocks) {
                if (Object.prototype.hasOwnProperty.call(sSwitch.blocks, index)) {
                    const element = sSwitch.blocks[index];

                }
            }
            return <RSwitchStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} /*blocks={(statement as SwitchStatement).blocks}*/ />
        case StatementType.S_LOOP:
            let sLoop = statement as LoopStatement;
            statements = [];
            for (const index in sLoop.statements) {
                let subMap = [...mapping];
                subMap.push(Number(index));
                statements.push(statementToJSX(sLoop.statements[index], subMap));
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
    const [signature, setSignature] = useState<string | null>(controller.structogram.name);

    const getStatements = () => {
        let list: JSX.Element[] = [];
        let statements: Statement[] = controller.structogram.statements;
        for (const index in statements) {
            list.push(statementToJSX(statements[index], [Number(index)]));
        }
        return list;
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
    return (
        <div className={classList}>
            {hasSignature ? <div className="structogram-signature">{controller.structogram.name}</div> : null}
            <div className="content">
                {controller.structogram?.renderStart ? <div className="statement statement-start">START</div> : null}
                <div className="structogram-scope">
                    {getStatements()}
                </div>
                {controller.structogram?.renderStart ? <div className="statement statement-end">END</div> : null}
            </div>
        </div>
    );
}