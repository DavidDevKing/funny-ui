import { useEffect, useRef, type ReactElement } from "react"
import { Vector2 } from "../../behaviors/Utilities";

interface BouncyAttractorProps{
    maxRadius?: number;
    frequency? : number;
    damping? : number;
    bouncyness? : number;
    child? : ReactElement;
}


function BouncyAttractor({
    maxRadius = 50,
    frequency = 0.2,
    damping = 6,
    bouncyness = 12,
    child = <div className="cursor-pointer inline-flex justify-center items-center relative z-10 w-60 h-60 rounded-full bg-stone-100 text-[#141414] font-semibold"></div>
}: BouncyAttractorProps) {
    const bouncyAttractorRef = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        const bouncyAttractor = bouncyAttractorRef.current as HTMLDivElement;
        if (!bouncyAttractor){
            console.error("NO BOUNCY ATTRACTOR FOUND!!!");
            return;
        }
        
        let offset = new Vector2();
        let target = new Vector2();
        let center = new Vector2();
        let amplitude = new Vector2();
        let angle = 0;
        let rect : DOMRect;

        const handleMouseOver = (e: MouseEvent) =>{
            rect = bouncyAttractor.getBoundingClientRect();

            center = new Vector2(rect.left + rect.width/2, rect.top + rect.height/2);
            
            target = new Vector2(e.clientX-center.x, e.clientY-center.y);
            amplitude = new Vector2(target.x, target.y);
            angle = Math.PI/2;

            
        }



        const handleMouseMove = (e: MouseEvent) => {
            target = new Vector2(e.clientX-center.x, e.clientY-center.y);
            const offsetDir = target.normalized();
            target.x = Math.min(offsetDir.x * maxRadius, Math.max(offsetDir.x * -maxRadius, target.x));
            target.y = Math.min(offsetDir.y * maxRadius, Math.max(offsetDir.y * -maxRadius, target.y));
        }
        
        const handleMouseOut = () => {
            amplitude.x = -(target.x) *2;
            amplitude.y = -(target.y) *2;
            angle = Math.PI/2;
            target.x = 0;
            target.y = 0;

            
        }
        
        function UpdatePosition(){

            offset = offset.lerp(new Vector2(target.x + Math.sin(angle)*amplitude.x, target.y + Math.sin(angle)*amplitude.y), 1/damping);
            

            angle += frequency;
            amplitude = amplitude.lerp(Vector2.ZERO, 1/bouncyness);
            
            // offset.y = target.y + Math.sin(Date.now()/60) * maxRadius;
            
            bouncyAttractor.style.transform = "translate("+ (offset.x)+"px, " + (offset.y)+"px)";

            requestAnimationFrame(UpdatePosition);
        }
        UpdatePosition();


        bouncyAttractor.addEventListener('mousemove', handleMouseMove);
        bouncyAttractor.addEventListener('mouseover', handleMouseOver);
        bouncyAttractor.addEventListener('mouseout', handleMouseOut)

        return () => {
            bouncyAttractor.removeEventListener('mousemove', handleMouseMove);
            bouncyAttractor.removeEventListener('mouseover', handleMouseOver);
            bouncyAttractor.removeEventListener('mouseout', handleMouseOut);
        }
    }, [])




    return (
        <div ref={bouncyAttractorRef}>
            {child}
        </div>
    )
}

export default BouncyAttractor;