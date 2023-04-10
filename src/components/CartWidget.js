import * as React from 'react';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
//context
import { useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    },
}));

const CartWidget = () => {
    const {items,returnLenthg} = useContext(ItemsContext);
return (
    <div id='cartWidget' className='pe-5'>
    <IconButton aria-label="cart">
        <StyledBadge badgeContent={items.lenthg} color="secondary">
            <ShoppingCartIcon sx={{color:'white', fontSize:40}}/>
        </StyledBadge>
    </IconButton>
    </div>

)
}

export default CartWidget;