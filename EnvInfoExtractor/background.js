/*
 * Copyright (c) 2025 JanisZhang
 *
 * This file is licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getProductVersion") {
    console.log('Background script processing request...');

    (async () => {
      try {
        const response = await fetch(request.url);
        const htmlText = await response.text();
        const versionMatch = htmlText.match(/Product Code: (GR\/\d+\.\d+\.\d+)/);
        
        sendResponse({
          success: true,
          data: {
            version: versionMatch ? versionMatch[1] : null,
            rawHtml: htmlText
          }
        });
      } catch (error) {
        sendResponse({
          success: false,
          error: error.message
        });
      }
    })();

    return true; 
  }
});