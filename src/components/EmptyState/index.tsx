import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EmptyStateImage from '../../static/empty-state.png';

interface Props {
  title: string,
  subtitle: string,
  linkTo: string,
  cta: string,
  buttonColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined,
}

const EmptyState = ({
  title, subtitle, linkTo, buttonColor, cta,
}: Props) => (
  <Box sx={{ textAlign: 'center' }}>
    <img src={EmptyStateImage} alt="empty" width="200px" style={{ margin: '0 auto' }} />
    <Typography variant="h6">{title}</Typography>
    <Typography sx={{ mb: 3 }} variant="subtitle2">{subtitle}</Typography>
    <Link to={linkTo} style={{ textDecoration: 'none' }}>
      <Button size="large" color={buttonColor} variant="contained">{cta}</Button>
    </Link>
  </Box>
);

export default EmptyState;
