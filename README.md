# Ember.js group helper

This is an experimental plugin to allow an application developer to change the granularity of bindings in a template. This can lead to significant performance improvements when outputting many bound properties, inside of an #each for example.

The general rule is that the `group` helper causes the nearest view to be rerendered when a property inside it changes. It also prevents the common Handlebars helpers (#if, #unless, #each) from creating virtual views.

Currently requires Ember.js master.

## Usage

```handlebars
  {{#group}}
    {{firstName}} {{lastName}}
  {{/group}}
```

Changes to `firstName` or `lastName` will rerender the whole `group` block.

```handlebars
  {{#group}}
    {{#each people}}
      {{firstName}} {{lastName}}
    {{/each}}
  {{/group}}
```

The whole `group` block will be rerendered upon addition/removal of elements in the `people` array or any properties output within the `each` block.

```handlebars
  {{#group}}
    {{#each people groupedRows=true}}
      {{firstName}} {{lastName}}
    {{/each}}
  {{/group}}
```

Specifying the `groupedRows` option will cause the `#each` to behave like a normal bound `#each`. There will be a virtual view for the `each` itself and for every row. Addition/removal of elements in the array will insert/remove rows in the DOM without causing the `group` to rerender. Since each row has a virtual view, changing a property output inside a row will only rerender that row.

```handlebars
  {{#group}}
    {{#each people itemViewClass="App.RowView"}}
      {{firstName}} {{lastName}}
    {{/each}}
  {{/group}}
```

You can alternatively specify an `itemViewClass` to get the behavior as detailed above, but instead of rows being virtual views, they'll be instances of your specified class.

