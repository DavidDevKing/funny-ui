import * as react from 'react';
import { ReactNode } from 'react';

interface FloatingCharacterProps {
    /** The single chrater to be displayed */
    character: string;
    /** The total amount this character will translate on the x axis on scroll */
    translateEndX?: number;
    /** The total amount this character will translate on the y axis on scroll */
    translateEndY?: number;
    /** The totatl amount this character will rotate on scroll */
    rotateEnd?: number;
    /** The scroll value at which the charater starts floating */
    scrollStart?: number;
    /** The offset scroll from the scroll start which the character will float for */
    scrollLength?: number;
}
/**
 * A react component single floating character
 */
declare function FloatingCharacter({ character, translateEndX, translateEndY, rotateEnd, scrollStart, scrollLength }: FloatingCharacterProps): react.JSX.Element;

interface FloatingCharacterLineProps {
    /** The string of floating characters to be displayed */
    text: string;
    /** The maximum positive offset of each floating character on the y axis */
    yMax?: number;
    /** The maximum negative offset of each floating character on the y axis */
    yMin?: number;
    /** The maximum postive offset of each floating character on the x axis */
    xMax?: number;
    /** The maximum negative offset of each floating character on the x axis */
    xMin?: number;
    /** The maximum rotational offset in degrees of each floating character */
    rot?: number;
    /** The scroll value at which the character starts floating */
    scrollStart?: number;
    /** The offset scroll from the scroll start that the character will float for */
    scrollLength?: number;
}
/**
 * A container for a single line of floating text
 */
declare const FloatingCharacterLine: ({ text, yMax, yMin, xMax, xMin, rot, scrollStart, scrollLength }: FloatingCharacterLineProps) => react.JSX.Element;

interface BouncyAttractorProps {
    /** The maximum distance from the starting positon the element can move */
    maxRadius?: number;
    /** Factor that determines how many times the element bounces */
    frequency?: number;
    /** Factor that determins how smooth the bounce animation is */
    damping?: number;
    /** Factor that determins how long the element bounces for */
    bounciness?: number;
    /** The child element of the bouncy attractor to be rendered */
    children?: ReactNode;
}
/**
 * An element at bounces towards the mouse cursor on hover
 */
declare function BouncyAttractor({ maxRadius, frequency, damping, bounciness, children }: BouncyAttractorProps): react.JSX.Element;

interface InkDropButtonProps {
    /** Background color of the element */
    color?: string;
    /** Color of the inkdrop effect */
    hoverColor?: string;
    /** Define the position the inkdrop spreads from  */
    origin?: "left" | "right" | "top" | "bottom" | "center" | "cursor";
    /** Border radius of the button */
    borderRadius?: string;
    /** Children elements of the button */
    children?: ReactNode;
}
/**
 * Element that uses an inkdrop effect to change it's background on hover
 */
declare function InkDropButton({ color, hoverColor, origin, borderRadius, children }: InkDropButtonProps): react.JSX.Element;

/**
 * Function that alters the default scrolling behaviour of a webpage
 * @param damping - Value that controls the smoothing of the scroll
 */
declare function SmoothScroll(damping?: number): void;
/**
 * Stops the smooth scroll behaviour and restores windows scrolling to default behaviour
 */
declare function CancelSmoothScroll(): void;

export { BouncyAttractor, CancelSmoothScroll, FloatingCharacter, FloatingCharacterLine, InkDropButton, SmoothScroll };
