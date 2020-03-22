var mainContainer = document.querySelector('.mainContainer')
var keywords = document.querySelector('.keywords')
var stockInformation = document.querySelector('.stockInfo')
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

function keySearch() {
  
  keyword = keywordSearch.value
  console.log(keywordSearch.value)
  console.log(keyword + 'keyword')
  
  console.log(keywords.parentNode)
  if (keywords.contains(document.querySelector('.eachKeyword'))) {
    console.log('worked')
    console.log(keywords.parentNode)
    // keywords.removeChild(document.querySelector('.eachKeyword'))
    keywords.textContent = ''
  }
  
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
}

keywordSearchButton.onclick = keySearch
keywordSearch.onkeyup = keySearch
  



function matches(myJSON) {
  var bestMatches = myJSON.bestMatches
  console.log(bestMatches + 'best matches')
  myJSON.bestMatches.forEach(element => {
    console.log(element['1. symbol'])
    var eachSym = document.createElement('button')
    eachSym.setAttribute('class', 'eachKeyword')
    eachSym.textContent = element['1. symbol'] + ' ' + element['2. name']
    keywords.appendChild(eachSym)
    eachSym.addEventListener('click', selectedStock)
  })
}

function selectedStock(event) {

  var stockSym = event.target.innerText
  var splitStockSym = stockSym.split(' ', 1)

  let globalQuoteAPI = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${splitStockSym}&apikey=E1212UXCJTFEJQRK`
  console.log(globalQuoteAPI)

  fetch(globalQuoteAPI)
    .then(response => response.json())
    .then(myJSON => {
      console.log(myJSON['Global Quote'] + 'json response')
      stockInfo(myJSON)
    })
    .catch(error => {
      console.log(error)
      stockInformation.textContent = 'API allows only 5 calls per minute. Try again in a moment. Sorry for the inconvenience.'
    })
}

function stockInfo(myJSON) {
  var gloQuo = myJSON['Global Quote']
  console.log(gloQuo + 'gloQuo')

  symbolName.textContent = gloQuo['01. symbol']
  curPrice.textContent = 'Price: $' + commasToFixed(gloQuo['05. price'])
  change.textContent = 'Change: '
  actChange.textContent = '$' + commasToFixed(gloQuo['09. change'])
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

// keywordSearch.onkeyup = function () {
//   console.log(keywordSearch.value)

//   keyword = keywordSearch.value

//   let symbolSearchAPI = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keyword}&apikey=E1212UXCJTFEJQRK`

//   fetch(symbolSearchAPI)
//     .then(response => response.json())
//     .then(myJSON => {
//       console.log(myJSON)
//       // stockInfo(myJSON)
//     })

// }