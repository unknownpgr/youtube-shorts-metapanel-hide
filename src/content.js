(function () {
  const TARGET_URLS = ["www.youtube.com"];
  const TARGET_CLASS = "ytReelMetapanelViewModelHost";
  const ENABLED_STORAGE_KEY = "yt-ext-enabled";

  const isTargetUrl = () => {
    return TARGET_URLS.some((url) => window.location.hostname.includes(url));
  };

  if (!isTargetUrl()) return;

  let isEnabled = null;

  const getIsEnabled = () => {
    if (isEnabled !== null) return isEnabled;
    const stored = localStorage.getItem(ENABLED_STORAGE_KEY);
    return (isEnabled = stored === "true");
  };

  const setIsEnabled = (newIsEnabled) => {
    isEnabled = newIsEnabled;
    localStorage.setItem(ENABLED_STORAGE_KEY, newIsEnabled ? "true" : "false");
    updateToggleUI();
  };

  setInterval(() => {
    const elements = document.getElementsByClassName(TARGET_CLASS);
    if (getIsEnabled()) {
      for (let el of elements) el.style.display = "none";
    } else {
      for (let el of elements) el.style.display = "flex";
    }
  }, 100);

  // Create modern YouTube-style toggle UI
  const toggleParent = document.createElement("div");
  toggleParent.style.position = "fixed";
  toggleParent.style.bottom = "20px";
  toggleParent.style.left = "20px";
  toggleParent.style.zIndex = "10000";
  toggleParent.style.backgroundColor = "rgba(28, 28, 28, 0.95)";
  toggleParent.style.padding = "8px 12px";
  toggleParent.style.borderRadius = "6px";
  toggleParent.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  toggleParent.style.backdropFilter = "blur(10px)";
  toggleParent.style.border = "1px solid rgba(255, 255, 255, 0.1)";
  toggleParent.style.fontFamily = "'Roboto', 'Arial', sans-serif";
  toggleParent.style.fontSize = "12px";
  toggleParent.style.color = "#ffffff";
  toggleParent.style.display = "flex";
  toggleParent.style.alignItems = "center";
  toggleParent.style.gap = "8px";
  toggleParent.style.transition = "all 0.2s ease";

  // Label
  const label = document.createElement("span");
  label.textContent = "Hide";
  label.style.fontWeight = "500";
  label.style.whiteSpace = "nowrap";

  // Toggle container
  const toggleContainer = document.createElement("div");
  toggleContainer.style.position = "relative";
  toggleContainer.style.width = "36px";
  toggleContainer.style.height = "20px";
  toggleContainer.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  toggleContainer.style.borderRadius = "10px";
  toggleContainer.style.cursor = "pointer";
  toggleContainer.style.transition = "background-color 0.3s ease";
  toggleContainer.style.display = "flex";
  toggleContainer.style.alignItems = "center";
  toggleContainer.style.padding = "2px";

  // Toggle switch
  const toggleSwitch = document.createElement("div");
  toggleSwitch.style.width = "16px";
  toggleSwitch.style.height = "16px";
  toggleSwitch.style.backgroundColor = "#ffffff";
  toggleSwitch.style.borderRadius = "50%";
  toggleSwitch.style.transition =
    "transform 0.3s ease, background-color 0.3s ease";
  toggleSwitch.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";

  const updateToggleUI = () => {
    const enabled = getIsEnabled();
    if (enabled) {
      toggleContainer.style.backgroundColor = "#ff0000";
      toggleSwitch.style.transform = "translateX(16px)";
      toggleSwitch.style.backgroundColor = "#ffffff";
    } else {
      toggleContainer.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
      toggleSwitch.style.transform = "translateX(0px)";
      toggleSwitch.style.backgroundColor = "#ffffff";
    }
  };

  toggleContainer.addEventListener("click", () => {
    setIsEnabled(!getIsEnabled());
  });

  toggleContainer.appendChild(toggleSwitch);
  toggleParent.appendChild(label);
  toggleParent.appendChild(toggleContainer);
  document.body.appendChild(toggleParent);

  // Initialize toggle state
  updateToggleUI();
})();
