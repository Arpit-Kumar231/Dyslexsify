// console.log("Arpit is back");
let lastURL = window.location.href; // Store the last URL for comparison

function sendDataToServer(text) {
  fetch("http://localhost:8000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data successfully sent to the server", data);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

// Function to check URL change
function checkURLChange() {
  const currentURL = window.location.href;
  if (currentURL !== lastURL) {
    lastURL = currentURL; // Update the last URL
    const allText = document.body.textContent; // Grab all text on the new page/current state
    sendDataToServer(allText); // Send data to the server
  }
}

// Send initial data
sendDataToServer(document.body.textContent);

// Periodically check for URL change - adjust interval as needed
setInterval(checkURLChange, 1000); // Check every second
