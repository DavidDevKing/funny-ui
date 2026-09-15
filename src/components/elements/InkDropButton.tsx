import type { ReactNode } from "react";
import { useState, useEffect, useRef } from "react";
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
    const [ishovered, setIsHovered] = useState<boolean>(false);

    const buttonRef = useRef<HTMLDivElement>(null);
    const foregroundRef = useRef<HTMLDivElement>(null);


    const updateOrigin = (e: MouseEvent) => {
        if (!foregroundRef.current || !buttonRef.current) return;
        let rect : DOMRect = buttonRef.current.getBoundingClientRect();
        let center : Vector2 = new Vector2(rect.left + rect.width/2, rect.top + rect.height/2);
        foregroundRef.current.style.translate = `${e.clientX - center.x}px ${e.clientY - center.y}px`
    }

    
    useEffect(() => {
        if (!buttonRef.current || !foregroundRef.current || !(origin === "cursor")) return;
        buttonRef.current.addEventListener("pointerenter", updateOrigin);
        buttonRef.current.addEventListener("pointerleave", updateOrigin);
        
        return () => {
            buttonRef.current?.removeEventListener("pointerenter", updateOrigin);
            buttonRef.current?.removeEventListener("pointerleave", updateOrigin);
        }
    }, [])

    return (
        <div
        ref={buttonRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={"relative group flex overflow-hidden cursor-pointer"}
        style={{
            borderRadius: `${borderRadius}`
            }}>
            {children}

            <div
            ref={foregroundRef}
            className={"absolute inset-0 w-full h-full rounded-full -z-10 scale-0 duration-200 ease-in-out backdrop-hue-rotate-180"}
            style={{
                backgroundColor: `${hoverColor}`,
                translate : `${origin === "left" ? "-50% 0" : origin === "right" ? "50% 0" : origin === "top" ? "0 -50%" : origin === "bottom" ? "0 50%" : "0"}`,
                // If we start from the edge to grow the effect, the backdrop will have to strech double the distance
                scale : `${ishovered ? (origin == "center" ? "1" : "2") : "0"}`,
                }} ></div>
            <div className={"absolute inset-0 w-full h-full -z-20"} style={{backgroundColor: `${color}`}} ></div>
        </div>
    )
}



export default InkDropButton