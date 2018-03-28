# react-drag-list-component

Simple drag list component

#### Install

```
$ npm i react-drag-list-component
```

OR

```
$ yarn add react-drag-list-component
```

#### Example

```jsx
render() {
  return (
    <DragList 
      list={[]}
      update={(item, old, next) => {}}
      render={(item, index) => <div key={index}>{item.name}</div>}
    />
  );
}
```

#### Drag list Props

| Prop Name | Description | Required | Default |
|-----------|-------------|-------------|-------------|
| list | List of elements to render | true | ---
| placeholder | To show placeholder draged elements | false | true
| update | Callback function after change position of element | true | ---
| render | Callback function to render element from list | true | ---
| handler | To show handler to draged element | false | true

### Cli-commands

Start tests:
```sh
$ yarn test
```

#### Our blogs

See [Meanstack.eu - voil](http://meanstack.eu/)
See [Meandjs - ddosdor](http://meandjs.com/)

License
----

MIT


**Ready to Rock&Roll, Hell Yeah!**