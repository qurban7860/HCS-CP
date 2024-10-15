import { useState, Fragment } from 'react'
import { useLocale } from 'locale'
import { MenuItem, Stack, Typography } from '@mui/material'
import { Image, IconButtonAnimate, MenuPopover } from 'component'
import { TITLE } from 'constant'
import shadow from 'theme/shadow'

export default function LanguagePopover() {
  const { allLang, currentLang, onChangeLang } = useLocale()
  const [openPopover, setOpenPopover] = useState(null)
  const { t } = useLocale()

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget)
  }

  const handleClosePopover = () => {
    setOpenPopover(null)
  }

  const handleChangeLang = (newLang) => {
    onChangeLang(newLang)
    handleClosePopover()
  }

  return (
    <Fragment>
      <MenuItem
        onClick={(e) => {
          handleOpenPopover(e)
        }}
        onClose={handleClosePopover}
        sx={{
          justifyContent: 'space-between'
        }}>
        <Typography variant="body2">{t('language.label')}</Typography>

        <Image
          disabledEffect
          alt={currentLang.label}
          src={currentLang.icon}
          sx={{
            width: 25,
            height: 15,
            opacity: 0.9
          }}
          borderRadius={'15'}
        />
      </MenuItem>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{
          width: 200,
          mr: 5,
          shadow: shadow.z8,
          boxShadow: shadow.z8
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Stack spacing={0.75}>
          {allLang.map((option) => (
            <MenuItem key={option.value} selected={option.value === currentLang.value} onClick={() => handleChangeLang(option.value)}>
              <Image disabledEffect alt={option.label} src={option.icon} sx={{ width: 25, height: 15, marginRight: 2 }} borderRadius={'15'} />
              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </Fragment>
  )
}
