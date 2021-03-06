// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

/**
 * Adds a random quote to the page.
 */
function addRandomQuote() {
  const quotes =
      ["I'll make him an offer he can't refuse", 
      "Great men are not born great, they grow great . . .", 
      "A friend should always underestimate your virtues and an enemy overestimate your faults", 
      "A man who doesn't spend time with his family can never be a real man"];

  // Pick a random quote.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}


function getDataContentArrowFunctions() {
  fetch('/data').then(response => response.text()).then((data) => {
    document.getElementById('data-container').innerText = data;
  });
}

function getJsonData() {
    fetch('/data')
    .then(response => response.json())
    .then((myObject) => {
        const jsonDataListElement = document.getElementById('json-data-container');
        jsonDataListElement.innerHTML = '';    
        for (var i = 0; i < myObject.length; i++) {
            var message = myObject[i];
            jsonDataListElement.appendChild(createListElement(message));
        }
    });
}
function manageCommentSection() {
  var commentForm = document.getElementById("comment-form");
  var loginUrl = document.getElementById("log-in-url");
  var logoutUrl = document.getElementById("log-out-url");
  fetch('/log-in-status')
  .then(response => response.json())
  .then((statusString) => {
      if (statusString === "OK") {
          commentForm.style.display = "block";
          loginUrl.style.display = "none";
          logoutUrl.style.display = "block";
      } else {  
          commentForm.style.display = "none";
          loginUrl.style.display = "block";
          logoutUrl.style.display = "none";
      }
  });
}
function getComments() {
    manageCommentSection();

    fetch('/data')
    .then(response => response.json())
    .then((myObject) => {
        const jsonDataListElement = document.getElementById('comments-container');
        jsonDataListElement.innerHTML = '';

        for (var i = 0; i < myObject.length; i++) {
            var message = myObject[i];
            jsonDataListElement.appendChild(createListElement(message));
        }
    });
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}