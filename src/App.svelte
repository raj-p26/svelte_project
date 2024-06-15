<script>
  import Product from "./Product.svelte";
  import CardItem from "./CardItem.svelte";
  import FamilyNode from "./FamilyNode.svelte";

  let currentTitle = "My App";

  let familyTree = [
    {
      isParent: true,
      name: "Chris",
      children: [
        {
          isParent: true,
          name: "Moe",
          children: [{ isParent: false, name: "Julie" }],
        },
      ],
    },
    { isParent: false, name: "Anna" },
  ];

  let renderedComponent = {
    component: Product,
    title: "Test Product",
    id: "p1",
  };

  function toggle() {
    if (renderedComponent.component === Product) {
      renderedComponent = {
        component: CardItem,
        title: "Another Product",
        id: "p2",
      };
    } else {
      renderedComponent = {
        component: Product,
        title: "Test Product",
        id: "p1",
      };
    }
  }

  function switchTitle() {
    currentTitle = "A New Title";
  }
</script>

<!-- used to change head tag properties. -->
<svelte:head>
  <title>{currentTitle}</title>
</svelte:head>

<!-- used to listen to window events directly. Beneficial for SSR. -->
<!-- <svelte:window /> -->
<!-- same as svelte:window. Targets document.body -->
<!-- <svelte:body /> -->

<button on:click={toggle}>Toggle Display</button>

<svelte:component
  this={renderedComponent.component}
  title={renderedComponent.title}
  id={renderedComponent.id}
/>

{#each familyTree as familyMember}
  <FamilyNode member={familyMember} />
{/each}

<button on:click={switchTitle}>Switch Title</button>
