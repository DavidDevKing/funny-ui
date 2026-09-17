import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { Vector2 } from "../../behaviors/Utilities";




interface InkDropButtonProps{
    /** Background color of the element */
    color? : string;
    /** Color of the inkdrop effect */
    hoverColor? : string;
    /** Define the position the inkdrop spreads from  */
    origin? : "left" | "right" | "top" | "bottom" | "center" | "cursor";
    /** Border radius of the button */
    borderRadius? : string;
    /** Children elements of the button */
    children? : ReactNode
}

/**
 * Element that uses an inkdrop effect to change it's background on hover
 */
function InkDropButton({color = "#772B81", hoverColor = "#D69F00", origin = "cursor", borderRadius = "100%", children} : InkDropButtonProps){

    const buttonRef = useRef<HTMLDivElement>(null);
    const inkDropRef = useRef<HTMLDivElement>(null);


    const updateInkDrop = (e: MouseEvent) => {
        const button = buttonRef.current;
        const inkDrop = inkDropRef.current;
        if (!inkDrop || !button) return;
        // Update the origin
        const rect : DOMRect = button.getBoundingClientRect();
        const rectVec : Vector2 = new Vector2(rect.width, rect.height);
        const originVec : Vector2 = new Vector2(rect.left, rect.top);
        const offset : Vector2 = new Vector2(e.clientX - originVec.x, e.clientY - originVec.y);
        if (origin === "cursor") inkDrop.style.translate = `${offset.x}px ${offset.y}px`;



        /** Returns the smallest largerst distance from a point to the end of the boundaries of a box with the specified end point on a 2D plane */
        const largestDistanceFromPoint = (point : Vector2, end : Vector2) : number => {
            const center = end.divide(2);
            const diffFromCenter = center.subtract(point);
            let dist = point;
            if (diffFromCenter.x > 0) dist.x = end.x - dist.x;
            if (diffFromCenter.y > 0) dist.y = end.y - dist.y;
            
            return dist.magnitude(); 
        }

        // Update the scale
        if (e.type === "pointerenter"){
            if (origin === "cursor") {
                const targetScale = largestDistanceFromPoint(offset, rectVec) * 2;
                inkDrop.style.scale = `${targetScale}`
            }
            else if (origin === "top" || origin === "bottom") inkDrop.style.scale = `${rectVec.y * 2}`;
            else if (origin === "left" || origin === "right") inkDrop.style.scale = `${rectVec.x *2}`;
            else inkDrop.style.scale = `${Math.max(rectVec.x, rectVec.y)}`
        }
        else if (e.type === "pointerleave"){
            inkDrop.style.scale = "0";
        }
    }

    // Add event listeners for pointerenter and pointer exit and update the static positions
    useEffect(() => {
        const button = buttonRef.current;
        const inkDrop = inkDropRef.current;
        if (!button || !inkDrop) return;
        button.addEventListener("pointerenter", updateInkDrop);
        button.addEventListener("pointerleave", updateInkDrop);


        // Update the static postions 
        const rect : DOMRect = button.getBoundingClientRect();
        const rectVec : Vector2 = new Vector2(rect.width, rect.height);

        inkDrop.style.translate = `${origin === 'left' ? "0" : origin === 'right' ? rectVec.x : rectVec.x/2}px ${origin === 'top' ? "0" : origin === "bottom" ? rectVec.y : rectVec.y/2}px`;

        
        return () => {
            button.removeEventListener("pointerenter", updateInkDrop);
            button.removeEventListener("pointerleave", updateInkDrop);
        }
    }, [])

    return (
        <div
            ref={buttonRef}
            className={"relative group flex overflow-hidden cursor-pointer z-0"}
            style={{
                borderRadius: `${borderRadius}`
            }}>
            {children}

            <div
                ref={inkDropRef}
                className={"absolute w-px h-px rounded-full -z-10 scale-0 transition-[scale] duration-200 ease-in-out backdrop-hue-rotate-180"}
                style={{
                    backgroundColor: `${hoverColor}`,
                    borderRadius : "100%",
                }} />
            <div className={"absolute inset-0 w-full h-full -z-20"} style={{backgroundColor: `${color}`}} />
        </div>
    )
}



export default InkDropButton