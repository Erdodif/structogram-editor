import { useState } from "react"
import "../styles/Statement.scss";

export function Statement(props: any){
    const [content,setContent] = useState(props?.content ?? "");
    return <div className="statement">{content}</div>
}

export function IfStatement(props:any){
    const [content,setContent] = useState(props?.content ?? "");
    return <div className="statement">{content}</div>
}

export function SwitchStatement(props:any){
    const [content,setContent] = useState(props?.content ?? "");
    return <div className="statement">{content}</div>
}

export function LoopStatement(props:any){
    const [content,setContent] = useState(props?.content ?? "");
    return <div className="statement">{content}</div>
}

export function ReversedLoopStatement(props:any){
    const [content,setContent] = useState(props?.content ?? "");
    return <div className="statement">{content}</div>
}