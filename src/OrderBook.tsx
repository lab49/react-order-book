import classnames from 'classnames';
import React from 'react';

import { Root } from './OrderBook.styles';

type PriceList = string[][];

interface OrderBook {
  bids: PriceList;
  asks: PriceList;
}

export interface Props {
  book: OrderBook;
  stylePrefix?: string;
  showHeaders?: boolean;
  showSpread?: boolean;
  spread?: string;
  listLength?: number;
  layout?: 'row';
}

const defaultProps = {
  stylePrefix: 'rob_OrderBook',
  showHeaders: false,
  showSpread: true,
  spread: undefined,
  listLength: undefined,
  layout: undefined,
};

const renderList = (list: PriceList) => {
  return (
    <ol>
      {list.map(([price, size]) => (
        <li key={price}>
          <span>p: {price}</span>

          <span>s: {size}</span>
        </li>
      ))}
    </ol>
  );
};

export const OrderBook = ({
  book,
  stylePrefix,
  showHeaders,
  showSpread,
  spread: rawSpread,
  listLength,
  layout,
}: Props) => {
  const { bids, asks } = book;
  const spread = rawSpread ?? parseFloat(asks[0][0]) - parseFloat(bids[0][0]); // todo - this sucks
  const cls = classnames(stylePrefix);

  const limitedAsks = asks.slice(0, listLength);
  const limitedBids = bids.slice(0, listLength);

  const asksList = layout === 'row' ? limitedAsks : limitedAsks.reverse();

  return (
    <Root layout={layout} className={cls}>
      <div>
        {showHeaders && <p>asks</p>}
        {renderList(asksList)}
      </div>

      {showSpread && (
        <div>
          <p>spread</p>
          <span>{spread}</span>
        </div>
      )}

      <div>
        {showHeaders && <p>bids</p>}
        {renderList(limitedBids)}
      </div>
    </Root>
  );
};

OrderBook.defaultProps = defaultProps;
