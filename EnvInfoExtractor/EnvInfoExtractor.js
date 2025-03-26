/*
 * Copyright (c) 2025 JanisZhang
 *
 * This file is licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */


const style = document.createElement("style");
style.innerHTML = `
    
/* Remove default margin and padding from body */
body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center; /* Center content horizontally */
    align-items: flex-start; /* Align content to the top */
    height: 100vh; /* Full height of the viewport */
    min-height: 100%; /* Ensure the body covers at least the full height */
}

/* Plugin container styling */
.plugin-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 0; /* Remove margin to avoid extra space around the container */
    font-family: Arial, sans-serif;
    width: 100%; /* Ensure it takes up available width */
    box-sizing: border-box; /* Include padding in total width calculation */
}

/* Paragraph styling */
.plugin-text {
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    margin: 8px 0;
    padding: 0;
}

/* Button styling */
.clip-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 15px; /* Add margin above button */
}

/* Button hover effect */
.clip-button:hover {
    background-color: #45a049;
}

/* Button focus effect */
.clip-button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 128, 0, 0.6);
}


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
    displayPluginContent();
    // handleClipButtonClick();
}

main();

async function displayPluginContent() {
    const{user_id, username, displayUsername, currentTabUrl} = await getInfoFromEnv();

    // const formattedUrl = currentTabUrl.split('.com')[0]+'.com';
    const formattedUrl = currentTabUrl.split(/\.com|\.cn/)[0] + (currentTabUrl.includes('.cn') ? '.cn' : '.com');


    console.log("user_id: ", user_id);
    console.log("username:", username);
    console.log("displayUsername:", displayUsername);
    console.log("currentTabUrl:", currentTabUrl);
    console.log("formattedUrl:", formattedUrl);

    // const formatted_Login_username = login_username.replace('\"\g','');

    const pluginContent = `
    <div class="plugin-container">
        <p class="plugin-text">环境：${formattedUrl}</p>
        <p class="plugin-text">账号：${displayUsername} ${user_id === null?'': '(user_id='+ user_id +')'} ${username === null? '':', 姓名: ' +username} </p>
        <p class="plugin-text">步骤：${currentTabUrl}</p>
        <button id="clip" class="clip-button">Copy Link</button>
    </div>`;

    const container = document.createElement("div");
    container.innerHTML = pluginContent;
    document.body.appendChild(container);

    setTimeout(()=> {
        const buttonElement = document.getElementById("clip");
        if (buttonElement) {
            
                buttonElement.addEventListener("click", async function (event) {
                
                const{currentTabUrl} = await getInfoFromEnv();
    
                if (typeof currentTabUrl === 'string' && currentTabUrl.startsWith("http")) {

                    const environment = `环境：${currentTabUrl.split('.com')[0] + '.com'}`;
                    const accountInfo = `账号：${displayUsername}  ${user_id === null?'': '(user_id='+ user_id +')'} ${username === null? '':', 姓名: ' +username} `;
                    const steps = `步骤：${currentTabUrl}`;
                    const textToCopy = `${environment}\n${accountInfo}\n${steps}`;
 
                    navigator.clipboard.writeText(textToCopy).then(function () {
                        showSnackbar('Copied');
                    }).catch(function (err) {
                        console.error('Could not copy text: ', err);
                    });
                }
    
            });
        }
    },0);
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
    
                const {user_id, username, displayUsername} = result[0]?.result || '';  
                resolve({ user_id, username, displayUsername, currentTabUrl});
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
    const login_username_mobile = localStorage.getItem("ls.loginUserName")
    const sfa_admin_user = localStorage.getItem("sfa_admin_user")

    let displayUsername = ''

    if(sfa_admin_user) {
        displayUsername = JSON.parse(localStorage.getItem("sfa_admin_user")).username

        return {user_id, username, displayUsername}  
    }
    
    displayUsername = login_username === null? login_username_mobile:login_username;

    return {user_id, username, displayUsername}
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
    }, 800); // Automatically disappears after 2 seconds
}

