<!-- useful when sharing data across components of same type. -->
<!-- runs once for file -->
<script context="module">
  console.log("Runs once!");

  let deactive;
</script>

<script>
  export let member;
  let isActive;
  console.log("Runs multiple times");

  function deactivate() {
    isActive = false;
  }

  function activate() {
    if (deactive) {
      deactive();
    }
    isActive = true;
    deactive = deactivate;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={activate} class:active={isActive}>
  <h1>{member.name}</h1>
  {#if member.isParent}
    {#each member.children as child}
      <svelte:self member={child} />
    {/each}
  {/if}
</div>

<style>
  div {
    margin-left: 2rem;
  }

  .active {
    color: red;
  }
</style>
