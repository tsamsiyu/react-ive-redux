# Motivation

The popular `react-redux` library uses `shallow equality` approach to detect whether the state was updated. This can lead to a large number of comparisons and as a result to the slowing down the user interface.

# Inspiration

Inspired by `mobx` obserable approach this library proposes a point strategy for detecting cases when component should be updated.

# Explanation

The proposed approach is based on the knowledge by each state element about its accessibility path in whole store object. By 'accessibility path' means way by which element in store is accessed, for example `todos.0.title`. By `element` means each property of each object in store tree.

Based on this feature each component can observe its state slice provided by `mapStateToProps`. Watching that slice, the component can determine accessibilty paths on which it depends and at the moment when store call `subscribe` component will have to compare only its own dependencies.