const { chain, map, remove, reverse, orderBy } = require('lodash')
const buys = []
const sells = []

function executeBuyOrder (qty, prc) {
  buys.push({ timestamp: new Date().toISOString(), qty, prc })
  orderBy(buys, 'timestamp', 'asc')
  console.log(buys)
  reconcile()
}

function executeSellOrder (qty, prc) {
  sells.push({ qty, prc })
  orderBy(sells, 'prc', 'asc')
  console.log(sells)
  reconcile()
}

function getBook () {
  let fixed = map(buys, ({ qty, prc }) => ({ qty, prc }))
  return {
    buys: orderBy(fixed, 'prc', 'desc'),
    sells: orderBy(sells, 'prc', 'asc')
  }
}

function reconcile () {
  for (let i = 0; i < buys.length; i++) {
    for (let ii = 0; ii < sells.length; ii++) {
      const buy = buys[i]
      const sell = sells[ii]
      if (buy.prc >= sell.prc) {
        if (buy.qty > sell.qty) {
          buy.qty = buy.qty - sell.qty
          sell.qty = 0
        } else if (buy.qty < sell.qty) {
          sell.qty = sell.qty - buy.qty
          buy.qty = 0
          continue
        } else {
          buys[i].qty = 0
          sells[ii].qty = 0
        }
      }
    }
  }
  remove(buys, buy => buy.qty === 0)
  remove(sells, sell => sell.qty === 0)
}

module.exports = {
  executeBuyOrder,
  executeSellOrder,
  getBook
}