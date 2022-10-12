import {
  useEffect, useState, useRef, RefObject,
} from 'react';
import { Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SnackbarAlert from '../../components/SnackbarAlert';

const fileToDataUri = (file:any) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    resolve(event?.target?.result);
  };
  reader.readAsDataURL(file);
});

const ImagePreviewEmpty = ({ inputRef }: {inputRef: RefObject<HTMLInputElement | null>}) => {
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        height: '0',
        width: '100%',
        paddingTop: '50%',
        paddingBottom: '50%',
        border: '3px grey dashed',
        mb: 2,
        borderRadius: '8px',
        cursor: 'pointer',
        color: '#1976d2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AddPhotoAlternateIcon />
      <h4>Add image</h4>
    </Box>
  );
};

const ImageUpload = ({
  control, fieldName, setValue, lastUpdate,
}:any) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [URI, setURI] = useState('');
  const fileInputEl = useRef<HTMLInputElement|null>(null);
  const [showAlert, setAlert] = useState(false);

  const resetInput = () => {
    setSelectedFile(undefined);
    setURI('');
    if (fileInputEl && fileInputEl.current) {
      fileInputEl.current.value = '';
    }
  };

  // reset field on form update
  useEffect(() => {
    resetInput();
  }, [lastUpdate]);

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    if (selectedFile?.size > 204800) {
      setAlert(true);
      resetInput();
    } else {
      fileToDataUri(selectedFile).then((r) => setURI(r as string));
    }
  }, [selectedFile]);

  const onSelectFile = (e:any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    setValue(fieldName, URI);
  }, [fieldName, URI, setValue]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {selectedFile ? <img src={URI} width="100%" /> : <ImagePreviewEmpty inputRef={fileInputEl} />}
        <input ref={fileInputEl} type="file" onChange={onSelectFile} />
        <br />
        <small><i>Maximum file size is 200KB</i></small>
      </Box>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <TextField {...field} type="hidden" sx={{ opacity: 0 }} />
        )}
      />
      <SnackbarAlert
        open={showAlert}
        severity="error"
        setOpen={setAlert}
        message="File size too big, maximum 200kb images allowed!"
      />
    </>
  );
};

export default ImageUpload;
