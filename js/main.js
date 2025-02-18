const formatNumber = function(n) {
  return n.toLocaleString(n)
}

// April 1, 7:00AM GMT is March 31, Midnight PDT
// NOTE: Month is ZERO BASED here!
var saleEndTime = Date.UTC(2018, 3, 1, 7, 0, 0)
var isSaleOver = false

var MS_PER_SEC = 1000
var MS_PER_MIN = MS_PER_SEC * 60
var MS_PER_HOUR = MS_PER_MIN * 60
var MS_PER_DAY = MS_PER_HOUR * 24

// Countdown timer
var updatePresaleTimer = function() {
  var currTime = new Date()
  var timeRemaining = saleEndTime - currTime.getTime()
  if (timeRemaining <= 0) {
    $('#countdown-timer').text('SALE OVER')
    $('#countdown-container').css('width', '230px')
    $('.hide-when-sale-closed').css('visibility', 'hidden')
    $('.disp-when-sale-closed').css('display', 'block')
    $('.no-disp-when-sale-closed').css('display', 'none')
    clearInterval(interval)
    return
  }

  var days = Math.floor(timeRemaining / MS_PER_DAY)
  timeRemaining -= days * MS_PER_DAY

  var hours = Math.floor(timeRemaining / MS_PER_HOUR)
  timeRemaining -= hours * MS_PER_HOUR

  var mins = Math.floor(timeRemaining / MS_PER_MIN)
  timeRemaining -= mins * MS_PER_MIN

  var secs = Math.floor(timeRemaining / MS_PER_SEC)

  daysStr = days < 10 ? '0' + days : days
  hoursStr = hours < 10 ? '0' + hours : hours
  minsStr = mins < 10 ? '0' + mins : mins
  secsStr = secs < 10 ? '0' + secs : secs

  $('.countdown-dd').text(daysStr)
  $('.countdown-hh').text(hoursStr)
  $('.countdown-mm').text(minsStr)
  $('.countdown-ss').text(secsStr)
}

var interval = setInterval(updatePresaleTimer, 1000)

updatePresaleTimer()

function updateOrderCounts() {
  fetch('https://portal.obelisk.tech/api/orderCounts')
    .then(function(resp) {
      return resp.json()
    })
    .then(function(counts) {
      var batch = 4
      if (counts['Batch ' + batch]) {
        var batch = counts['Batch ' + batch]
        if (batch.DCR1) {
          $('#dcr1-sold').text(formatNumber(batch.DCR1))
        }
        if (batch.SC1) {
          $('#sc1-sold').text(formatNumber(batch.SC1))
        }
      }
    })
}

updateOrderCounts()
