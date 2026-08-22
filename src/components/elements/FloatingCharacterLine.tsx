import FloatingCharacter from "./FloatingCharacter"

interface FloatingCharacterLineProps{
    text : string;
    yMax? : number;
    yMin? : number;
    xMax? : number;
    xMin? : number;
    rot? : number;
    scrollStart? : number;
    scrollLength? : number;

}
/**
 * A container for a single line of floating text
 * @param text - the string of floating characters to be displayed
 * @param yMax - the maximum positive offset of each floating character on the y axis
 * @param yMin - the minimum negative offset of each floating character on the y axis
 * @param xMax - the maximum positive offset of each floating character on the x axis
 * @param xMin - the minimum negative offest of each floating character on the x axis
 * @param rot - the maximum rotational offest in degrees of each floating character
 * @param scrollStart - the scroll value at which the character starts floating
 * @param scrollLength - the offset scroll from the scroll start that the character will float for
 * @returns 
 */
const FloatingCharacterLine = ({ text, yMax = 3500, yMin = 3500, xMax = 10, xMin = 10, rot = 30, scrollStart = 0, scrollLength = 1000 } : FloatingCharacterLineProps) =>{
    const words : string[] = text.split(" ");
    return(
        <div className="flex flex-wrap relative">
            {words.map((word, index) => (
                <div key={index} className="flex">
                    {word.split("").map((char, innerIndex) => (
                        <FloatingCharacter
                        scrollStart={scrollStart}
                        scrollLength={scrollLength}
                        key={innerIndex}
                        character={char}
                        translateEndX={Math.random() * (xMax + xMin) - xMin}
                        translateEndY={(Math.random() < 0.7) ? (Math.random() * (yMax + yMin) - yMin) : (Math.random() * ((yMax/5) +(yMin/5)) - (yMin/5))}
                        rotateEnd={Math.random() * 2*rot - rot}
                        />
                    ))}
                    <FloatingCharacter 
                    character=" "
                    scrollStart={scrollStart}
                    scrollLength={scrollLength}
                    />
                </div>
            ))}
        </div>
    )
}


export default FloatingCharacterLine;