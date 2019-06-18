import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
  padding: .5rem 2rem;
  color: ${({theme, color}) => { return color ? color : theme.button.primaryColor }};
  background: ${({theme, background}) => { return background ? background : theme.button.primaryBackgroundColor }};
  border-color: ${({theme, background}) => { return background ? background : theme.button.primaryBackgroundColor }};
  text-transform: uppercase;
  width: ${({responsive}) => { return responsive ? '100%' : 'auto' }};

  @media (min-width: 768px) {
    width: auto;
  }
`;

export default Button;