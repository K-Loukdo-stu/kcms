import { APIs } from "$lib/statics";
import { GET_ALL_KLOUKDO_ADS_IMAGE_QUERY, GET_KLOUKDO_ADS_IMAGE_QUERY } from "$providers/queries/kloukdo/kloukdoadsimage";
import { endpointFetch } from "../utils";

export const getKLoukdoAdsImage = {
    load: async ({ page }) => {
        const res = await endpointFetch({
            query: GET_ALL_KLOUKDO_ADS_IMAGE_QUERY,
            variables: { page }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getAllKLoukdoAdvertisementImage'];
            return res;
        }
        throw res;
    }
}