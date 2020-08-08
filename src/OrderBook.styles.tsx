import styled from 'styled-components';

// todo - build up a type of style related props
interface Props {
  layout?: 'row';
}

export const Root = styled.div<Props>`
  border: 1px solid red;
  display: flex;
  flex-direction: ${(props) => (props.layout === 'row' ? 'row-reverse' : 'column')};
`;
