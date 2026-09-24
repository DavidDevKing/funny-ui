"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BouncyAttractor: () => BouncyAttractor_default,
  CancelSmoothScroll: () => CancelSmoothScroll,
  FloatingCharacter: () => FloatingCharacter_default,
  FloatingCharacterLine: () => FloatingCharacterLine_default,
  InkDropButton: () => InkDropButton_default,
  SmoothScroll: () => SmoothScroll
});
module.exports = __toCommonJS(index_exports);

// src/components/elements/FloatingCharacter.tsx
var import_react = require("react");

// src/behaviors/Utilities.ts
function maxScrollY() {
  return document.documentElement.scrollHeight - window.innerHeight;
}
function lerp(start, end, ease) {
  return start * (1 - ease) + end * ease;
}
var Vector2 = class _Vector2 {
  x;
  y;
  /** Returns a new Vector2 instance at origin (0, 0) */
  static get ZERO() {
    return new _Vector2();
  }
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  /** Add specified vector to self and return the resulting Vector2 */
  add(vec) {
    return new _Vector2(this.x + vec.x, this.y + vec.y);
  }
  /** Subtract specified vector from self and return the resulting Vector2 */
  subtract(vec) {
    return new _Vector2(this.x - vec.x, this.y - vec.y);
  }
  /** Multiply the vector by a scalar number and return the resulting Vector2 */
  multiply(multiplier) {
    return new _Vector2(this.x * multiplier, this.y * multiplier);
  }
  /** Divide the vector by a scalar number and return the resulting Vector2 */
  divide(divisor) {
    return new _Vector2(this.x / divisor, this.y / divisor);
  }
  /** Return the magnitude of the vector */
  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  /** Normalize the vector and return the resulting Vector2 */
  normalized() {
    return this.divide(this.magnitude());
  }
  /** Linearly interpolate from self to specified vector by specified ease velue and return the resulting Vector2 */
  lerp(end, ease) {
    return new _Vector2(lerp(this.x, end.x, ease), lerp(this.y, end.y, ease));
  }
};

// src/components/elements/FloatingCharacter.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function FloatingCharacter({ character, translateEndX = 0, translateEndY = 0, rotateEnd = 0, scrollStart = 0, scrollLength = 1e3 }) {
  const letterRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    let currentScroll2 = 0;
    let translateOffsetX = 0;
    let translateOffsetY = 0;
    let rotateOffset = 0;
    let animationID;
    function handleScrolling() {
      currentScroll2 = window.scrollY;
    }
    document.addEventListener("scroll", handleScrolling);
    function handleFloating() {
      let clampedScroll = Math.min(Math.max(currentScroll2, scrollStart), scrollLength);
      translateOffsetX = (clampedScroll - scrollStart) / scrollLength * translateEndX;
      translateOffsetY = lerp(translateOffsetY, (clampedScroll - scrollStart) / scrollLength * translateEndY, 0.2);
      rotateOffset = (clampedScroll - scrollStart) / scrollLength * rotateEnd;
      if (letterRef.current) letterRef.current.style.transform = "translate(" + translateOffsetX + "px, " + -translateOffsetY + "px) rotate(" + rotateOffset + "deg)";
      animationID = requestAnimationFrame(handleFloating);
    }
    handleFloating();
    return () => {
      document.removeEventListener("scroll", handleScrolling);
      if (animationID) {
        cancelAnimationFrame(animationID);
        animationID = null;
      }
    };
  }, []);
  if (character == " ") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-full w-5 xl:w-15 will-change-transform" });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { ref: letterRef, className: `letter text-[60px] sm:text-[90px] md:text-[120px] lg:text-[150px] xl:text-[210px] font-semibold flex items-center justify-center will-change-transform`, children: character });
}
var FloatingCharacter_default = FloatingCharacter;

// src/components/elements/FloatingCharacterLine.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var FloatingCharacterLine = ({ text, yMax = 2500, yMin = 2e3, xMax = 10, xMin = 10, rot = 30, scrollStart = 0, scrollLength = 1e3 }) => {
  const words = text.split(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex flex-wrap relative", children: words.map((word, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex", children: [
    word.split("").map((char, innerIndex) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      FloatingCharacter_default,
      {
        scrollStart,
        scrollLength,
        character: char,
        translateEndX: Math.random() * (xMax + xMin) - xMin,
        translateEndY: Math.random() < 0.7 ? Math.random() * (yMax + yMin) - yMin : Math.random() * (yMax / 5 + yMin / 5) - yMin / 5,
        rotateEnd: Math.random() * 2 * rot - rot
      },
      innerIndex
    )),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      FloatingCharacter_default,
      {
        character: " ",
        scrollStart,
        scrollLength
      }
    )
  ] }, index)) });
};
var FloatingCharacterLine_default = FloatingCharacterLine;

// src/components/elements/BouncyAttractor.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
function BouncyAttractor({
  maxRadius = 50,
  frequency = 0.2,
  damping = 6,
  bounciness = 12,
  children
}) {
  const bouncyAttractorRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    const bouncyAttractor = bouncyAttractorRef.current;
    if (!bouncyAttractor) {
      console.error("NO BOUNCY ATTRACTOR FOUND!!!");
      return;
    }
    let offset = new Vector2();
    let target = new Vector2();
    let center = new Vector2();
    let amplitude = new Vector2();
    let angle = 0;
    let rect;
    const handlePointerEnter = (e) => {
      rect = bouncyAttractor.getBoundingClientRect();
      center = new Vector2(rect.left + rect.width / 2, rect.top + rect.height / 2);
      target = new Vector2(e.clientX - center.x, e.clientY - center.y);
      const offsetDir = target.normalized();
      target.x = Math.min(offsetDir.x * maxRadius, Math.max(offsetDir.x * -maxRadius, target.x));
      target.y = Math.min(offsetDir.y * maxRadius, Math.max(offsetDir.y * -maxRadius, target.y));
      amplitude = new Vector2(target.x, target.y);
      angle = Math.PI / 2;
    };
    const handlePointerMove = (e) => {
      target = new Vector2(e.clientX - center.x, e.clientY - center.y);
      const offsetDir = target.normalized();
      target.x = Math.min(offsetDir.x * maxRadius, Math.max(offsetDir.x * -maxRadius, target.x));
      target.y = Math.min(offsetDir.y * maxRadius, Math.max(offsetDir.y * -maxRadius, target.y));
    };
    const handlePointerLeave = () => {
      amplitude.x = -target.x * 2;
      amplitude.y = -target.y * 2;
      angle = Math.PI / 2;
      target.x = 0;
      target.y = 0;
    };
    function UpdatePosition() {
      offset = offset.lerp(new Vector2(target.x + Math.sin(angle) * amplitude.x, target.y + Math.sin(angle) * amplitude.y), 1 / damping);
      angle += frequency;
      amplitude = amplitude.lerp(Vector2.ZERO, 1 / bounciness);
      bouncyAttractor.style.transform = "translate(" + offset.x + "px, " + offset.y + "px)";
      requestAnimationFrame(UpdatePosition);
    }
    UpdatePosition();
    bouncyAttractor.addEventListener("pointermove", handlePointerMove);
    bouncyAttractor.addEventListener("pointerenter", handlePointerEnter);
    bouncyAttractor.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      bouncyAttractor.removeEventListener("pointermove", handlePointerMove);
      bouncyAttractor.removeEventListener("pointerenter", handlePointerEnter);
      bouncyAttractor.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: bouncyAttractorRef, className: "pointer-events-none *:pointer-events-auto", children });
}
var BouncyAttractor_default = BouncyAttractor;

// src/components/elements/InkDropButton.tsx
var import_react3 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function InkDropButton({ color = "#772B81", hoverColor = "#D69F00", origin = "cursor", borderRadius = "100%", children }) {
  const buttonRef = (0, import_react3.useRef)(null);
  const inkDropRef = (0, import_react3.useRef)(null);
  const updateInkDrop = (e) => {
    const button = buttonRef.current;
    const inkDrop = inkDropRef.current;
    if (!inkDrop || !button) return;
    const rect = button.getBoundingClientRect();
    const rectVec = new Vector2(rect.width, rect.height);
    const originVec = new Vector2(rect.left, rect.top);
    const offset = new Vector2(e.clientX - originVec.x, e.clientY - originVec.y);
    if (origin === "cursor") inkDrop.style.translate = `${offset.x}px ${offset.y}px`;
    const largestDistanceFromPoint = (point, end) => {
      const center = end.divide(2);
      const diffFromCenter = center.subtract(point);
      let dist = point;
      if (diffFromCenter.x > 0) dist.x = end.x - dist.x;
      if (diffFromCenter.y > 0) dist.y = end.y - dist.y;
      return dist.magnitude();
    };
    if (e.type === "pointerenter") {
      if (origin === "cursor") {
        const targetScale = largestDistanceFromPoint(offset, rectVec) * 2;
        inkDrop.style.scale = `${targetScale}`;
      } else if (origin === "top" || origin === "bottom") inkDrop.style.scale = `${rectVec.y * 2}`;
      else if (origin === "left" || origin === "right") inkDrop.style.scale = `${rectVec.x * 2}`;
      else inkDrop.style.scale = `${rectVec.magnitude()}`;
    } else if (e.type === "pointerleave") {
      inkDrop.style.scale = "0";
    }
  };
  (0, import_react3.useEffect)(() => {
    const button = buttonRef.current;
    const inkDrop = inkDropRef.current;
    if (!button || !inkDrop) return;
    button.addEventListener("pointerenter", updateInkDrop);
    button.addEventListener("pointerleave", updateInkDrop);
    const rect = button.getBoundingClientRect();
    const rectVec = new Vector2(rect.width, rect.height);
    inkDrop.style.translate = `${origin === "left" ? "0" : origin === "right" ? rectVec.x : rectVec.x / 2}px ${origin === "top" ? "0" : origin === "bottom" ? rectVec.y : rectVec.y / 2}px`;
    return () => {
      button.removeEventListener("pointerenter", updateInkDrop);
      button.removeEventListener("pointerleave", updateInkDrop);
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      ref: buttonRef,
      className: "relative group flex overflow-hidden cursor-pointer z-0",
      style: {
        borderRadius: `${borderRadius}`
      },
      children: [
        children,
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "div",
          {
            ref: inkDropRef,
            className: "absolute w-px h-px rounded-full -z-10 scale-0 transition-[scale] duration-200 ease-in-out backdrop-hue-rotate-180",
            style: {
              backgroundColor: `${hoverColor}`,
              borderRadius: "100%"
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "absolute inset-0 w-full h-full -z-20", style: { backgroundColor: `${color}` } })
      ]
    }
  );
}
var InkDropButton_default = InkDropButton;

// src/behaviors/SmoothScroll.ts
var targetScroll = window.scrollY;
var currentScroll = window.scrollY;
var isScrolling = false;
var requestID = null;
var handleWheel = (e) => {
  if (isScrolling != true) {
    currentScroll = targetScroll = window.scrollY;
  }
  isScrolling = true;
  targetScroll += e.deltaY;
  targetScroll = Math.max(0, Math.min(targetScroll, maxScrollY()));
  e.preventDefault();
};
var handleTouchStart = () => {
  isScrolling = false;
};
function UpdateScroll() {
  window.scrollTo({ top: currentScroll, behavior: "instant" });
}
function AnimateScroll(ease) {
  if (isScrolling) {
    currentScroll = lerp(currentScroll, targetScroll, ease);
    if (Math.abs(currentScroll - targetScroll) <= 0.1) {
      currentScroll = targetScroll;
      isScrolling = false;
    }
    UpdateScroll();
  }
  requestID = requestAnimationFrame(() => {
    AnimateScroll(ease);
  });
}
function SmoothScroll(damping = 0.94) {
  CancelSmoothScroll();
  window.addEventListener("wheel", handleWheel, { passive: false });
  window.addEventListener("touchstart", handleTouchStart);
  const ease = 1 - Math.min(0.999, Math.max(1e-3, damping));
  AnimateScroll(ease);
}
function CancelSmoothScroll() {
  if (requestID) {
    cancelAnimationFrame(requestID);
    requestID = null;
  }
  isScrolling = false;
  window.removeEventListener("wheel", handleWheel);
  window.removeEventListener("touchstart", handleTouchStart);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BouncyAttractor,
  CancelSmoothScroll,
  FloatingCharacter,
  FloatingCharacterLine,
  InkDropButton,
  SmoothScroll
});
