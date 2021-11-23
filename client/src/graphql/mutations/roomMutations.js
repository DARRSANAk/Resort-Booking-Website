import {gql} from "@apollo/client";

export const ADD_ROOM = gql`
mutation($hotel: ID!, $images: [String]!, $name: String!, $description: String!, $others: [String]!, $occupancy: Int!, $price: Int!, $roomNumbers: [Int]!){
    addRoom(hotel: $hotel, images: $images, name: $name, description: $description, others: $others, occupancy: $occupancy, price: $price, roomNumbers: $roomNumbers){
      id
      name
      description
      images
      price
      others
      occupancy
    }
  }
`