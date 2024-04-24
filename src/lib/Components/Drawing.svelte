<script lang="ts">
  import { onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures.js";

  // public variables
  export let radius = 10;
  export let stroke = 5;
  export let lineCap = "round" as CanvasLineCap;
  export let color = "#000000";
  export let dashed = false;
  $: dash = dashed ? [stroke, stroke * 3] : [];

  // internal variables
  let onScreenCanvas: HTMLCanvasElement;
  let onScreenCtx: CanvasRenderingContext2D;
  let offScreenCanvas: HTMLCanvasElement;
  let offScreenCtx: CanvasRenderingContext2D;
  let img: HTMLImageElement;
  let lastPoint: Point = { x: 0, y: 0 };
  let height = 0;
  let width = 0;
  let dpi: number;
  let drawing = false;

  interface Point {
    x: number;
    y: number;
  }
  interface Path {
    points: Point[];
    stroke: number;
    lineCap: CanvasLineCap;
    color: string;
    dash: number[];
  }
  let currentPath: Path;
  let savedPaths: Path[] = []; // used to re-draw the paths if needed

  // helper distance function
  let dist = function (x1: number, y1: number, x2: number, y2: number) {
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  };

  // handle resizing
  async function resize() {
    console.log("resizing");

    // stop drawing if you already are
    await dragEndHandler();

    // step 1: resize the onScreenCanvas
    dpi = window.devicePixelRatio;
    let rect = onScreenCanvas.getBoundingClientRect();
    let oldHeight = height;
    let oldWidth = width;
    height = rect.height * dpi;
    width = rect.width * dpi;
    onScreenCanvas.width = width;
    onScreenCanvas.height = height;

    // step 2: render the offScreenCanvas back to the onScreenCanvas
    img.onload = () => {
      onScreenCtx.drawImage(img, 0, 0, oldWidth, oldHeight);

      // step 3: resize the offScreenCanvas
      offScreenCanvas.width = width;
      offScreenCanvas.height = height;
    };
    img.src = offScreenCanvas.toDataURL();
  }

  // helper function for translating screen to canvas coordinates
  function screenToCanvas(x: number, y: number) {
    // adjust for DPI & offset
    let rect = onScreenCanvas.getBoundingClientRect();
    return {
      x: (x - rect.left) * dpi,
      y: (y - rect.top) * dpi,
    };
  }

  // custom event handlers
  function startHandle(x: number, y: number) {
    drawing = true;

    // setup new path
    currentPath = {
      points: [],
      stroke: stroke,
      lineCap: lineCap,
      color: color,
      dash: dash,
    };

    // set path properties
    onScreenCtx.lineWidth = stroke;
    onScreenCtx.lineCap = lineCap;
    onScreenCtx.strokeStyle = color;
    onScreenCtx.setLineDash(dash);

    // start path
    onScreenCtx.beginPath();
    lastPoint = screenToCanvas(x, y);
    onScreenCtx.moveTo(lastPoint.x, lastPoint.y);
    currentPath.points.push(lastPoint);
  }

  function dragHandle(x: number, y: number) {
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
          lastPoint.y * lastPoint.y
      );
      let temp = {
        x: newPoint.x + radius * ((lastPoint.x - newPoint.x) / denominator),
        y: newPoint.y + radius * ((lastPoint.y - newPoint.y) / denominator),
      };
      newPoint = temp;

      // prevent jagged lines by making sure new points aren't too close together
      if (dist(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y) <= 0.1) return;
    }

    // curve to the new point
    var xc = (lastPoint.x + newPoint.x) / 2;
    var yc = (lastPoint.y + newPoint.y) / 2;
    onScreenCtx.quadraticCurveTo(lastPoint.x, lastPoint.y, xc, yc);

    // draw the curve
    lastPoint = newPoint;
    onScreenCtx.stroke();

    // add control point and new point to the current path
    currentPath.points.push({ x: xc, y: yc }, newPoint);
  }

  async function dragEndHandler() {
    if (drawing) savedPaths.push(currentPath);
    drawing = false;

    // render the onScreenCanvas to the offScreenCanvas
    await onScreenToOffScreen();
  }

  function offScreenToOnScreen() {
// render the onScreenCanvas to the offScreenCanvas
return new Promise((resolve, reject) => {
      img.onload = () => {
        onScreenCtx.drawImage(img, 0, 0, onScreenCanvas.width, onScreenCanvas.height);
        resolve(img);
      };
      img.onerror = reject;
      img.src = offScreenCanvas.toDataURL();
    });
  }

  function onScreenToOffScreen() {
    // render the offScreenCanvas to the onScreenCanvas
    return new Promise((resolve, reject) => {
      img.onload = () => {
        offScreenCtx.drawImage(img, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
        resolve(img);
      };
      img.onerror = reject;
      img.src = onScreenCanvas.toDataURL();
    });
  }

  onMount(() => {
    // setup onscreen canvas context
    onScreenCtx = onScreenCanvas.getContext("2d") as CanvasRenderingContext2D;
    onScreenCtx.imageSmoothingEnabled = false;

    // setup offscreen canvas
    offScreenCanvas = document.createElement("canvas");
    offScreenCtx = offScreenCanvas.getContext("2d") as CanvasRenderingContext2D;
    offScreenCtx.imageSmoothingEnabled = false;

    // setup image for copying canvases
    img = new Image();

    // setup gesture event listeners
    gestures.enable(onScreenCanvas);
    onScreenCanvas.addEventListener("gesture", ((e: CustomEvent) => {
      switch (e.detail.name) {
        case "left-click-drag-start":
        case "touch-drag-start":
          startHandle(e.detail.x, e.detail.y);
          break;
        case "left-click-dragging":
        case "touch-dragging":
          dragHandle(e.detail.x, e.detail.y);
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
    let resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(onScreenCanvas);
  });
</script>

<!-- current path -->
<canvas id="canvas" bind:this={onScreenCanvas} />

<style>
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;

    /* fix ghost margin below html5 canvas: https://stackoverflow.com/questions/9878090/eliminate-ghost-margin-below-html5-canvas-element */
    vertical-align: bottom;
  }
</style>
