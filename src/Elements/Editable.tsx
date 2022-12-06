import ContentEditable from "react-contenteditable";
import "../styles/ContentEditable.scss";

export function Editable(
    props: {
        content: string,
        id: string,
        handleChange: ((s: string) => void)
    }
): JSX.Element {
    return (
        <ContentEditable
            spellCheck={false}
            html={props.content}
            className={"editable"}
            id={props.id}
            onChange={(event) => props.handleChange(event.target.value)} />
    );
}
