const days = document.getElementsByClassName('tracker__finished--list')
for (var i = 0; i < days.length; i++) {
  const day = days[i]
  const date = day.getElementsByClassName('tracker__list--date-label')[0].innerHTML
  const total = day.getElementsByClassName('tracker__list--duration')[0].innerHTML
  console.log(`${date} Total: ${total}`)
  const items = day.getElementsByClassName('tracker__finished--time-entries')
  for (var j = 0; j < items.length; j++) {
    const item = items[j]
    const title = item.getElementsByClassName('tracker__time__entry--input')[0].getAttribute('title')
    const duration = item.getElementsByClassName('tracker__time__entry--duration')[0].value
    console.log(title, duration)
  }
}
