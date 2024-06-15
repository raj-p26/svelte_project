<script>
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import meetupStore from "./meetups-store";
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  const dispatch = createEventDispatcher();

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

  /** @type {MeetUp} */
  export let meetup;

  const toggleFavorite = (event) => {
    meetupStore.toggleFavorite(meetup.id);
  };
</script>

<article transition:scale>
  <header>
    <h1>
      {meetup.title}
      {#if meetup.isFavorite}
        <Badge>FAVORITE</Badge>
      {/if}
    </h1>
    <h2>{meetup.subtitle}</h2>
    <p>{meetup.address}</p>
  </header>
  <div class="image">
    <img src={meetup.imageUrl} alt={meetup.title} />
  </div>
  <div class="content">
    <p>{meetup.description}</p>
  </div>
  <footer>
    <Button
      mode="outline"
      type="button"
      on:click={() => dispatch("edit", meetup.id)}
    >
      Edit
    </Button>
    <Button
      type="button"
      color={meetup.isFavorite ? null : "success"}
      mode="outline"
      on:click={toggleFavorite}
    >
      {meetup.isFavorite ? "Unfavorite" : "Favorite"}
    </Button>
    <Button type="button" on:click={() => dispatch("showdetails", meetup.id)}
      >Show Details</Button
    >
  </footer>
</article>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background-color: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  /* h1.is-favorite {
    background-color: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  } */

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>
