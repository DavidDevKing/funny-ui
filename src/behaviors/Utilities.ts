

export const eventBus = new EventTarget();

/** Returns the maximum scroll value for the entire document */
export function maxScrollY() : number {
    return document.documentElement.scrollHeight - window.innerHeight;
}

/**
 * Linearlly interpolate between [start] and [end] by [ease]
 */
export function lerp(start: number, end: number, ease : number) {
    return start * (1 - ease) + end * ease;
}

/**
 * Custom class for representing two-dimensional vectors
 */
export class Vector2 {
    x: number;
    y: number;

    /** Returns a new Vector2 instance at origin (0, 0) */
    public static readonly ZERO : Vector2 = new Vector2();

    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    /** Add specified vector to self and return the resulting Vector2 */
    public add(vec : Vector2) : Vector2{
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    /** Subtract specified vector from self and return the resulting Vector2 */
    public subtract(vec : Vector2) : Vector2{
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }

    /** Multiply the vector by a scalar number and return the resulting Vector2 */
    public multiply(multiplier: number) : Vector2 {
        return new Vector2(this.x * multiplier, this.y * multiplier);
    }

    /** Divide the vector by a scalar number and return the resulting Vector2 */
    public divide(quotient: number) : Vector2 {
        return new Vector2(this.x / quotient, this.y / quotient);
    }

    /** Return the magnitude of the vector */
    public magnitude(): number {
        return (Math.sqrt(this.x**2 + this.y**2));
    }

    /** Normalize the vector and return the resulting Vector2 */
    public normalized() : Vector2 {
        return this.divide(this.magnitude());
    }

    /** Linearly interpolate from self to specified vector by specified ease velue and return the resulting Vector2 */
    public lerp(end: Vector2, ease : number) : Vector2 {
        return new Vector2(lerp(this.x, end.x, ease), lerp(this.y, end.y, ease));
    }
}