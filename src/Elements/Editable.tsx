import ContentEditable from "react-contenteditable";
import "../styles/ContentEditable.scss";

export function useContentEditable(content: string, setContent: React.Dispatch<React.SetStateAction<string>>, id: string): JSX.Element {
    const emitChange = (event: any) => {
        setContent(event.target.value);
    }

    const evalChange = () => {
        let value = content;
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
