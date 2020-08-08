import React from 'react';

import { OrderBook } from '../src/OrderBook';
import pkg from '../package.json';

import book from './book';

export default {
  title: 'OrderBook',
  component: OrderBook,
  parameters: {
    componentSubtitle: pkg.description,
  },
};

export const Default = () => {
  return <OrderBook book={{ bids: book.bids, asks: book.asks }} showHeaders listLength={10} />;
};
