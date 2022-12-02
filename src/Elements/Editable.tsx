import { RefObject } from "react";
import ContentEditable from "react-contenteditable";
import { StructogramController } from "structogram";
import "../styles/ContentEditable.scss";

export function useContentEditable(
    content: string,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    id: string,
    update: ((s: string)=>void) | null = null
): JSX.Element {
    const emitChange = (event: any) => {
        setContent(event.target.value);
    }

    const evalChange = () => {
        let value = content;
        if(update) update(content);
    }

    return (
        <ContentEditable
            spellCheck={false}
            html={content}
            className={"editable"}
            id={id}
            onSubmit={emitChange}
            onChange={emitChange}
            onBlur={evalChange} />
    );
}
