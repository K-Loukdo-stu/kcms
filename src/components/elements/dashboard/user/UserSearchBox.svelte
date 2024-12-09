<script>
  import SmfbLoading from "$components/materials/spinners/fbLoading/SMFBLoading.svelte";
  // import { IN_DEV } from "$lib/statics";
  import { createEventDispatcher, onMount } from "svelte";
  import { fade } from "svelte/transition";
  import ReloadButton from "$components/materials/buttons/ReloadButton.svelte";
  import UserSearchInput from "$components/materials/dashboard/user/UserSearchInput.svelte";
  import UserList from "./user-list/UserList.svelte";
  import { getUsersKtalk } from "$providers/actions/ktalk/user";
  import {
    getLatestUser,
    getUserById,
    syncUsers,
  } from "$providers/actions/kchannel/user";
  const dispatch = createEventDispatcher();

  let searchUserState = {
    searchText: "",
    users: [],
    lastUpdatedAt: 0,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  let loaded = false;
  let loading = false;

  const onSearchUserById = async () => {
    try {
      searchUserState.loading = true;
      searchUserState.loaded = false;
      const res = await getUserById.load({
        id: searchUserState.searchText,
      });
      console.log("res by 1", res);
      searchUserState.users = res.data;
      searchUserState.loaded = true;
      console.log("searchUserState.users", searchUserState.users);
    } catch (err) {
      searchUserState.errMsg =
        err?.message || "Unable to load users from KTalk";
      // if (IN_DEV) console.log(err);
    } finally {
      searchUserState.loading = false;
    }
  };

  const onSearchUsers = async () => {
    try {
      searchUserState.loading = true;
      searchUserState.loaded = false;
      const res = await getUsersKtalk.load({
        lastUpdatedAt: searchUserState.lastUpdatedAt,
      });
      searchUserState.users = res.data;
      searchUserState.loaded = true;
      console.log("searchUserState.user", searchUserState.users);
    } catch (err) {
      searchUserState.errMsg = err?.message || "Unable to load user from KTalk";
      // if (IN_DEV) console.log(err);
    } finally {
      searchUserState.loading = false;
    }
  };

  let syncUserState = {
    users: searchUserState.users,
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onSyncUsers = async () => {
    try {
      syncUserState.loading = true;
      loading = syncUserState.loading;
      syncUserState.loaded = false;
      loaded = syncUserState.loaded;
      const res = await syncUsers.load({
        users: searchUserState.users,
      });
      syncUserState.users = res.data;
      syncUserState.loaded = true;
      loaded = syncUserState.loaded;
    } catch (err) {
      syncUserState.errMsg =
        err?.message || "Unable to load sync users to KChannel";
    } finally {
      syncUserState.loading = false;
      loading = syncUserState.loading;
    }
  };

  let fetchUserState = {
    user: {},
    loading: false,
    loaded: false,
    errMsg: "",
  };

  const onFetchUser = async () => {
    try {
      fetchUserState.loading = true;
      fetchUserState.loaded = false;
      const res = await getLatestUser.load();
      fetchUserState.user = res.data;
      fetchUserState.loaded = true;
      console.log(fetchUserState.user);
      console.log(fetchUserState.user[0].updatedAt);
      onSearchUsers();
      console.log(fetchUserState.user[0].updatedAt);
      loading = false;
      loaded = false;
    } catch (err) {
      fetchUserState.errMsg = err?.message || "Unable to load users";
      // if (IN_DEV) console.log(err);
    } finally {
      fetchUserState.loading = false;
    }
  };

  onMount(() => {
    // onSearchUsers();
  });
</script>

<div class=" p-4">
  <div
    class=" flex flex-col h-96 w-full bg-gray-100 border shadow-sm rounded-xl p-3 pb-1 space-y-3"
  >
    <div class=" w-full pb-2">
      <UserSearchInput
        bind:searchText={searchUserState.searchText}
        bind:userTotal={searchUserState.users.length}
        on:search={onSearchUserById}
        on:fetch={onFetchUser}
      />
    </div>
    {#if searchUserState.loaded}
      <div
        class="flex items-center justify-end"
        on:click={() => {
          console.log("Sync");
          onSyncUsers();
        }}
      >
        <div
          class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
        >
          Sync All
        </div>
      </div>
    {:else if searchUserState.loading}
      <div class="flex items-center justify-end">
        <div
          class="bg-[#1D77B8] p-3 text-white cursor-pointer flex-grow-0 pr-5 pl-5 rounded-lg"
        >
          <SmfbLoading color="white" />
        </div>
      </div>
    {/if}

    <div class=" w-full flex-grow overflow-y-auto">
      {#if !searchUserState.loading && searchUserState.errMsg}
        <div class=" flex text-warning justify-center text-sm py-2 text-center">
          <div>
            <div class="py-2">{searchUserState.errMsg}</div>
            <ReloadButton on:click={() => onFetchUser()} />
          </div>
        </div>
      {:else if searchUserState.loaded && searchUserState.users.length == 0}
        <div class=" text-center py-2 text-gray-400 font-semibold">
          Not found
        </div>
      {/if}

      {#if searchUserState.users.length > 0}
        <UserList
          {loaded}
          {loading}
          bind:users={searchUserState.users}
          on:select={(evt) => {}}
        />
      {/if}
    </div>

    <!-- search found status -->
    <div class="py-1">
      {#if searchUserState.loading}
        <div in:fade={{ duration: 200 }} class=" flex justify-end py-2 px-2">
          <SmfbLoading color="gray" />
        </div>
      {:else}
        <h2 in:fade={{ duration: 200 }} class=" text-gray-600 text-right">
          {searchUserState.users?.length} Users found
        </h2>
      {/if}
    </div>
  </div>
</div>
