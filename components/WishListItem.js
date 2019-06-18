import React from 'react';
import styled from 'styled-components';
import { Button } from '../html';
import { PartNumber, StockLabel }  from '../typography';

const WishListItemWrapper = styled.div`
  margin: 0;
  padding: 0;
  padding: 5rem 0;
  li { list-style-type: none; }
`

const WishListItemInner = styled.div`
  display: grid;
  grid-template-columns: 0.33fr 0.66fr;
  grid-template-rows: 1fr 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.8fr 0.8fr 0.9fr;
  }
`

const WishListItemButtons = styled.div`
  grid-column: 1 / span-2;

  @media (min-width: 768px) {
    grid-column: 4;
  }
`

const WishListProductImage = styled.img`
  width: 100%;
  align-self: center;
`

const WishListItemRemoveLink = styled.a`
  color: ${({theme}) => { console.log(theme); return theme.colors.red; }};
  display: block;
`

class WishListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, msg, productData } = this.props;
    const { color, size, width, sku, name, price, availability, image } = productData;

    return (
      <WishListItemWrapper>
        <WishListItemInner>
          <WishListProductImage src={image}></WishListProductImage>
          
            <div>
              <ul>
                <li><h4>{name}</h4></li>
                <PartNumber>{sku}</PartNumber>
                <li><b>{color}</b></li>
                <li><b>{size}</b></li>
                <li><b>{width}</b></li>
                <div>{price}</div>
                <li><StockLabel color={theme.colors.warning}>{availability}</StockLabel></li>
              </ul> 
            </div>
            
            
            
            <WishListItemButtons>
              <Button responsive={true}>ADD TO CART</Button>
              <WishListItemRemoveLink>remove from wishlist</WishListItemRemoveLink>
            </WishListItemButtons>

        </WishListItemInner>
      </WishListItemWrapper>
    ); 
  }
}

export default WishListItem;