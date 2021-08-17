import Big from 'big.js';
import classnames from 'classnames';
import React from 'react';

type PriceList = string[][];
// This would be [number, number, number], but:
// See: https://github.com/microsoft/TypeScript/issues/6574
type RgbColor = number[];
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
    flexDirection: reverse ? ('column-reverse' as const) : ('column' as const),
  };

  return (
    <ol style={style} className={`${stylePrefix}__list`}>
      {list.map(([price, size], index) => {
        const scaleFactor = index / (list.length - 1);
        const rgb = interpolateColorProp(color, [255, 255, 255], scaleFactor).join();
        const backgroundColor = `rgba(${rgb}, ${fullOpacity ? 1 : 1 - scaleFactor})`;
        const rowStyle = {
          backgroundColor: applyBackgroundColor ? backgroundColor : undefined,
          '--row-color': backgroundColor,
        };

        return (
          <li
            className={`${stylePrefix}__list-item`}
            data-testid={price}
            key={price}
            style={rowStyle}
          >
            <span className={`${stylePrefix}__price`}>{price}</span>

            <span className={`${stylePrefix}__size`}>{size}</span>
          </li>
        );
      })}
    </ol>
  );
};

/**
 * OrderBook component.
 *
 * `react-order-book` is a simple, flexible order book component.
 * Pass in an order book as a prop, and cutomize the look and feel
 * with plenty of configuration options, plus numerous styling hooks
 * for visual customization.
 *
 * `react-order-book` tries to be extremely unopinionated about
 * styling, and as such, includes very little actual style rules.
 * There's plenty of examples in the included demo website that show
 * how you can use the rendered class names to create your own
 * beautiful experiences.
 *
 * This component is perfect for:
 *
 * - Trading platforms
 * - Order entry systems
 * - Dashboards
 */
export const OrderBook = ({
  applyBackgroundColor,
  askColor = [235, 64, 52],
  bidColor = [0, 216, 101],
  book,
  fullOpacity,
  interpolateColor: interpolateColorProp = interpolateColor,
  layout,
  listLength,
  showHeaders,
  showSpread = true,
  spread: rawSpread,
  stylePrefix = 'rob_OrderBook',
}: Props) => {
  const { bids, asks } = book;
  const spread = rawSpread ?? new Big(asks[0][0]).minus(new Big(bids[0][0])).toString();
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
