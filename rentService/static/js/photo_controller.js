const MAIN_PHOTO_ELEMENT = document.getElementById('mainPhoto');
const PREV_PHOTO_ELEMENT = document.getElementById('prevPhoto');
const NEXT_PHOTO_ELEMENT = document.getElementById('nextPhoto');

const IMG_MINI_COLLECTION = document.getElementsByClassName("imgMini");
const MAX_PHOTO_INDEX = IMG_MINI_COLLECTION.length;
let currentPhotoIndex = 0;

function setMainPhoto()
{
    MAIN_PHOTO_ELEMENT.src = IMG_MINI_COLLECTION[currentPhotoIndex].src;
    console.log(currentPhotoIndex);
}

function setMainPhotoByClick(event)
{
    MAIN_PHOTO_ELEMENT.src = event.target.src;

    for ( let i = 0; i < IMG_MINI_COLLECTION.length; i++ ) {
        if (IMG_MINI_COLLECTION[i].src === event.target.src)
        {
            currentPhotoIndex = i;
            return;
        }
    }
}

function nextPhoto()
{
    currentPhotoIndex = currentPhotoIndex + 1;
    if (currentPhotoIndex == MAX_PHOTO_INDEX)
    {
        currentPhotoIndex = 0;
    }
    setMainPhoto();
}

function prevPhoto()
{
    currentPhotoIndex = currentPhotoIndex - 1;
    if (currentPhotoIndex < 0)
    {
        currentPhotoIndex = MAX_PHOTO_INDEX - 1;
    }
    setMainPhoto();
}

for ( let i = 0; i < IMG_MINI_COLLECTION.length; i++ ) {
    IMG_MINI_COLLECTION[i].onclick = setMainPhotoByClick;
}

PREV_PHOTO_ELEMENT.onclick = prevPhoto;
NEXT_PHOTO_ELEMENT.onclick = nextPhoto;