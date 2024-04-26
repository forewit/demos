<script lang="ts">
  import { onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures.js";

  // public variables
  export let radius = 3; // radius should usually be at least 2x smoothness
  export let smoothness = 2; // higher smoothness means less points are generated
  export let strokeWidth = 5;
  export let pressureScaler = 5;
  export let color = "#000000";
  export function clear() {
    ctx.clearRect(0, 0, width, height);
    savedPaths = [];
  }

  // internal variables
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let lastPoint = { x: 0, y: 0 };
  let lastLineWidth = 0;
  let height = 0;
  let width = 0;
  let dpi: number;
  let drawing = false;
  let log: HTMLDivElement;

  interface Path {
    points: { x: number; y: number }[];
    lineWidths: number[];
    ctrlPoints: { x: number; y: number }[];
    color: string;
  }
  let currentPath: Path;
  let savedPaths: Path[] = []; // used to re-draw the paths if needed

  // helper distance function
  const dist = (x1: number, y1: number, x2: number, y2: number) => {
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  };

  // helper debounce function
  // TODO: update so that resizing isn't jittery?
  const debounce = (func: Function, timeout = 300) => {
    // @ts-ignore
    let timer;
    // @ts-ignore
    return (...args) => {
      // @ts-ignore
      clearTimeout(timer);
      timer = setTimeout(() => {
        // @ts-ignore
        func.apply(this, args);
      }, timeout);
    };
  };

  // helper easing function
  function easeInOutSine(x: number): number {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
  // helper function for translating screen to canvas coordinates
  function screenToCanvas(x: number, y: number) {
    // adjust for DPI & offset
    let rect = canvas.getBoundingClientRect();
    return {
      x: (x - rect.left) * dpi,
      y: (y - rect.top) * dpi,
    };
  }

  // handle resizing
  function resize() {
    console.log("resizing");

    // stop drawing if you already are
    dragEndHandler();

    // step 1: resize the onScreenCanvas
    dpi = window.devicePixelRatio;
    let rect = canvas.getBoundingClientRect();
    height = rect.height * dpi;
    width = rect.width * dpi;
    canvas.width = width;
    canvas.height = height;

    // render all saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      //renderPath(savedPaths[i]);
    }
  }

  // custom event handlers
  function startHandle(x: number, y: number, pressure: number) {
    drawing = true;
    lastPoint = screenToCanvas(x, y);

    if (pressure !== undefined && pressure > 0) {
      lastLineWidth = Math.log(pressure + 1) * pressureScaler * strokeWidth;
    } else {
      lastLineWidth = strokeWidth;
    }

    // set canvas properties
    ctx.lineWidth = lastLineWidth;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;

    // draw path
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.stroke();

    // save new path
    currentPath = {
      points: [lastPoint],
      ctrlPoints: [],
      lineWidths: [lastLineWidth],
      color: color,
    };
  }

  function dragHandle(x: number, y: number, pressure: number) {
    if (!drawing) return;

    let newPoint = screenToCanvas(x, y);

    // if using a drawing circle
    if (radius > 0) {
      // do nothing if point is inside the drawing circle
      if (dist(newPoint.x, newPoint.y, lastPoint.x, lastPoint.y) <= radius)
        return;

      // draw if the point is outside the drawing circle
      // see: https://math.stackexchange.com/questions/127613/closest-point-on-circle-edge-from-point-outside-inside-the-circle
      // A = point
      // B = lastPoint
      // r = drawRadius
      let denominator = Math.sqrt(
        newPoint.x * newPoint.x +
          newPoint.y * newPoint.y -
          2 * newPoint.x * lastPoint.x +
          lastPoint.x * lastPoint.x -
          2 * newPoint.y * lastPoint.y +
          lastPoint.y * lastPoint.y,
      );
      let temp = {
        x: newPoint.x + radius * ((lastPoint.x - newPoint.x) / denominator),
        y: newPoint.y + radius * ((lastPoint.y - newPoint.y) / denominator),
      };
      newPoint = temp;

      // prevent jagged lines by making sure new points aren't too close together
      if (dist(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) <= smoothness)
        return;
    }

    // set control points
    let xc = (lastPoint.x + newPoint.x) / 2;
    let yc = (lastPoint.y + newPoint.y) / 2;

    // update line width
    if (pressure !== undefined && pressure > 0) {
      lastLineWidth =
        Math.log(pressure + 1) * pressureScaler * strokeWidth * 0.2 +
        lastLineWidth * 0.8;
    }

    // draw path
    ctx.lineWidth = lastLineWidth;
    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, xc, yc);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(xc, yc);

    // add control point and new point to the current path
    currentPath.points.push(lastPoint);
    currentPath.ctrlPoints.push({ x: xc, y: yc });
    currentPath.lineWidths.push(lastLineWidth);

    // update last point
    lastPoint = newPoint;
  }

  function dragEndHandler() {
    if (drawing) savedPaths.push(currentPath);
    drawing = false;
  }

  onMount(() => {
    // setup onscreen canvas context
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;

    // setup gesture event listeners
    gestures.enable(canvas);
    canvas.addEventListener("gesture", ((e: CustomEvent) => {
      switch (e.detail.name) {
        case "left-click-drag-start":
        case "touch-drag-start":
          startHandle(e.detail.x, e.detail.y, e.detail.force);
          break;
        case "left-click-dragging":
        case "touch-dragging":
          if (e.detail.force > 0) log.innerHTML = e.detail.force;
          dragHandle(e.detail.x, e.detail.y, e.detail.force);
          break;
        case "left-click-drag-end":
        case "tough-drag-end":
          dragEndHandler();
          break;
        default:
          break;
      }
    }) as EventListener);

    // setup resize observer
    let resizeObserver = new ResizeObserver(debounce(resize, 150));
    resizeObserver.observe(canvas);
  });
</script>

<!-- current path -->
<canvas id="canvas" bind:this={canvas} />
<div class="log" bind:this={log}>LOG</div>

<style>
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;

    /* fix ghost margin below html5 canvas: https://stackoverflow.com/questions/9878090/eliminate-ghost-margin-below-html5-canvas-element */
    vertical-align: bottom;
  }
  .log {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
</style>
