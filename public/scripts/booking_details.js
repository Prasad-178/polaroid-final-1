var isInvalidEmail = false;
var isInvalidMobile = false;

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

  setDateRange();
}

function refreshPage(){
    window.location.reload();
}

document.getElementById('email-input').addEventListener("focusin", onFocusinEmail);
document.getElementById('email-input').addEventListener("focusout", onFocusoutEmail);

document.getElementById('mobile-input').addEventListener("focusin", onFocusinMobile);
document.getElementById('mobile-input').addEventListener("focusout", onFocusoutMobile);
