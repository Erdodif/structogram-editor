import { Structogram, StructogramController } from "structogram";
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
import { RefObject } from "react";

export function statementToJSX(statement: Statement, mapping: number[], ref:RefObject) {
    let statements: JSX.Element[];
    switch (statement.type()) {
        case StatementType.S_NORMAL:
            return <RStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} controller={ref}/>
        case StatementType.S_IF://TODO
            let sIf = statement as IfStatement;
            let truePart: JSX.Element[] = [];
            if (sIf.statementBlocks.length > 0) {
                for (let i = 0; i < sIf.statementBlocks[0].length; i++) {
                    truePart.push(statementToJSX(sIf.statementBlocks[0][i], [...mapping, 0, i],ref));
                }
            }
            let falsePart: JSX.Element[] = [];
            if (sIf.statementBlocks.length > 1) {
                for (let i = 0; i < sIf.statementBlocks[1].length; i++) {
                    falsePart.push(statementToJSX(sIf.statementBlocks[1][i], [...mapping, 1, i],ref));
                }
            }
            return <RIfStatement key={mappingToId(mapping)} mapping={mapping} content={sIf.content} statementBlocks={[truePart, falsePart]} controller={ref}/>
        case StatementType.S_SWITCH://TODO
            let sSwitch = statement as SwitchStatement;
            let blocks: { case: string, statements: JSX.Element[] }[] = [];
            for (let i = 0; i < sSwitch.blocks.length; i++) {
                let statements: JSX.Element[] = [];
                for (let j = 0; j < sSwitch.blocks[i].statements.length; j++) {
                    statements.push(statementToJSX(sSwitch.blocks[i].statements[j], [...mapping, i, j],ref))
                }
                blocks.push({ case: sSwitch.blocks[i].case, statements: statements });
            }
            return <RSwitchStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} blocks={blocks} controller={ref}/>
        case StatementType.S_LOOP:
            let sLoop = statement as LoopStatement;
            statements = [];
            for (let i = 0; i < sLoop.statements.length; i++) {
                let subMap = [...mapping];
                subMap.push(Number(i));
                statements.push(statementToJSX(sLoop.statements[i], subMap,ref));
            }
            return <RLoopStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} statements={statements} controller={ref}/>
        case StatementType.S_LOOP_REVERSE:
            let sRLoop = statement as LoopStatement;
            statements = [];
            for (const index in sRLoop.statements) {
                let subMap = [...mapping];
                subMap.push(Number(index));
                statements.push(statementToJSX(sRLoop.statements[index], subMap,ref));
            }
            return <RReversedLoopStatement key={mappingToId(mapping)} mapping={mapping} content={statement.content} statements={statements} controller={ref}/>
        default://TODO
            return <RStatement key={mappingToId(mapping)} content={null} mapping={mapping} controller={ref}/>
    }
}