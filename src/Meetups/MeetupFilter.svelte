<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let selectedButton = 0;
</script>

<div>
  <button
    type="button"
    on:click={() => {
      selectedButton = 0;
      dispatch("select", 0);
    }}
    class:active={selectedButton == 0}
  >
    All
  </button>
  <button
    type="button"
    on:click={() => {
      selectedButton = 1;
      dispatch("select", 1);
    }}
    class:active={selectedButton == 1}
  >
    Favorites
  </button>
</div>

<style>
  div {
    font-size: 0px;
  }

  button {
    background-color: #aaaaaa;
    font: inherit;
    font-size: 1rem;
    cursor: pointer;
    border: 1px solid #aaaaaa;
    padding: 0.5rem 1rem;
  }

  button:focus {
    outline: none;
  }

  button:first-of-type {
    border-radius: 5px 0 0 5px;
  }

  button:last-of-type {
    border-radius: 0 5px 5px 0;
  }

  button:hover,
  button:active,
  .active {
    background-color: #cf0056;
    border-color: #cf0056;
    color: white;
  }
</style>
