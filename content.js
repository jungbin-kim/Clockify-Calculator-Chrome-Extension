function mergeSameTaskByDay() {
  const result = []
  const days = document.getElementsByClassName('tracker__finished--list')
  for (var i = 0; i < days.length; i++) {
    const day = days[i]
    const date = day.getElementsByClassName('tracker__list--date-label')[0].innerHTML
    const total = day.getElementsByClassName('tracker__list--duration')[0].innerHTML
    // console.log(`${date} Total: ${total}`)
    const taskObjectsOnDay = {
      date,
      total,
      tasks: {}
    }
    const tasks = day.getElementsByClassName('tracker__finished--time-entries')
    for (var j = 0; j < tasks.length; j++) {
      const task = tasks[j]
      const title = task.getElementsByClassName('tracker__time__entry--input')[0].getAttribute('title')
      const duration = task.getElementsByClassName('tracker__time__entry--duration')[0].value

      if (taskObjectsOnDay.tasks[title] === undefined) {
        taskObjectsOnDay.tasks[title] = {
          durations: [duration]
        }
      } else {
        taskObjectsOnDay.tasks[title].durations.push(duration)
      }
      // console.log(title, duration)
    }
    result.push(taskObjectsOnDay)
  }
  return result
}
// Get ready to receive a command
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action == 'mergeSameTaskByDay') {
    sendResponse(mergeSameTaskByDay())
  }
})
