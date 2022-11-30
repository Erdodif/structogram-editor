import { createRef, useRef, RefObject, useState } from "react";
import { StructogramController } from "structogram";
import { Statement} from "structogram/dist/src/Statement";
import "../styles/Structogram.scss";
import "../styles/Statement.scss";
import { statementToJSX } from "./StatementBuilder";

function useController(){

}

export function Structogram(props: any): JSX.Element {
    const [locked, setLocked] = useState(props?.locked ?? false);
    const [scope, setScope] = useState<Number[]>([]);
    const [controller] = useState<StructogramController>(props?.controller ?? new StructogramController());
    const ref = useRef<StructogramController>(controller);
    const getStatements = () => {
        let list: JSX.Element[] = [];
        let statements: Statement[] = controller.structogram.statements;
        for (const index in statements) {
            list.push(statementToJSX(statements[index], [Number(index)], ref));
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