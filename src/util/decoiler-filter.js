import { ICON_NAME } from '../constants'
import { normalizer } from 'util/format'
import { DECOILER } from 'constant'

const { ONE_HALF_T, THREE_T, FIVE_T, SIX_T } = DECOILER

const decoilers = ['1.5T', '3.0T', '5.0T', '6.0T']

const model = customerMachines?.map((mach) => mach?.machineModel?.name)

model.forEach((machineName) => {
  if (checkDecoilerType(machineName) === THREE_T) {
    setIcon(ICON_NAME.DECOILER_3T)
  } else if (checkDecoilerType(machineName) === FIVE_T) {
    setIcon(ICON_NAME.DECOILER_5T)
  } else if (checkDecoilerType(machineName) === SIX_T) {
    setIcon(ICON_NAME.DECOILER_6T)
  } else if (checkDecoilerType(machineName) === ONE_HALF_T) {
    setIcon(ICON_NAME.DECOILER_1_5T)
  } else {
    setIcon(null)
  }

  const isDecoiler1_5T = (machineName) => normalizer(machineName)?.includes(ONE_HALF_T)
  const isDecoiler3T = (machineName) => normalizer(machineName)?.includes(THREE_T)
  const isDecoiler5T = (machineName) => normalizer(machineName)?.includes(FIVE_T)
  const isDecoiler6T = (machineName) => normalizer(machineName)?.includes(SIX_T)

  const checkDecoilerType = (machineName) => {
    const normalizedMachineName = normalizer(machineName)

    if (isDecoiler1_5T(normalizedMachineName)) {
      return ONE_HALF_T
    } else if (isDecoiler3T(normalizedMachineName)) {
      return THREE_T
    } else if (isDecoiler5T(normalizedMachineName)) {
      return FIVE_T
    } else if (isDecoiler6T(normalizedMachineName)) {
      return SIX_T
    } else {
      return null
    }
  }
})
