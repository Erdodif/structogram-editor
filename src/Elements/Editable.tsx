import { RefObject, useState } from "react";
import ContentEditable from "react-contenteditable";
import { StructogramController } from "structogram";
import "../styles/ContentEditable.scss";

export function Editable(
    props: {
        content: string,
        id: string,
        handleChange: ((s: string) => void)
    }
): JSX.Element {

    const emitChange = (event: any) => {
        //setSelfContent(event.target.value);
        // props.setContent(event.target.value);
        console.log("emitChange happened");
        console.log(props.content);
        console.log(event.target.value);
        props.handleChange(event.target.value);
    }

    return (
        <ContentEditable
            spellCheck={false}
            html={props.content}
            className={"editable"}
            id={props.id}
            onChange={emitChange}/>
    );
}
