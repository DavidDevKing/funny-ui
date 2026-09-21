import { lerp, maxScrollY } from "./Utilities";


let targetScroll: number = window.scrollY;
let currentScroll: number = window.scrollY;
let isScrolling: boolean = false;
    

function UpdateScroll(){
    window.scrollTo({top: currentScroll, behavior: 'auto'});
}


function SmoothScroll(){
    if (isScrolling){
        currentScroll = lerp(currentScroll, targetScroll, .04);
        
        if(Math.abs(currentScroll-targetScroll) <= 0.1){
            currentScroll = targetScroll;
            isScrolling = false;
        }
        UpdateScroll();
    }
    requestAnimationFrame(SmoothScroll);
}

SmoothScroll();

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

window.addEventListener('wheel', handleWheel, {passive: false});
window.addEventListener('touchstart', handleTouchStart)