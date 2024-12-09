<script>
  import TimeIcon from "$components/icons/Time.svelte";
  import TagIcon from "$components/icons/tag/Tag.svelte";
  import { createEventDispatcher } from "svelte";
  import SmfbLoading from "$components/materials/Spinners/fbLoading/SMFBLoading.svelte";
  import { createOrUpdateUser } from "$providers/actions/kchannel/user";
  const dispatch = createEventDispatcher();
  export let user;
  export let loading = false;
  export let loaded = false;
  console.log("userKTalk", user);
  let userState = {
    errMsg: "",
  };
  let imgLoaded = false;
  const onSync = async () => {
    console.log("user", user);
    try {
      loading = true;
      loaded = false;
      const res = await createOrUpdateUser.load({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        phone: user.phone,
        email: user.email,
        lastName: user.lastName,
        updatedAt: parseInt(user.updatedAt),
        createdAt: parseInt(user.createdAt),
        role: user.role,
        activated: Boolean(user.activated),
        bio: user.bio,
        photo: user.photo,
      });
      console.log("res11", res);
      loaded = true;
    } catch (err) {
      userState.errMsg = err?.message || "Unable to load users";
    } finally {
      loading = false;
    }
  };
</script>

<div class=" w-full">
  <label
    for={`${user.id}`}
    class="flex bg-white p-1 px-3 mt-2 space-x-4 items-center rounded-2xl border-2 cursor-pointer"
  >
    <div class=" flex justify-center items-center">
      <div class="h-14 w-14 rounded-[20px] bg-gray-200 border">
        <img
          class:invisible={!imgLoaded}
          src={user?.photo?.thumbnail?.url}
          alt=""
          class=" w-full h-full"
          on:load={() => (imgLoaded = true)}
        />
      </div>
    </div>
    <div class=" flex w-full justify-between">
      <div>
        <h2 class=" text-gray-600 font-medium text-lg">
          {`${user.username}`}
        </h2>
        <div class=" flex items-center">
          <div class="flex items-center w-4 h-4 font-thin text-gray-400">
            <TimeIcon />
          </div>
          <p class="text-gray-400 cursor-pointer text-sm pl-1">
            {`${new Date(user?.createdAt).toLocaleDateString()}`}
          </p>
        </div>
        <!-- <div class=" flex items-center">
          <div class="flex items-center w-4 h-4 font-thin text-gray-400">
            <TagIcon />
          </div>
          <p class="text-gray-400 text-sm pl-1">
            {`${user.catalog?.name || "---"}`}
          </p>
        </div> -->
      </div>
      <div class=" flex justify-end items-center">
        <p class=" text-gray-600 select-text px-2">{`${user.id}`}</p>
      </div>

      {#if loading}
        <div class="flex items-center justify-center">
          <div
            class="bg-[#1D77B8] text-white pl-5 pr-5 pb-3 pt-3 rounded-lg w-[90px] flex justify-center"
          >
            <SmfbLoading></SmfbLoading>
          </div>
        </div>
      {:else if loaded}
        <div class="flex items-center justify-center">
          <div
            class="bg-[#D9D9D9] text-[#949494] pl-5 pr-5 pb-3 pt-3 rounded-lg w-[90px]"
          >
            Synced
          </div>
        </div>
      {:else}
        <div
          class="flex items-center justify-center"
          on:click={() => {
            onSync();
            dispatch("select", { user });
          }}
        >
          <div
            class="bg-[#1D77B8] text-white pl-5 pr-5 pb-3 pt-3 rounded-lg cursor-pointer w-[90px] flex justify-center"
          >
            Sync
          </div>
        </div>
      {/if}
    </div>
  </label>
</div>
