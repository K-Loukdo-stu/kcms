<script>
	import { onMount } from "svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import { searchChannelCatalogs } from "$providers/actions/kchannel/catalog";
	import ChannelCatalog from "$components/elements/tables/ChannelCatalog/ChannelCatalog.svelte";
	import Modal from "$components/modals/Modal.svelte";
	import DeleteModal from "$components/modals/DeleteModal/DeleteModal.svelte";
	import HeaderButton from "$components/elements/buttons/HeaderButton/HeaderButton.svelte";
	import CreateChannelCatalog from "$components/modals/ChannelCatalog/CreateChannelCatalog/CreateChannelCatalog.svelte";
	import EditChannelCatalog from "$components/modals/ChannelCatalog/EditChannelCatalog/EditChannelCatalog.svelte";
  import { deleteKLoukdoCategory, getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
  import CreateKLoukdoCategory from "$components/modals/KLoukdo/Category/CreateKLoukdoCategory.svelte";
  import UpdateKLoukdoCategory from "$components/modals/KLoukdo/Category/UpdateKLoukdoCategory.svelte";
  import KLoukdoPromotion from "$components/elements/tables/KLoukdo/KLoukdoPromotion.svelte";
  import KLoukdoFilterButton from "$components/elements/buttons/KLoukdoFilterButton/KLoukdoFilterButton.svelte";
  import { deleteKLoukdoPromotion, getAllKLoukdoPromotios } from "$providers/actions/kloukdo/kloukdopromotion";
  import { getKLoukdoSubCategories } from "$providers/actions/kloukdo/kloukdosubcategory";
  import CreateKLoukdoPromotion from "$components/modals/KLoukdo/Promotion/CreateKLoukdoPromotion.svelte";
  import UpdateKLoukdoPromotion from "$components/modals/KLoukdo/Promotion/UpdateKLoukdoPromotion.svelte";

	let promotion;
	let shownEdit = false;
	let shownDelete = false;
	let shown = false;

	let currentFilter = 1;
	/**
	 * On loadPlaces
	 */
	let currentPage = 1;
	let searchText = "";
	let Data = [];
	let CategoryData = [];
	let subCategoryData = [];
	let Page = 0;
	const loadPromotions = async () => {
		try {
			const res = await getAllKLoukdoPromotios.load({ page: Page });
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
	const loadSubCategories = async () => {
		try {
			const res = await getKLoukdoSubCategories.load();
			subCategoryData = res.data;
		} catch (err) {
			// to do
		}
	};

	// When Operating start run it first
	onMount(async () => {
		await loadPromotions();
		await loadCategories();
		await loadSubCategories();
	});
</script>

<div class="flex flex-col bg-white w-full h-[100%]">
	<div class="flex-grow-0">
		<div>
			<div class="flex flex-row justify-end items-center mb-2">
				<!-- <SearchText
					on:onSearch={async (evt) => {
						searchText = evt.detail;
						currentPage = currentPage;
						await loadPromotions();
					}}
				/> -->
				<HeaderButton
					title={"New Promotion"}
					on:click={() => {
						shown = true;
					}}
				/>
			</div>
			<!-- <KLoukdoFilterButton
				categoryList={CategoryData}
				subCategoryList={subCategoryData}
			/> -->
		</div>
	</div>
	<div class="flex-grow">
		<div>
			<KLoukdoPromotion
				{Data}
				on:onEdit={async (evt) => {
					promotion = evt.detail;
					shownEdit = true;
				}}
				on:onDelete={async (evt) => {
					promotion = evt.detail;
					shownDelete = true;
				}}
			/>
		</div>
	</div>

</div>

<Modal {shown}>
	<CreateKLoukdoPromotion
		on:close={() => {
			shown = false;
		}}
		on:create={async () => {
			shown = false;
			await loadPromotions();
		}}
	/>
</Modal>

<Modal shown={shownEdit}>
	<UpdateKLoukdoPromotion
		param={promotion}
		on:close={() => {
			shownEdit = false;
		}}
		on:edit={async () => {
			shownEdit = false;
			await loadPromotions();
		}}
	/>
</Modal>

<Modal shown={shownDelete}>
	<DeleteModal
		param={promotion}
		title={"promotion"}
		on:close={() => {
			shownDelete = false;
		}}
		on:onDelete={async (evt) => {
			shownDelete = false;
			let id = evt.detail.id;
			try {
				const res = await deleteKLoukdoPromotion.load({ id });
			} catch {}
			await loadPromotions();
		}}
	/>
</Modal>
