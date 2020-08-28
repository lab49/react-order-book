# @lab49/react-order-book

> Sponsored by Lab49

<img src="https://www.lab49.com/wp-content/uploads/2020/06/logo.svg" />

[![codecov](https://codecov.io/gh/lab49/react-order-book/branch/master/graph/badge.svg)](https://codecov.io/gh/lab49/react-order-book) [![CircleCI](https://circleci.com/gh/lab49/react-order-book.svg?style=svg)](https://circleci.com/gh/lab49/react-order-book) [![npm version](https://img.shields.io/npm/v/@lab49/react-order-book?label=version&color=%2354C536&logo=npm)](https://www.npmjs.com/package/@lab49/react-order-book)

> Render and style an order book for any asset class. Flexible and customizable.

`react-order-book` is a simple, flexible order book rendering component. Pass in an order book as a prop, and cutomize the look and feel with plenty of configuration props, plus numerous styling hooks for visual customization.

`react-order-book` tries to be extremely unopinionated about styling, and as such, includes very little actual style rules. There's plenty of examples in the included demo website that show how you can use the rendered class names to create your own beautiful experiences.

This component is perfect for:

- Trading platforms
- Order entry systems
- Dashboards

## Features

- Written in TypeScript
- Small, simple, configurable, performant
- Maintained by a team of finance industry professionals

## Table of contents

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
	- [`OrderBook`](#OrderBook)
  - [`Props`](#Props)
  - [`Layout`](#Layout)
- [Extra](#extra)
- [License](#License)
- [TODO](#TODO)

## Demo

Hosted demo: [https://react-order-book.netlify.com/](https://react-order-book.netlify.com/)

You can also run the demo locally. To get started:

```sh
git clone git@github.com:lab49/react-order-book.git
npm install
npm run storybook
```

###### [⇡ Top](#table-of-contents)

## Installation

```sh
npm install @lab49/react-order-book
```

###### [⇡ Top](#table-of-contents)

## Usage

```js
import { OrderBook } from '@lab49/react-order-book';

// This is a simple order book structure. There's an array
// of asks, and array of bids. Each entry in the array is
// an array where the first index represents the price,
// and the second index represents the "size", or the total
// number of units of an asset offered at that price.
const book = {
  asks: [
    ['1.01', '2'],
    ['1.02', '3'],
  ],
  bids: [
    ['0.99', '5'],
    ['0.98', '3'],
  ],
};

<OrderBook book={book} />
```

As discussed above, there are a number of classnames you can use to add your own styles. There is an example of doing exactly that in the included [Storybook](./stories/OrderBook.stories.tsx). There's too many to list out, but by default, all DOM nodes have a classname prefixed with `rob_OrderBook`. As an example:

```ts
<OrderBook book={book} />

<div class="rob_OrderBook">
  <div class="rob_OrderBook__side rob_OrderBook__side--asks">
    // ...more content
  </div>

  <div class="rob_OrderBook__side rob_OrderBook__side--bids">
    // ...more content
  </div>
</div>
```

###### [⇡ Top](#table-of-contents)

## API

### `OrderBook`

This is the only named export, and is a `(props: Props) => JSX.Element`. See the props below.

### `Props`

```ts
export interface Props {
  // For the internaly calculated colors, apply a background-color in the DOM.
  applyBackgroundColor?: boolean;
  // Base color for the asks list.
  // Default: [235, 64, 52]
  askColor?: RgbColor;
  // Base color for the bids list.
  // Default: [0, 216, 101]
  bidColor?: RgbColor;
  // Order book object.
  book: OrderBook;
  // Use a value of 1 for the opacity of each row's generated color.
  fullOpacity?: boolean;
  // Color interpolator function.
  interpolateColor?: Interpolator;
  // Various layout options.
  layout?: Layout;
  // Limit the length of the rendered bids and asks.
  listLength?: number;
  // Show column headers.
  showHeaders?: boolean;
  // Show the spread.
  showSpread?: boolean;
  // Provide a custom spread value instead of letting OrderBook calculate it.
  spread?: string;
  // Prefix for the CSS class name in the DOM.
  // Default: 'rob_OrderBook'
  stylePrefix?: string;
}
```

### `Layout`

```ts
enum Layout {
  Row = 'row'
}
```

###### [⇡ Top](#table-of-contents)

## Extra

This project was created with [create-react-library](https://github.com/transitive-bullshit/create-react-library).

###### [⇡ Top](#table-of-contents)

## License

MIT @ [Lab49](https://lab49.com)

###### [⇡ Top](#table-of-contents)

## TODO

These items are very high level right now. Further discussion and proper roadmap plannig will happen in GitHub issues and projects.

- [ ] Add unit tests.
- [ ] Incorporate a CI process for publishing.
- [ ] Add a code of conduct.
- [ ] Add a contributing guide.
- [ ] Create a feature roadmap.
- [ ] Expose functions to help add a price update into the order book. Something like `(book: Book, change: Change) => Book`, but possibly a class to maintain the book prices in a tree for efficient insert and deletes. See [bintrees](https://www.npmjs.com/package/bintrees), and the RBTree.
- [ ] Expose an HOC to connect to some popular streaming APIs and immediately start rendering an `OrderBook`. Plus, expose various props to allow customization of the behavior for use with internal streaming APIs of various types (websocket, SSE, etc).
- [ ] Allow for a custom end color during color interpolation.
- [ ] Add renderer props for various parts of the component structure (e.g., `rowRenderer`).
- [ ] Add formatters for price and size, allow custom formatting.
