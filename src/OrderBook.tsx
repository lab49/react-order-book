import classnames from 'classnames';
import React from 'react';

import { Root, List } from './OrderBook.styles';

type PriceList = string[][];
type RgbColor = number[]; // [number, number, number];
type Interpolator = (
  start: RenderListOptions['color'],
  end: RenderListOptions['color'],
  factor: number,
) => RgbColor;

interface OrderBook {
  asks: PriceList;
  bids: PriceList;
}

export enum Layout {
  Row = 'row',
}

export interface Props {
  applyBackgroundColor?: boolean;
  askColor?: RgbColor;
  bidColor?: RgbColor;
  book: OrderBook;
  fullOpacity: boolean;
  interpolateColor?: Interpolator;
  layout?: Layout;
  listLength?: number;
  showHeaders?: boolean;
  showSpread?: boolean;
  spread?: string;
  stylePrefix?: string;
}

type RenderListOptions = Pick<Props, 'applyBackgroundColor' | 'fullOpacity' | 'stylePrefix'> & {
  interpolateColor: NonNullable<Props['interpolateColor']>;
  color: RgbColor;
  reverse?: boolean;
};

/**
 * Interpolate two colors.
 *
 * Adapted from ondras/rot.js: https://git.io/JJ1WF
 */
const interpolateColor = (
  start: RenderListOptions['color'],
  end: RenderListOptions['color'],
  factor: number = 0.5,
) => start.map((color, index) => Math.round(color + factor * (end[index] - start[index])));

/**
 * Render a list representing one side of an order book.
 */
const renderList = (
  list: PriceList,
  {
    applyBackgroundColor,
    color,
    fullOpacity,
    interpolateColor: interpolateColorProp,
    reverse,
    stylePrefix,
  }: RenderListOptions,
) => {
  return (
    <List reverse={reverse} className={`${stylePrefix}__list`}>
      {list.map(([price, size], index) => {
        const scaleFactor = index / (list.length - 1);
        const rgb = interpolateColorProp(color, [255, 255, 255], scaleFactor).join();
        const backgroundColor = `rgba(${rgb}, ${fullOpacity ? 1 : 1 - scaleFactor})`;

        return (
          <li
            className={`${stylePrefix}__list-item`}
            key={price}
            style={{
              backgroundColor: applyBackgroundColor ? backgroundColor : null,
              '--row-color': backgroundColor,
            }}
          >
            <span className={`${stylePrefix}__price`}>{price}</span>

            <span className={`${stylePrefix}__size`}>{size}</span>
          </li>
        );
      })}
    </List>
  );
};

const defaultProps = {
  applyBackgroundColor: false,
  askColor: [235, 64, 52] as RgbColor,
  bidColor: [0, 216, 101] as RgbColor,
  fullOpacity: false,
  interpolateColor,
  layout: undefined,
  listLength: undefined,
  showHeaders: false,
  showSpread: true,
  spread: undefined,
  stylePrefix: 'rob_OrderBook',
};

/**
 * OrderBook component.
 */
export const OrderBook = ({
  applyBackgroundColor = defaultProps.applyBackgroundColor,
  askColor = defaultProps.askColor,
  bidColor = defaultProps.bidColor,
  book,
  fullOpacity = defaultProps.fullOpacity,
  interpolateColor: interpolateColorProp = defaultProps.interpolateColor,
  layout,
  listLength,
  showHeaders = defaultProps.showHeaders,
  showSpread = defaultProps.showSpread,
  spread: rawSpread,
  stylePrefix = defaultProps.stylePrefix,
}: Props) => {
  const { bids, asks } = book;
  const spread = rawSpread ?? parseFloat(asks[0][0]) - parseFloat(bids[0][0]); // todo - this sucks
  const cls = classnames(stylePrefix);
  const limitedAsks = asks.slice(0, listLength);
  const limitedBids = bids.slice(0, listLength);
  const reverse = layout !== Layout.Row;

  return (
    <Root layout={layout} className={cls}>
      <div className={`${stylePrefix}__side ${stylePrefix}__side--asks`}>
        {showHeaders && <p className={`${stylePrefix}__side-header`}>Ask</p>}
        {renderList(limitedAsks, {
          applyBackgroundColor,
          color: askColor,
          fullOpacity,
          interpolateColor: interpolateColorProp,
          reverse,
          stylePrefix,
        })}
      </div>

      {showSpread && (
        <div className={`${stylePrefix}__spread`}>
          <p className={`${stylePrefix}__spread-header`}>Spread</p>
          <span className={`${stylePrefix}__spread-value`}>{spread}</span>
        </div>
      )}

      <div className={`${stylePrefix}__side ${stylePrefix}__side--bids`}>
        {showHeaders && <p className={`${stylePrefix}__side-header`}>Bid</p>}
        {renderList(limitedBids, {
          applyBackgroundColor,
          color: bidColor,
          fullOpacity,
          interpolateColor: interpolateColorProp,
          stylePrefix,
        })}
      </div>
    </Root>
  );
};

OrderBook.defaultProps = defaultProps;
