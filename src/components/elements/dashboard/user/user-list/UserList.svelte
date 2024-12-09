<script>
  import { createEventDispatcher, onMount, tick } from "svelte";
  import UserListItem from "./UserListItem.svelte";
  const dispatch = createEventDispatcher();
  export let users = [];
  export let selectedUser;
  export let loaded = false;
  export let loading = false;
  console.log(users);

  const onSelect = (user) => {
    selectedUser = users;
    dispatch("select", { users });
  };

  onMount(() => {
    tick().then(() => {
      if (users?.length > 0) {
        onSelect(users[0]);
      }
    });
  });
</script>

{#each users as user}
  <UserListItem {user} {loaded} {loading} />
{/each}
