/* Global Variables */

// Base URL and API Key for OpenWeatherMap API

const apiKey = ",us&appid=6882fbb0c4eeaa3a361cf060f865f70e&units=imperial";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", gen);

/* Function called by event listener */

function gen(action) {
  // get user input values
  console.log("samer");
  const newZipcode = document.getElementById("zip").value;

  weather(baseURL, newZipcode, apiKey)
    .then(function (userData) {
      console.log(userData);
      // add data to POST request
      postData("/add", { date: newDate, temp: userData.main.temp, content });
    })

    .then(function (newData) {
      // call updateUI to update browser content
      updateUI();
    });
}

/* Function to GET Web API Data*/
const weather = async (baseURL, newZipcode, apiKey) => {
  const res = await fetch(baseURL + newZipcode + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};
/* Function to POST data */

const postData = async (url = "", data = {}) => {
  const feelingscontent = document.getElementById("feelings").value;

  const req = await fetch(url, {
    method: "POST",

    credentials: "same-origin",

    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },

    body: JSON.stringify({
      date: data.date,

      temp: data.temp,

      content: feelingscontent,
    }),
  });

  try {
    const newData = await req.json();

    return newData;
  } catch (error) {
    console.log(error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");

  try {
    const allData = await request.json();

    // show icons on the page

    // update new entry values

    document.getElementById("date").innerHTML = allData.date;

    document.getElementById("temp").innerHTML = allData.temperature;

    document.getElementById("content").innerHTML = allData.user_response;
  } catch (error) {
    console.log("error", error);
  }
};
