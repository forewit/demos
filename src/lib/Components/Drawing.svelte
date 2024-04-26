<script lang="ts">
  import { onMount } from "svelte";
  import * as gestures from "$lib/modules/gestures.js";

  // public variables
  export let radius = 3; // radius should usually be at least 2x smoothness
  export let smoothness = 2; // higher smoothness means less points are generated
  export let stroke = 5;
  export let lineCap = "round" as CanvasLineCap;
  export let color = "#000000";
  export let dashed = false;
  export function clear() {
    ctx.clearRect(0, 0, width, height);
    savedPaths = [];
  }

  // internal variables
  $: dash = dashed ? [stroke, stroke * 3] : [];
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let lastPoint = { x: 0, y: 0 };
  let height = 0;
  let width = 0;
  let dpi: number;
  let drawing = false;
  let log: HTMLDivElement;

  interface Path {
    points: { x: number; y: number; lineWidth: number }[];
    pressures: number[];
    stroke: number;
    lineCap: CanvasLineCap;
    color: string;
    dash: number[];
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

  // handle resizing
  async function resize() {
    console.log("resizing");

    // stop drawing if you already are
    await dragEndHandler();

    // step 1: resize the onScreenCanvas
    dpi = window.devicePixelRatio;
    let rect = canvas.getBoundingClientRect();
    height = rect.height * dpi;
    width = rect.width * dpi;
    canvas.width = width;
    canvas.height = height;

    // render all saved paths
    for (let i = 0; i < savedPaths.length; i++) {
      renderPath(savedPaths[i]);
    }
  }

  function renderPath(path: Path) {
    ctx.lineWidth = path.stroke;
    ctx.lineCap = path.lineCap;
    ctx.strokeStyle = path.color;
    ctx.setLineDash(path.dash);
    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);

    for (let i = 1; i < path.points.length; i = i + 2) {
      ctx.quadraticCurveTo(
        path.points[i - 1].x,
        path.points[i - 1].y,
        path.points[i].x,
        path.points[i].y,
      );
      ctx.stroke();
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
  function startHandle(x: number, y: number, pressure: number) {
    drawing = true;

    // setup new path
    currentPath = {
      points: [],
      pressures: [],
      stroke: stroke,
      lineCap: lineCap,
      color: color,
      dash: dash,
    };

    // set path properties
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.log(pressure + 1) * stroke;
    ctx.setLineDash(dash);

    // start path
    lastPoint = screenToCanvas(x, y);

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.stroke();
    currentPath.points.push({ x: lastPoint.x, y: lastPoint.y, lineWidth: ctx.lineWidth });
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

    // draw the curve
    ctx.lineWidth = Math.log(pressure + 1) * stroke;

    ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, xc, yc);
    ctx.stroke();
    ctx.beginPath();

    ctx.moveTo(xc, yc);

    // add control point and new point to the current path
    lastPoint = newPoint;
    currentPath.points.push(
      { x: xc, y: yc, lineWidth: ctx.lineWidth },
      { x: newPoint.x, y: newPoint.y, lineWidth: ctx.lineWidth },
    );
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
          var pressure =
            e.detail.force !== undefined
              ? e.detail.force
              : 0.5;
          startHandle(e.detail.x, e.detail.y, pressure);
          break;
        case "left-click-dragging":
        case "touch-dragging":
          var pressure =
            e.detail.force !== undefined
              ? e.detail.force
              : 0.5;
          if (e.detail.force > 0.8) log.innerHTML = e.detail.force;
          dragHandle(e.detail.x, e.detail.y, pressure);
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
