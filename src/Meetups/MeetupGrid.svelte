<script>
  import { createEventDispatcher } from "svelte";
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  import { flip } from "svelte/animate";

  /**
   * @typedef {{
   *  id: number;
   * 	title: string;
   * 	subtitle: string;
   * 	description: string;
   * 	imageUrl: string;
   * 	address: string;
   * 	contactEmail: string;
   *    isFavorite: boolean;
   * }} MeetUp
   */

  /** @type {MeetUp[]} */
  export let meetups;

  let favsOnly = false;

  const dispatch = createEventDispatcher();

  $: filterMeetups = favsOnly
    ? meetups.filter((meetup) => meetup.isFavorite)
    : meetups;

  const setFilter = (event) => {
    favsOnly = event.detail === 1 ? true : false;
  };
</script>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} />
  <Button on:click={() => dispatch("add")}>New Meetup</Button>
</section>

<section id="meetups">
  {#each filterMeetups as meetup (meetup.id)}
    <!-- can only animate to the direct child of {#each} block -->
    <div animate:flip={{ duration: 400 }}>
      <MeetupItem {meetup} on:togglefavorite on:showdetails on:edit />
    </div>
  {:else}
    <p id="no-meetups">No meetups found.</p>
  {/each}
</section>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
