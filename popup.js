var jsonObject;
const downloadButton = document.getElementById("downloadButton");

async function loadLocalStorage() {
    let data = [];
    try {
        data = await browser.tabs.executeScript({
            file: "getStorage.js",
        });
    } catch (e) {
        data = [];
    }

    // This is really ugly, but it's for properly formatting data from https://shuffle-playlist.vercel.app
    // Sorry if it messes up your data
    jsonObject = JSON.stringify(data[0][0])
        .replace(String.raw`{"key":"persist:root","value":"{\n \"`, "{\"")
        .replaceAll(String.raw`\",\n \"`, "\",\"").replaceAll(String.raw`\": \"`, "\": \"")
        .replaceAll(String.raw`}\"\n}"`, String.raw`}"`)
        .replaceAll(String.raw`\\\"`, String.raw`\"`).replaceAll(String.raw`\\\"`, String.raw`\"`);
}

function downloadObjectAsJson(exportObj, exportName){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportObj);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

downloadButton.addEventListener("click", () => {
    downloadObjectAsJson(jsonObject, "LocalStorage");
});

// init
document.addEventListener("DOMContentLoaded", loadLocalStorage);