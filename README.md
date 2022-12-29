# @lab49/react-order-book

[![codecov](https://codecov.io/gh/lab49/react-order-book/branch/master/graph/badge.svg)](https://codecov.io/gh/lab49/react-order-book) [![.github/workflows/cicd.yaml](https://github.com/lab49/react-order-book/actions/workflows/cicd.yaml/badge.svg)](https://github.com/lab49/react-order-book/actions/workflows/cicd.yaml) [![npm version](https://img.shields.io/npm/v/@lab49/react-order-book?label=version&color=%2354C536&logo=npm)](https://www.npmjs.com/package/@lab49/react-order-book)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

<h3>&nbsp;</h3>
<p align="center">
  <img src="/.github/react-order-book.png" width="400">
  <p align="center">Render an order book for any asset class. Flexible and customizable.</p>
</p>
<h3>&nbsp;</h3>

![react-order-book](https://user-images.githubusercontent.com/63244584/163017603-11089e79-9ec9-4b3e-8d09-086e62f32e94.gif)

`react-order-book` is a simple, flexible order book component. Pass in an order book as a prop, and cutomize the look and feel with plenty of configuration options, plus numerous styling hooks for visual customization.

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
- [License](#License)
- [TODO](#TODO)

## Demo

Hosted demo: Hosted demo: [https://master--5f4988473b6fd20022f12dcc.chromatic.com/](https://master--5f4988473b6fd20022f12dcc.chromatic.com/)

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

```tsx
<OrderBook book={book} />

// Will render...

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

`<OrderBook />` is a `(props: Props) => JSX.Element`. See `Props` below for a description of the avilable props.

```tsx
import { OrderBook } from '@lab49/react-order-book';

const MyComponent = () => <OrderBook book={book} />;
```

### `Props`

```ts
interface Props {
  /**
   * For the internaly calculated colors, apply a background-color in the DOM.
   */
  applyBackgroundColor?: boolean;
  /**
   * Base color for the asks list.
   */
  askColor?: RgbColor;
  /**
   * Base color for the bids list.
   */
  bidColor?: RgbColor;
  /**
   * Order book object.
   */
  book: OrderBook;
  /**
   * Use a value of 1 for the opacity of each row's generated color.
   */
  fullOpacity?: boolean;
  /**
   * Color interpolator function.
   */
  interpolateColor?: Interpolator;
  /**
   * Various layout options.
   */
  layout?: Layout;
  /**
   * Limit the length of the rendered bids and asks.
   */
  listLength?: number;
  /**
   * Show column headers.
   */
  showHeaders?: boolean;
  /**
   * Show the spread.
   */
  showSpread?: boolean;
  /**
   * Provide a custom spread value instead of letting OrderBook calculate it.
   */
  spread?: string;
  /**
   * Prefix for the CSS class name in the DOM.
   */
  stylePrefix?: string;
}
```

### `Layout`

Available layout modes. See the demo website for an example of what this looks like.

```ts
enum Layout {
  Row = 'row'
}
```

###### [⇡ Top](#table-of-contents)

## License

MIT @ [Lab49](https://lab49.com)

###### [⇡ Top](#table-of-contents)

## Sponsored by Lab49

<a href="https://lab49.com">
  <img src="https://www.lab49.com/wp-content/uploads/2020/06/logo.svg" />
</a>
