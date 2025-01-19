<script>
	import { onMount } from "svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import Modal from "$components/modals/Modal.svelte";
	import DeleteModal from "$components/modals/DeleteModal/DeleteModal.svelte";
	import HeaderButton from "$components/elements/buttons/HeaderButton/HeaderButton.svelte";
	import { deleteKLoukdoCategory, getKLoukdoCategories } from "$providers/actions/kloukdo/kloukdocategory";
	import UpdateKLoukdoCategory from "$components/modals/KLoukdo/Category/UpdateKLoukdoCategory.svelte";
  import KLoukdoProduct from "$components/elements/tables/KLoukdo/KLoukdoProduct.svelte";
  import ShowAllImage from "$components/modals/KLoukdo/ShowAllImage.svelte";
  import { deleteKLoukdoProduct, getAllKLoukdoProducts } from "$providers/actions/kloukdo/kloukdoproduct";
  import CreateKLoukdoProduct from "$components/modals/KLoukdo/Product/CreateKLoukdoProduct.svelte";
  import { getKLoukdoSubCategories, getKLoukdoSubCategoriesByCategory } from "$providers/actions/kloukdo/kloukdosubcategory";

	let product;
	let shownEdit = false;
	let shownDelete = false;
	let shown = false;
	let shownAllImage = false;
	/**
	 * On loadPlaces
	 */
	let currentPage = 1;
	let searchText = "";
	let Data = [];
	let Page = 0;
	const loadProducts = async () => {
		try {
			const res = await getAllKLoukdoProducts.load({page: Page});
			Data = res.data;
		} catch (err) {
			// to do
		}
	};

	let CategoryData = [];
	let subCategoryData = [];
	const loadCategories = async () => {
		try {
			const res = await getKLoukdoCategories.load();
			CategoryData = res.data;
		} catch (err) {
			// to do
		}
	};
	const loadSubCategories = async (category) => {
		try {
			const res = await getKLoukdoSubCategoriesByCategory.load({ category });
			subCategoryData = res.data;
		} catch (err) {
		}
	};
	// When Operating start run it first
	onMount(async () => {
		await loadProducts();
		await loadCategories();
		await loadSubCategories();
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
						await loadProducts();
					}}
				/>
				<HeaderButton
					title={"New Product"}
					on:click={() => {
						shown = true;
					}}
				/>
			</div>
		</div>
	</div>
	<div class="flex-grow">
		<div>
			<KLoukdoProduct
				{Data}
				on:onEdit={async (evt) => {
					product = evt.detail;
					shownEdit = true;
				}}
				on:onDelete={async (evt) => {
					product = evt.detail;
					shownDelete = true;
				}}
				on:onShowImage={async (evt) => {
					product = evt.detail;
					shownAllImage = true;
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
					await loadProducts();
				}}
			/>
		{/if}
	</div>
</div>

<Modal {shown}>
	<CreateKLoukdoProduct
		categoryList={CategoryData}
		subCategoryList={subCategoryData}
		on:close={() => {
			shown = false;
		}}
		on:create={async () => {
			shown = false;
			await loadProducts();
		}}
		on:subcategory={async (category) => {
			await loadSubCategories(category.detail);
		}}
	/>
</Modal>

<Modal shown={shownEdit}>
	<UpdateKLoukdoCategory
		param={product}
		on:close={() => {
			shownEdit = false;
		}}
		on:edit={async () => {
			shownEdit = false;
			await loadProducts();
		}}
	/>
</Modal>

<Modal shown={shownDelete}>
	<DeleteModal
		param={product}
		title={"product"}
		on:close={() => {
			shownDelete = false;
		}}
		on:onDelete={async (evt) => {
			shownDelete = false;
			let id = evt.detail.id;
			try {
				const res = await deleteKLoukdoProduct.load({ id });
			} catch {}
			await loadProducts();
		}}
	/>
</Modal>

<Modal shown={shownAllImage}>
	<ShowAllImage
		param={product.photos.map(photo => photo.url)}
		on:close={() => {
			shownAllImage = false;
		}}
	/>
</Modal>
