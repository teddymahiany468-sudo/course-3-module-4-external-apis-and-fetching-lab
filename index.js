// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
  return fetch(
    `https://api.weather.gov/alerts/active?area=${state}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather alerts.");
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      displayAlerts(data);
      return data;
    })
    .catch(errorObject => {
      console.log(errorObject.message);

      alertsDiv.innerHTML = "";
      errorDiv.textContent = errorObject.message;
      errorDiv.classList.remove("hidden");
    });
}

function displayAlerts(data) {
  alertsDiv.innerHTML = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  const alerts = data.features || [];

  const summary = document.createElement("h2");
  summary.textContent = `${data.title}: ${alerts.length}`;
  alertsDiv.appendChild(summary);

  const list = document.createElement("ul");

  alerts.forEach(alert => {
    const item = document.createElement("li");
    item.textContent =
      alert.properties.headline || "Weather alert";
    list.appendChild(item);
  });

  alertsDiv.appendChild(list);
}

if (fetchButton) {
  fetchButton.addEventListener("click", event => {
    event.preventDefault();

    const state = stateInput.value.trim().toUpperCase();

    stateInput.value = "";
    alertsDiv.innerHTML = "";
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    if (!/^[A-Z]{2}$/.test(state)) {
      errorDiv.textContent =
        "Please enter a valid two-letter state abbreviation.";
      errorDiv.classList.remove("hidden");
      return;
    }

    fetchWeatherAlerts(state);
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { fetchWeatherAlerts, displayAlerts };
}
