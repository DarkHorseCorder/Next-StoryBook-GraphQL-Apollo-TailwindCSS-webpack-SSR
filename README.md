# Test Project Web
The Test Project web is a NextJS react app.

## Development

[See here for running the entire application](../README.md#Development)
If you would just like to run the web, you can run `yarn dev` from this folder.


### Fetching data via GraphQL

This service relies on ApolloClient to fetch data from the api. Instead of writing the types for all queries manually, we use code generation to grab the utilities.

To add a new query or mutation:

- Create a `.gql` file somewhere
- Make sure the [api is running](../api/README.md#Development)
- Run `yarn gen`
- Your new query or mutation along with the associated hooks (e.g. `useQuery`, `useMutation` will be available via apollo exported from `generated/graphql`).

# Deployment

This app is automatically deployed via vercel on push to main.
