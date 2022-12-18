// Orange Button at the start
const uploadFruitStartButton = document.querySelector("#image-upload-container-button");
// Upload Image Button
const uploadImageInput = document.querySelector("#image-upload");
// Image URL Submit Button
const urlSubmitButton = document.querySelector("#image-url-submit-button");
// Upload New Image Button
const newImageButton = document.querySelector("#upload-new-image-button");
// Identify Fruit Button, moves to next step of the process
const submitImageButton = document.querySelector("#submit-preview-image-button");
// About Section Buttton
const aboutSectionButton = document.getElementsByClassName("about-section-button-class");
const buttons = document.querySelectorAll('button');

// Div Conatiner that holds the image uploading step
const uploadImageContainer = document.querySelector("#upload-image");
// Div Container that holds the image previewing step
const imagePreviewContainer = document.querySelector("#image-preview");

// Holds current inputted image
let inputImage = null;
let inputImageURL = '';

console.log(aboutSectionButton)

// Event for "Upload Image of Fruit" button
// Turns off the display for the button then turns on display for the next div/section
uploadFruitStartButton.addEventListener('mouseup', () => {
    uploadFruitStartButton.style.display = 'none';

    uploadImageContainer.style.display = "block";
    uploadImageContainer.style.opacity = '1';
    uploadImageContainer.style.visibility = 'visible';
})

// Event for "Upload Image" Input
uploadImageInput.addEventListener('change', () => {
    // Check if the input process was done correctly
    const files = uploadImageInput.files;
    if (files.length === 0) {
        alert("No Files Inputted");
        return;
    }
    if (files.length > 1) {
        alert("Only Input 1 file");
        return;
    }
    const acceptableFiles = ['image/png', 'image/jpg'];
    if (!acceptableFiles.includes(files[0].type)) {
        alert('Please select a .jpg or .png file');
        return;
    }

    inputImageURL = URL.createObjectURL(files[0]);

    // Turn off current div and turn on next div
    uploadImageContainer.style.display = "none";
    imagePreviewContainer.style.display = "block";

    imagePreviewContainer.children[0].children[0].src = inputImageURL;
})

// Event for "Upload New Image" Button
newImageButton.addEventListener('mouseup', () => {
    imagePreviewContainer.style.display = "none";
    uploadFruitStartButton.style.display = "block";
    // Sets value to empty, making the input have to create a new empty FileList when called
    // This way you can reinput the same image
    uploadImageInput.value = '';
})

// TODO
//      Create an even for the submit button, maybe also the input field
//      See if fetching the image from the URL is successful
//          If not send an alert and clear the text input
//          If success then continue to next step with the URL
//              maybe create a file from the image...

// aboutSectionButton.addEventListener('mouseup', e => {
//     console.log(e.composedPath());
// })