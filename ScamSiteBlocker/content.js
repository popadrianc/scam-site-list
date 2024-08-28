// Function to create and show a custom modal dialog
function showScamWarning() {
  // Create modal elements
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');
  const modalText = document.createElement('p');
  const modalButton = document.createElement('button');

  // Style the modal
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '10000';

  modalContent.style.backgroundColor = 'red';
  modalContent.style.padding = '20px';
  modalContent.style.borderRadius = '10px';
  modalContent.style.textAlign = 'center';
	
  modalText.textContent = 'This is a scam site. Do not proceed further!';
  modalText.style.fontSize = '16px';
  modalText.style.marginBottom = '20px';
  modalText.style.textAlign = 'center';

  modalButton.style.margin = '0 auto';
  modalButton.textContent = 'Take me to a safe place';
  modalButton.style.backgroundColor = '#007BFF';
  modalButton.style.color = 'white';
  modalButton.style.border = 'none';
  modalButton.style.padding = '10px 20px';
  modalButton.style.fontSize = '16px';
  modalButton.style.cursor = 'pointer';
  modalButton.style.borderRadius = '5px';

  // Handle button click
  modalButton.addEventListener('click', function() {
    window.location.href = 'https://www.facebook.com/groups/atentieteapa';
  });

  // Append elements
  modalContent.appendChild(modalText);
  modalContent.appendChild(modalButton);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// Send a message to the background script to check if the current website is a scam site
chrome.runtime.sendMessage({ action: 'checkScamSite' }, function(response) {
  if (response && response.isScamSite) {
    // Show the custom warning message
    showScamWarning();
  }
});
