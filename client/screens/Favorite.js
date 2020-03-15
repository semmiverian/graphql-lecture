import React from 'react'
import {View, Text, Button} from 'react-native'
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from '@apollo/react-hooks'

const FETCH_ALL_FAVORITES = gql`
  {
    favorites @client {
      name
    }
    counter @client
  }
`

const COUNTER = gql`
  {
    counter @client
  }
`

const ADD_COUNTER = gql`
  mutation AddCounter {
    addCounter @client
  }
`

export default function Favorite() {
  const {error, loading, data} = useQuery(FETCH_ALL_FAVORITES)
  // const {count} = useQuery(COUNTER)
  const [addCounter] = useMutation(ADD_COUNTER)

  // console.log('favorite', data)

  return (
    <View style={{marginTop: 100}}>
      <Text>{data.counter}</Text>
      <Button title="add Counter" onPress={() => addCounter()}></Button>
      {data.favorites.map((favorite, index) => (
        <Text key={index}>{favorite.name}</Text>
      ))}
    </View>
  )
}
