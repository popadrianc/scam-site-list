const githubApiUrl = 'https://raw.githubusercontent.com/popadrianc/scam-site-list/main/scam-sites.json';

let scamSites = [];

// Function to fetch the scam sites list from GitHub API
async function updateScamSites() {
  try {
    const response = await fetch(githubApiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch scam sites: ' + response.statusText);
    }
    scamSites = await response.json();
  } catch (error) {
    console.error('Failed to fetch scam sites:', error);
  }
}

// Initial fetch
updateScamSites();

// Update scam sites every hour
setInterval(updateScamSites, 3600000);

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'checkScamSite') {
    const url = new URL(sender.tab.url);
    const isScamSite = scamSites.includes(url.hostname);
    sendResponse({ isScamSite });
  }
});
