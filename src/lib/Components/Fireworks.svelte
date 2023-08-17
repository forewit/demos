<script lang="ts">
  const DEFAULT_SIZE = 40;
  const DEFAULT_DELAY = 0;

  interface Firework {
    color: string;
    left: number;
    top: number;
    initialLeft: number;
    initialTop: number;
    size?: number;
    delay?: number;
  }

  let activeFireworks: Firework[] = [];
  let iterations = "infinite";

  export function launch(repeat: number, ...fireworks: Firework[]) {
    iterations = repeat < 0 ? "infinite" : repeat.toString();
    activeFireworks = fireworks;
  }
</script>

{#key activeFireworks}
  {#each activeFireworks as firework}
    <div
      class="firework"
      style="
        --color:{firework.color};
        --left:{firework.left}%;
        --top:{firework.top}%;
        --initialLeft:{firework.initialLeft}%;
        --initialTop:{firework.initialTop}%;
        --size:{firework.size || DEFAULT_SIZE}vmin;
        --delay:{firework.delay || DEFAULT_DELAY}s;
        --iterations:{iterations}"
    />
  {/each}
{/key}

<style>
  /* https://alvaromontoro.com/blog/68002/creating-a-firework-effect-with-css */
  @keyframes firework {
    0% {
      left: var(--initialLeft);
      top: var(--initialTop);
      width: 0.5vmin;
      opacity: 1;
    }
    50% {
      width: 0.5vmin;
      opacity: 1;
    }
    100% {
      width: var(--size);
    }
  }

  .firework {
    --color: yellow;
    --left: 50%; /*explosion position*/
    --top: 50%;
    --initialLeft: 50%; /*initial position*/
    --initialTop: 50%;
    --size: 40vmin;
    --delay: 0s;
    --iterations: infinite;
  }

  .firework,
  .firework::before,
  .firework::after {
    content: "";
    position: absolute;
    left: var(--left);
    top: var(--top);
    transform: translate(-50%, -50%);
    width: 0.5vmin;
    aspect-ratio: 1;
    opacity: 0;
    background: radial-gradient(circle, var(--color) 0.2vmin, #0000 0) 50% 00%,
      radial-gradient(circle, var(--color) 0.3vmin, #0000 0) 00% 50%,
      radial-gradient(circle, var(--color) 0.5vmin, #0000 0) 50% 99%,
      radial-gradient(circle, var(--color) 0.2vmin, #0000 0) 99% 50%,
      radial-gradient(circle, var(--color) 0.3vmin, #0000 0) 80% 90%,
      radial-gradient(circle, var(--color) 0.5vmin, #0000 0) 95% 90%,
      radial-gradient(circle, var(--color) 0.5vmin, #0000 0) 10% 60%,
      radial-gradient(circle, var(--color) 0.2vmin, #0000 0) 31% 80%,
      radial-gradient(circle, var(--color) 0.3vmin, #0000 0) 80% 10%,
      radial-gradient(circle, var(--color) 0.2vmin, #0000 0) 90% 23%,
      radial-gradient(circle, var(--color) 0.3vmin, #0000 0) 45% 20%,
      radial-gradient(circle, var(--color) 0.5vmin, #0000 0) 13% 24%;
    background-size: 0.5vmin 0.5vmin; /*locks background size even as element gets bigger*/
    background-repeat: no-repeat;
    animation: firework 2s var(--iterations);
    animation-delay: var(--delay);
  }

  .firework::before {
    transform: translate(-50%, -50%) rotate(25deg) !important;
  }

  .firework::after {
    transform: translate(-50%, -50%) rotate(-37deg) !important;
  }
</style>
