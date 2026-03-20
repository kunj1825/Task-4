let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (info) => {
  if (activeTab) {
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    const url = (await chrome.tabs.get(activeTab)).url;
    saveTime(url, duration);
  }
  activeTab = info.tabId;
  startTime = Date.now();
});

function saveTime(url, duration) {
  const log = { url, duration, date: new Date() };
  
  // Save locally
  chrome.storage.local.get(["logs"], (data) => {
    const logs = data.logs || [];
    logs.push(log);
    chrome.storage.local.set({ logs });
  });

  // Send to backend
  fetch("http://localhost:5000/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log)
  }).catch(err => console.error("Backend error:", err));
}

