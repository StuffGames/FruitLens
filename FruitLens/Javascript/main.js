// Orange Button at the start
const uploadFruitStartButton = document.querySelector("#image-upload-container-button");
// Upload Image Button
const uploadImageInput = document.querySelector("#image-upload");
// Upload Image Label
const uploadImageLabel = document.querySelector(".image-upload-label");
// Image URL Submit Button
const urlSubmitButton = document.querySelector("#image-url-submit-button");
// Upload New Image Button
const newImageButton = document.querySelector("#upload-new-image-button");
// Identify Fruit Button, moves to next step of the process
const submitImageButton = document.querySelector("#submit-preview-image-button");
// About Section Container (contains the paragraphs)
const aboutSectionContainer = document.querySelector(".about-section-container");
// About Section Button
const aboutSectionButton = document.querySelector("#about-section-button");

// Div Conatiner that holds the image uploading step
const uploadImageContainer = document.querySelector("#upload-image");
// Div Container that holds the image previewing step
const imagePreviewContainer = document.querySelector("#image-preview");

// Holds current inputted image
let inputImage = null;
let inputImageURL = '';

// Return a boolean if the input size is equal to 1
function CheckInputSize(list) {
    if (list.length === 0) {
        alert("No Files Inputted");
        return false;
    }
    if (list.length > 1) {
        alert("Only Input 1 File");
        return false;
    }
    return true;
}

// Move to Image preview, return true if successful, return false if error occurred
function AdvanceToImagePreview(file) {
    const acceptableFiles = ['image/png', 'image/jpg'];
    inputImage = file;

    if (!acceptableFiles.includes(inputImage.type)) {
        alert('Please select a .jpg or .png file');
        return false;
    }
    inputImageURL = URL.createObjectURL(inputImage);
    
    // Turn off current div and turn on next div
    uploadImageContainer.style.display = "none";
    imagePreviewContainer.style.display = "block";

    imagePreviewContainer.children[0].children[0].src = inputImageURL;

    return true;
}

// Event for "Upload Image of Fruit" button
// Turns off the display for the button then turns on display for the next div/section
uploadFruitStartButton.addEventListener('mouseup', () => {
    uploadFruitStartButton.style.display = 'none';

    uploadImageContainer.style.display = "block";
    uploadImageContainer.style.opacity = '1';
    uploadImageContainer.style.visibility = 'visible';
});

// Event for "Upload Image" Input
uploadImageInput.addEventListener('change', () => {
    // Check if the input process was done correctly
    const files = uploadImageInput.files;
    if (!CheckInputSize(files.length)) return;
    const preview = AdvanceToImagePreview(files[0]);
    if (!preview) return; // Might be unnecessary line
});
// Event for "Upload Image" Laebl Drag and Drop Input
uploadImageLabel.addEventListener('drop', e => {
    e.preventDefault();
    
    if (e.dataTransfer.items) {
        console.log("Data Transfer Items")
        if (!CheckInputSize(e.dataTransfer.items)) return;
        const preview = AdvanceToImagePreview(e.dataTransfer.items[0].getAsFile());
        if (!preview) return;
    }
    else {
        console.log("Data Transfer Files");
        if (!CheckInputSize(e.dataTransfer.files)) return;
        const preview = AdvanceToImagePreview(e.dataTransfer.files[0]);
        if (!preview) return;
    }
});
uploadImageLabel.addEventListener('dragover', e => {
    e.preventDefault();
});


// Event for "Upload New Image" Button
newImageButton.addEventListener('mouseup', () => {
    imagePreviewContainer.style.display = "none";
    uploadFruitStartButton.style.display = "block";
    // Sets value to empty, making the input have to create a new empty FileList when called
    // This way you can reinput the same image
    uploadImageInput.value = '';
});

// TODO
//      Create an event for the submit button, maybe also the input field
//      See if fetching the image from the URL is successful
//          If not send an alert and clear the text input
//          If success then continue to next step with the URL
//              maybe create a file from the image...


// TODO
//      Make the whole DIV for the About Section Button change color only when hovering over the Button
//      Possibly add transition to it the same way the button does

// Event For "About Section" Button
let aboutSectionActive = false;
aboutSectionButton.addEventListener('mouseup', () => {
    aboutSectionContainer.style.display = aboutSectionActive ? "none" : "flex";
    aboutSectionActive = aboutSectionActive ? false : true;
})