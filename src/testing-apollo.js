const { ApolloClient, gql, InMemoryCache } = require('@apollo/client');
const fetch = require('isomorphic-unfetch');

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
  },
  fetch: fetch,
  cache: new InMemoryCache()
});

const query = gql`{
  user(login: "octocat") {
    name
    url
    avatarUrl
  }
}`;

console.log("== query:", query)
client.query({ query })
  .then(results => console.log("== results", results));
