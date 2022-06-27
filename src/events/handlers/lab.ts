import { toFormatDebioCoin } from "../helpers"

const defaultHandler = {
  get: function (target: any, name: string) {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] : (dataEvent, value, valueMessage) => {
      const data = dataEvent[0]
      const id = data[value]
      const params = { number: id }
      const wording = "for (" + data[valueMessage].substr(0, 4) + "..." + data[valueMessage].substr(data[valueMessage].length - 4) + ")"
      return { data, id, params, wording }
    }
  }
}

const handler = {
  balances: async ({ dataEvent, value, valueMessage, store }) => {
    const data = dataEvent
    const id = data[value]
    const params = { number: id }
    const finalText = await toFormatDebioCoin(data[valueMessage], store)
    const wording = finalText + " DBIO!"
    return { data, id, params, wording }
  },
  orders: async (dataEvent, value, valueMessage) => {
    const data = dataEvent[0]
    const id = data[value]
    const params = data
    const wording = "for (" + data[valueMessage].substr(0, 4) + "..." + data[valueMessage].substr(data[valueMessage].length - 4) + ")"
    return { data, id, params, wording }
  },
  geneticTesting: async (dataEvent, value, valueMessage) => {
    const data = dataEvent[0]
    const id = data[value]
    const params = { number: id }
    const wording = "for (" + data[valueMessage].substr(0, 4) + "..." + data[valueMessage].substr(data[valueMessage].length - 4) + ")"
    return { data, id, params, wording }
  }
}

// If property not found, return defaultHandler
export const labHandler = new Proxy(handler, defaultHandler)
