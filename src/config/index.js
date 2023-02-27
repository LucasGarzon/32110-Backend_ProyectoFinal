import startDB from './mongo.js'

class Loaders {
  start() {
    startDB()
  }
}

const loader = new Loaders()
export default loader