import { lerp, maxScrollY } from "./Utilities";


let targetScroll: number = window.scrollY;
let currentScroll: number = window.scrollY;
let isScrolling: boolean = false;
    


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



function UpdateScroll(){
    window.scrollTo({top: currentScroll, behavior: 'auto'});
}

function AnimateScroll(){
    if (isScrolling){
        currentScroll = lerp(currentScroll, targetScroll, .04);
        
        if(Math.abs(currentScroll-targetScroll) <= 0.1){
            currentScroll = targetScroll;
            isScrolling = false;
        }
        UpdateScroll();
    }
    requestAnimationFrame(AnimateScroll);

}


export default function SmoothScroll(){
    window.addEventListener('wheel', handleWheel, {passive: false});
    window.addEventListener('touchstart', handleTouchStart)
    console.log("something");

    AnimateScroll();
}
