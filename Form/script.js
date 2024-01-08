var isPass = true;

document.getElementById("name").focus();

document.getElementById("name").onblur = function () {
  this.value = nameStandardlize(this.value);
};

document.getElementById("date-of-birth").addEventListener("keyup", function () {
  let inputDate = document.getElementById("date-of-birth").value;
  let formattedDate = inputDate
    .replace(/^(\d\d)(\d)$/g, "$1/$2")
    .replace(/^(\d\d\/\d\d)(\d+)$/g, "$1/$2")
    .replace(/[^\d\/]/g, "");
  document.getElementById("date-of-birth").value = formattedDate;
});

document.getElementById("phone-number").addEventListener("keyup", function () {
  let inputPhoneNumber = document.getElementById("phone-number").value;
  let formattedPhoneNumber = inputPhoneNumber.replace(/[^\d\/]/g, "");
  document.getElementById("phone-number").value = formattedPhoneNumber;
});

function nameStandardlize(name) {
  let ss = name.split(" ");
  standardName = "";
  for (i = 0; i < ss.length; i++)
    if (ss[i].length > 0) {
      if (standardName.length > 0) standardName = standardName + " ";
      standardName = standardName + ss[i].substring(0, 1).toUpperCase();
      standardName = standardName + ss[i].substring(1).toLowerCase();
    }
  return standardName;
}

function jumpTo(e, nextInputId) {
  if (window.event) {
    e = window.event;
  }
  if (e.keyCode == 13) {
    document.getElementById(nextInputId).focus();
  }
}

function checkName(name) {
  const numberChars = /\d/;
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  document.getElementById("name-error").innerHTML = "";
  let notice = "";
  if (name == null || name == "") {
    notice = "Name cannot be blank!";
    isPass = false;
  } else if (numberChars.test(name)) {
    notice = "Name is not valid!";
    isPass = false;
  } else if (specialChars.test(name)) {
    notice = "Name is not valid!";
    isPass = false;
  }
  document.getElementById("name-error").innerHTML = notice;
}

function checkDate(date) {
  document.getElementById("date-of-birth-error").innerHTML = "";
  let notice = "";
  if (date == null || date == "") {
    notice = "Date of birth cannot be blank!";
    isPass = false;
  } else {
    let [day, month, year] = date.split("/");
    month = parseInt(month, 10) - 1; // month is zero-indexed in Date constructor

    // create a new Date object and check if the date is valid
    let validDate = new Date(year, month, day);
    let isValidDate =
      validDate.getDate() == day &&
      validDate.getMonth() == month &&
      validDate.getFullYear() == year;
    if (!isValidDate) {
      notice = "Date of birth is invalid!";
      isPass = false;
    }
  }
  document.getElementById("date-of-birth-error").innerHTML = notice;
}

function checkEmail(email) {
  document.getElementById("email-error").innerHTML = "";
  let notice = "";
  if (email == null || email == "") {
    notice = "Email cannot be blank!";
    isPass = false;
  } else {
    const allowedDomains = [
      "gmail.com",
      "vnu.edu.vn",
      "outlook.com",
      "yahoo.com",
    ];
    const emailPattern = new RegExp(
      `^[^\\s@]+@(?:${allowedDomains.join("|")})$`,
      "i"
    );
    let isValid = emailPattern.test(email, allowedDomains);
    if (!isValid) {
      notice = "Email is invalid!";
      isPass = false;
    }
  }
  document.getElementById("email-error").innerHTML = notice;
}

function checkPhoneNumber(phoneNumber) {
  document.getElementById("phone-number-error").innerHTML = "";
  let notice = "";
  if (phoneNumber.length < 10 && phoneNumber.length > 0) {
    notice = "Phone number is invalid!";
    isPass = false;
  }
  document.getElementById("phone-number-error").innerHTML = notice;
}

function checkUsername(username) {
  document.getElementById("username-error").innerHTML = "";
  let notice = "";
  if (username == null || username == "") {
    notice = "Username cannot be blank!";
    isPass = false;
  }
  document.getElementById("username-error").innerHTML = notice;
}

function checkPassword(password) {
  document.getElementById("password-error").innerHTML = "";
  notice = "";
  if (password == null || password == "") {
    notice = "Password cannot be blank!";
    isPass = false;
  } else if (password.length > 0 && password.length < 8) {
    notice = "Password must have at least 8 characters!";
    isPass = false;
  }
  document.getElementById("password-error").innerHTML = notice;
}

function checkRetypePassword(retypePassword) {
  document.getElementById("retype-password-error").innerHTML = "";
  notice = "";
  if (retypePassword == null || retypePassword == "") {
    notice = "Retype-password cannot be blank!";
    isPass = false;
  } else if (retypePassword != document.getElementById("password").value) {
    notice = "Retype-password and password are different!";
    isPass = false;
  }
  document.getElementById("retype-password-error").innerHTML = notice;
}

document.getElementById("picture-upload").onchange = function () {
  let preview = document.querySelector("img.preview");
  let file = this.files[0];
  let reader = new FileReader();
  reader.onload = function () {
    preview.src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
    preview.classList.remove("nodisplay");
  }
};

function checkAll() {
  isPass = true;
  checkName(document.getElementById("name").value);
  checkDate(document.getElementById("date-of-birth").value);
  checkEmail(document.getElementById("email").value);
  checkPhoneNumber(document.getElementById("phone-number").value);
  checkUsername(document.getElementById("username").value);
  checkPassword(document.getElementById("password").value);
  checkRetypePassword(document.getElementById("retype-password").value);
  setTimeout(function () {
    if (isPass) {
      alert("Successfully!");
    }
  }, 100);
}

function cancelForm() {
  if (confirm("You sure to cancel?")) {
    location.reload();
  }
}
