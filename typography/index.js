import React from 'react';
import styled from 'styled-components';

const PartNumber = styled.p`
   
`

const StockLabel = styled.span`
  color: ${(props) => { console.log(props); return props.color; }}
`

export { PartNumber, StockLabel };