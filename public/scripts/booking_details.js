var isInvalidEmail = false;
var isInvalidMobile = false;
var personal_info_counter = 1;

const urlArray = location.href.split('/')
const id = urlArray[urlArray.length - 1]
const fetchUrl = "http://localhost:3500/retrievebookingdetails/"+id
console.log(fetchUrl)
fetch(fetchUrl).then((res) => {
  return res.json()
}).then((data)=>{
  console.log(data)
})

function validateForm() {
  var emailValidation;
  var mobileValidation;

  emailValidation = checkEmail();
  mobileValidation = checkMobile();

  if ((emailValidation === false) && (mobileValidation === false)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "Please enter a valid mobile number";
  }
  else if ((emailValidation === false) && (mobileValidation === true)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid email address";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else if ((emailValidation === true) && (mobileValidation === false)) {
    document.getElementById('alert-zone-1').innerHTML = "Please enter a valid mobile number";
    document.getElementById('alert-zone-2').innerHTML = "";
  }
  else {
    document.getElementById('alert-zone-1').innerHTML = "";
    document.getElementById('alert-zone-2').innerHTML = "";
  }

  return emailValidation && mobileValidation;
}

function checkEmail() {
  var emailRegex = /^\S+@\S+\.\S+$/;

  var email = document.getElementById('email-input').value;

  if (email === '') {
    isInvalidEmail = false;
  }
  else if (!email.match(emailRegex)) {

    isInvalidEmail = true;
  }
  else {
    isInvalidEmail = false;
  }

  onFocusoutEmail();

  return !isInvalidEmail;
}

function checkMobile() {
  var mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

  var mobile = document.getElementById('mobile-input').value;

  if (mobile === '') {
    isInvalidMobile = false;
  }
  else if (!mobile.match(mobileRegex)) {
    isInvalidMobile = true;
  }
  else {
    isInvalidMobile = false;
  }

  onFocusoutMobile();
  disableButton();

  return !isInvalidMobile;
}

function onFocusinEmail() {
  document.getElementById('email-input').style.outline = "none";
  document.getElementById('email-input').style.backgroundColor = "white";
}

function onFocusoutEmail() {
  if (isInvalidEmail) {
    document.getElementById('email-input').style.backgroundColor = "#eb9898";
    document.getElementById('email-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('email-input').style.backgroundColor = "#a3d4ec";
    document.getElementById('email-input').style.outline = "none";
  }
}

function onFocusinMobile() {
  document.getElementById('mobile-input').style.outline = "none";
  document.getElementById('mobile-input').style.backgroundColor = "white";
}

function onFocusoutMobile() {
  if (isInvalidMobile) {
    document.getElementById('mobile-input').style.backgroundColor = "#eb9898";
    document.getElementById('mobile-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('mobile-input').style.backgroundColor = "#a3d4ec";
    document.getElementById('mobile-input').style.outline = "none";
  }
}

function disableButton() {
  var isAccepted = document.getElementById('accept-term-input');

  if (isInvalidMobile || isInvalidEmail || (isAccepted.checked == false)) {
    document.getElementById('submit-button').disabled = true;
  }
  else {
    document.getElementById('submit-button').disabled = false;
  }
}

function setDateRange() {
  var dateSelector = document.getElementsByName('date-select');

  var now = new Date()

  var year = now.getFullYear();
  var month = now.getMonth() + 1;   // As months start with 0
  var date = now.getDate();

  /*var next = addMonths(now, 1);

  var yearNext = next.getFullYear();
  var monthNext = next.getMonth() + 1;    // As months start with 0
  var dateNext = next.getDate();*/

  if (month < 10)
    month = '0' + month;

  if (date < 10)
    date = '0' + date;

  /*if (monthNext < 10)
    monthNext = '0' + monthNext;

  if (dateNext < 10)
    dateNext = '0' + dateNext;*/

  var formattedNow = year + '-' + month + '-' + date;
  // var formattedNext = yearNext + '-' + monthNext + '-' + dateNext;

  // console.log(formattedNow);
  // console.log(formattedNext);
  // console.log(dateSelector.length);

  for (var i = 0; i < dateSelector.length; i++) {
    dateSelector[i].max = formattedNow;
  }
}

function addMonths(date, months) {
  var d = date;
  d.setMonth(d.getMonth() + +months);

  return d;
}

setDateRange();

function multiplyForm(node) {
  var copy = node.cloneNode(true);

  var inputType = copy.getElementsByTagName('input');
  var textAreaType = copy.getElementsByTagName('textarea');

  textAreaType[0].value = '';

  for (var i = 0; i < inputType.length; i++) {
    inputType[i].value = '';
  }

  node.parentNode.append(copy);
}

function addPerson() {
  multiplyForm(document.querySelector('.personal-info-div'));
  personal_info_counter++;
  setDateRange();
}

function refreshPage(){
  personal_info_counter = 1;
  localStorage.clear();
  window.location.reload();
}

function submit_form() {
  console.log("trigger");
  localStorage.setItem("email", document.getElementById('email-input').value);
  localStorage.setItem("mobile", document.getElementById('mobile-input').value);

  localStorage.setItem("venue", document.getElementById('venue').value);
  // localStorage.setItem("date", document.getElementById('date').value);
  localStorage.setItem("movie", document.getElementById('movie').value);

  const venue = document.getElementById('venue').value
  const movieName = document.getElementById('movie').value
  const hrefArray = location.href.split('/')
  const movieId = hrefArray[hrefArray.length - 1]

  let info_array = [];

  localStorage.setItem("info_array", JSON.stringify(info_array));

  var person_infos = document.getElementsByName('person-personal-info');

  for (var i = 0; i < person_infos.length; i++) {
    var person_infos_children = person_infos[i].children;
    let temp_obj = [];

    for (var j = 0; j < person_infos_children.length; j++) {

      let temp_child = person_infos_children[j].children;
      let temp = temp_child[1].value;
      temp_obj.push(temp);
    }

    info_array = JSON.parse(localStorage.getItem("info_array") || "[]");
    info_array.push(temp_obj);


    localStorage.setItem("info_array", JSON.stringify(info_array));
  }

  // console.log(localStorage.getItem("info_array"));

  // console.log(personal_info_counter);

  let url_string = '/booking/' + venue + '/' + movieId + '/' +personal_info_counter;

  location.href = url_string;
}

// .onclick= {
//   localStorage.setjndd////..

//   location.href = "/booking/filmid/venueid/date/timing/3"
// }

document.getElementById('email-input').addEventListener("focusin", onFocusinEmail);
document.getElementById('email-input').addEventListener("focusout", onFocusoutEmail);

document.getElementById('mobile-input').addEventListener("focusin", onFocusinMobile);
document.getElementById('mobile-input').addEventListener("focusout", onFocusoutMobile);
