//Select Login form fields
const loginUsernameEl = document.querySelector("#loginUsername");
const loginPasswordEl = document.querySelector("#loginPassword");

const loginForm = document.querySelector("#login");

//Select the Account form fields
const usernameEl = document.querySelector("#signupUsername");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#createPassword");
const confirmPasswordEl = document.querySelector("#confirmPassword");

const accountForm = document.querySelector("#createAccount");

// Select the Reset form fields
const resetPasswordEl = document.querySelector("#reset-password");
const resetForm = document.querySelector("#reset");

// Input field validating functions
const checkUsername = () => {

    let valid = false;
    const min = 6,
        max = 20;
        
    const username = usernameEl.value.trim();

    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;

    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
}

const checkPassword = () => {

    let valid = false;

    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#_$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
  
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'Confirm password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }

    return valid;
};


const checkLoginUsername = () => {
    let valid = false;
   
    const loginUsername = loginUsernameEl.value.trim();
    const username = usernameEl.value.trim();

    if (!isRequired(loginUsername)) {
        showError(loginUsernameEl, 'Please enter your username');
    } else if (username !== loginUsername) {
        showError(loginUsernameEl, 'Incorrect username');
    } else {
        showSuccess(loginUsernameEl);
        valid = true;
    }

    return valid;
};


const checkLoginPassword = () => {
    let valid = false;
    
    const loginPassword = loginPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(loginPasswordEl)) {
        showError(loginPasswordEl, 'Please enter your password');
    } else if (password !== loginPassword) {
        showError(loginPasswordEl, 'Incorrect password');
    } else {
        showSuccess(loginPasswordEl);
        valid = true;
    }

    return valid;
};


// Utility functions
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isRequired = value => value === "" ? false : true;

const isBetween = (length, min, max) => length < min || length > max ? false : true;


//Functions that show the error / success
const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");

    const error = formField.querySelector("small");
    error.textContent = message;
    error.style.color = "#cc3333";
};

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");

    const error = formField.querySelector("small");
    error.textContent = "";
};


// submit event listener for Account form
accountForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // validate forms
    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

accountForm.addEventListener('input', debounce((e) => {
    switch (e.target.id) {
        case 'signupUsername':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'createPassword':
            checkPassword();
            break;
        case 'confirmPassword':
            checkConfirmPassword();
            break;
    }
}));


// submit event listener for Login form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // validate forms
    let isLoginUsernameValid = checkLoginUsername(),
        isLoginPasswordValid = checkLoginPassword();
        
    let isLoginFormValid = isLoginUsernameValid &&
        isLoginPasswordValid;

    // submit to the server if the form is valid
    if (isLoginFormValid) {

    }
});

const lgDebounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

loginForm.addEventListener('input', lgDebounce((e) => {
    switch (e.target.id) {
        case 'loginUsername':
            checkLoginUsername();
            break;
        case 'loginPassword':
           checkLoginPassword()
            break;
    }
}));


// submit event listener for Retrieve Password form
resetForm.addEventListener("submit", (e) =>{
    e.preventDefault();

});

// Switch between Login, Create Account and Reset
document.querySelector("#linkCreateAccount").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        resetForm.classList.add("form--hidden");
        accountForm.classList.remove("form--hidden");
    });

document.querySelector("#linkLogin").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        resetForm.classList.add("form--hidden");
        accountForm.classList.add("form--hidden");
    });

document.querySelector("#linkReset").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        resetForm.classList.remove("form--hidden");
        accountForm.classList.add("form--hidden");
    });
