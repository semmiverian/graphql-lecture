import React from 'react'
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import {useQuery, useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const FETCH_ALL_BOOKS = gql`
  {
    books {
      name
      genre
    }
  }
`

const ADD_FAVORITES_BOOK = gql`
  mutation AddBook($name: String!) {
    addBook(name: $name) @client
  }
`

export default function Book() {
  const {loading, error, data} = useQuery(FETCH_ALL_BOOKS)
  const [addBook] = useMutation(ADD_FAVORITES_BOOK)

  function addToFavorites(book) {
    addBook({variables: {name: book.name}})
  }

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
      {data.books.map((book, index) => (
        <TouchableOpacity key={index} onPress={() => addToFavorites(book)}>
          <Text>{book.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}
