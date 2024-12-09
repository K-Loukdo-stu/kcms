import { APIs } from "$lib/statics";
import { GET_STICKER_PACKAGES_QUERY } from "$providers/queries/kart";
import { CREATE_STICKER_MUTATION, CREATE_STICKER_PACKAGE_MUTATION, CREATE_STICKER_TYPE_MUTATION, DELETE_STICKER_MUTATION, DELETE_STICKER_PACKAGE_MUTATION, DELETE_STICKER_TYPE_MUTATION, GET_SEARCH_STICKER_PACKAGES_QUERY, GET_SEARCH_STICKER_TYPES_QUERY, GET_STICKERS_BY_PACKAGE_ID_QUERY, GET_STICKER_TYPES_QUERY, UPDATE_STICKER_MUTATION, UPDATE_STICKER_PACKAGE_MUTATION, UPDATE_STICKER_TYPE_MUTATION } from "$providers/queries/kart/sticker";
import { endpointFetch } from "../utils";

export const stickerPackages = {
  load: async ({ pageNum }) => {
    const res = await endpointFetch({
      query: GET_STICKER_PACKAGES_QUERY,
      variables: { currentPage: pageNum }
    }, APIs.KART);

    if (res?.success == true) {
      res['data'] = res['data']['stickerPackages'];
      return res;
    }

    throw res;
  }
}

export const findStickerByPackage = {
  load: async ({ packageId }) => {
    const res = await endpointFetch({
      query: GET_STICKERS_BY_PACKAGE_ID_QUERY,
      variables: { packageId: packageId }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['findStickerByPackage'];
      return res;
    }
    throw res;
  }
}

export const createSticker = {
  load: async ({
    name,
    file,
    animated,
    packageId,
    type,
    fps,
    viewWidth,
    viewHeight,
    originalHeight,
    originalWidth,
    code,
    isLoop,
    forward,
    reverse,
    speed,
    frameNum }) => {
    const res = await endpointFetch({
      query: CREATE_STICKER_MUTATION,
      variables: {
        name,
        file,
        animated,
        package: packageId,
        type,
        fps,
        viewWidth,
        viewHeight,
        originalHeight,
        originalWidth,
        code,
        isLoop,
        forward,
        reverse,
        speed,
        frameNum
      }
    }, APIs.KART);
    return res;
  }
}


export const updateSticker = {
  load: async ({
    id,
    name,
    file,
    animated,
    packageId,
    type,
    fps,
    viewWidth,
    viewHeight,
    originalHeight,
    originalWidth,
    code,
    isLoop,
    forward,
    reverse,
    speed,
    frameNum }) => {
    const res = await endpointFetch({
      query: UPDATE_STICKER_MUTATION,
      variables: {
        id,
        name,
        file,
        animated,
        package: packageId,
        type,
        fps,
        viewWidth,
        viewHeight,
        originalHeight,
        originalWidth,
        code,
        isLoop,
        forward,
        reverse,
        speed,
        frameNum
      }
    }, APIs.KART);
    return res;
  }
}


export const deleteSticker = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_STICKER_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}

export const searchStickerPackages = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_STICKER_PACKAGES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchStickerPackages'];
      return res;
    }
    throw res;
  }
}

export const createStickerPackage = {
  load: async ({ name, price, currency, file, viewWidth, viewHeight, originalHeight, originalWidth }) => {
    const res = await endpointFetch({
      query: CREATE_STICKER_PACKAGE_MUTATION,
      variables: {
        name,
        price,
        currency,
        file,
        viewWidth,
        viewHeight,
        originalHeight,
        originalWidth
      }
    }, APIs.KART);
    return res;
  }
}

export const updateStickerPackage = {
  load: async ({
    id,
    name,
    price,
    currency,
    file,
    viewWidth,
    viewHeight,
    originalHeight,
    originalWidth
  }) => {
    const res = await endpointFetch({
      query: UPDATE_STICKER_PACKAGE_MUTATION,
      variables: {
        id,
        name,
        price,
        currency,
        file,
        viewWidth,
        viewHeight,
        originalHeight,
        originalWidth
      }
    }, APIs.KART);
    return res;
  }
}

export const deleteStickerPackage = {
  load: async ({
    id
  }) => {
    const res = await endpointFetch({
      query: DELETE_STICKER_PACKAGE_MUTATION,
      variables: {
        id
      }
    }, APIs.KART);
    return res;
  }
}

// Sticker Type
export const searchStickerTypes = {
  load: async ({ pageNum, searchText }) => {
    const res = await endpointFetch({
      query: GET_SEARCH_STICKER_TYPES_QUERY,
      variables: { currentPage: pageNum, searchText }
    }, APIs.KART);
    if (res?.success == true) {
      res['data'] = res['data']['searchTypes'];
      return res;
    }
    throw res;
  }
}


export const stickerTypes = {
  load: async () => {
    const res = await endpointFetch({
      query: GET_STICKER_TYPES_QUERY,
    }, APIs.KART);

    if (res?.success == true) {
      res['data'] = res['data']['stickerTypes'];
      return res;
    }

    throw res;
  }
}


export const createStickerType = {
  load: async ({ name, url, code }) => {
    const res = await endpointFetch({
      query: CREATE_STICKER_TYPE_MUTATION,
      variables: { name, url, code }
    }, APIs.KART);
    return res;
  }
}

export const updateStickerType = {
  load: async ({ id, name, url, code }) => {
    const res = await endpointFetch({
      query: UPDATE_STICKER_TYPE_MUTATION,
      variables: { id, name, url, code }
    }, APIs.KART);
    return res;
  }
}

export const deleteType = {
  load: async ({ id }) => {
    const res = await endpointFetch({
      query: DELETE_STICKER_TYPE_MUTATION,
      variables: { id }
    }, APIs.KART);
    return res;
  }
}
