import { map, reverse } from 'lodash-es'
import moment from 'moment'

document.querySelector('#test').addEventListener('click', onclickCalculatorBtn)

// 로딩된 페이지를 대상으로 스크립트 실행하기 위함.
chrome.tabs.executeScript(
  null,
  {
    // 코드를 string 리터럴로 실행
    // code:'var bodyText = document.querySelector("body").innerText;alert(bodyText);',
    // 코드를 자바스크립트 파일로 실행
    file: 'content.js'
  },
  result => {
    // CallBack after file executed
    // console.log(result)
  }
)

function onclickCalculatorBtn() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'mergeSameTaskByDay' }, function(response) {
      // Init Container
      const resultContainer = document.querySelector('.result')
      resultContainer.innerHTML = ''

      map(reverse(response), tasksOnDay => {
        const tasksOnDayContainerUI = TaskUIManager.createDay(tasksOnDay.date, tasksOnDay.total)

        const tasks = Object.keys(tasksOnDay.tasks).map(taskName => {
          const durations = tasksOnDay.tasks[taskName].durations
          // 시간 합 Reference: https://medium.com/@vladbezden/how-to-calculate-total-time-using-moment-js-3cd79345056f
          const totalDuration = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(durations[0]))
          const formatedTotalDuration = moment.utc(totalDuration.asMilliseconds()).format('HH:mm:ss')
          console.log(`${taskName}'s total time is: ${moment.utc(totalDuration.asMilliseconds()).format('HH:mm:ss')}`)

          const taskUI = TaskUIManager.createTask(taskName, formatedTotalDuration)
          tasksOnDayContainerUI.querySelector('ul').appendChild(taskUI)
          return {
            taskName,
            duration: formatedTotalDuration
          }
        })

        resultContainer.appendChild(tasksOnDayContainerUI)
        return {
          date: tasksOnDay.date,
          total: tasksOnDay.total,
          tasks
        }
      })
    })
  })
}

class TaskUIManager {
  static createDay(date, total) {
    const wrapper = document.createElement('div')
    const h2 = document.createElement('h2')
    h2.appendChild(document.createTextNode(`Total ${total} on ${date}`))
    const ul = document.createElement('ul')
    wrapper.appendChild(h2)
    wrapper.appendChild(ul)
    return wrapper
  }

  static createTask(taskName, duration) {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(`${taskName} ${duration}`))
    return li
  }
}
