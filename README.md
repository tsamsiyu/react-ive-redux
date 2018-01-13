This is alternative implementation of `react-redux` library with another update-strategy.

The approach is based on the knowledge of the each state element about its access path.
By 'access path' means way by which element in store is accessed, for example `todos.0.title`.

Based on this feature each component can observe its slice (state provided from `mapStateToProps`) and react on changes of received dependencies.

Package is in development. At now I'm trying to check how and when this approach can be really helpful.