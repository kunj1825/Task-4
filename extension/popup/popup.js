chrome.storage.local.get(["logs"], (data) => {
  const list = document.getElementById("list");
  (data.logs || []).forEach(log => {
    const li = document.createElement("li");
    li.textContent = `${log.url} - ${Math.round(log.duration)}s`;
    list.appendChild(li);
  });
});
