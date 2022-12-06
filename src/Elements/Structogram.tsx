import { createRef, useRef, RefObject, useState, createElement } from "react";
import { StructogramController } from "structogram";
import { Statement } from "structogram/dist/src/Statement";
import "../styles/Structogram.scss";
import "../styles/Statement.scss";
import { statementToJSX } from "./StatementBuilder";
import {makeImage, Preview} from "./StructogramToImage";

function useController() {

}

function getStatements(controller: StructogramController, ref: React.MutableRefObject<StructogramController>, updateController: () => void) {
    let list: JSX.Element[] = [];
    let statements: Statement[] = controller.structogram.statements;
    for (const index in statements) {
        list.push(statementToJSX(statements[index], [Number(index)], ref, updateController));
    }
    return list;
}

export function Structogram(props: any): JSX.Element {
    const [locked, setLocked] = useState(props?.locked ?? false);
    const [scope, setScope] = useState<Number[]>([]);
    const [controller, setController] = useState<StructogramController>(props?.controller ?? new StructogramController());
    const ref = useRef<StructogramController>(controller);

    const updateControlledState: (() => void) = () => {
        setController(ref.current);
        setStatements(getStatements(ref.current, ref, updateControlledState));
    }

    const [statements, setStatements] = useState(getStatements(controller, ref, updateControlledState));

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

    const shoot: () => void = ()=>{
        makeImage(getId());
    }

    return (
        <div className={classList} id={getId()}>
            <Preview id={getId()}/>
            {hasSignature ? <div className="structogram-signature" id={`signature_${getId()}`}>{controller.structogram.name}</div> : null}
            <div className="content">
                {controller.structogram?.renderStart ? <div className="statement statement-start" id={`start_${getId()}`}>START</div> : null}
                <div className="structogram-scope">
                    {statements}
                </div>
                {controller.structogram?.renderStart ? <div className="statement statement-end" id={`end_${getId()}`}>END</div> : null}
            </div>
            <span id={`${getId()}_json`} className="json-view">
                {JSON.stringify(controller.structogram, null, "<br/>").replaceAll('\\', "")}
            </span>
        </div>
    );
}