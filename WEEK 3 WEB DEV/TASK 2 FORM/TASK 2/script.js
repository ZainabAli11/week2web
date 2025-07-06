function checkPasswordStrength() {
  var password = document.getElementById('password').value;
  var strengthText = document.getElementById('passwordStrength');

  var strength = "Weak";
  var color = "red";

  if (password.length < 6) {
    strength = "Weak";
    color = "red";
  } else {
    var hasLetter = /[a-zA-Z]/.test(password);
    var hasNumber = /\d/.test(password);
    var hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length >= 8 && hasLetter && hasNumber && hasSpecial) {
      strength = "Strong";
      color = "green";
    } else if (hasLetter && hasNumber) {
      strength = "Medium";
      color = "orange";
    } else {
      strength = "Weak";
      color = "red";
    }
  }

  strengthText.textContent = strength;
  strengthText.style.color = color;
}

function togglePassword() {
  var passwordInput = document.getElementById('password');
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

function validateForm() {
  document.getElementById('nameError').innerText = "";
  document.getElementById('emailError').innerText = "";
  document.getElementById('passwordError').innerText = "";
  document.getElementById('successMessage').innerText = "";

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value.trim();

  var valid = true;

  if (name === "") {
    document.getElementById('nameError').innerText = "Name is required.";
    valid = false;
  }

  var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email === "") {
    document.getElementById('emailError').innerText = "Email is required.";
    valid = false;
  } else if (!email.match(emailPattern)) {
    document.getElementById('emailError').innerText = "Invalid email format.";
    valid = false;
  }

  if (password === "") {
    document.getElementById('passwordError').innerText = "Password is required.";
    valid = false;
  } else if (password.length < 6) {
    document.getElementById('passwordError').innerText = "Password must be at least 6 characters.";
    valid = false;
  }

  if (valid) {
    document.getElementById('successMessage').innerText = "Form submitted successfully!";
  }

  return false;
}
