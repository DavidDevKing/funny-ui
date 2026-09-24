# Funny UI

> A collection of interactive unconventional UI components

## Behaviors and Elements

- `FloatingCharacter`: A character that floats on mouse scroll.

- `FloatingCharacterLine`: A line of floating characters.

- `BouncyAttractor`: A magnetic component that pulls towards the mouse cursor with springy physics.

- `InkDropButton`: A button that mimics the effect of ink dropping on it on hover.

- `SmoothScroll` : Function that alters the default scrolling behavior of web pages to be smoother than usual.

- `CancelSmoothScroll` : Function that stops the smooth scrolling behavior and restores windows scrolling to defualt behavior.

## Getting Started

1. Install the package via npm:

``` bash
npm install @david-king/funny-ui
```

2. Add the Smooth Scroll behaviour to App.tsx. Copy and paste this:

``` typescript
// App.tsx

import { SmoothScroll } from "@david-king/funny-ui";
SmoothScroll();
```

## Live Demo

Check out the live demo at [https://daviddevking.github.io/funny-ui](https://daviddevking.github.io/funny-ui)

> **Note:** setting the `rotateEnd` property on `FloatingCharacter` and the `rot` property on  `FloatingCharacterLine` to anything other than 0 will cause lagging on gecko based browsers like firefox and zen browser and because of this, the demo will lag on gecko based browsers as well.