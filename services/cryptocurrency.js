import  Api  from "./Api"

export const getList = (currency = 'usd') => {
 return Api.get(`/coins/markets?vs_currency=${currency}`)
}

export const getRatio = (from, to) => {
 return Api.get(`/simple/price?ids=${from}&vs_currencies=${to}`)
}

export const getSupportedVsCurrencies = () => {
 return Api.get(`/simple/supported_vs_currencies`)
}
