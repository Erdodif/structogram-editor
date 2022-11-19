import { useState } from "react";
import { StructogramController } from "structogram";
import { Statement as RStatement } from "./Statement";
import "../styles/Structogram.scss";
import "../styles/Statement.scss";

export function Structogram(props: any): JSX.Element {
    const [locked, setLocked] = useState(props?.locked ?? false);
    const [scope, setScope] = useState<Number[]>([]);
    const [controller, setController] = useState<StructogramController>(props?.controller ?? new StructogramController());
    const [signature, setSignature] = useState<string | null>(controller.structogram.name);



    const getStatements = () => {
        let list: JSX.Element[] = [];
        let statements = controller.structogram.statements;
        for (const index in statements) {
            list.push(<RStatement key={[index]} content={statements[index].content}></RStatement>);
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