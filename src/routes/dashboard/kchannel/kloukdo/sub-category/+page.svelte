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
  import UpdateKLoukdoCategory from "$components/modals/KLoukdo/Category/UpdateKLoukdoCategory.svelte";
  import KLoukdoSubCategory from "$components/elements/tables/KLoukdo/KLoukdoSubCategory.svelte";
  import { deleteKLoukdoSubCategory, getKLoukdoSubCategoriesByPage } from "$providers/actions/kloukdo/kloukdosubcategory";
  import CreateKLoukdoSubCategory from "$components/modals/KLoukdo/SubCategory/CreateKLoukdoSubCategory.svelte";
  import { getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import UpdateKLoukdoSubCategory from "$components/modals/KLoukdo/SubCategory/UpdateKLoukdoSubCategory.svelte";

	let subCategory;
	let shownEdit = false;
	let shownDelete = false;
	let shown = false;
	/**
	 * On loadPlaces
	 */
	let currentPage = 1;
	let searchText = "";
	let Data = [];
	let CategoryData = [];
	let Page = 3;
	const loadSubCategories = async () => {
		try {
			const res = await getKLoukdoSubCategoriesByPage.load({page: currentPage-1});
			Data = res.data;
		} catch (err) {
			// to do
		}
	};
	const loadCategories = async () => {
		try {
			const res = await getKLoukdoCategories.load();
			CategoryData = res.data;
		} catch (err) {
			// to do
		}
	};

	// When Operating start run it first
	onMount(async () => {
		await loadSubCategories();
		await loadCategories();
	});
</script>

<div class="flex flex-col bg-white w-full h-[100%]">
	<div class="flex-grow-0">
		<div>
			<div class="flex flex-row justify-between items-center">
				<SearchText
					on:onSearch={async (evt) => {
						searchText = evt.detail;
						currentPage = currentPage;
						await loadSubCategories();
					}}
				/>
				<HeaderButton
					title={"New Sub Category"}
					on:click={() => {
						shown = true;
					}}
				/>
			</div>
		</div>
	</div>
	<div class="flex-grow">
		<div>
			<KLoukdoSubCategory
				{Data}
				on:onEdit={async (evt) => {
					subCategory = evt.detail;
					shownEdit = true;
				}}
				on:onDelete={async (evt) => {
					subCategory = evt.detail;
					shownDelete = true;
				}}
			/>
		</div>
		
	<div class="flex-grow-0 mb-5 mr-5">
		{#if Page != 1}
			<Pagenetion
				totalPageNumber={Page}
				{currentPage}
				on:onCurrentPage={async (evt) => {
					currentPage = evt.detail;
					// Page = currentPage;
					await loadSubCategories();
				}}
			/>
		{/if}
	</div>
	</div>

</div>

<Modal {shown}>
	<CreateKLoukdoSubCategory
		categoryList={CategoryData}
		on:close={() => {
			shown = false;
		}}
		on:create={async () => {
			shown = false;
			await loadSubCategories();
		}}
	/>
</Modal>


<Modal shown={shownEdit}>
	<UpdateKLoukdoSubCategory
		param={subCategory}
		categoryList={CategoryData}
		on:close={() => {
			shownEdit = false;
		}}
		on:edit={async () => {
			shownEdit = false;
			await loadSubCategories();
		}}
	/>
</Modal>

<Modal shown={shownDelete}>
	<DeleteModal
		param={subCategory}
		title={"sub category"}
		on:close={() => {
			shownDelete = false;
		}}
		on:onDelete={async (evt) => {
			shownDelete = false;
			let id = evt.detail.id;
			try {
				const res = await deleteKLoukdoSubCategory.load({ id });
			} catch {}
			await loadSubCategories();
		}}
	/>
</Modal>
