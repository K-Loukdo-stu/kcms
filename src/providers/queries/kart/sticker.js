import { gql } from '@apollo/client/core';

/**
 * STICKER
 */
export const GET_STICKERs_QUERY = gql`
  query stickers{
     stickers{
         name, file, id
   }
 }
 `;

export const GET_STICKERS_BY_PACKAGE_ID_QUERY = gql`
 query findStickerByPackage($packageId: String!){
  findStickerByPackage(
    packageId: $packageId
     )
     {
      name, 
      file, 
      id, 
      package{id},
      frameNum, 
      fps, 
      animated, 
      type{id, name, url},
      viewWidth,
      viewHeight,
      originalHeight,
      originalWidth,
      code,
      isLoop,
      forward,
      reverse,
      speed,
     }
 }
 `;

export const CREATE_STICKER_MUTATION = gql`
  mutation createSticker( 
  $name: String!,
  $code: String!,
  $file: JSON!,
  $originalHeight:Float!,
  $originalWidth:Float!,
  $viewWidth:Float!,
  $viewHeight:Float!,
  $animated:Boolean!,
  $isLoop:Boolean!,
  $package:String!, 
  $type:String!, 
  $frameNum:Float!, 
  $fps:Float!, 
  $forward:Float!, 
  $reverse:Float!, 
  $speed:Float!) {
   createSticker(param: {
    name: $name, 
    file: $file,
    animated: $animated,
    package: $package, 
    type: $type,
    frameNum: $frameNum,
    fps: $fps,
    viewWidth: $viewWidth,
    viewHeight: $viewHeight,
    originalHeight: $originalHeight
    originalWidth: $originalWidth,
    code: $code,
    isLoop: $isLoop,
    forward: $forward,
    reverse: $reverse,
    speed: $speed,

     }) {
     name
    }
  }
 `;

export const UPDATE_STICKER_MUTATION = gql`
  mutation updateSticker( 
    $id: String!, 
    $name: String!,
    $code: String!,
    $file: JSON!,
    $originalHeight:Float!,
    $originalWidth:Float!,
    $viewWidth:Float!,
    $viewHeight:Float!,
    $animated:Boolean!,
    $isLoop:Boolean!,
    $package:String!, 
    $type:String!, 
    $frameNum:Float!, 
    $fps:Float!, 
    $forward:Float!, 
    $reverse:Float!, 
    $speed:Float!
    ) {
   updateSticker(param: {
    id: $id, 
    name: $name, 
    file: $file,
    animated: $animated,
    package: $package, 
    type: $type,
    frameNum: $frameNum,
    fps: $fps,
    viewWidth: $viewWidth,
    viewHeight: $viewHeight,
    originalHeight: $originalHeight
    originalWidth: $originalWidth,
    code: $code,
    isLoop: $isLoop,
    forward: $forward,
    reverse: $reverse,
    speed: $speed,
     }) {
     name
    }
  }
 `;

export const DELETE_STICKER_MUTATION = gql`
  mutation deleteSticker( $id: String!) {
   deleteSticker(param:{
      id: $id
     }){
     name
    }
  }
 `;

// STICKER TYPE

export const GET_STICKER_TYPES_QUERY = gql`
  query stickerTypes{
    stickerTypes{
         name, id, url
   }
 }
 `;


export const GET_SEARCH_STICKER_TYPES_QUERY = gql`
 query searchTypes( $currentPage: Float!, $searchText: String! ){
  searchTypes(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      stickerTypes {id, name, url, code},
      countStickerTypes
     }
 }
 `;

export const CREATE_STICKER_TYPE_MUTATION = gql`
  mutation createStickerType( $name: String!, $url: String!, $code: String!) {
   createStickerType(param: {
     name: $name, 
     url: $url, 
     code: $code, 
     }) {
     name, id, url, code
    }
  }
 `;


export const UPDATE_STICKER_TYPE_MUTATION = gql`
  mutation updateStickerType( $id: String!, $name: String!, $url: String!, $code: String!) {
   updateStickerType(param: {
     id: $id,
     name: $name, 
     url: $url, 
     code: $code, 
     }) {
     name, id, url
    }
  }
 `;


export const DELETE_STICKER_TYPE_MUTATION = gql`
  mutation deleteStickerType( $id: String!) {
   deleteStickerType(param: {
     id: $id,
     })
     {
        name
     }
  }
 `;


/**
 * STICKER CATEOGRY
 */

export const GET_STICKER_CATEGORY_QUERY = gql`
  query stickerCategories{
   stickerCategories{
         name, id
   }
 }
 `;


/**
 * STICKER PACKAGE
 */

export const GET_STICKER_PACKAGES_QUERY = gql`
 query stickerPackages($currentPage: Float!){
   stickerPackages(
     param:{
       currentPage: $currentPage
     }
     )
     {
       packages {id, name, price, amount, currency},
       countPackage
     }
 }
 `;

export const GET_SEARCH_STICKER_PACKAGES_QUERY = gql`
 query searchStickerPackages( $currentPage: Float!, $searchText: String! ){
  searchStickerPackages(
     param:{
      currentPage: $currentPage,
      searchText: $searchText
     }
     )
     {
      stickerPackages {id, name, price, viewHeight, viewWidth, originalHeight, originalWidth, currency, file, stickerCount},
      count
     }
 }
 `;

export const CREATE_STICKER_PACKAGE_MUTATION = gql`
  mutation createStickerPackage( 
    $name: String!, 
    $price: Float!, 
    $currency: String!,
    $file: JSON!,
    $viewHeight: Float!,
    $viewWidth: Float!,
    $originalHeight: Float!,
    $originalWidth: Float!,
    ) {
   createStickerPackage(param: {
      name: $name, 
      price: $price, 
      currency: $currency, 
      file: $file, 
      viewHeight: $viewHeight,
      viewWidth: $viewWidth,
      originalHeight: $originalHeight,
      originalWidth: $originalWidth
     }) {
     name, id, price, currency
    }
  }
 `;


export const UPDATE_STICKER_PACKAGE_MUTATION = gql`
  mutation updateStickerPackage( 
    $id: String!, 
    $name: String!, 
    $price: Float!, 
    $currency: String!,
    $file: JSON!,
    $viewHeight: Float!,
    $viewWidth: Float!,
    $originalHeight: Float!,
    $originalWidth: Float!,
    ) {
   updateStickerPackage(param: {
      id: $id,
      name: $name, 
      price: $price, 
      currency: $currency, 
      file: $file, 
      viewHeight: $viewHeight,
      viewWidth: $viewWidth,
      originalHeight: $originalHeight,
      originalWidth: $originalWidth
     }) {
     name, id, price, currency
    }
  }
 `;

export const DELETE_STICKER_PACKAGE_MUTATION = gql`
mutation deleteStickerPackage( 
  $id: String!
  ) {
    deleteStickerPackage(param: {
    id: $id
   }) {
   name, id
  }
}
`;


export const DELETE_STICKER_CATEGORY_MUTATION = gql`
  mutation deleteStickerCategory( $id: String!) {
   deleteStickerCategory(id: $category)
     {
        name
     }
  }
 `;
