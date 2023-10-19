<script lang="ts">
    const TIMESTAMP_TIMEOUT = 5 // minutes

    type MessageContent = {
        name: string,
        avatar: string, // url
        timestamp: number,
        message: string,
        macros: []
    }

    export let messages: MessageContent[] = [];

    // If scrolled to the bottom, auto-scroll on new message
</script>

<div class="container">
  <div class="messages-box">
    {#each messages as message}
    <!-- display message -->
    <!-- maybe display timestamps -->
    <!-- maybe display avatar & name -->
    {/each}
  </div>
  <div class="dice-box">
    <div class="dice">d4</div>
    <div class="dice">d6</div>
    <div class="dice">d8</div>
    <div class="dice">d10</div>
    <div class="dice">d12</div>
    <div class="dice">d20</div>
  </div>
  <div class="input-box">
    <input type="text">
  </div>
</div>

<style>
.container {

} 
.messages-box {

}
.dice-box {

}
.input-box {

}
</style>