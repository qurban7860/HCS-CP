import React, { useMemo, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Box, Button, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
// import FormProvider, { RHFTextField } from '../../../components/hook-form';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFTextField } from 'component/hook-form';
import { useSettingContext } from 'hook';
import { KEY } from 'constant';

FilledTextField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  onSubmit: PropTypes.func,
  minRows: PropTypes.number,
};

function FilledTextField( { name, label, value, onSubmit, minRows } ) {

      const defaultValues = useMemo(
        () => ({
          [name]: value || "",
        }),[ value, name ]);

      const methods = useForm({
        // resolver: yupResolver( ticketSchema ),
        defaultValues,
      });
      const { handleSubmit, reset, setError, formState: { isSubmitting, isDirty }} = methods;
      useEffect(() => {
        reset({ [name]: value || "" });
      }, [value, name, reset]);
      
      const handleFormSubmit = handleSubmit( async (data) => {
        try{
          await onSubmit( name, data[name] );

        } catch( error ){
          console.error(error);

          if (Array.isArray(error?.errors) && error?.errors?.length > 0) {
            const fieldError = error?.errors?.find((e) => e?.field === name);

            if (fieldError) {
              setError(name, {
                type: "manual",
                message: fieldError.message,
              });
            }
          }

        }
      });

        const { themeMode } = useSettingContext()
  return (
    <Box sx={{ position: "relative", width: "100%" }} >
      <FormProvider methods={methods} onSubmit={handleFormSubmit} sx={{ width: "100%" }} >
        <RHFTextField
            name={name} 
            label={label}
            multiline={name !== "summary"}
            minRows={ minRows || 1 }
            variant="filled"
            fullWidth
            sx={{ 
                "& .MuiInputBase-root": {
                  backgroundColor: themeMode === KEY.LIGHT ? 'grey.100' : 'grey.800',
                  padding: "8px",
                  boxSizing: "border-box",
                },
                "& .MuiInput-underline:before, & .MuiInput-underline:hover:not(.Mui-disabled):before, & .MuiInput-underline.Mui-focused:before": {
                  borderBottom: "none",
                },
                "&:hover .MuiInputBase-root, & .Mui-focused .MuiInputBase-root": {
                  backgroundColor: "transparent !important",
                  borderRadius: "8px",
                  transition: "border 0.3s ease-in-out",
                  outline: "1px solid",
                },
                "& .MuiInputBase-input": {
                  padding: "1rem",
                  margin: "0" 
                }
            }}
        />
        { isDirty && <Stack 
            direction="row" 
            spacing={1} 
            sx={{
                position: 'absolute',
                bottom: -53, 
                right: 0,   
                transform: 'translateY(-50%)',
            }}
        >
            <LoadingButton
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                disabled={ isSubmitting }
                loading={isSubmitting}
                sx={{minWidth: 32, padding: '2px', height: 32}}
            >
                <CheckRoundedIcon/>
            </LoadingButton>
            <Button
                variant="outlined"
                size="small"
                onClick={() => reset()}
                sx={{minWidth: 32, padding: '2px', height: 32}}
            >
                <ClearRoundedIcon/>
            </Button>
        </Stack>}
      </FormProvider>
    </Box>
  )
}

export default FilledTextField