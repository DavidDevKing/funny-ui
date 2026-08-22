

export const eventBus = new EventTarget();

export function maxScrollY() : number {
    return document.documentElement.scrollHeight - window.innerHeight;
}

export function lerp(start: number, end: number, ease : number) {
    return start * (1 - ease) + end * ease;
}
export class Vector2 {
    x: number;
    y: number;

    public static readonly ZERO : Vector2 = new Vector2();

    constructor(x: number = 0, y: number = 0){
        this.x = x;
        this.y = y;
    }

    public add(vec : Vector2) : Vector2{
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    public subtract(vec : Vector2) : Vector2{
        return new Vector2(this.x - vec.x, this.y - vec.y);
    }
    public multiply(multiplier: number) : Vector2 {
        return new Vector2(this.x * multiplier, this.y * multiplier);
    }
    public divide(quotient: number) : Vector2 {
        return new Vector2(this.x / quotient, this.y / quotient);
    }
    public magnitude(): number {
        return (Math.sqrt(this.x**2 + this.y**2));
    }
    public normalized() : Vector2 {
        return this.divide(this.magnitude());
    }
    public lerp(end: Vector2, ease : number) : Vector2 {
        return new Vector2(lerp(this.x, end.x, ease), lerp(this.y, end.y, ease));
    }
}