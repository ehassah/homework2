var DETAIL_IMAGE_SELECTOR = "[data-image-role = \"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role = \"title\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role = \"trigger\"]";

function setDetails(imageUrl, titleText) {
  "use strict";
  //var
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  //var
  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();

function getImageFromTarget() {
  "use strict";
  var detailImage = document.querySelector(DETAIL_TITLE_SELECTOR);
  return detailImage.textContent;
}

//finding the index of the target imageUrl
function findObjectByKey(array, key, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].getAttribute("data-image-title") == value) {
      var s = i;
      return s;
    }
  }
  return null;
}


//
function toggleRight() {
  "use strict";
  var currentIndex = findObjectByKey(getThumbnailsArray(), "data-image-title", getImageFromTarget());
  var arr = getThumbnailsArray();
  var index;
  if(currentIndex == arr.length-1 ){
    index = 0;
  }
  else{
    index = currentIndex+1;
  }
  var imageTitle = arr[index].getAttribute("data-image-title");
  var imageUrl = arr[index].getAttribute("data-image-url");
  setDetails(imageUrl, imageTitle);
}

function toggleLeft() {
  "use strict";
  var currentIndex = findObjectByKey(getThumbnailsArray(), "data-image-title", getImageFromTarget());
  var arr = getThumbnailsArray();
  var index;
  if(currentIndex == 0){
    index = arr.length-1;
  }
  else{
    index = currentIndex-1;
  }
  var imageTitle = arr[index].getAttribute("data-image-title");
  var imageUrl = arr[index].getAttribute("data-image-url");
  setDetails(imageUrl, imageTitle);
}

function toggle() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(toggleLeft);
  thumbnails.forEach(toggleRight);
}

toggle();
