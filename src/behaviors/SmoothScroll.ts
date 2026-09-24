import { lerp, maxScrollY } from "./Utilities";


let targetScroll: number = window.scrollY;
let currentScroll: number = window.scrollY;
let isScrolling: boolean = false;
    
let requestID : number | null = null;


const handleWheel = (e: WheelEvent) => {
    if (isScrolling != true){
        currentScroll = targetScroll = window.scrollY;
    }
    
    isScrolling = true;
    targetScroll += e.deltaY;
    targetScroll = Math.max(0, Math.min(targetScroll, maxScrollY()));
    e.preventDefault();
}

const handleTouchStart = () => {
    isScrolling = false;
}


/** Updates the window's y scroll value based on currentScroll */
function UpdateScroll(){
    window.scrollTo({top: currentScroll, behavior: 'instant'});
}

/** 
 * Function that handles the smooth scrolling animatmion logic through linear interpolation
 * @param ease - Interpolation value for the lerp function
 */
function AnimateScroll(ease : number){
    if (isScrolling){
        currentScroll = lerp(currentScroll, targetScroll, ease);
        
        if(Math.abs(currentScroll-targetScroll) <= 0.1){
            currentScroll = targetScroll;
            isScrolling = false;
        }
        UpdateScroll();
    }
    requestID = requestAnimationFrame(() => {AnimateScroll(ease)});

}

/**
 * Function that alters the default scrolling behaviour of a webpage
 * @param damping - Value that controls the smoothing of the scroll
 */
export function SmoothScroll(damping : number = .94){
    CancelSmoothScroll();
    window.addEventListener('wheel', handleWheel, {passive: false});
    window.addEventListener('touchstart', handleTouchStart);


    const ease : number = 1 - Math.min(0.999, Math.max(0.001, damping));

    AnimateScroll(ease);
}

/**
 * Stops the smooth scroll behaviour and restores windows scrolling to default behaviour
 */
export function CancelSmoothScroll(){
    if(requestID){
        cancelAnimationFrame(requestID);
        requestID = null;
    }
    isScrolling = false;
    window.removeEventListener('wheel', handleWheel);
    window.removeEventListener('touchstart', handleTouchStart);
}