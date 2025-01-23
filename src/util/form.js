import { deepEqual } from './deep-equal'
export const formDirtyCheck = (defaultValues, watch) =>  Object.keys(defaultValues).some(key => !deepEqual(watch(key), defaultValues[key]))