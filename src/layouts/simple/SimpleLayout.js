import { Link, Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
// components
import { Button } from '@mui/material';
import Iconify from '../../components/iconify';
import Logo from '../../components/logo';
// ----------------------------------------------------------------------

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function SimpleLayout() {
  return (
    <>
      <StyledHeader>
        <Logo />
        <Button style={{
          position: 'absolute',
          right: 0,
          marginRight: 20,
        }} component={Link} to="/faq" variant="contained" startIcon={
          <Iconify icon="bi:question-circle" width={20} />
        } color="primary">
          FAQ
        </Button>
      </StyledHeader>

      <Outlet />
    </>
  );
}
