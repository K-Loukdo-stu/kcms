<script>
	import { onMount } from "svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import { searchChannelCatalogs } from "$providers/actions/kchannel/catalog";
	import ChannelCatalog from "$components/elements/tables/ChannelCatalog/ChannelCatalog.svelte";
	import Modal from "$components/modals/Modal.svelte";
	import CreateService from "$components/modals/CreateService/CreateService.svelte";
	import EditService from "$components/modals/EditService/EditService.svelte";
	import DeleteModal from "$components/modals/DeleteModal/DeleteModal.svelte";
	import HeaderButton from "$components/elements/buttons/HeaderButton/HeaderButton.svelte";
	import CreateChannelCatalog from "$components/modals/ChannelCatalog/CreateChannelCatalog/CreateChannelCatalog.svelte";
	import EditChannelCatalog from "$components/modals/ChannelCatalog/EditChannelCatalog/EditChannelCatalog.svelte";
	import KLoukdoCategory from "$components/elements/tables/KLoukdo/KLoukdoCategory.svelte";
	import { deleteKLoukdoCategory, getKLoukdoCategories, getKLoukdoCategoriesByPage } from "$providers/actions/kloukdo/kloukdocategory";
	import CreateKLoukdoCategory from "$components/modals/KLoukdo/Category/CreateKLoukdoCategory.svelte";
	import UpdateKLoukdoCategory from "$components/modals/KLoukdo/Category/UpdateKLoukdoCategory.svelte";

	let category;
	let shownEdit = false;
	let shownDelete = false;
	let shown = false;
	/**
	 * On loadPlaces
	 */
	let currentPage = 1;
	let searchText = "";
	let Data = [];
	let Page = 0;
	const loadCategories = async () => {
		try {
			const res = await getKLoukdoCategoriesByPage.load({page:currentPage-1});
			Data = res.data.category;
			Page = res.data.page;
			console.log(Data)
		} catch (err) {
			// to do
		}
	};

	// When Operating start run it first
	onMount(async () => {
		await loadCategories();
	});
</script>

<div class="flex flex-col bg-white w-full h-[100%]">
	<div class="flex-grow-0">
		<div>
			<div class="flex flex-row justify-end items-center">
				<!-- <SearchText
					on:onSearch={async (evt) => {
						searchText = evt.detail;
						currentPage = currentPage;
						await loadCategories();
					}}
				/> -->
				<HeaderButton
					title={"New Category"}
					on:click={() => {
						shown = true;
					}}
				/>
			</div>
		</div>
	</div>
	<div class="flex-grow">
		<div>
			<KLoukdoCategory
				{Data}
				on:onEdit={async (evt) => {
					category = evt.detail;
					shownEdit = true;
				}}
				on:onDelete={async (evt) => {
					category = evt.detail;
					shownDelete = true;
				}}
			/>
		</div>
	</div>

	<div class="flex-grow-0 mb-5 mr-5">
		{#if Page != 1}
			<Pagenetion
				totalPageNumber={Page}
				{currentPage}
				on:onCurrentPage={async (evt) => {
					currentPage = evt.detail;
					await loadCategories();
				}}
			/>
		{/if}
	</div>
</div>

<Modal {shown}>
	<CreateKLoukdoCategory
		on:close={() => {
			shown = false;
		}}
		on:create={async () => {
			shown = false;
			await loadCategories();
		}}
	/>
</Modal>

<Modal shown={shownEdit}>
	<UpdateKLoukdoCategory
		param={category}
		on:close={() => {
			shownEdit = false;
		}}
		on:edit={async () => {
			shownEdit = false;
			await loadCategories();
		}}
	/>
</Modal>

<Modal shown={shownDelete}>
	<DeleteModal
		param={category}
		title={"category"}
		on:close={() => {
			shownDelete = false;
		}}
		on:onDelete={async (evt) => {
			shownDelete = false;
			let id = evt.detail.id;
			try {
				const res = await deleteKLoukdoCategory.load({ id });
			} catch {}
			await loadCategories();
		}}
	/>
</Modal>
