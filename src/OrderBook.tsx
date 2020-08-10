import Big from 'big.js';
import classnames from 'classnames';
import React from 'react';

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
  // For the internaly calculated colors, apply a background-color in the DOM.
  applyBackgroundColor?: boolean;
  // Base color for the asks list.
  askColor?: RgbColor;
  // Base color for the bids list.
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
  const style = {
    display: 'flex',
    flexDirection: reverse ? 'column-reverse' : 'column',
  };

  return (
    <ol style={style} className={`${stylePrefix}__list`}>
      {list.map(([price, size], index) => {
        const scaleFactor = index / (list.length - 1);
        const rgb = interpolateColorProp(color, [255, 255, 255], scaleFactor).join();
        const backgroundColor = `rgba(${rgb}, ${fullOpacity ? 1 : 1 - scaleFactor})`;

        return (
          <li
            className={`${stylePrefix}__list-item`}
            key={price}
            style={{
              backgroundColor: applyBackgroundColor ? backgroundColor : undefined,
              '--row-color': backgroundColor,
            }}
          >
            <span className={`${stylePrefix}__price`}>{price}</span>

            <span className={`${stylePrefix}__size`}>{size}</span>
          </li>
        );
      })}
    </ol>
  );
};

const defaultProps = {
  askColor: [235, 64, 52] as RgbColor,
  bidColor: [0, 216, 101] as RgbColor,
  interpolateColor,
  showSpread: true,
  stylePrefix: 'rob_OrderBook',
};

/**
 * OrderBook component.
 */
export const OrderBook = ({
  applyBackgroundColor,
  askColor = defaultProps.askColor,
  bidColor = defaultProps.bidColor,
  book,
  fullOpacity,
  interpolateColor: interpolateColorProp = defaultProps.interpolateColor,
  layout,
  listLength,
  showHeaders,
  showSpread = defaultProps.showSpread,
  spread: rawSpread,
  stylePrefix = defaultProps.stylePrefix,
}: Props) => {
  const { bids, asks } = book;
  // TODO (brianmcallister) - This is not a good way to handle this calculation.
  const spread = rawSpread ?? new Big(asks[0][0]).minus(new Big(bids[0][0])).toString(); // parseFloat(asks[0][0]) - parseFloat(bids[0][0]);
  const cls = classnames(stylePrefix);
  const limitedAsks = asks.slice(0, listLength);
  const limitedBids = bids.slice(0, listLength);
  const reverse = layout !== Layout.Row;
  const style = {
    display: 'flex',
    flexDirection: layout === Layout.Row ? 'row-reverse' : 'column',
  };

  return (
    <div style={style} className={cls}>
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
    </div>
  );
};

OrderBook.defaultProps = defaultProps;
