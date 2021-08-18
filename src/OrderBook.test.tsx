/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { render } from '@testing-library/react';
import { OrderBook, Props, Layout } from './OrderBook';
import '@testing-library/jest-dom/extend-expect';

const book = {
  type: 'snapshot',
  product_id: 'BTC-USD',
  asks: [
    ['1166441.89', '7.3843470214'],
    ['1162261.90', '1.50646551300'],
    ['1166661.89', '7.38476560214'],
    ['11224661.90', '1.506768551300'],
  ],
  bids: [
    ['1165461.89', '7.384334470214'],
    ['11676661.90', '1.5065681300'],
    ['11643461.89', '7.38470457214'],
    ['116564761.90', '1.50651300'],
  ],
};
const defaultProps: Props = {
  applyBackgroundColor: false,
  askColor: [235, 64, 52],
  bidColor: [0, 216, 101],
  book,
  fullOpacity: false,
  interpolateColor: () => [235, 64, 52],
  layout: Layout.Row,
  listLength: 2,
  showHeaders: true,
  showSpread: true,
  spread: 'Hello',
  stylePrefix: 'test_OrderBook',
};

describe('<OrderBook functionality with different properties/>', () => {
  it('OrderBook should be rendered', () => {
    const { getByText } = render(<OrderBook {...defaultProps} />);

    expect(getByText('Ask')).toBeInTheDocument();
  });

  it('Orderbook should display Spread when showSpread is true', () => {
    const renderedOutput = render(<OrderBook {...defaultProps} />);

    expect(renderedOutput.queryByText('Spread')).toBeInTheDocument();
  });

  it('Orderbook should display Headers when showHeaders is true', () => {
    const renderedOutput = render(<OrderBook {...defaultProps} />);

    expect(renderedOutput.queryByText('Ask')).toBeInTheDocument();
    expect(renderedOutput.queryByText('Bid')).toBeInTheDocument();
  });

  const propsWithNoHeader = { ...defaultProps, showHeaders: false };

  it('Orderbook should not display Headers when showHeaders is false', () => {
    const renderedOutput = render(<OrderBook {...propsWithNoHeader} />);

    expect(renderedOutput.queryByText('Ask')).not.toBeInTheDocument();
    expect(renderedOutput.queryByText('Bid')).not.toBeInTheDocument();
  });

  const propsWithNoSpread = { ...defaultProps, showSpread: false };

  it('Orderbook should not display Spread when showSpread is false', () => {
    const renderedOutput = render(<OrderBook {...propsWithNoSpread} />);

    expect(renderedOutput.queryByText('Spread')).not.toBeInTheDocument();
  });

  const propsWithSpreadValue = { ...defaultProps, spread: 'Hello123' };

  it('Orderbook should show spread that is given as input arg when showSpread is true', () => {
    const renderedOutput = render(<OrderBook {...propsWithSpreadValue} />);

    expect(renderedOutput.queryByText('Hello123')).toBeInTheDocument();
  });

  const propsWithApplyBackgroundColorValue = { ...defaultProps, applyBackgroundColor: true };

  it('Orderbook should apply color when applyBackgroundColor is true', () => {
    const renderedOutput = render(<OrderBook {...propsWithApplyBackgroundColorValue} />);

    expect(renderedOutput.queryAllByRole('listitem')[0].style.backgroundColor).toBeDefined();
  });

  const propsWithNoApplyBackgroundColorValue = { ...defaultProps, applyBackgroundColor: false };

  it('Orderbook should not apply color when applyBackgroundColor is false', () => {
    const renderedOutput = render(<OrderBook {...propsWithNoApplyBackgroundColorValue} />);

    expect(renderedOutput.queryAllByRole('listitem')[0].style.backgroundColor).toEqual('');
  });

  const propsWithOpacity = { ...defaultProps, applyBackgroundColor: true, fullOpacity: true };

  it('Orderbook color testing for list items with opacity', () => {
    const expectedRGB = 'rgb(235, 64, 52)';

    const renderedOutput = render(<OrderBook {...propsWithOpacity} />);

    expect(renderedOutput.queryAllByRole('listitem')[2].style.backgroundColor).toEqual(expectedRGB);
  });

  it('Testing number of bids and asks that are displayed', () => {
    const renderedOutput = render(<OrderBook {...defaultProps} />);

    expect(renderedOutput.queryAllByRole('listitem').length).toEqual(4);
  });

  const propsWithListLength = { ...defaultProps, listLength: 4 };

  it('Testing number of bids and asks that are displayed based on list length', () => {
    const renderedOutput = render(<OrderBook {...propsWithListLength} />);

    expect(renderedOutput.queryAllByRole('listitem').length).toEqual(8);
  });

  it('Testing number of ordered lists (bids and asks) that are displayed', () => {
    const renderedOutput = render(<OrderBook {...defaultProps} />);

    expect(renderedOutput.queryAllByRole('list').length).toEqual(2);
  });

  it('Testing interpolateColor default function', () => {
    const noColorProps = { ...defaultProps, interpolateColor: undefined };
    const renderedOutput = render(<OrderBook {...noColorProps} />);

    const listItems = renderedOutput.queryAllByRole('listitem');
    expect(listItems[0]).toHaveStyle(`--row-color: rgba(235,64,52, 1)`);
    expect(listItems[listItems.length - 1]).toHaveStyle(`--row-color: rgba(255,255,255, 0)`);
  });
});
