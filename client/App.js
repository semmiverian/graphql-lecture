import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {ApolloProvider} from '@apollo/react-hooks'
import client from './graphql'
import Book from './screens/Book'
import Favorite from './screens/Favorite'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Book />
      <Favorite />
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
