/*
 * Copyright (c) 2025 JanisZhang
 *
 * This file is licensed under the MIT License.
 * See the LICENSE file in the project root for full license information.
 */


console.log("This is a popup!");

// 创建并插入 .disabled 样式到页面中
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
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 17px;
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

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (tabs && tabs.length > 0) {
    const currentUrl = tabs[0].url;
    console.log("Current URL:", currentUrl);

    const companies = [
      { id: 'abbvie', domain: 'https://abbvie.veevasfa.com' },
      { id: 'ascentage', domain: 'https://allist.veevasfa.com' },
      { id: 'aspen', domain: 'https://aspenpharma.veevasfa.com' },
      { id: 'bms', domain: 'https://bms.veevasfa.com' },
      { id: 'beigene', domain: 'https://beigene.veevasfa.com' },
      { id: 'eddingpharm', domain: 'https://edding.veevasfa.com' },
      { id: 'innocare', domain: 'https://innocarepharma.veevasfa.com' },
      { id: 'innoventbio', domain: 'https://innoventbio.veevasfa.com' },
      { id: 'j_j', domain: 'https://iconnect.veevasfa.com' },
      { id: 'kenvue', domain: 'https://kevuechina.veevasfa.com' },
      { id: 'loreal', domain: 'https://lorealchina.veevasfa.com' },
      { id: 'msd', domain: 'https://msdchina.veevasfa.com' },
      { id: 'merck', domain: 'https://mconnect.veevasfa.com' },
      { id: 'mundi', domain: 'https://mundipharma.veevasfa.com' },
      { id: 'novo_nordisk', domain: 'https://novoevents.veevasfa.com' },
      { id: 'sansheng', domain: 'https://3sbio.veevasfa.com' }
    ];

    const companyTextMap = {
      'abbvie': 'AbbVie',
      'ascentage': 'Ascentage Pharma',
      'aspen': 'Aspen Pharma',
      'bms': 'BMS',
      'beigene': 'BeiGene',
      'eddingpharm': 'EddingPharm',
      'innocare': 'InnoCare',
      'innoventbio': 'Innovent Bio',
      'j_j': 'Johnson & Johnson',
      'kenvue': 'Kenvue',
      'loreal': 'L’Oreal',
      'msd': 'MSD Pharma',
      'merck': 'Merck',
      'mundi': 'Mundipharma',
      'novo_nordisk': 'Novo Nordisk',
      'sansheng': 'Sansheng',
    };

    if (currentUrl.includes('/admindoc/') || currentUrl.includes('/public-api/')) {
      const baseUrl = currentUrl.split('/admindoc/')[1] || currentUrl.split('/public-api/')[1];
      console.log("Base URL after splitting:", baseUrl);

      companies.forEach(function(company) {
        const companyUrl = `${company.domain}${currentUrl.includes('/admindoc/') ? '/#/helpcenter?iframeRoute=' : '/public-api/'}${baseUrl}`;
        console.log(`${company.id} URL:`, companyUrl);

        const urlElement = document.getElementById(company.id);
        if (urlElement) {
          const linkText = companyTextMap[company.id] || `${company.id} Online Help`;
          urlElement.textContent = linkText;
          urlElement.href = companyUrl;

          urlElement.addEventListener('click', function(event) {
            event.preventDefault();
            navigator.clipboard.writeText(companyUrl).then(function() {
              showSnackbar(`${companyTextMap[company.id]} URL copied to clipboard!`);
            }).catch(function(err) {
              console.error('Could not copy text: ', err);
            });
          });
        }
      });
    } else {
      // 如果当前 URL 不符合条件，禁用所有链接并设置错误提示
      companies.forEach(function(company) {
        const urlElement = document.getElementById(company.id);
        if (urlElement) {
          urlElement.textContent = "URL does not match criteria!";
          urlElement.href = "#"; // 禁用链接
          urlElement.classList.add('disabled'); // 禁用样式
        }
      });
    }
  } else {
    console.log("No active tab found!");
    // 如果没有获取到当前标签页的信息，则更新所有链接
    companies.forEach(function(company) {
      const urlElement = document.getElementById(company.id);
      if (urlElement) {
        urlElement.textContent = "No active tab found!";
        urlElement.href = "#"; // 禁用链接
        urlElement.classList.add('disabled'); // 添加禁用样式
      }
    });
  }
});

// 显示 Snackbar
function showSnackbar(message) {
  const snackbar = document.createElement("div");
  snackbar.className = "snackbar";
  snackbar.textContent = message;
  document.body.appendChild(snackbar);
  // 显示并自动消失
  setTimeout(() => {
    snackbar.classList.add("show");
  }, 100);
  setTimeout(() => {
    snackbar.classList.remove("show");
    document.body.removeChild(snackbar);
  }, 5000); // 5秒后自动消失
}
