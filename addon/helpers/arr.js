import { A } from '@ember/array';
import { helper } from '@ember/component/helper'

export const arr = (params = []) => A(params.slice())

export default helper(arr)
