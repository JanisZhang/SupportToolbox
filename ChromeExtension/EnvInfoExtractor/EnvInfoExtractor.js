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

async function main() {
    myFunction();
}

main();

function myFunction() {
    const buttonElement = document.getElementById("clip");
    if (buttonElement) {
        buttonElement.addEventListener("click", async function (event) {
            const tabUrl = await getCurrentTab();
            console.log("Clipped tab url:", tabUrl);
            console.log(typeof tabUrl === 'string' && tabUrl.startsWith("http"));
            if (typeof tabUrl === 'string' && tabUrl.startsWith("http")) {
                navigator.clipboard.writeText(tabUrl).then(function () {
                    showSnackbar('Copied');
                }).catch(function (err) {
                    console.error('Could not copy text: ', err);
                });
            }
        });
    }
}


async function getCurrentTab() {
    if (chrome.tabs && chrome.tabs.query) {
        let queryOptions = { active: true, lastFocusedWindow: true };
        let [tab] = await chrome.tabs.query(queryOptions);
        console.log("Tab data:", tab);
        return tab ? tab.url : "No active tab";
    } else {
        throw new Error("chrome.tabs.query is not available.");
    }
}

function getUserInfo(){
    //Todo:get login username and user_id from LocalStorage

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
        document.body.removeChild(snackbar); // Remove from DOM after 3 seconds
    }, 3000); // Automatically disappears after 3 seconds
}





















