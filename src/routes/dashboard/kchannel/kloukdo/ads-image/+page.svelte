<script>
	import { onMount } from "svelte";
	import SearchText from "$components/elements/buttons/SearchText/SearchText.svelte";
	import Pagenetion from "$components/elements/pagenation/Pagenation/Pagenetion.svelte";
	import { searchChannelCatalogs } from "$providers/actions/kchannel/catalog";
	import Modal from "$components/modals/Modal.svelte";
	import DeleteModal from "$components/modals/DeleteModal/DeleteModal.svelte";
	import HeaderButton from "$components/elements/buttons/HeaderButton/HeaderButton.svelte";
  import { deleteKLoukdoSubCategory } from "$providers/actions/kloukdo/kloukdosubcategory";
  import KLoukdoAdsImage from "$components/elements/tables/KLoukdo/KLoukdoAdsImage.svelte";
  import { deleteKLoukdoAds, getKLoukdoAdsImage } from "$providers/actions/kloukdo/kloukdoadsimage";
  import CreateKLoukdoAdsImage from "$components/modals/KLoukdo/AdsImage/CreateKLoukdoAdsImage.svelte";
  import ShowAllImage from "$components/modals/KLoukdo/ShowAllImage.svelte";
  import UpdateKLoukdoAdsImage from "$components/modals/KLoukdo/AdsImage/UpdateKLoukdoAdsImage.svelte";

	let ads;
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
					title={"New Ads"}
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
					ads = evt.detail;
					shownEdit = true;
				}}
				on:onDelete={async (evt) => {
					ads = evt.detail;
					shownDelete = true;
				}}
				on:onShowImage={async (evt) => {
					ads = evt.detail;
					shownAllImage = true;
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
	<CreateKLoukdoAdsImage
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
	<UpdateKLoukdoAdsImage
		param={ads}
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
		param={ads}
		title={"ads"}
		on:close={() => {
			shownDelete = false;
		}}
		on:onDelete={async (evt) => {
			shownDelete = false;
			let id = evt.detail.id;
			try {
				const res = await deleteKLoukdoAds.load({ id });
			} catch {}
			await loadAdsImage();
		}}
	/>
</Modal>

<Modal shown={shownAllImage}>
	<ShowAllImage
		param={[ads.image.url]}
		on:close={() => {
			shownAllImage = false;
		}}
	/>
</Modal>
