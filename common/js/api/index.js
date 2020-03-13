import { Common } from "./common"
import { Pets } from "./pets"
import { Login } from "./login"

const common = new Common()
const pets = new Pets()
const login = new Login()

module.exports = {
  common,
  pets,
  login
}