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
        if (!inkDropRef.current || !buttonRef.current) return;
        // Update the origin
        const rect : DOMRect = buttonRef.current.getBoundingClientRect();
        const rectVec : Vector2 = new Vector2(rect.width, rect.height);
        const originVec : Vector2 = new Vector2(rect.left, rect.top);
        const offset : Vector2 = new Vector2(e.clientX - originVec.x, e.clientY - originVec.y);
        inkDropRef.current.style.translate = `${offset.x}px ${offset.y}px`;



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
            let targetScale = largestDistanceFromPoint(offset, rectVec) * 2;
            inkDropRef.current.style.scale = `${targetScale}`
        }
        else if (e.type === "pointerleave"){
            inkDropRef.current.style.scale = "0";
        }
    }

    // Add event listeners for pointerenter and pointer exit
    useEffect(() => {
        if (!buttonRef.current || !inkDropRef.current || !(origin === "cursor")) return;
        buttonRef.current.addEventListener("pointerenter", updateInkDrop);
        buttonRef.current.addEventListener("pointerleave", updateInkDrop);
        
        return () => {
            buttonRef.current?.removeEventListener("pointerenter", updateInkDrop);
            buttonRef.current?.removeEventListener("pointerleave", updateInkDrop);
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
                className={"absolute w-px h-px rounded-full -z-10 scale-0 duration-200 ease-in-out backdrop-hue-rotate-180"}
                style={{
                    backgroundColor: `${hoverColor}`,
                    borderRadius : "100%",
                    translate : `${origin === "left" ? "-50% 0" : origin === "right" ? "50% 0" : origin === "top" ? "0 -50%" : origin === "bottom" ? "0 50%" : "0"}`,
                }} />
            <div className={"absolute inset-0 w-full h-full -z-20"} style={{backgroundColor: `${color}`}} />
        </div>
    )
}



export default InkDropButton