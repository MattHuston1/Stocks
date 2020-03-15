var mainContainer = document.querySelector('.mainContainer')
var keywords = document.querySelector('.keywords')
var searchButton = document.querySelector('.searchButton')
var keywordSearchButton = document.querySelector('.keywordSearchButton')
var symbolSearch = document.querySelector('.symbolSearch')
var keywordSearch = document.querySelector('.keywordSearch')
var symbolName = document.querySelector('.symbolName')
var curPrice = document.querySelector('.curPrice')
var change = document.querySelector('.change')
var actChange = document.querySelector('.actChange')
var changePer = document.querySelector('.changePer')
var actChangePer = document.querySelector('.actChangePer')
var open = document.querySelector('.open')
var high = document.querySelector('.high')
var low = document.querySelector('.low')
var preClo = document.querySelector('.preClo')
var volume = document.querySelector('.volume')

var symbol = ''
var keyword = ''

function commasToFixed(x) {
  var numCom = x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
  return parseFloat(numCom).toFixed(3)
}

function commaNumber(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

}

searchButton.addEventListener('click', function () {
  symbol = symbolSearch.value
  console.log(symbol + 'symbol')

  let globalQuoteAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let symbolSearchAPI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesIntraAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesDailyAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesDailyAdjustAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  console.log(timeSeriesIntraAPI)

  fetch(globalQuoteAPI)
    .then(response => response.json())
    .then(myJSON => {
      console.log(myJSON['Global Quote'])
      stockInfo(myJSON)
    })

  fetch(timeSeriesIntraAPI)
    .then(response => response.json())
    .then(myJSON => {
      console.log(myJSON)
    })
})

keywordSearchButton.addEventListener('click', function () {

  keyword = keywordSearch.value
  console.log(keywordSearch.value)
  console.log(keyword + 'keyword')

  let globalQuoteAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let symbolSearchAPI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesIntraAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesDailyAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  let timeSeriesDailyAdjustAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=E1212UXCJTFEJQRK`
  console.log(symbolSearchAPI)

  fetch(symbolSearchAPI)
    .then(response => response.json())
    .then(myJSON => {
      console.log(myJSON)
      matches(myJSON)
    })
})

function matches(myJSON) {
  var bestMatches = myJSON.bestMatches
  console.log(bestMatches)
  myJSON.bestMatches.forEach(element => {
    console.log(element['1. symbol'])
    var eachSym = document.createElement('button')
    eachSym.setAttribute('class', 'eachKeyword')
    eachSym.textContent = element['1. symbol']
    keywords.appendChild(eachSym)
    eachSym.addEventListener('click', selectedStock)
  })
}

function selectedStock(event) {
  var stockSym = event.target.innerText
  console.log(stockSym)
  let globalQuoteAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSym}&apikey=E1212UXCJTFEJQRK`
  console.log(globalQuoteAPI)
  
  fetch(globalQuoteAPI)
  .then(response => response.json())
  .then(myJSON => {
    console.log(myJSON['Global Quote'])
    stockInfo(myJSON)
  })
}

function stockInfo(myJSON) {
  var gloQuo = myJSON['Global Quote']

  symbolName.textContent = gloQuo['01. symbol']
  curPrice.textContent = 'Price: $' + commasToFixed(gloQuo['05. price'])
  change.textContent = 'Change: '
  actChange.textContent = commasToFixed(gloQuo['09. change'])
  if (gloQuo['09. change'] < 0) {
    actChange.style.color = 'red'
  } else if (gloQuo['09. change'] = 0) {
    console.log('no change')
  } else {
    actChange.style.color = 'green'
  }

  changePer.textContent = 'Change: '
  var perChange = commasToFixed(gloQuo['10. change percent']).slice(0, -1)
  actChangePer.textContent = perChange + '%'
  if (perChange < 0) {
    actChangePer.style.color = 'red'
  } else if (perChange = 0) {
    console.log('no change')
  } else {
    actChangePer.style.color = 'green'
  }

  open.textContent = 'Open: $' + commasToFixed(gloQuo['02. open'])
  high.textContent = 'High: $' + commasToFixed(gloQuo['03. high'])
  low.textContent = 'Low: $' + commasToFixed(gloQuo['04. low'])
  preClo.textContent = 'Previous Close: $' + commasToFixed(gloQuo['08. previous close'])
  volume.textContent = 'Volume: ' + commaNumber(gloQuo['06. volume'])
}