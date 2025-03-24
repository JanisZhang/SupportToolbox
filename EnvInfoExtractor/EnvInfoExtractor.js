/*
 * Copyright (c) 2025 JanisZhang
 *
 * This file is licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */


const style = document.createElement("style");
style.innerHTML = `
  .disabled {
    background-color: #cccccc;
    pointer-events: none; /* 禁用点击事件 */
    color: #888888;
  }
  /* 自定义 Snackbar 样式 */
  .snackbar {
    visibility: hidden;
    min-width: 120px; /* 更小的宽度 */
    background-color: #FFB81C; /* Veeva 黄色 */
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 6px 10px; /* 更小的内边距 */
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 10px; /* 更小的字体 */
    transform: translateX(-50%); /* 使用 transform 使其精确居中 */
    transition: 0.5s;
  }
  
  .snackbar.show {
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 4s;
  }

  @keyframes fadein {
    from { bottom: 0; opacity: 0; }
    to { bottom: 30px; opacity: 1; }
  }

  @keyframes fadeout {
    from { bottom: 30px; opacity: 1; }
    to { bottom: 0; opacity: 0; }
  }
`;

document.head.appendChild(style);

function main() {
    handleClipButtonClick();
}

main();

function handleClipButtonClick() {
    const buttonElement = document.getElementById("clip");
    if (buttonElement) {
        
            buttonElement.addEventListener("click", async function (event) {
            
            const{user_id, username, login_username, currentTabUrl} = await getInfoFromEnv();

            console.log("user_id: ", user_id);
            console.log("username:", username);
            console.log("login_username:", login_username);
            console.log(typeof currentTabUrl === 'string' && currentTabUrl.startsWith("http"));

            if (typeof currentTabUrl === 'string' && currentTabUrl.startsWith("http")) {
                navigator.clipboard.writeText(currentTabUrl).then(function () {
                    showSnackbar('Copied');
                }).catch(function (err) {
                    console.error('Could not copy text: ', err);
                });
            }

        });
    }
}

function getInfoFromEnv() {
    return new Promise((resolve, reject) => {

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
            if (!tabs || tabs.length === 0) {
                return reject('No active tab found');
            }

            const currentTabUrl = tabs[0].url;

            try{
                const result = await chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    function: getUserInfoFromLocalStorage
                });
    
                const {user_id, username, login_username} = result[0]?.result || '';  
                resolve({ user_id, username, login_username, currentTabUrl});
            }catch(error){
                reject(error)
            }

        });
    });
}


function getUserInfoFromLocalStorage() {
    // get user_id, login_username, username from localStorage, need storage permission
    const user_id = localStorage.getItem("ls.user_id");
    const username = localStorage.getItem("ls.username")
    const login_username = localStorage.getItem("ls.login_username")

    return {user_id, username, login_username}
}


function showSnackbar(message) {
    const snackbar = document.createElement("div");
    snackbar.className = "snackbar";
    snackbar.textContent = message;
    document.body.appendChild(snackbar); // Ensure it gets added to the page's DOM
    // Show and auto-dismiss
    setTimeout(() => {
        snackbar.classList.add("show");
    }, 100);
    setTimeout(() => {
        snackbar.classList.remove("show");
        document.body.removeChild(snackbar); // Remove from DOM after 2 seconds
    }, 2000); // Automatically disappears after 2 seconds
}


