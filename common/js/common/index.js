import { Time } from './time'
import { Route } from './route'
import { Common } from './common'
import { Regular } from './regular'

const time = new Time()
const route = new Route()
const common = new Common()
const regular = new Regular()

module.exports = {
  time,
  route,
  common,
  regular
}