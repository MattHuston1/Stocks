var searchButton = document.querySelector('.searchButton')
var symbolSearch = document.querySelector('.symbolSearch')
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

// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
// }

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

}

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
      console.log(myJSON['Global Quote'])
      stockInfo(myJSON)
    })

  fetch(timeSeriesIntraAPI)
    .then(response => response.json())
    .then(myJSON => {
      console.log(myJSON)
    })
})

function stockInfo(myJSON) {
  var gloQuo = myJSON['Global Quote']
  symbolName.textContent = gloQuo['01. symbol']
  curPrice.textContent = numberWithCommas('Price: ' + gloQuo['05. price'])
  change.textContent = 'Change: '
  actChange.textContent =  numberWithCommas(gloQuo['09. change'])
  if (gloQuo['09. change'] < 0) {
    actChange.style.color = 'red'
  } else if (gloQuo['09. change'] = 0) {
    console.log('no change')
  } else {
    actChange.style.color = 'green'
  }
  changePer.textContent = 'Change: '
  var perChange = numberWithCommas(gloQuo['10. change percent'])
  var delPer = perChange.slice(0, -1)
  console.log(delPer)
  actChangePer.textContent = delPer + '%'
  if (delPer < 0) {
    actChangePer.style.color = 'red'
  } else if (delPer = 0) {
    console.log('no change')
  } else {
    actChangePer.style.color = 'green'
  }

  open.textContent = numberWithCommas('Open: $' + gloQuo['02. open'])
  high.textContent = numberWithCommas('High: $' + gloQuo['03. high'])
  low.textContent = numberWithCommas('Low: $' + gloQuo['04. low'])
  preClo.textContent = numberWithCommas('Previous Close: $' + gloQuo['08. previous close'])
  volume.textContent = numberWithCommas('Volume: ' + gloQuo['06. volume'])

}


