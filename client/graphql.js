import ApolloClient, {gql} from 'apollo-boost'

const ALL_FAVORITES = gql`
  {
    favorites @client {
      name
    }
  }
`

const COUNTER_COUNT = gql`
  {
    counter @client
  }
`

export default new ApolloClient({
  uri: 'http://localhost:4000',
  request(operation) {
    operation.setContext({
      headers: {
        token: 'asd'
      }
    })
  },
  clientState: {
    resolvers: {
      Mutation: {
        addBook(_, variable, client) {
          const {favorites} = client.cache.readQuery({query: ALL_FAVORITES})
          console.log('masuuk', {favorites})
          const newFavorite = {__typename: 'favorite', name: variable.name}
          const newFavorites = favorites.concat(newFavorite)
          console.log({newFavorites})

          client.cache.writeData({data: {favorites: newFavorites}})

          return newFavorite
        },
        addCounter(_, variable, client) {
          const {counter} = client.cache.readQuery({query: COUNTER_COUNT})
          const newCounter = counter + 1
          client.cache.writeData({data: {counter: counter + 1}})

          return newCounter
        }
      }
    },

    defaults: {
      favorites: [],
      counter: 0
    }
  }
})
