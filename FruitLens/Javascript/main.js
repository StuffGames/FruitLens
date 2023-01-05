// Orange Button at the start
const uploadFruitStartButton = document.querySelector("#image-upload-container-button");
// Upload Image Button
const uploadImageInput = document.querySelector("#image-upload");
// Upload Image Label
const uploadImageLabel = document.querySelector(".image-upload-label");
// Image URL Input
const urlImageInput = document.querySelector("#image-upload-url-input");
// Image URL Submit Button
const urlSubmitButton = document.querySelector("#image-url-submit-button");
// Upload New Image Button
const newImageButton = document.querySelector("#upload-new-image-button");
// Identify Fruit Button, moves to next step of the process
const submitImageButton = document.querySelector("#submit-preview-image-button");
// Upload Other Image Button (Button for a new image at the final results step)
const otherImageButton = document.querySelector("#final-new-image-button");
// Final Result Image
const finalResultImage = document.querySelector("#final-result-image");
// About Section Container (contains the paragraphs)
const aboutSectionContainer = document.querySelector(".about-section-container");
// About Section Button
const aboutSectionButton = document.querySelector("#about-section-button");

// Div Conatiner that holds the image uploading step
const uploadImageContainer = document.querySelector("#upload-image");
// Div Container that holds the image previewing step
const imagePreviewContainer = document.querySelector("#image-preview");
// Div Container that holds the final identification results
const finalResultsContainer = document.querySelector(".identification-result-container");

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

//Validate if the image url loads properly
function validateImageURL(url, imageElement) {
    return new Promise( (resolve, reject) => {
        imageElement.addEventListener('load', () => resolve(this));
        imageElement.addEventListener('error', (event) => reject(event));

        imageElement.src = url;
    } );
}

// Move to Image preview, return true if successful, return false if error occurred
function AdvanceToImagePreview(file) {
    console.log('Entered a file');
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

    // image preview image element
    imagePreviewContainer.children[0].children[0].src = inputImageURL;

    // URL input field for image url
    urlImageInput.value = '';

    return true;
}
// Move To Image preview using url
function AdvanceToImagePreviewURL(url) {
    // Turn off current div and turn on next div
    console.log('Entered a URL');

    const previewImageElement = imagePreviewContainer.children[0].children[0];

    validateImageURL(url, previewImageElement).then((img) => {
        console.log('Image URL is valid, proceeding with next step', img);
        inputImageURL = url;
    
        uploadImageContainer.style.display = "none";
        imagePreviewContainer.style.display = "block";
    
        urlImageInput.value = '';
    }, (event) => {
        console.log(event);
        alert("That URL is invalid"); // Probably change to text on screen
        urlImageInput.value = '';
        inputImageURL = '';
    });
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
    // Clear the URL Input
    urlImageInput.value = '';
});

// Event for submitting current image that is being previewed
submitImageButton.addEventListener('mouseup', () => {   

    finalResultImage.src = inputImageURL;

    imagePreviewContainer.style.display = 'none';
    /*Take back identified fruit and display it in the next div*/

    const fruitResultText = document.querySelector("#identified-fruit-text");
    fruitResultText.textContent = 'PLACEHOLDER';

    finalResultsContainer.style.display = 'block';
});

// Event for submitting the URL field
urlSubmitButton.addEventListener('mouseup', () => {
    // TODO: Implement regular expression to check if the value
    //          is a valid url format before creating a file
    const url = urlImageInput.value;
    if (url.length <= 0) return;
    // TODO:
    //      Find a way to fetch an image file to a website (not necessarily javascript)
    //      Then somehow transfer that file to javascript and authenticate it before moving forward

    AdvanceToImagePreviewURL(url);
});

// Event for when changing to another image
otherImageButton.addEventListener('mouseup', () => {
    finalResultsContainer.style.display = 'none';
    
    const fruitResultText = document.querySelector("#identified-fruit-text");
    fruitResultText.textContent = '';

    finalResultImage.src = '';

    // Sets value to empty, making the input have to create a new empty FileList when called
    // This way you can reinput the same image
    uploadImageInput.value = '';
    // Clear the URL Input
    urlImageInput.value = '';

    uploadImageContainer.style.display = 'block';
});

// Event For "About Section" Button
let aboutSectionActive = false;
aboutSectionButton.addEventListener('mouseup', () => {
    aboutSectionContainer.style.display = aboutSectionActive ? "none" : "flex";
    aboutSectionActive = aboutSectionActive ? false : true;
});
// Event for changing background while hovering over only the button
const aboutSectionButtonContainer = document.querySelector(".about-section-button-container");
aboutSectionButton.addEventListener('mouseenter', () => {
    aboutSectionButtonContainer.classList.add('hover-background');
});
aboutSectionButton.addEventListener('mouseleave', () => {
    if (aboutSectionActive) return;
    aboutSectionButtonContainer.classList.remove('hover-background');
});