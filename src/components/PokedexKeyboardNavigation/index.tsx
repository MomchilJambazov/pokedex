import { useState, useEffect, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { useLocalStorage } from 'usehooks-ts';

import styles from './index.module.scss';

interface PokedexKeyboardNavigationProps {
  next: () => void;
  prev: () => void;
}

const Kbd = ({ children }: PropsWithChildren) => (
  <kbd className={styles.kbd}>{children}</kbd>
);

function PokedexKeyboardNavigation(props: PokedexKeyboardNavigationProps) {
  const navigate = useNavigate();
  const [hideHelp, setHideHelp] = useLocalStorage(
    'hidePokedexNavigationHelp',
    false,
  );
  const [showHelp, setShowHelp] = useState(!hideHelp);
  const { next, prev } = props;

  const handleDontShow = () => {
    setHideHelp(true);
    setShowHelp(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          navigate('/pokedex');
          break;
        case 'ArrowLeft':
          prev();
          break;
        case 'ArrowRight':
          next();
          break;
        default:
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [next, prev, navigate]);

  return (
    <Box sx={{
      position: 'fixed', right: '20px', bottom: '10px', zIndex: 10,
    }}
    >
      <Collapse in={showHelp}>
        <Alert
          style={{ background: 'white' }}
          variant="outlined"
          severity="info"
          action={(
            <>
              <Button size="small" onClick={handleDontShow}>
                Got it
              </Button>
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowHelp(false);
                }}
              >
                <CloseIcon color="info" fontSize="inherit" />
              </IconButton>
            </>
          )}
          sx={{ mb: 2 }}
        >
          {'Use '}
          <Kbd>&larr;</Kbd>
          {', '}
          <Kbd>&rarr;</Kbd>
          {', and '}
          <Kbd>Esc</Kbd>
          {' for faster navigation'}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default PokedexKeyboardNavigation;
