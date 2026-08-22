import { useRef, useEffect } from "react";
import FloatingCharacterLine from "../elements/FloatingCharacterLine";

function FloatingCharacterContainer() {
    const innerContainerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function updateContainerTop() {
            const innerContainer = innerContainerRef.current as HTMLDivElement;
            const header = headerRef.current as HTMLDivElement;
            
            innerContainer.style.top = `${parseFloat(window.getComputedStyle(innerContainer).height) - header.getBoundingClientRect().height}px`;
        }
        updateContainerTop();
        window.addEventListener('resize', updateContainerTop);

        return () => {
            window.removeEventListener('resize', updateContainerTop);
        }
    }, [])
    return(
        <div className="relative flex w-full h-screen xl:h-[140vh]">
            <div ref={innerContainerRef} className="relative flex flex-col h-screen pl-10">
                <div ref={headerRef} className=" w-full h-full relative flex flex-wrap pb-10">
                    <FloatingCharacterLine text="Floating Characters" xMax={200} xMin={100} />
                </div>
                <div className="flex relative h-full w-full ">
                    <FloatingCharacterLine text="Some random text!!!" yMin={1000} xMax={200} xMin={100} />
                </div>
            </div>
        </div>
    )
}

export default FloatingCharacterContainer;