var searchButton = document.querySelector('.searchButton')
var symbolSearch = document.querySelector('.symbolSearch')
var symbolName = document.querySelector('.symbolName')
var curPrice = document.querySelector('.curPrice')
var change = document.querySelector('.change')

var symbol = ''

let MSFTAPI = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=E1212UXCJTFEJQRK'


searchButton.addEventListener('click', function () {
  symbol = symbolSearch.value
  console.log(symbol)
  
  let globalQuoteAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesIntraAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesDailyAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesDailyAdjustAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  console.log(timeSeriesIntraAPI)
  
  fetch(globalQuoteAPI)
  .then(response => response.json())
  .then(myJSON => {

    // parse = JSON.parse(myJSON)
    console.log(myJSON['Global Quote'])
    // console.log(parse)
    stockInfo(myJSON)

  })
})

function stockInfo(myJSON) {
  var gloQuo = myJSON['Global Quote']
  symbolName.textContent = gloQuo['01. symbol']
  curPrice.textContent = 'Price: ' + gloQuo['05. price']
  change.textContent = 'Change: ' + gloQuo['09. change'] + '%'

}
