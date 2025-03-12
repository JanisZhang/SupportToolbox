console.log('11111111')


async function main() {
    myFunction();
}

main();


function myFunction(){
    const buttonElement = document.getElementById("clip");

    if(buttonElement){
        buttonElement.addEventListener("click", async function(event){
            const tabUrl = await getCurrentTab()
            console.log("Clipped tab url:", tabUrl); 
            if(typeof tabUrl === 'string' && tabUrl.startsWith("http")) {
                navigator.clipboard.writeText(tabUrl)
                .then(()=>{
                    alert("successfully copied")
                })
                .catch(()=>{
                    alert("Something went wrong")
                })
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



