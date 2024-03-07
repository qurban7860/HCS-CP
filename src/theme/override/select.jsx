//
import { InputSelectIcon } from './custom-icons'

export default function Select(theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
    },
  }
}
