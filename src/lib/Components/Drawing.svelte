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
  let lastPoint = { x: 0, y: 0 };
  let height = 0;
  let width = 0;
  let dpi: number;

  // helper distance function
  let dist = function (x1: number, y1: number, x2: number, y2: number) {
    var a = x2 - x1;
    var b = y2 - y1;
    return Math.sqrt(a * a + b * b);
  };

  // handle resizing
  function resize() {
    console.log("resizing");
    ctx.resetTransform();

    // reset transforms & update DPI
    dpi = window.devicePixelRatio;

    // update height and width
    let rect = canvas.getBoundingClientRect();
    height = rect.height * dpi;
    width = rect.width * dpi;
    canvas.setAttribute("height", height.toString());
    canvas.setAttribute("width", width.toString());
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
    /*
    // clear context
    ctx.resetTransform();
    ctx.clearRect(0, 0, width, height);
    */

    // set path properties
    ctx.lineWidth = stroke;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = color;
    ctx.setLineDash(dash);

    // start path
    ctx.beginPath();
    lastPoint = screenToCanvas(x, y);
    ctx.moveTo(lastPoint.x, lastPoint.y);
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

    lastPoint = newPoint;
    ctx.stroke();
  }

  // setup gesture event listeners after mount
  onMount(() => {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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
        default:
          break;
      }
    }) as EventListener);

    let resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
  });
</script>

<canvas id="canvas" bind:this={canvas} />

<style>
  canvas {
    background: cornsilk;
    height: 100%;
    width: 100%;

    /* fix ghost margin below html5 canvas: https://stackoverflow.com/questions/9878090/eliminate-ghost-margin-below-html5-canvas-element */
    vertical-align: bottom;
  }
</style>
