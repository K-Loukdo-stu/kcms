import { APIs } from "$lib/statics";
import { CREATE_KLOUKDO_PRODUCT_MUTATION, DELETE_KLOUKDO_PRODUCT_MUTATION, GET_KLOUKDO_PRODUCT_QUERY, SEARCH_KLOUKDO_PRODUCT_QUERY, UPDATE_KLOUKDO_PRODUCT_MUTATION } from "$providers/queries/kloukdo/kloukdoproduct";
import { endpointFetch } from "../utils";

export const getAllKLoukdoProducts = {
    load: async ({ page, limit }) => {
        const res = await endpointFetch({
            query: GET_KLOUKDO_PRODUCT_QUERY,
            variables: {page, limit}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['getAllKLoukdoProducts'];
            return res;
        }
        throw res;
    }
}

export const searchKLoukdoProducts = {
    load: async ({ name }) => {
        const res = await endpointFetch({
            query: SEARCH_KLOUKDO_PRODUCT_QUERY,
            variables: { name }
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['searchKLoukdoProductByName'];
            return res;
        }
        throw res;
    }
}

export const createKLoukdoProduct = {
    load: async ({ name, category, subCategory, price, discountPrice, currency, hasDiscount,  photos }) => {
        const res = await endpointFetch({
            query: CREATE_KLOUKDO_PRODUCT_MUTATION,
            variables: {name, category, subCategory, price, discountPrice, currency, hasDiscount, photos}
        }, APIs.KLOUKDO);
        if (res?.success == true) {
            res['data'] = res['data']['createKLoukdoProduct'];
            return res;
        }
        throw res;
    }
}

export const deleteKLoukdoProduct = {
    load: async ({ id }) => {
        const res = await endpointFetch({
            query: DELETE_KLOUKDO_PRODUCT_MUTATION,
            variables: { id }
        }, APIs.KLOUKDO);
        return res;
    }
}

export const updateKLoukdoProduct = {
    load: async ({ id, name, category, subCategory, price }) => {
        const res = await endpointFetch({
            query: UPDATE_KLOUKDO_PRODUCT_MUTATION,
            variables: { id, name, category, subCategory, price }
        }, APIs.KLOUKDO);
        return res;
    }
}