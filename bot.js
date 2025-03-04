document.addEventListener('DOMContentLoaded', function () {
    // Create a div element
const chatbotContainer = document.createElement('div');
chatbotContainer.id = 'chatbot-container'; // Set the ID

// Append the container to the body or any other element
document.body.appendChild(chatbotContainer);
    const scriptTag = document.querySelector('script[src*="bot.js"]'); // Select the script tag
    
    // Get the attribute values
    const botName = scriptTag.getAttribute('chatbotName');
    const userName = scriptTag.getAttribute('user');

    
    const botHtmlContent = `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <style>
    /* Define the Muli Light font */
    @import url('https://fonts.googleapis.com/css2?family=Muli:wght@300&display=swap');
    
    /* Apply the font to the body or a specific selector */
    body {
        font-family: 'Muli', sans-serif;
    }
    @media only screen and (max-width: 600px) {

.container-chat{
  height:430px;
  width:300px;
}
.chat{
  height:70%;
  width:95%;
}
#toggle-chatbot {
  height:2px;
}
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .container-chat{
      height:450px;
      width:300px;
    }
    .chat{
      height:71%;
      width:100%;
    }
    #toggle-chatbot {
      height:2px;
    }
}
/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .container-chat{
      height:500px;
      width:350px;
    }
    .chat{
      height:73%;
      width:100%;
    }
} 
#toggle-chatbot {
background-color: #008080;
color: #fff;
height: 70px;
width: 70px;
border-radius: 50%;
font-size: 20px;
border: none;
cursor: pointer;
outline: none;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;
position: fixed;
bottom: 20px;
right: 20px;
z-index: 999;
}
#toggle-chatbot.pulse {
animation: pulse 1.5s infinite; /* Pulsating animation */
}
@keyframes pulse {
0% {
    transform: scale(1);
}
50% {
    transform: scale(1.1);
}
100% {
    transform: scale(1);
}
}

#toggle-chatbot::before {
content: 'SOP';
font-size: 24px;
}
.container-chat {
border: 1px solid #ccc;
border-radius: 5px;
overflow-y: hidden;
overflow-x: hidden;
position: fixed;
bottom: 50px;
right: 50px;
padding: 13px;
margin: 10px;
display: none;
background-color: #d4ebe7;
height: 500px;
z-index: 1000; 
width:350px;
box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}
button {
    margin: 0;
    padding: 0;
}
section.bot{
    height: 90%;
}
label{
    margin-top: 0%;
}
.chat{
    overflow-y: auto;
    border: 1px solid #8ac2b9;
    padding: 1rem;
    overflow-y: scroll;
    padding-bottom: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
    height:73%;
    width:100%;
    background-color: white;
    /* border-color:  #8ac2b9; */

}
.chat::-webkit-scrollbar{
     display: none;
}
.cat-gory{
    border: 1px solid   #d4ebe7;
    padding-bottom: 5px;
    height: 80%;
    max-height: 50px;
    width: 80%;
    overflow-x: hidden;
    white-space: nowrap;
    overflow-y: hidden;
    float: left;
    background-color: #d4ebe7;
}
.cat-gory {
border: 1px solid #d4ebe7;
padding-bottom: 5px;
height: 80%;
max-height: 50px;
width: 80%;
overflow-x: hidden;
white-space: nowrap;
overflow-y: hidden;
float: left;
background-color: #d4ebe7;
}

.cat-gory button {
background-color: rgb(229, 216, 173);
border-width: 1px;
border-color: white;
color: black;
width: auto;
border-radius: 5px;
margin-top: 0px;
margin-right: 5px;
padding: 4px;
transition: box-shadow 0.3s ease;
}
.category-content{
    width: 100%;
    height: 8%;
    overflow: hidden;
    white-space: nowrap;
    margin: 0px;
}
.category-content .scroll-right-button{
    float: left;
    height: 75%; 
    margin-bottom: 5px;
    width: 7%;
    border-color:  #8ac2b9;
   
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: large;
    background-color: #d4ebe7;
}
.category-content .scroll-left-button{
    float: left;
    height: 75%; 
    width: 7%;
    border-color:  #8ac2b9;
    /* background-color: white;
    border-color: white; */
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    font-size: large;
    background-color: #d4ebe7;
    /* font:black; */
}
.bot-name{
    background-color: #008080;
    padding: 5px;
    margin: 5px;
    text-align: center;
    color: white;
}  
.feedback-div {
background-color: #008080;
color: #ddd;
margin-top: 3px;
float: left;
clear: both;
border-radius: 5px;
height: 50px; 
width: auto;
animation: slideUpAndRight 0.167s cubic-bezier(.4,0,.2,0.5);
}
.feedback-div>button {
    background-color: #ddd;
border: none;
color: black;
padding: 8px 16px; 
text-align: center;
text-decoration: none;
display: inline-block;
margin: 8px 4px;
cursor: pointer;
border-radius: 16px;
transition: background-color 0.3s ease;

/* Hover effect */
:hover {
background-color: #c0c0c0;
}
}
.star-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
    background-color: #008080;
    color: black;
    margin-top: 3px;
    float:left;
    clear: both;
    border-radius: 5px;
}
.star {
    font-size: 24px;
    cursor: pointer;
}
.star.selected {
    color: gold; 
}
.thankmessage{
    display: flex;
    align-items: center;
    background-color: #008080;
    border-width: 1px;
    color:white;
    margin-top: 3px;
    margin-right: 30%;
    float: left;
    clear: both;
    padding: 5px 10px;
    border-radius: 10px;
    margin: 10px 0; 
    animation: slideUpAndRight 0.167s cubic-bezier(.4,0,.2,0.5);

}
.submit_feedback{
   background-color: #3dc553;
   color: black;
   clear: both;
   border-radius: 5px;
   height: 40px;
   width: 60px;
}
#emoji-options {
    display: flex;
    justify-content: center;
    margin-top:10px;
    margin-bottom: 15px; 
    max-height: 30px;
}
.emoji-options span {
     font-size: 24px;
     cursor: pointer;
     margin: 0 5px;
}
.initial-greeting {
    background-color:#008080;
    border-color: black;
    border-width: 1px;
    color: white;
    margin-top: 3px;
    margin-right: 30%;
    float: left;
    clear: both;
    padding: 5px 10px; 
    border-radius: 10px;
    margin: 10px 0; 
}
.response-message {
    background-color: #008080;
    border-color: black;
    border-width: 1px;
    color: white;
    margin-top: 3px;
    float: left;
    clear: both;
    padding: 5px 10px; 
    border-radius: 10px;
    margin: 10px 0; 
}
.user-input {
    display: flex;
    align-items: center;
    width: 100%;
}
#send-button {
background-color: #008080;
color: white;
border: none;
padding: 10px 15px;
border-radius: 5px;
margin-left: 10px;
cursor: pointer;
outline: none;
}
#send-button:hover {
background-color: #005555;
}
#user-message {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.chat-message.user-message {
    background-color: #f0f0f0;
    color: black;
    margin-top: 3px;
    margin-left: 30%;
    float: right;
    clear: both;
}
  
@keyframes slideUp {
from {
transform: translateX(44px);
}
to {
transform: none;
}
}
/* @keyframes slideUpAndLeft {
from {
transform: translateX(100px) translateY(-44px);
}
to {
transform: none;
}
} */

@keyframes slideUpAndRight {
from {
transform: translateX(-100px) translateY(44px);
}
to {
transform: none;
}
}
.chat-message.response-message{
    background-color: #008080;
    border-color: black;
    border-width: 1px;
    color:white;
    margin-top: 3px;
    margin-right: 30%;
    float: left;
    clear: both;
}
.chat-message {
    background-color: #a3c3e4; 
    padding: 5px 10px;
    border-radius: 10px;
    margin: 10px 0;
}
.dropdown-content {
    display: none;
    background-color: #f9f9f9;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    max-height: 200px;
    overflow-y: auto;
    position: absolute; 
    bottom: calc(10%);
}
.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;   
}
.dropdown-content a:hover {
    background-color: #f1f1f1;
}
.SubCategoryDiv{
    position: absolute;
    top: 200px;
    left: 50px;
    /* left: 50%; */
    transform: translateX(-23%);
    transform: translateY(-40%);
    /* max-height: 15%;
    height: 7%;
    width: 75%;  */
    border: #008080;
    border-radius: 5px;
    background-color: #d9e8f7;
    display: none;
    z-index: 1000;
    cursor: grab;
    overflow-x: hidden;
    overflow-y: hidden;
    height: auto;
    width: fit-content;
}
.subcategorybutton{
    margin: 5px;
    padding: 5px;
    background-color: #008080;
    border-radius: 4px;
    font-weight: bold;    
}
.closesubcategorydiv{
    margin: 3px;
    padding: 3px;
    background-color: #bac5e4;
    /* border-radius: 7px; */
    float: right;
    height: auto;
    width: fit-content;
    font-size: 10px; 
}
.quebutton{
    height: auto;
    width: fit-content;
    background-color: #008080;
    margin-top: 3px;
    margin-left: 10%;
    float: left;
    clear: both;
    border-radius: 5px;
    padding: 2px;
}
.quediv {
border: rgb(214, 227, 241);
border-radius: 5px;
background-color: #8ab5df;
overflow-x: hidden;
overflow-y: hidden;
margin-top: 35px; 
padding: 10px; 
/* display: inline-block;  */
float: left;
width: fit-content;
}
.feedback-div{
    margin-bottom: 50px;
}
</style>
    <div id="notification-banner"></div>

    <button id="toggle-chatbot"></button>

    <div class="container-chat" id="draggable-chatbot">
    <div class="bot-name"><b></b></div>

                <div class='category-content'>
                    <button id="scroll-left-button" class="scroll-left-button">&#9664;</button>
                    <div class="cat-gory" id="cat-gory">
                </div>
                <button id="scroll-right-button" class="scroll-right-button">&#9654;</button>
            </div>
                <div class="chat" id="chat" user="{{userName}}" data-chatbot="{{ botName }}">
                    
                </div>
                <div class="emoji-options" id="emoji-options">
                </div>
          
                <div class="user-input">
                <input type="text" id="user-message" placeholder="Enter a question...">
                <div class="dropdown-content" id="dropdown-content"></div>
                <button id="send-button">Send</button>
            </div>
        </div>
    </div>
    `;
    chatbotContainer.innerHTML = botHtmlContent;
    const botNameElement = document.querySelector('.bot-name b');
    botNameElement.innerHTML = botName;
    // Chatbox DOM elements
        const chatbot = document.getElementById('draggable-chatbot');
        const toggleButton = document.getElementById('toggle-chatbot');
        const notificationBanner = document.getElementById('notification-banner');

    // Function to start pulsating animation
    function startPulsating() {
        toggleButton.classList.add('pulse');
    }
    
    // Function to stop pulsating animation
    function stopPulsating() {
        toggleButton.classList.remove('pulse');
    }

    // Toggle chatbot visibility
    toggleButton.addEventListener('click', () => {
        // Toggle chatbot visibility
        if (chatbot.style.display === 'none' || chatbot.style.display === '') {
            chatbot.style.display = 'block';
            stopPulsating(); // Stop pulsating when chatbot is opened
        } else {
            chatbot.style.display = 'none';
            startPulsating(); // Start pulsating when chatbot is closed
        }
    
        // Handle initial toggle actions
        if (isFirstToggle) {
            handleFirstToggle();
            isFirstToggle = false; // Set the flag to false after the first toggle
        }
    });
    
    // Initial pulsating when the page loads
    startPulsating();

    const scrollLeftButton = document.getElementById('scroll-left-button');
    const scrollRightButton = document.getElementById('scroll-right-button');

    scrollLeftButton.addEventListener('click', () => {
        catGory.scrollBy({
            top: 0,
            left: -100, // Adjust the scroll amount as needed
            behavior: 'smooth'
        });
    });
    // Function to scroll the category content to the right
    scrollRightButton.addEventListener('click', () => {
        catGory.scrollBy({
            top: 0,
            left: 100, // Adjust the scroll amount as needed
            behavior: 'smooth'
        });
    });
            let isFirstToggle = true; // Flag to check if it's the first toggle

            // Function to append messages
            function appendMessage(sender, message, isUserOption = false, messageClass = '') {
                const chat = document.getElementById('chat');
                const messageContainer = document.createElement('div');
                // Add classes based on conditions
                if (isUserOption) {
                    messageContainer.classList.add('user-option');
                } else {
                    messageContainer.classList.add('message');
                }
                // Add additional class if provided
                if (messageClass !== '') {
                    messageContainer.classList.add(messageClass);
                }
                // Set innerHTML content
                messageContainer.innerHTML = `<span class="sender">${sender}</span> ${message}`;

                // Append the message container to the chat
                chat.appendChild(messageContainer);

                // Auto-scroll to the bottom
                chat.scrollTop = chat.scrollHeight;
            }
            // Function to handle initial greeting and emoji selection
            function handleFirstToggle() {
                if (isFirstToggle) {
                    // Display initial greeting and emoji options
                    appendMessage('', 'Hi! How are you feeling today?', false, 'initial-greeting');
                    appendEmojiOptions();
                    isFirstToggle = false;
                }
            }

            // Function to capture actor details
            //function askActorDetails() {
            //        appendMessage('', 'What is your employee ID', false, 'initial-greeting');
            //        appendEmojiOptions();
            //}
            
            // Trigger handleFirstToggle on page load
            window.onload = function () {
                handleFirstToggle();
            };

            // Function to handle emoji selection
            function handleEmojiSelection(emoji) {
                // Handle user's emoji selection
                if(emoji=='⏩'){
                    appendMessage('','', false);
                }
                else{
                    appendMessage('', emoji, false);
                }
                // Provide appropriate bot response based on the selected emoji
                let botResponse;
                switch (emoji) {
                    case '☹️':
                        botResponse = 'I understand. Please let me know how I can help you.';
                        break;
                    case '🙂':
                        botResponse = 'I understand. Is there something that you would like me to help you with?';
                        break;
                    case '😄':
                        botResponse = 'That\'s great to hear!  What can I do for you today?';
                        break;
                    default:
                        botResponse = 'How may I assist you today?';
                }
                // Display bot's response
                setTimeout(() => {
                    appendMessage('', botResponse, false, 'response-message');
                }, 1000);            
                // Hide emoji options after user makes a selection
                hideEmojiOptions();            
            }
            // Function to hide emoji options
            function hideEmojiOptions() {
                const emojiOptions = document.querySelector('.emoji-options');
                emojiOptions.style.display = 'none';
            }

            // Function to disable emoji options
            // function disableEmojiOptions() {
            //     const emojiOptions = document.querySelectorAll('.emoji-options span');
            //     emojiOptions.forEach((emojiOption) => {
            //         emojiOption.style.pointerEvents = 'none';
            //     });
            // }
            // Function to append emojis as clickable options
            function appendEmojiOptions() {
                const emojis = ['😄', '🙂', '☹️','⏩'];
                const emojiOptionsContainer = document.getElementById('emoji-options');

                // Check if emojis are already appended
                if (emojiOptionsContainer.children.length === 0) {
                    emojis.forEach((emoji) => {
                        const emojiSpan = document.createElement('span');
                        emojiSpan.textContent = emoji; // Use textContent instead of innerHTML for plain text
                        emojiSpan.addEventListener('click', () => handleEmojiSelection(emoji));
                        emojiOptionsContainer.appendChild(emojiSpan);
                    });
                }
            }
function scrollChatHistoryToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
}
    const catGory = document.getElementById('cat-gory');
    const chat = document.getElementById('chat');
    const dropdownContent = document.getElementById('dropdown-content');
    const inputField = document.getElementById('user-message');
    const sendButton = document.getElementById('send-button');
    let trainingData = []; 
    let categories=[];
    let questionCount = 0;

    if(catGory){
        fetch(`http://172.22.5.93:8080/get_categories/${botName}/${userName}`)
        // fetch(`http://127.0.0.1:5000/get_categories/${botName}/${userName}`)

                .then(response => response.json())
                .then(data => {
                    categories= data;

                    const categoryElement = document.createElement('button');
                            categoryElement.textContent = 'All';
                            catGory.appendChild(categoryElement); 
                            iscreated=true;
                            categoryElement.addEventListener('click', function () {
                                chat.innerHTML = '';
                                // displayMessage("Welcome! How can I assist you today?", false);

                            // Clear input field and dropdown content
                            inputField.value = '';
                            dropdownContent.innerHTML = '';

                            // Display questions related to the selected category in the dropdown

                            displayQuestions('All');
                            });
                    // Populate the dropdown with fetched categories                        
                    categories.forEach(categories => {
                        const categoryElement = document.createElement('button');
                        categoryElement.textContent = categories;

                        catGory.appendChild(categoryElement);

                        // Event listener for category selection
                        categoryElement.addEventListener('click', function () {
                            // Clear chat section
                            chat.innerHTML = '';
                            // displayMessage("Welcome! How can I assist you today?", false);

                            // Clear input field and dropdown content
                            inputField.value = '';
                            dropdownContent.innerHTML = '';
    
                            // Display questions related to the selected category in the dropdown
                            displayQuestions(categories, true);
                        });
                });
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                });
    }
    function displayMessage(message, isUserMessage) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.classList.add('chat-message');

        if (isUserMessage) {
            messageDiv.classList.add('user-message');
        } else {
            messageDiv.classList.add('response-message');
        }
        chat.appendChild(messageDiv);
    }
    if (chat){
        displayMessage("Welcome! How can I assist you today?", false);
        const username = chat.getAttribute('user');

        displayQuestions("All",false)

        function displayFeedback() {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.classList.add('feedback-div');

            const feedbackMessage = document.createElement('p');
            feedbackMessage.textContent = "Is there anything else I can help you with?";
            feedbackDiv.appendChild(feedbackMessage);

            const yesButton = document.createElement('button');
            yesButton.textContent = 'Yes';
            yesButton.addEventListener('click', function() {
                chat.removeChild(feedbackDiv); // Remove the feedback div
                chat.addEventListener('DOMNodeInserted', incrementQuestionCount); // Re-add event listener
                displayMessage("Continue",true);
            });
            feedbackDiv.appendChild(yesButton);

            const noButton = document.createElement('button');
            noButton.textContent = 'No';
            noButton.addEventListener('click', function() {
                chat.removeChild(feedbackDiv); // Remove the feedback div

                displayMessage("Your feedback is essential for us to improve. Please take a moment to rate your experience.",true);
                const starContainer = document.createElement('div');
                starContainer.classList.add('star-container');
                let selectedStars = 0;

                let starsSubmitted = false;
                function handleStarSelection(starValue) {
                    if (!starsSubmitted) {
                        selectedStars = starValue;
                        const stars = document.querySelectorAll('.star');
                        stars.forEach((star, index) => {
                            if (index < starValue) {
                                star.classList.add('selected');
                            } else {
                                star.classList.remove('selected');
                            }
                        });
                    }
                }
                // Create 5 stars for the rating system
                for (let i = 1; i <= 5; i++) {
                    const star = document.createElement('span');
                    star.textContent = '★';
                    star.classList.add('star');
                    star.dataset.value = i;
                    star.addEventListener('click', () => handleStarSelection(i));
                    starContainer.appendChild(star);
                }
                const submitButton = document.createElement('button');
                submitButton.classList.add('submit_feedback')
                submitButton.textContent = 'Submit';
                submitButton.addEventListener('click', function() {
                     if (selectedStars > 0) {
                        const thankYouMessage = document.createElement('p');
                        thankYouMessage.classList.add('thankmessage')
                        thankYouMessage.textContent = "Thank you for your valuable feedback!";
                        starContainer.removeChild(submitButton)
                        chat.appendChild(thankYouMessage);
                        chat.scrollTop = chat.scrollHeight;
                        starsSubmitted = true;

                        const stars = document.querySelectorAll('.star');
                        stars.forEach(star => {
                            star.removeEventListener('click', handleStarSelection); });
                     } 
                });
                starContainer.appendChild(submitButton);

                chat.appendChild(starContainer);
                chat.scrollTop = chat.scrollHeight;
            });
            feedbackDiv.appendChild(noButton);
            chat.appendChild(feedbackDiv);
            // After displaying feedback, remove the event listener to prevent multiple displays
            chat.removeEventListener('DOMNodeInserted', incrementQuestionCount);
        }
        function checkQuestionCount() {
            // Check the question count and display feedback after a certain threshold
            if (questionCount === 9) {
                displayFeedback();
            }
        }
        function incrementQuestionCount() {
            questionCount++;
            checkQuestionCount();
        }
                // Function to display predefined questions in the question section
                function displayQuestions(category,iscategory) {

                    if(iscategory==true){
                        fetch(`http://172.22.5.93:8080/fetch_data_with_category/${botName}/${userName}/${category}`)
                        // fetch(`http://127.0.0.1:5000/fetch_data_with_category/${botName}/${userName}/${category}`)

                    .then(response => response.json())
                    .then(data => {
                        trainingData = data;
                        displaysubcategory(category);
                        updateDropdown();
                    });
                    }
                    else{
                        fetch(`http://172.22.5.93:8080/fetch_previous_data/${botName}/${userName}`)
                        // fetch(`http://127.0.0.1:5000/fetch_previous_data/${botName}/${userName}`)

                    .then(response => response.json())
                    .then(data => {
                        // Store the training data
                        trainingData = data;
                        updateDropdown();
                    });
                    }

                    function updateDropdown() {
                        // Clear previous dropdown content
                        dropdownContent.innerHTML = '';

                        trainingData.forEach(entry => {
                            const que = entry.question;
                            const optionElement = document.createElement('a');
                            optionElement.textContent = que;
                            optionElement.addEventListener('click', function () {
                                // When an option is clicked, set it as the input value
                                // When a predefined question button is clicked, set it as the user's message (on the right side)
                                displayMessage(que, true);

                                // Find the response for the selected question in the training data
                                const response = entry.response;
                                if (response) {
                                    // Display the response on the left side
                                    displayMessage(response, false);
                                    scrollChatHistoryToBottom();
                                }
                                inputField.value = "";
                                dropdownContent.style.display = 'none';
                            });
                            dropdownContent.appendChild(optionElement);
                        });
                    }

                     // Event listener for input field keyup (to detect user input)
                     inputField.addEventListener('keyup', function () {
                        const inputValue = inputField.value.toLowerCase(); // Get the user input value
                        // Clear previous dropdown content
                        dropdownContent.innerHTML = '';

                        trainingData.forEach(entry => {
                            const que = entry.question.toLowerCase();

                            if (que.includes(inputValue)) {
                                const optionElement = document.createElement('a');
                                optionElement.textContent = entry.question;
                                optionElement.addEventListener('click', function () {
                                    // When an option is clicked, set it as the input value
                                    // When a predefined question button is clicked, set it as the user's message (on the right side)
                                    displayMessage(entry.question, true);

                                    // Find the response for the selected question in the training data
                                    const response = entry.response;
                                    if (response) {
                                        // Display the response on the left side
                                        displayMessage(response, false);
                                        scrollChatHistoryToBottom();
                                    }
                                    inputField.value = "";
                                    dropdownContent.style.display = 'none';
                                });
                                dropdownContent.appendChild(optionElement);
                            } 
                        });
                // Show/hide dropdown based on input
                if (inputValue.length > 0) {
                            dropdownContent.style.display = 'block';

                            // Check if the input value is not present in the dropdown
                            const isInDropdown = trainingData.some(entry => entry.question.toLowerCase().includes(inputValue));

                            // Show/hide the "Send" button based on whether the input is in the dropdown
                            sendButton.style.display = isInDropdown ? 'none' : 'block';
                        } else {
                            dropdownContent.style.display = 'none';
                            sendButton.style.display = 'none'; // Hide the "Send" button when input is empty
                        }
                    });

                    // Event listener for the "Send" button
                    sendButton.addEventListener('click', function () {
                        const userMessage = inputField.value.trim();
                        if (userMessage !== '') {
                            // Display the user message in the chat section
                            displayMessage(userMessage, true);

                            // Display a response from the bot
                            const botResponse = "We will try to resolve your query in near future.";
                            displayMessage(botResponse, false);

                            // Scroll to the bottom of the chat history
                            scrollChatHistoryToBottom();

                            // Clear the input field and hide the dropdown
                            inputField.value = '';
                            dropdownContent.style.display = 'none';
                            sendButton.style.display = 'none'; // Hide the "Send" button after sending
                        }
                    });}

                    function displayQueWithSubcategory(subcategory,category){
                        const chat=document.getElementById('chat');
                        const quediv=document.createElement('div');
                        quediv.classList.add('quediv');
                        quediv.style.display = 'block';
                        const table_name=`${userName}${botName}`;
                        fetch(`http://172.22.5.93:8080/fetch_questionsWithSubcategory/${table_name}/${category}/${subcategory}`)
                        // fetch(`http://127.0.0.1:5000/fetch_questionsWithSubcategory/${table_name}/${category}/${subcategory}`)
                        .then(response=>response.json())
                        .then(data=>{

                            // if(data.length<5){
                                data.forEach(entry=>{
                                const que=entry.question;
                                const ans=entry.response;
                                const quebutton=document.createElement('button');
                                quebutton.classList.add('quebutton');
                                quebutton.textContent=que;
                                quediv.appendChild(quebutton);

                                quebutton.addEventListener('click',function(){
                                    displayMessage(que,true);
                                    displayMessage(ans,false)
                                    chat.scrollTop = chat.scrollHeight;
                                })
                            })
                                chat.appendChild(quediv);
                            // }
                            chat.scrollTop = chat.scrollHeight;
                            
                        })
                    }

    function displaysubcategory(category) {

        chathistory = document.getElementById('chat');
        const subcategorydiv = document.createElement('div');

        subcategorydiv.classList.add('SubCategoryDiv');
        subcategorydiv.style.display = 'block';

        let isDragging = false;
        let offsetX, offsetY;

        subcategorydiv.addEventListener('mousedown', function (e) {
            isDragging = true;
            offsetY = e.clientY - subcategorydiv.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', function (e) {
            if (isDragging) {
                const maxX = chathistory.offsetWidth - subcategorydiv.offsetWidth;
                const maxY = chathistory.offsetHeight - subcategorydiv.offsetHeight;

                let x = e.clientX - offsetX;
                let y = e.clientY - offsetY;

                // Constrain within the boundaries
                x = Math.min(maxX, Math.max(0, x));
                y = Math.min(maxY, Math.max(0, y));

                subcategorydiv.style.left = x + 'px';
                subcategorydiv.style.top = y + 'px';
            }
        });

        document.addEventListener('mouseup', function () {
            isDragging = false;
        });

        const table_name=`${userName}${botName}`;
        fetch(`http://172.22.5.93:8080/fetch_subcategory/${table_name}/${category}`)
    // fetch(`http://127.0.0.1:5000/fetch_subcategory/${table_name}/${category}`)
        .then(response=>response.json())
        .then(data=>{

            const subcategories = data.flat(); 
            let subcategoryElementCreated = false;

                subcategories.forEach(subcategories=>{
                if(subcategories!=''){
                    const subcategoryElement=document.createElement('button');
                    subcategoryElement.classList='subcategorybutton';
                    subcategoryElement.textContent=subcategories;
                    subcategorydiv.appendChild(subcategoryElement);
                    subcategoryElementCreated=true;  
                    subcategoryElement.addEventListener('click',function(){
                        //display as template if less than 5 question like suggestion and if more than that give it in typebox
                        displayQueWithSubcategory(subcategories,category)
                    });     
                }
            });

        if(subcategoryElementCreated){
            const closesubcategorydiv=document.createElement('button');
            //closesubcategorydiv.classList='closecategorydiv';
            closesubcategorydiv.textContent='X';
            closesubcategorydiv.classList='closesubcategorydiv';
            subcategorydiv.appendChild(closesubcategorydiv);
            chathistory.appendChild(subcategorydiv);

            closesubcategorydiv.addEventListener('click',function(){
                chathistory.removeChild(subcategorydiv);
            });
            }
        });
    }
         //Start by displaying the predefined questions at the bottom
         displayQuestions('',false);

         chat.addEventListener('DOMNodeInserted', incrementQuestionCount);
    }
});