import { gql } from "@apollo/client";

export const GET_KLOUKDO_ADS_IMAGE_QUERY = gql`
query getKLoukdoAdvertisementImage ()
    getKLoukdoAdvertisementImage
    {
        id
        name
        endDate
    }
`;

export const GET_ALL_KLOUKDO_ADS_IMAGE_QUERY = gql`
query getAllKLoukdoAdvertisementImage ( $page: number )
    getAllKLoukdoAdvertisementImage (
        params: {
            page: $page
        }
    )
    {
        id
        name
        photo
        endDate
    }
`;