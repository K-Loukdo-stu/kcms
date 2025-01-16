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
  import { deleteKLoukdoSubCategory } from "$providers/actions/kloukdo/kloukdosubcategory";
  import CreateKLoukdoSubCategory from "$components/modals/KLoukdo/SubCategory/CreateKLoukdoSubCategory.svelte";
  import UpdateKLoukdoSubCategory from "$components/modals/KLoukdo/SubCategory/UpdateKLoukdoSubCategory.svelte";
  import KLoukdoAdsImage from "$components/elements/tables/KLoukdo/KLoukdoAdsImage.svelte";
  import { getKLoukdoAdsImage } from "$providers/actions/kloukdo/kloukdoadsimage";

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
	let Page = 0;
	const loadAdsImage = async () => {
		try {
			const res = await getKLoukdoAdsImage.load({page: Page});
			Data = res.data;
		} catch (err) {
			// to do
		}
	};

	// When Operating start run it first
	onMount(async () => {
		await loadAdsImage();
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
						await loadAdsImage();
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
			<KLoukdoAdsImage
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
					await loadAdsImage();
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
			await loadAdsImage();
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
			await loadAdsImage();
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
			await loadAdsImage();
		}}
	/>
</Modal>
