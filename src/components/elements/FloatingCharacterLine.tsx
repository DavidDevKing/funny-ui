import FloatingCharacter from "./FloatingCharacter"

interface FloatingCharacterLineProps{
    /** The string of floating characters to be displayed */
    text : string;
    /** The maximum positive offset of each floating character on the y axis */
    yMax? : number;
    /** The maximum negative offset of each floating character on the y axis */
    yMin? : number;
    /** The maximum postive offset of each floating character on the x axis */
    xMax? : number;
    /** The maximum negative offset of each floating character on the x axis */
    xMin? : number;
    /** The maximum rotational offset in degrees of each floating character */
    rot? : number;
    /** The scroll value at which the character starts floating */
    scrollStart? : number;
    /** The offset scroll from the scroll start that the character will float for */
    scrollLength? : number;
}
/**
 * A container for a single line of floating text
 */
const FloatingCharacterLine = ({ text, yMax = 2500, yMin = 2000, xMax = 10, xMin = 10, rot = 30, scrollStart = 0, scrollLength = 1000 } : FloatingCharacterLineProps) =>{
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