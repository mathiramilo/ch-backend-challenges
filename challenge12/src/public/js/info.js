// API endpoint
const API_URL = `${API_BASE_URL}/info`

// Select the necessary elements from the DOM
const id_dd = document.getElementById('process-id')
const dir_dd = document.getElementById('project-dir')
const execPath_dd = document.getElementById('exec-path')
const os_dd = document.getElementById('os')
const version_dd = document.getElementById('version')
const rss_dd = document.getElementById('rss')
const arguments_ul = document.getElementById('arguments')

getProcessInfo()

async function getProcessInfo() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    const processInfo = data.data

    id_dd.innerText = processInfo.id
    dir_dd.innerText = processInfo.dir
    execPath_dd.innerText = processInfo.execPath
    os_dd.innerText = processInfo.os
    version_dd.innerText = processInfo.version
    rss_dd.innerText = processInfo.rss
    arguments_ul.innerHTML = renderArguments(processInfo.args)
  } catch (err) {
    console.log(err)
  }
}

function renderArguments(args) {
  let html = ''
  for (let i = 0; i < args.length; i++) {
    html += `
      <li
        class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
      >
        <div class="flex w-0 flex-1 items-center">
        <span class="ml-2 w-0 flex-1 truncate"
          >${args[i]}</span
        >
        </div>
      </li>
    `
  }
  return html
}
