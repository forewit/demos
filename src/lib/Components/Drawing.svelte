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
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let lastPoint: Point = { x: 0, y: 0 };
  let height = 0;
  let width = 0;
  let dpi: number;

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
  let savedPaths: Path[] = [];
  let secondaryCanvas: HTMLCanvasElement;
  let secondaryCtx: CanvasRenderingContext2D;

  // helper distance function
  let dist = function (x1: number, y1: number, x2: number, y2: number) {
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  };

  // handle resizing
  function resize() {
    console.log("resizing");

    dpi = window.devicePixelRatio;

    // update height and width
    let rect = canvas.getBoundingClientRect();
    height = rect.height * dpi;
    width = rect.width * dpi;
    // canvas.setAttribute("height", height.toString());
    // canvas.setAttribute("width", width.toString());
    // secondaryCanvas.setAttribute("height", height.toString());
    // secondaryCanvas.setAttribute("width", width.toString());

    canvas.width = width;
    canvas.height = height;
    secondaryCanvas.width = width;
    secondaryCanvas.height = height;

    // redraw saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      drawPathToSecondaryCanvas(savedPaths[i]);
    }
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

  // custom event handlers
  function startHandle(x: number, y: number) {
    // setup new path
    currentPath = {
      points: [],
      stroke: stroke,
      lineCap: lineCap,
      color: color,
      dash: dash,
    };

    // clear context
    ctx.clearRect(0, 0, width, height);

    // set path properties
    ctx.lineWidth = stroke;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);

    // start path
    ctx.beginPath();
    lastPoint = screenToCanvas(x, y);
    ctx.moveTo(lastPoint.x, lastPoint.y);
    currentPath.points.push(lastPoint);
  }

  function dragHandle(x: number, y: number) {
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
    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, xc, yc);

    // draw the curve
    lastPoint = newPoint;
    ctx.stroke();

    // add control point and new point to the current path
    currentPath.points.push({ x: xc, y: yc }, newPoint);
  }

  function dragEnd() {
    // clear context
    ctx.clearRect(0, 0, width, height);

    // save path and move to secondary canvas
    savedPaths.push(currentPath);
    drawPathToSecondaryCanvas(savedPaths[savedPaths.length - 1]);
  }

  function drawPathToSecondaryCanvas(path: Path) {
    // setup context variables
    secondaryCtx.lineWidth = path.stroke;
    secondaryCtx.lineCap = path.lineCap;
    secondaryCtx.strokeStyle = "#00ff00";//path.color;
    secondaryCtx.setLineDash(path.dash);

    // start path
    secondaryCtx.beginPath();
    secondaryCtx.moveTo(path.points[0].x, path.points[0].y);

    // curve to each point / control-point pair
    for (let j = 1; j < path.points.length; j=j+2) {
      secondaryCtx.quadraticCurveTo(
        path.points[j - 1].x,
        path.points[j - 1].y,
        path.points[j].x,
        path.points[j].y
      );
      secondaryCtx.stroke();
    }
  }

  onMount(() => {
    // setup canvas contexts
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    secondaryCtx = secondaryCanvas.getContext("2d") as CanvasRenderingContext2D;

    // setup gesture event listeners
    gestures.enable(canvas);
    canvas.addEventListener("gesture", ((e: CustomEvent) => {
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
          dragEnd();
          break;
        default:
          break;
      }
    }) as EventListener);

    // setup resize observer
    let resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
  });
</script>

<!-- all saved paths -->
<canvas id="savedPaths" bind:this={secondaryCanvas}></canvas>
<!-- current path -->
<canvas id="canvas" bind:this={canvas} />

<style>
  canvas {
    position: absolute;
    height: 100%;
    width: 100%;

    /* fix ghost margin below html5 canvas: https://stackoverflow.com/questions/9878090/eliminate-ghost-margin-below-html5-canvas-element */
    vertical-align: bottom;
  }
</style>
