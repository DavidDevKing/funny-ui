import { useEffect, useRef } from "react";
import { eventBus } from "../../behaviors/Utilities";
import { lerp } from "../../behaviors/Utilities";



interface FloatingCharacterProps {
    character: string;
    translateEndX?: number;
    translateEndY?: number;
    rotateEnd?: number;
    scrollStart? : number;
    scrollLength? : number;
}
/**
 * A react component single floating character
 * 
 * @param character - the chrater to be displayed
 * @param translateEndX - the total amount this character will translate on the x axis on scroll
 * @param translateEndY - the total amount this character will translate on the y axis on scroll
 * @param rotateEnd - the total amount in degrees this character will rotate on scroll
 * @param scrollStart - the scroll value at which the character starts floating
 * @param scrollLength - the offset scroll from the scroll start that the character will float for
 * @returns A html element containing a single floating character
 */
function FloatingCharacter({character, translateEndX = 0, translateEndY = 0, rotateEnd = 0, scrollStart = 0, scrollLength = 1000}: FloatingCharacterProps){
    const letterRef = useRef<HTMLSpanElement>(null);
    useEffect (() => {
        let currentScroll = 0;

        let translateOffsetX = 0;
        let translateOffsetY = 0;
        let rotateOffset = 0;
        
        function handleScrolling (e : Event){
            currentScroll = (e as CustomEvent).detail;
        }
        eventBus.addEventListener('onScroll', handleScrolling);

        function handleFloating (){
            let clampedScroll = Math.min(Math.max(currentScroll, scrollStart), scrollLength);
            translateOffsetX = ((clampedScroll-scrollStart)/scrollLength) * translateEndX;
            translateOffsetY = lerp(translateOffsetY, (((clampedScroll-scrollStart)/scrollLength) * translateEndY) + clampedScroll, 0.2);
            // translateOffsetY = (clampedScroll/endOfScroll) * translateEndY + clampedScroll;
            rotateOffset = ((clampedScroll-scrollStart)/scrollLength) * rotateEnd;
            if (letterRef.current)  letterRef.current.style.transform = "translate("+ translateOffsetX+"px, " + (-translateOffsetY)+"px) rotate(" + rotateOffset +"deg)";
            requestAnimationFrame(handleFloating);
        }
        handleFloating();
    }, []);
    if (character == " ") return (
        <span className="flex h-full w-5 xl:w-15"></span>
    )
    return(
        <span ref={letterRef} className={`letter text-[60px] sm:text-[90px] md:text-[120px] lg:text-[150px] xl:text-[210px] font-semibold flex items-center justify-center`}>{character}</span>
    )
}


export default FloatingCharacter;


