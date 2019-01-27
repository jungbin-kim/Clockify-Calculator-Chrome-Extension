// 로딩된 페이지를 대상으로 스크립트 실행하기 위함.
chrome.tabs.executeScript(null, {
  // code:'var bodyText = document.querySelector("body").innerText;alert(bodyText);', // 코드를 string 리터럴로 실행
  file: 'content.js' // 코드를 자바스크립트 파일로 실행
})
