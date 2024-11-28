import PropTypes from 'prop-types'
import { t } from 'i18next'
import { useSettingContext } from 'hook'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { VARIANT, SIZE, KEY } from 'constant'

/**
 * DropdownDefault Component
 *
 * A reusable dropdown component that can handle various data structures
 * and rendering requirements.
 *
 * Props:
 * - filteredData: Array of data objects to populate the dropdown.
 * - selectedCard: The currently selected value.
 * - i18nKey: Translation key for the input label.
 * - onChange: Callback function when selection changes.
 * - valueKey: (Optional) The key in data objects to use as the MenuItem value. Defaults to '_id'.
 * - renderLabel: (Optional) Function to render the MenuItem label. Receives a data object.
 * - keyExtractor: (Optional) Function to extract a unique key for each MenuItem. Defaults to using valueKey.
 * - additionalFormControlProps: (Optional) Additional props to pass to FormControl.
 * - additionalSelectProps: (Optional) Additional props to pass to Select.
 */
const DropdownDefault = ({ filteredData, selectedCard, i18nKey, onChange, valueKey = '_id', renderLabel, keyExtractor, additionalFormControlProps = {}, additionalSelectProps = {} }) => {
 const { themeMode } = useSettingContext()
 const theme = useTheme()

 const defaultKeyExtractor = item => item[valueKey]
 const defaultRenderLabel = item => `${item.firstName || ''} ${item.lastName || ''}`.trim() || 'N/A'

 return (
  <FormControl fullWidth size={SIZE.SMALL} variant={VARIANT.FILLED} sx={{ minWidth: 370, marginTop: 2 }}>
   <InputLabel
    id='contacts-select-label'
    sx={{
     color: themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange,
     '&.Mui-focused': {
      color: themeMode === KEY.LIGHT ? theme.palette.howick.midBlue : theme.palette.howick.orange
     }
    }}>
    {t(i18nKey)}
   </InputLabel>
   <Select labelId='contacts-select-label' id='contacts-select' value={selectedCard || ''} label={t(i18nKey)} onChange={onChange}>
    {filteredData.map((item, index) => (
     <MenuItem
      key={keyExtractor ? keyExtractor(item) : defaultKeyExtractor(item) || index}
      value={item[valueKey]}
      sx={{
       '&.Mui-selected': {
        backgroundColor: theme.palette.howick.orange,
        color: theme.palette.common.black,
        fontWeight: theme.typography.fontWeightBold,
        '&:hover': {
         backgroundColor: theme.palette.grey[300]
        }
       },
       '&:hover': {
        backgroundColor: theme.palette.action.hover
       }
      }}>
      {renderLabel ? renderLabel(item) : defaultRenderLabel(item)}
     </MenuItem>
    ))}
   </Select>
  </FormControl>
 )
}

DropdownDefault.propTypes = {
 filteredData: PropTypes.array,
 filteredDataValue: PropTypes.string,
 selectedCard: PropTypes.string,
 i18nKey: PropTypes.string,
 onChange: PropTypes.func,
 valueKey: PropTypes.string,
 renderLabel: PropTypes.func,
 keyExtractor: PropTypes.func,
 additionalFormControlProps: PropTypes.object,
 additionalSelectProps: PropTypes.object
}

export default DropdownDefault
