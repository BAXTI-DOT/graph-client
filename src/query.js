import { gql } from "@apollo/client";

const QUERY = gql`
    query {
        flowers {
            id
            name
        }
    }
`

const MUTATION = gql`
    mutation newFlower($name: String! $price: Float!) {
        newFlower(input: { name: $name, price: $price }) {
            id
            name
            price
        }
    }
`

const SUBSCRIPTION = gql`
    subscription {
        flowers {
            id
            name
            price
        }
    }
`

export {
    QUERY,
    MUTATION,
    SUBSCRIPTION
}