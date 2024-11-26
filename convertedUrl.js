console.log("This is a popup!");

// 创建并插入 .disabled 样式到页面中
const style = document.createElement("style");
style.innerHTML = `
  .disabled {
    background-color: #cccccc;
    pointer-events: none; /* 禁用点击事件 */
    color: #888888;
  }
`;
document.head.appendChild(style);

// 获取当前标签页的 URL
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (tabs && tabs.length > 0) {
    const currentUrl = tabs[0].url;
    console.log("Current URL:", currentUrl); // 输出 URL 到控制台

    // 公司信息：每个公司域名和对应的 ID
    const companies = [
      { id: 'abbvie', domain: 'https://abbvie.veevasfa.com' },
      { id: 'ascentage', domain: 'https://allist.veevasfa.com' },
      { id: 'aspen', domain: 'https://aspenpharma.veevasfa.com' },
      { id: 'bms', domain: 'https://bms.veevasfa.com' },
      { id: 'beigene', domain: 'https://beigene.veevasfa.com' },
      { id: 'eddingpharm', domain: 'https://edding.veevasfa.com' },
      { id: 'hrs', domain: 'https://hrs.veevasfa.com' },
      { id: 'innocare', domain: 'https://innocarepharma.veevasfa.com' },
      { id: 'innoventbio', domain: 'https://innoventbio.veevasfa.com' },
      { id: 'j_j', domain: 'https://iconnect.veevasfa.com' },
      { id: 'kenvue', domain: 'https://kevuechina.veevasfa.com' },
      { id: 'loreal', domain: 'https://lorealchina.veevasfa.com' },
      { id: 'msd', domain: 'https://msdchina.veevasfa.com' },
      { id: 'merck', domain: 'https://mconnect.veevasfa.com' },
      { id: 'mundi', domain: 'https://mundipharma.veevasfa.com' },
      { id: 'novo_nordisk', domain: 'https://novoevents.veevasfa.com' },
      { id: 'sansheng', domain: 'https://3sbio.veevasfa.com' },
      { id: 'sinocelltech', domain: 'https://sinocelltech.veevasfa.com' }
    ];

    // 检查 URL 是否包含 '/admindoc/'
    if (currentUrl.includes('/admindoc/') ) {
      // 提取路径部分（去除基地址部分）
      const baseUrl = currentUrl.split('/admindoc/')[1]; // 获取 '/admindoc/' 后面的部分
      console.log("Base URL after '/admindoc/':", baseUrl);

      // 循环遍历每个公司，生成对应的 URL
      companies.forEach(function(company) {
        const companyUrl = `${company.domain}/#/helpcenter?iframeRoute=/admindoc/${baseUrl}`;
        console.log(`${company.id} URL:`, companyUrl);

        // 更新对应的 <a> 标签
        const urlElement = document.getElementById(company.id);
        if (urlElement) {
          urlElement.textContent = `${company.id} OnlineHelp`;
          urlElement.href = companyUrl;

          // 添加点击事件：点击链接后将其复制到剪贴板
          urlElement.addEventListener('click', function() {
            navigator.clipboard.writeText(companyUrl).then(function() {
              alert(`${company.id} URL copied to clipboard!`);
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
          urlElement.classList.add('disabled'); // 添加禁用样式
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
