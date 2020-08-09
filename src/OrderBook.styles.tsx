import styled from 'styled-components';

// todo - build up a type of style related props
interface Props {
  layout?: 'row';
}

interface ListProps {
  reverse?: boolean;
}

export const Root = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => (props.layout === 'row' ? 'row-reverse' : 'column')};
`;

export const List = styled.ol<ListProps>`
  display: flex;
  flex-direction: ${(props) => (props.reverse ? 'column-reverse' : 'column')};
`;
