import React from 'react'
import {View, Text, SafeAreaView} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const FETCH_ALL_BOOKS = gql`
  {
    books {
      name
      genre
    }
  }
`

export default function Book() {
  const {loading, error, data} = useQuery(FETCH_ALL_BOOKS)

  console.log(data)

  if (loading)
    return (
      <SafeAreaView>
        <Text>Loading gan</Text>
      </SafeAreaView>
    )
  if (error)
    return (
      <SafeAreaView>
        <Text>Error gan</Text>
      </SafeAreaView>
    )
  return (
    <SafeAreaView>
      {data.books.map(book => (
        <Text>{book.name}</Text>
      ))}
    </SafeAreaView>
  )
}
