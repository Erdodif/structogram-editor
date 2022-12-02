import htmlToCanvas from "html2canvas";
import { useState } from "react";
import "../styles/PreviewHandler.scss";

export async function makeImage(id: string): Promise<HTMLCanvasElement> {
    let canvas = await htmlToCanvas(
        document.getElementById(id)!,
        {
            backgroundColor: null,
            logging: false,
            ignoreElements: (element) => element.id === `${id}-to-image`
        }
    );
    canvas.id = (`${id}_preview_canvas`);
    return canvas;
}

export function Preview(props: { id: string }) {

    const [active, setActive] = useState(false);


    const modifyActive = (isActive: boolean) => {
        setActive(!isActive);
    }

    return <div className="preview-handler" id={`${props.id}-to-image`}>
        <button className="to-image-button" tabIndex={0} onClick={() => modifyActive(active)} hidden={active}>
            <span className="main">📷</span>
            <span className="hover">📸</span>
        </button>
        <div className="structogram-preview" hidden={!active}>
            <button className="button-close" onClick={() => setActive(!active)} tabIndex={0} hidden={!active}>X</button>
            {active ? <div
                className="preview-canvas"
                id={`${props.id}_preview_canvas`}
                ref={ref => makeImage(props.id).then(canvas => { ref?.replaceChildren(canvas) })}>
            </div> : null}
        </div>
    </div>;
}