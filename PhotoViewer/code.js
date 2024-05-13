//global variables
let currPhoto = -1; //index of current photo
let prevPhoto = -1; //index of previous photo
let arr = [];
let idGlobal;
const intervalInMilliseconds = 1000;

/* LAMBDA */
//generates a random number given num as the parameter
let getRandom = (num) => Math.floor(Math.random() * num);

function main() { //instead of onclick
    document.getElementById("image").addEventListener("click", nextPhoto); //if image was clicked on
    document.getElementById("loadPhotos").addEventListener("click", loadPhotos);
    document.getElementById("getJson").addEventListener("click", loadJson);
    document.getElementById("getPreviousPhoto").addEventListener("click", previousPhoto);
    document.getElementById("getNextPhoto").addEventListener("click", nextPhoto);
    document.getElementById("getFirstPhoto").addEventListener("click", firstPhoto);
    document.getElementById("getLastPhoto").addEventListener("click", lastPhoto);
    document.getElementById("getSlideshow").addEventListener("click", slideShow);
    document.getElementById("getRandomSlideShow").addEventListener("click", randomSlideShow);
    document.getElementById("getStopSlideShow").addEventListener("click", stopSlideShow);
}

function loadPhotos() {
    //to get the value of folder, name, etc., use folder.value, name.value, etc.
    let folder = document.getElementById("folder");
    let folder_name = document.getElementById("name");
    let start_photo = document.getElementById("startPhotoNumber");
    let end_photo = document.getElementById("endPhotoNumber");

    //if end_photo not greater than start_photo, display error message in "Status" fieldset area
    if (end_photo.value < start_photo.value) {
        document.querySelector("#photoViewerSystem").innerHTML = "Error: Invalid Range";
    } else {
        //builds array of images (URLs)
        arr = []
        for (let i=start_photo.value; i<=end_photo.value; i++) {
            let url = folder.value + folder_name.value + i + ".jpg";
            arr.push(url);
        }

        //changes random photo in range [start_photo, end_photo]
        let random = getRandom(arr.length); //Math.floor to convert float to integer
        //update image
        let imageElement = document.querySelector("#image");
        imageElement.src = arr[random];
        document.querySelector("#photo").value = arr[random]; //update status
        //updates current photo
        currPhoto = random; //index of current photo
    }
}

function loadJson() {
    process();
}

async function process() {
    //use the "imageURL" property to initialize the array
    //don't use the "description" property
    //"Load JSON" button will initialize the array of photos 
    let url = document.querySelector("#json"); //gets url of JSON file
    const result = await fetch(url.value);
    const json = await result.json();

    //parses JSON
    let str = JSON.stringify(json);
    let newObj = JSON.parse(str);

    if (newObj && Array.isArray(newObj.images)) {
        //builds array of photos
        arr = newObj.images.map(image => image.imageURL)

        //update image
        let imageElement = document.querySelector("#image");
        imageElement.src = arr[0];
        document.querySelector("#photo").value = arr[0]; //update status
        currPhoto = 0 //resets index of current photo
    }
}

function previousPhoto() {
    tmp = prevPhoto //temporary variable to sore index of previous photo
    let imageElement = document.querySelector("#image");
    imageElement.src = arr[prevPhoto];
    prevPhoto = currPhoto; //update index of previous photo
    currPhoto = tmp; //update index of current photo
    document.querySelector("#photo").value = arr[currPhoto]; //update status
}

function nextPhoto() {
    /*
    Iterating or starting a slide show without first loading data is an error
    "Error: you must load data first" should be displayed
    */
    if (currPhoto === -1) {
        document.querySelector("#photoViewerSystem").innerHTML = "Error: you must load data first";
    } else {
        prevPhoto = currPhoto //updates index of previous photo
        //if the last photo in the range is being displayed, display the first photo.
        if (currPhoto === arr.length - 1) {
            currPhoto = 0;
        } else {
            currPhoto = currPhoto + 1;
        }

        //update image
        let imageElement = document.querySelector("#image");
        imageElement.src = arr[currPhoto];
        document.querySelector("#photo").value = arr[currPhoto]; //update status
    }
}

function firstPhoto() {
    prevPhoto = currPhoto //update index of previous photo
    //update image
    let imageElement = document.querySelector("#image");
    imageElement.src = arr[0];
    document.querySelector("#photo").value = arr[0]; //update status
    //update current photo
    currPhoto = 0 //resets position of currentPhoto
}

function lastPhoto() {
    prevPhoto = currPhoto //update index of previous photo
    //update image
    let imageElement = document.querySelector("#image");
    imageElement.src = arr[arr.length - 1];
    document.querySelector("#photo").value = arr[arr.length - 1]; //update status
    //update current photo
    currPhoto = arr.length - 1
}

function slideShow() {
    let imageElement = document.querySelector("#image");
    imageElement.src = arr[0]; //swaps image
    idGlobal = setInterval("swapImages()", intervalInMilliseconds);
}

//helper function to swap images
function swapImages() { //array of URLs, current index in array
    let imageElement = document.querySelector("#image");
    let idx = imageElement.src.indexOf("umcp") //gets index of url in image.src
    let url = imageElement.src.slice(idx);
    let urlIdx = arr.indexOf(url) //index of url in array of urls

    //if end of array is reached, display image at start position
    if (urlIdx == arr.length - 1) {
        urlIdx = 0
    } else {
        urlIdx += 1
    }

    imageElement.src = arr[urlIdx]
    document.querySelector("#photo").value = arr[urlIdx]; //update status
}

//helper function to swap images randomely
function randomSlideShow() {
    idGlobal = setInterval("swapRandomly()", intervalInMilliseconds);
}

function swapRandomly() {
    //select random index in array
    let random = getRandom(arr.length); //Math.floor to convert float to integer
    //update image
    let imageElement = document.querySelector("#image");
    imageElement.src = arr[random];
    document.querySelector("#photo").value = arr[random]; //update status
}

function stopSlideShow() {
    clearInterval(idGlobal);
}