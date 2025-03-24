import { useSettingContext } from 'hook'
import { useTheme, alpha, Box, Grid, Typography, Stack } from '@mui/material'
import { LogoIcon } from 'component'
import { StyledRootDiv, LoaderContainer, MainBeam, UpFrame,  AnimatedFill, BeamsContainer, VerticalBeam, DiagonalBeam } from './style'
import { GLOBAL } from 'config/global'
import { FLEX, FLEX_DIR, KEY, TYPOGRAPHY } from 'constant'

const FramingLoader = () => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 return (
  <StyledRootDiv>
   <Grid container display={FLEX.FLEX} flexDirection={FLEX_DIR.COLUMN} justifyContent={KEY.CENTER} alignItems={KEY.CENTER}>
    <LoaderContainer>
    {/* <UpFrame> */}
     <MainBeam mode={themeMode}>
      <AnimatedFill mode={themeMode} />
     </MainBeam>

     <BeamsContainer>
      {[...Array(8)].map((_, index) => (
       <VerticalBeam key={`vertical-top-${index}`} index={index} mode={themeMode} />
      ))}
     </BeamsContainer>

     <BeamsContainer>
      {[...Array(8)].map((_, index) => (
       <DiagonalBeam key={`diagonal-top-${index}`} index={index} mode={themeMode} />
      ))}
     </BeamsContainer>
    {/* </UpFrame>
    <UpFrame bottom> */}
     <MainBeam bottom mode={themeMode}>
      <AnimatedFill mode={themeMode} />
     </MainBeam>

     <BeamsContainer bottom>
      {[...Array(8)].map((_, index) => (
       <VerticalBeam key={`vertical-bottom-${index}`} index={index} bottom mode={themeMode} />
      ))}
     </BeamsContainer>

     <BeamsContainer bottom>
      {[...Array(8)].map((_, index) => (
       <DiagonalBeam key={`diagonal-bottom-${index}`} index={index} bottom  mode={themeMode} />
      ))}
     </BeamsContainer>
    {/* </UpFrame> */}
    </LoaderContainer>
    <Box sx={{ mt: 20 }} display={FLEX.FLEX} flexDirection={FLEX_DIR.COLUMN} justifyContent={KEY.CENTER} alignItems={KEY.CENTER}>
     <LogoIcon width={40} />
     <Stack mt={1}>
        <Typography variant={TYPOGRAPHY.OVERLINE1} color={themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[600]}>
        {GLOBAL.APP_COMPANY_NAME}
        </Typography>
        <Typography variant={TYPOGRAPHY.OVERLINE} color={themeMode === KEY.LIGHT ? theme.palette.grey[300] : theme.palette.grey[600]}>
        {GLOBAL.VERSION}
        </Typography>
     </Stack>
    </Box>
   </Grid>
  </StyledRootDiv>
 )
}

export default FramingLoader
