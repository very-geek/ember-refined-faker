import { helper } from 'ember-helper'
import { A as emberArray } from 'ember-array/utils'

export const arr = (params = []) => emberArray(params.slice())

export default helper(arr)
