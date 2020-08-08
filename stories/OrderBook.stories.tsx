import React from 'react';

import { OrderBook } from '../src/OrderBook';
import pkg from '../package.json';

export default {
  title: 'OrderBook',
  component: OrderBook,
  parameters: {
    componentSubtitle: pkg.description,
  },
};

export const Default = () => {
  return <OrderBook />
};
