<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  // import Button from "./UI/Button.svelte";
  import meetups from "./Meetups/meetups-store.js";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import meetupStore from "./Meetups/meetups-store.js";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";

  let editMode = undefined;
  let page = "overview";
  let editedId = undefined;
  let pageData = {};
  let isLoading = true;
  let error;

  fetch("https://svelte-course-4f415-default-rtdb.firebaseio.com/meetups.json")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error fetching data.");
      }
      return res.json();
    })
    .then((data) => {
      const loadedMeetups = [];
      for (const key in data) {
        loadedMeetups.push({ ...data[key], id: key });
      }

      // for demo purpose
      setTimeout(() => {
        isLoading = false;
        meetupStore.setMeetups(loadedMeetups.reverse());
      }, 1000);
    })
    .catch((err) => {
      error = err;
      isLoading = false;
      console.log(err);
    });

  const savedMeetup = () => {
    editMode = null;
    editedId = null;
  };

  // const toggleFavorite = (event) => {
  //   const id = event.detail;

  //   meetups.toggleFavorite(id);
  // };

  const cancelEdit = () => {
    editMode = null;
    editedId = null;
  };

  const showDetails = (event) => {
    page = "details";
    pageData.id = event.detail;
  };

  const closeDetails = () => {
    page = "overview";
    pageData = {};
  };

  const startEdit = (event) => {
    editMode = "edit";
    editedId = event.detail;
  };

  const clearError = () => {
    error = null;
  };
</script>

{#if error}
  <Error message={error.message} on:cancel={clearError} />
{/if}

<Header />

<main>
  {#if page == "overview"}
    {#if editMode === "edit"}
      <EditMeetup id={editedId} on:save={savedMeetup} on:cancel={cancelEdit} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => (editMode = "edit")}
      />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
