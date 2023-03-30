var isPassSame = true;

function validateForm() {
  var passValidation = checkPassword();

  if (passValidation === false) {
    document.getElementById('alert-zone').innerHTML = "Password does not match";
  }
  else {
    document.getElementById('alert-zone').innerHTML = "";
  }

  return passValidation;
}

function checkPassword() {
  console.log('checkPassword');

  var pass = document.getElementById('password-input').value;
  var repass = document.getElementById('repassword-input').value;

  if (pass !== repass) {
    isPassSame = false;

  }
  else {
    isPassSame = true;
  }

  onFocusoutPass();
  onFocusoutRePass();
  disableButton();

  return isPassSame;
}

function onFocusinPass() {
  document.getElementById('password-input').style.outline = "none";
  document.getElementById('password-input').style.backgroundColor = "#789";
}

function onFocusinRePass() {
  document.getElementById('repassword-input').style.outline = "none";
  document.getElementById('repassword-input').style.backgroundColor = "#789";
}

function onFocusoutPass() {
  if (!isPassSame) {
    document.getElementById('password-input').style.backgroundColor = "#eb9898";
    document.getElementById('password-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('password-input').style.outline = "none";
    document.getElementById('password-input').style.backgroundColor = "#456";
  }
}

function onFocusoutRePass() {
  if (!isPassSame) {
    document.getElementById('repassword-input').style.backgroundColor = "#eb9898";
    document.getElementById('repassword-input').style.outline = "2px solid red";
  }
  else {
    document.getElementById('repassword-input').style.backgroundColor = "#456";
    document.getElementById('repassword-input').style.outline = "none";
  }
}

function disableButton() {
  if (!isPassSame) {
    document.getElementById('submit-button').disabled = true;
  }
  else {
    document.getElementById('submit-button').disabled = false;
  }
}

document.getElementById('password-input').addEventListener("focusin", onFocusinPass);
document.getElementById('password-input').addEventListener("focusout", onFocusoutPass);

document.getElementById('repassword-input').addEventListener("focusin", onFocusinRePass);
document.getElementById('repassword-input').addEventListener("focusout", onFocusoutRePass);
