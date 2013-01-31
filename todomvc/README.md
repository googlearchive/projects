This folder contains several variations on the TodoMVC application implemented with Toolkit.

> Not all features are implemented (data persistence, for example, is not implemented in any of these variations) and all versions are not equally robust. The emphasis is on exploring the data-model variations.

## tododmvc-embedded-model

Use a plain JS application data model (prototype), that a `todos` component instances for itself.

## todomvc-granular

Use a plain JS application data model (prototype) that is only ever known to the `app` component. `todos` exposes an interface via properties and events and `app` mediates between the model and the `todos`.

## todomvc-model-as-component

The application data model implementation is itself a component. The `app` instances the models and mediates between model and `todos`.

## todomvc-plain-model

Use a plain JS application data model (prototype) that is instanced by the application and then bound directly to `todos` instances.
