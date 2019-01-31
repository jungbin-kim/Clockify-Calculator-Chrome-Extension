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
      //   console.log(response, _.sumBy)
      _.map(_.reverse(response), tasksOnDay => {
        Object.keys(tasksOnDay.tasks).map(taskName => {
          const durations = tasksOnDay.tasks[taskName].durations
          const totalDuration = durations.slice(1).reduce((prev, cur) => moment.duration(cur).add(prev), moment.duration(durations[0]))
          console.log(`${taskName}'s total time is: ${moment.utc(totalDuration.asMilliseconds()).format('HH:mm:ss')}`)
          return totalDuration
        })
        // 시간 합 Reference: https://medium.com/@vladbezden/how-to-calculate-total-time-using-moment-js-3cd79345056f
      })
    })
  })
}
