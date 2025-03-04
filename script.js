function redirectToRegistration() {

    window.location.href = "/register";
}

function validateForm() {
    // Reset error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('message').textContent = '';

    // Validate form data here (e.g., check for username availability)
    const username = document.getElementById('username').value;
    // Check if the username already exists in the database
    if (usernameExists(username)) {
        document.getElementById('usernameError').textContent = 'Username already exists. Please choose a different one.';
        return false; // Prevent form submission
    }

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        return false; // Prevent form submission
    }
    return true; // Allow form submission
}

// Replace this function with your actual validation logic
function usernameExists(username) {
    // Simulated username check
    // Replace this with a server-side check (e.g., using AJAX)
    return username === 'existinguser';
}

document.addEventListener('DOMContentLoaded', function () {
    // Create Chatbot Button
    const createButton = document.getElementById('create-button');

    if (createButton) {
        createButton.addEventListener('click', function () {
            if (confirm('Want to create a new bot')) {
                window.location.href = `/create_chatbot`;
            }
        });
    }

    // Assign Chatbot Button
    const assignButton = document.getElementById('assign-button');

    if (assignButton) {
        assignButton.addEventListener('click', function () {
            if (confirm('Want to assign a new bot')) {
                window.location.href = `/assign_bot`;
            }
        });
    }

// Edit and Delete Buttons
    const editButtons = document.querySelectorAll('.edit-button');
    if(editButtons){
        editButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                handleEditClick(button);
            });
        });
    }

// Edit Chatbot Form (if needed)
    const editForm = document.querySelector('form#edit-form');
    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleEditFormSubmit();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const editpage = document.getElementById('create-button');
    if(editpage){
        editpage.addEventListener('click',function(){
            const botName = document.querySelector('input[name="bot_name"]').value;
            window.location.href = `/edit_bot/${botName}`;
        })
    }

    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');
        if(editButtons){
            editButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    handleEditClick(button);
                });
            });
        }
        if(deleteButtons){
            deleteButtons.forEach(function (button) {
                button.addEventListener('click', function () {
                    handleDeleteClick(button);
                });
            });
        }
        
        // Handle Edit Button Click
        function handleEditClick(button) {
            const chatbotName = button.getAttribute('data-chatbot');
            const username = button.getAttribute('user');   

            window.location.href = `/edit_chatbot/${chatbotName}/${username}`;
        }   

        // Handle Delete Button Click
        function handleDeleteClick(button) {
            const chatbotName = button.getAttribute('data-chatbot');
            if (confirm(`Delete chatbot "${chatbotName}"?`)) {
                window.location.href = `/delete_chatbot/${chatbotName}`;
            }
        }
});

document.addEventListener('DOMContentLoaded', function () {
    const addCategoryButton = document.getElementById('add-category-button');
    const questionCategories = document.querySelector('.question-categories');

    if (addCategoryButton) {
        addCategoryButton.addEventListener('click', function () {
            // Create a new question category div
            const newCategoryDiv = document.createElement('div');
            newCategoryDiv.className = 'question-category';
    
            // Create a new text box for the category
            const newCategoryInput = document.createElement('input');
            newCategoryInput.type = 'text';
            newCategoryInput.className = 'Category-input';
            newCategoryInput.placeholder = 'Enter Category';

            // Create a button to remove this category
            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.className = 'remove-category';

            // Event listener for removing the category on button click
            removeButton.addEventListener('click', function () {
                questionCategories.removeChild(newCategoryDiv);
            });

            // Append the new text box, select, and remove button to the question category div
            newCategoryDiv.appendChild(newCategoryInput);
            // newCategoryDiv.appendChild(newCategorySelect);
            newCategoryDiv.appendChild(removeButton);
 
            // Append the new question category div to the question categories
            questionCategories.appendChild(newCategoryDiv);

        });
    }  
    const saveCategoryButton = document.getElementById('save-category-button');
    if (saveCategoryButton) {
        saveCategoryButton.addEventListener("click", function() {
            const chatbotName = saveCategoryButton.getAttribute('data-chatbot');
            save_category(chatbotName);
            location.reload();
        });
    }

    function save_category(chatbotName) {
        const categoryQuestions = document.querySelectorAll('.question-category');
        const categories = [];

        categoryQuestions.forEach(function (newCategoryDiv) {
            const categoryInput = newCategoryDiv.querySelector('.Category-input');

            // Check if categoryInput is not null before accessing its value
            if (categoryInput) {
                const inputCategory = categoryInput.value.trim();

                if (inputCategory !== '') {
                    categories.push(inputCategory);
                }
            }
        });

        if (categories.length > 0) {
            fetch(`/add_categories/${chatbotName}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ categories }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.message) {
                        alert(data.message);
                        // Clear the input fields
                        categoryQuestions.forEach(function (newCategoryDiv) {
                            const categoryInput = newCategoryDiv.querySelector('.Category-input');
                            categoryInput.value = '';
                        });
                    } else if (data.error) {
                        alert(data.error);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }
});
// Function to send category data to the server
document.addEventListener('DOMContentLoaded', function() {
    const categoryDropdown = document.getElementById('category');
    const CDFsub_cat=document.getElementById('sub-category')
 if(categoryDropdown){
    // Fetch categories from the server
    const chatbotName=categoryDropdown.getAttribute('data-chatbot');
    const username=categoryDropdown.getAttribute('user');

    fetch(`/get_categories/${chatbotName}/${username}`)
        .then(response => response.json())
        .then(data => {
            // Populate the dropdown with fetched categories
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.text = category;
                categoryDropdown.appendChild(option);
            });
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.text = category;
                CDFsub_cat.appendChild(option);
            });    
        })
        .catch(error => {
            console.error('Error fetching categories:', error);
        });

        categoryDropdown.addEventListener('change',function(){
            const category=categoryDropdown.value;

            if(category.trim() !== ''){
               showSubcategory(category);
            }
        })
CDFsub_cat.addEventListener('change', function() {
    // Get selected category
    const selectedCategory = CDFsub_cat.value;

    const categoryLabel = document.createElement('h4');
    categoryLabel.textContent = ` ${selectedCategory}`;
    categoryLabel.id = 'selected-category-label';

    const container = document.getElementById('s-category'); 
    // Clear previous content
    container.innerHTML = '';
    container.appendChild(categoryLabel);

    table_name=username+chatbotName;

    // Check if the selected category is not empty
    if (selectedCategory.trim() !== '') {

        fetch(`/fetch_subcategory/${table_name}/${selectedCategory}`)
            .then(response=>response.json())
            .then(data=>{
                const existingSubcategory=data.flat();
                var i=0;
                let isEmpty=true;
                if(existingSubcategory!=null){
                    existingSubcategory.forEach(subcategory => {
                        if(subcategory!=''){
                            const subCategoryInput = document.createElement('input');
                            subCategoryInput.type = 'text';
                            subCategoryInput.className = 'sub-category-input';
                            subCategoryInput.value=subcategory;
                            subCategoryInput.placeholder=`Sub-category ${++i}`

                            // Append the new input box to the DOM
                            container.appendChild(subCategoryInput);
                            isEmpty=false;
                            console.log(i);
                        }
                    });
                  //  if(!isEmpty){
                        const addsubcatbutton=document.createElement('button');
                        addsubcatbutton.className='addsubcatbutton';
                        addsubcatbutton.textContent='add';
                        container.appendChild(addsubcatbutton);
                        addsubcatbutton.addEventListener('click',function(){
                            if(i<10){
                                const subCategoryInput = document.createElement('input');
                                subCategoryInput.type = 'text';
                                subCategoryInput.className = 'sub-category-input';
                                subCategoryInput.placeholder=`Sub-category ${++i}`;

                                container.appendChild(subCategoryInput);
                                console.log(i);
                            }
                        })
                    //}
                }
               if(isEmpty){
                console.log(isEmpty)
               }
    });

const savesubcat = document.createElement('button');
savesubcat.textContent = 'save';
savesubcat.id = 'add-subcategories';

container.appendChild(savesubcat);

savesubcat.addEventListener('click', function () {
     // Call your store subcategory function here
     storeSubcategory(selectedCategory);
     container.innerHTML = '';
     container.appendChild(CDFsub_cat);
});

 const removeButton = document.createElement('button');
 removeButton.textContent = 'X';
 removeButton.id = 'removesubcategories';
 container.appendChild(removeButton);
     
 removeButton.addEventListener('click', function () {
    // Restore initial state with select functionality
    container.innerHTML = ''; // Clear previous content
    container.appendChild(CDFsub_cat);
});
 }
});
 }
});
function showSubcategory(category) {
    const categoryDropdown = document.getElementById('category'); 
    const chatbotName = categoryDropdown.getAttribute('data-chatbot');
    const username = categoryDropdown.getAttribute('user');
    const table_name = username + chatbotName;
    const subcategorydropdown=document.getElementById('select-sub-category');

    fetch(`/fetch_subcategory/${table_name}/${category}`)
        .then(response => response.json())
        .then(data => {
            console.log('Received data:', data); // Log the received data

            // Assuming the response is an array of subcategories
            const subcategories = data;

            // Clear existing options
            subcategorydropdown.innerHTML = '';

            // Add a default option
            const defaultOption = document.createElement('option');
            defaultOption.disabled = true;
            defaultOption.selected = true;
            defaultOption.hidden = true;
            defaultOption.textContent = 'Select Subcategory';
            subcategorydropdown.appendChild(defaultOption);

            // Populate the dropdown with fetched subcategories
            subcategories.forEach(subcategory => {
                if(subcategory!=''){
                const option = document.createElement('option');
                option.value = subcategory;
                option.text = subcategory;
                subcategorydropdown.appendChild(option);}
            });
        })
        .catch(error => {
            console.error('Error fetching subcategories:', error);
        });
}

function storeSubcategory(selectedCategory) {
    // Get all subcategory input elements
    const categoryDropdown = document.getElementById('category');
    const chatbotName=categoryDropdown.getAttribute('data-chatbot');
    const username=categoryDropdown.getAttribute('user');
    table_name=username+chatbotName;
    const subCategoryInputs = document.querySelectorAll('.sub-category-input');

    // Extract subcategory values
    const subcategories = Array.from(subCategoryInputs).map(input => input.value.trim());

    // Remove empty values
    const filteredSubcategories = subcategories.filter(subcategory => subcategory !== '');
 
    // Send the subcategories to the server for storage
    if (filteredSubcategories.length > 0) {
        fetch(`/store_subcategories/${table_name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: selectedCategory, // Use the parameter value here
                subcategories: filteredSubcategories,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response from the server if needed
                console.log(data.category);
            })
            .catch(error => {
                console.error('Error storing subcategories:', error);
            });
    } else {
        // No subcategories to store
        console.log('No subcategories to store.');
    }
}

// Add an event listener for the "Category" button
document.addEventListener('DOMContentLoaded', function () {

// Add an event listener for the "Add Question" button
const addQuestionButton = document.getElementById("add-question-button");

// Event listener for the "Add Question" button
if (addQuestionButton) {

addQuestionButton.addEventListener('click', function () {
    addTrainingQuestion();
});}
// Function to add a training question
function addTrainingQuestion() {
    const trainingQuestions = document.getElementById('training-questions');

    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = 'question-input';
    questionInput.placeholder = 'Enter a training question...';

    const responseInput = document.createElement('input');
    responseInput.type = 'text';
    responseInput.className = 'response-input';
    responseInput.placeholder = 'Enter the bot\'s response...';

    const questionDiv = document.createElement('div');
    questionDiv.className = 'training-question';
    questionDiv.appendChild(questionInput);
    questionDiv.appendChild(responseInput);

    trainingQuestions.appendChild(questionDiv);
}
});

document.addEventListener('DOMContentLoaded', function () {

    const trainButton = document.getElementById('train-button');
    if (trainButton) {
    trainButton.addEventListener("click", function() {
        const chatbotName = trainButton.getAttribute('data-chatbot');
        const category = document.getElementById('category');
        const selectedCategory = category.value;

        // const subcategory=document.getElementById('select-sub-category');
        // const selectedSubCategory=subcategory.value;
        // console.log(selectedSubCategory);

        if(selectedCategory!=='Select Category'){
            sendTrainingData(chatbotName);
            //location.reload();
            }
            else{
                alert('Select question category');
            }
    });}

// Function to send training data to the server
function sendTrainingData(chatbotName) {
    const trainingQuestions = document.querySelectorAll('.training-question');
    const trainingData = [];
    const category = document.getElementById('category');
    const selectedCategory = category.value;

    const subcategory=document.getElementById('select-sub-category');
    const selectedSubCategory=subcategory.value;

// if(selectedSubCategory!='Select Subcategory'){
    console.log(selectedSubCategory);
    trainingQuestions.forEach(function (questionDiv) {
        const questionInput = questionDiv.querySelector('.question-input');
        const responseInput = questionDiv.querySelector('.response-input');

        const question = questionInput.value.trim();
        const response = responseInput.value.trim();

        if (question !== '' && response !== '') {
            trainingData.push({ category: selectedCategory,selectedSubCategory, question, response });
        }
    });
// }
// else{
//     trainingQuestions.forEach(function (questionDiv) {
//         const questionInput = questionDiv.querySelector('.question-input');
//         const responseInput = questionDiv.querySelector('.response-input');

//         const question = questionInput.value.trim();
//         const response = responseInput.value.trim();

//         if (question !== '' && response !== '') {
//             trainingData.push({ category: selectedCategory, question, response });
//         }
//     });
// }
  

if (trainingData.length > 0) {
        fetch(`/train/${chatbotName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ trainingData }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                alert(data.message);
                // Clear the input fields
                trainingQuestions.forEach(function (questionDiv) {
                    const questionInput = questionDiv.querySelector('.question-input');
                    const responseInput = questionDiv.querySelector('.response-input');
                    questionInput.value = '';
                    responseInput.value = '';
                });
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }
}
});

//already stored data
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the elements
    const showDataButton = document.getElementById('show-data-button');
    const previousDataTemplate = document.getElementById('previous-data-template');
    const previousDataList = document.getElementById('previous-data-list');
    const username=showDataButton.getAttribute('user');

    // Flag to track the display state
    let isDataVisible = false;

    // Function to show or hide previous data
    function togglePreviousData(chatbotName) {
        // Check if the element exists
        if (!previousDataList) {
            console.error("Element with ID 'previous-data-list' not found.");
            return;
        }
        // If data is currently visible, hide it, and vice versa
        if (isDataVisible) {
            // Data is visible, hide it
            previousDataList.innerHTML = '';
            previousDataTemplate.style.display = 'none';
        } else {
            // Fetch chatbot's previous data from the server
            fetch(`/fetch_previous_data/${chatbotName}/${username}`)
                .then(response => response.json())
                .then(training_data => {
                    console.log('Fetched previous data:', training_data);

                    if (training_data && training_data.length > 0) {
                        training_data.forEach((entry, index) => {
                            // Create a div to contain the training data
                            const trainingDataDiv = document.createElement('div');
                            trainingDataDiv.classList.add('training-data');

                            const qnadiv = document.createElement('div');
                            qnadiv.classList.add('qna');

                            const ed_delDiv =document.createElement('div');
                            ed_delDiv.classList.add('ed_del');

                            // Create a div for the question
                            const questionDiv = document.createElement('div');
                            questionDiv.classList.add('question');
                            questionDiv.innerHTML = `<strong>Question:</strong> ${entry.question}`;

                            // Create a div for the response
                            const responseDiv = document.createElement('div');
                            responseDiv.classList.add('response');
                            responseDiv.innerHTML = `<strong>Response:</strong> ${entry.response}`;

                            // Create a div for the edit
                            const editdiv = document.createElement('div');
                            editdiv.classList.add('edit');
                            editdiv.innerHTML = `<button>edit</button>`;

                            // Create a div for the delete
                            const deletediv = document.createElement('div');
                            deletediv.classList.add('edit');
                            deletediv.innerHTML = `<button>delete</button>`;

                            // Append the question and response to the training data div
                            qnadiv.appendChild(questionDiv);
                            qnadiv.appendChild(responseDiv);

                            ed_delDiv.appendChild(editdiv);
                            ed_delDiv.appendChild(deletediv)

                            trainingDataDiv.appendChild(qnadiv);
                            trainingDataDiv.appendChild(ed_delDiv);

                            // Append the training data div to the previousDataList
                            previousDataList.appendChild(trainingDataDiv);
                        });

                        // Show the template
                        previousDataTemplate.style.display = 'block';
                    } else {
                        // If no previous data found, you can display a message
                        previousDataTemplate.innerHTML = '<p>No previous data available for this chatbot.</p>';
                        previousDataTemplate.style.display = 'block';
                    }
                })
                .catch(error => {
                    console.error('Error fetching previous data:', error);
                });
        }
        // Toggle the flag
        isDataVisible = !isDataVisible;
    }
    // Add a click event to the "Show Data" button
    if (showDataButton) {
        showDataButton.addEventListener("click", function () {
            const chatbotName = showDataButton.getAttribute('data-chatbot');
            togglePreviousData(chatbotName);
        });
    }
});

function scrollChatHistoryToBottom() {
    const chat = document.getElementById('chat');
    chat.scrollTop = chat.scrollHeight;
}

document.addEventListener('DOMContentLoaded', function () {
    // const chatHistory = document.getElementById('chat-history');
    const catGory = document.getElementById('cat-gory');
    const chat = document.getElementById('chat');
    const dropdownContent = document.getElementById('dropdown-content');
    const inputField = document.getElementById('user-message');
    let trainingData = []; 
    let categories=[];
    let questionCount = 0;

    if(catGory){
        const username = chat.getAttribute('user');
        fetch(`/get_categories/${chatbotName}/${username}`)
                .then(response => response.json())
                .then(data => {
                    categories= data;
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
                            displayQuestions(categories);
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
        const username = chat.getAttribute('user');

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
                displayMessage("You may ask further!",true);
                scrollChatHistoryToBottom()
            });
            feedbackDiv.appendChild(yesButton);

            const noButton = document.createElement('button');
            noButton.textContent = 'No';
            noButton.addEventListener('click', function() {
            chat.removeChild(feedbackDiv); // Remove the feedback div

                displayMessage("Please give feedback!",true);
                const starContainer = document.createElement('div');
                starContainer.classList.add('star-container');
                let selectedStars = 0;

                // Function to handle star selection
                function handleStarSelection(starValue) {
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
                        thankYouMessage.textContent = "Thank you for your feedback!";
                        starContainer.removeChild(submitButton)
                        chat.appendChild(thankYouMessage);
                        chat.scrollTop = chat.scrollHeight;
                        starsSubmitted = true;

                        const stars = document.querySelectorAll('.star');
                        stars.forEach(star => {
                            star.removeEventListener('click', handleStarSelection); 
                        });
                    } 
                });
                starContainer.appendChild(submitButton);
                chat.appendChild(starContainer);
            });
            feedbackDiv.appendChild(noButton);
            chat.appendChild(feedbackDiv);
            // After displaying feedback, remove the event listener to prevent multiple displays
            chat.removeEventListener('DOMNodeInserted', incrementQuestionCount);
        }
        function checkQuestionCount() {
            // Check the question count and display feedback after a certain threshold
            if (questionCount === 6) {
                displayFeedback();
            }
        }

        function incrementQuestionCount() {
            questionCount++;
            checkQuestionCount();
        }
        // Fetch training data from the server
        fetch(`/fetch_previous_data/${chatbotName}/${username}`)
            .then(response => response.json())
            .then(data => {
                // Store the training data
                console.log('Fetched previous data:', data);
                trainingData = data;

                // displayMessage("Welcome! How can I assist you today?", false);

                // Function to display predefined questions in the question section
                function displayQuestions(category) {

                    // Get the input field and dropdown content
                    const inputField = document.getElementById('user-message');
                    const dropdown = document.getElementById('dropdown-content');

                    trainingData.filter(entry => entry.category === category).forEach(entry => {
                        const optionElement = document.createElement('a');
                        optionElement.textContent = entry.question;
                        optionElement.addEventListener('click', function () {
                            // When a question is clicked, set it as the input value (user's message)
                            const question = entry.question;
                            displayMessage(question, true);

                            // Find and display the response for the selected question
                            const response = entry.response;
                            if (response) {
                                // Display the response in the chat section
                                displayMessage(response, false);

                                // Scroll to the bottom of the chat history
                                chat.scrollTop = chat.scrollHeight;
                            }
                        });
                        dropdownContent.appendChild(optionElement);
                    });

            // Event listener for input field keyup (to detect user input)
                    inputField.addEventListener('keyup', function() {
                        const inputValue = inputField.value.toLowerCase(); // Get the user input value
            // Clear previous dropdown content
                        dropdown.innerHTML = '';
            // Filter options based on user input and display them in the dropdown
                        trainingData.forEach(entry => { 
                            const que=entry.question;
                            const option = entry.question.toLowerCase();

                            if (option.includes(inputValue)) {
                                const optionElement = document.createElement('a');
                                optionElement.textContent = entry.question;
                                optionElement.addEventListener('click', function() {
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
                                dropdown.style.display = 'none';
                                });
                            dropdown.appendChild(optionElement);
                            }
                        });

    // Show/hide dropdown based on input
                        if (inputValue.length > 0) {
                            dropdown.style.display = 'block';
                        } else {
                            dropdown.style.display = 'none';
                        }
                    }); }
         // Start by displaying the predefined questions at the bottom
         displayQuestions();

         chat.addEventListener('DOMNodeInserted', incrementQuestionCount);
     })
     .catch(error => {
         console.error('Error fetching data:', error);
     });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const publishChatbotButton = document.getElementById('publish-button');

     if (publishChatbotButton) {
        publishChatbotButton.addEventListener('click', function () {
            const chatbotName = publishChatbotButton.getAttribute('data-chatbot');
            const username = publishChatbotButton.getAttribute('user');
            
            window.location.href = `/bot/${chatbotName}/${username}`;
        });
    }
});
