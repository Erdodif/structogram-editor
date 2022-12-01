import { RefObject } from "react";
import { StructogramController } from "structogram";

export function animateDestruction(
    self: RefObject<HTMLDivElement>,
    mapping: number[],
    controller: RefObject<StructogramController>,
    update: () => void
) {
    let current = self.current!;
    let height = current.clientHeight;
    let div = document.createElement("div");
    div.id = self.current!.id + "-replace";
    div.className = "statement statement-destroy";
    div.style.height = `${height}px`;
    div.style.border = current.style.border!;
    document.getElementById(current.id!)!.style.display = "none";
    current.replaceWith(current, div);
    setTimeout(() => {
        div.remove();
        controller.current!.setElementByMapping(mapping, null);
        update();
    }, 300);
};
