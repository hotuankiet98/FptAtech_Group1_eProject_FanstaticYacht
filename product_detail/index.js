const loginBtn = document.querySelector('.js-login')
const signIn = document.querySelector('.js-sign-in')
const signInContainer = document.querySelector('.js-signin-container')
const signInClose = document.querySelector('.js-signin-close')

const registerBtn = document.querySelector('.js-register')
const signUp = document.querySelector('.js-sign-up')
const signUpContainer = document.querySelector('.js-sign-up-container')
const signUpClose = document.querySelector('.js-signup-close')

function send(){
    alert("You send contact successfully!");
}

//hàm mở các form
function showSignIn() {
    signIn.classList.add('open')
}
function showSignUp() {
    signUp.classList.add('open')
}

//hàm đóng các form
function hideSignIn() {
    signIn.classList.remove('open')
}
function hideSignUp() {
    signUp.classList.remove('open')
}

// Nghe hành vi click
//sign-in
loginBtn.addEventListener('click', showSignIn)
signInClose.addEventListener('click', hideSignIn)
signIn.addEventListener('click', hideSignIn)
signInContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})

//sign-up
registerBtn.addEventListener('click', showSignUp)
signUpClose.addEventListener('click', hideSignUp)
signUp.addEventListener('click', hideSignUp)
signUpContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})

//sign up
let usernameIn = document.getElementById("user-name");
let emailIn = document.getElementById("email");
let passwordIn = document.getElementById("password");
let btnSignup = document.querySelector(".sign-up-btn");

btnSignup.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    username: usernameIn.value,
    email: emailIn.value,
    password: passwordIn.value,
  };
  let json = JSON.stringify(user);
  if (!usernameIn.value || !emailIn.value || !passwordIn.value) {
    alert("Please enter full information");
  } else {
    localStorage.setItem(usernameIn.value, json);
    alert("Sign Up Success");
    setTimeout(hideSignUp,500)
    setTimeout(showSignIn,500)
    
  }
});

//login
let username = document.getElementById("signIn-user-name");
let email = document.getElementById("signIn-email");
let password = document.getElementById("signIn-password");
let btnLogin = document.querySelector(".sign-in-btn");

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  let user = {
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(user);
  let json = JSON.stringify(user);
  if (!username.value || !email.value || !password.value) {
    alert("Please enter full information");
  }
  else if (localStorage.getItem(username.value) == json) {
    alert("Logged in successfully");
    document.querySelector(".user-name").innerHTML = username.value;
    setTimeout(hideSignIn,500)
    showUser ();
    hideUserLogin ();
  } else {
    alert("Login failed");
  }
});

//-----------------------------------------
const userLogout = document.querySelector('.js-dropdown-logout')
const userLogin = document.querySelector('.js-dropdown-login')
const logoutBtn = document.querySelector('.js-logout')

logoutBtn.addEventListener('click', function() {
    hideUser();
    showUserLogin();
    document.querySelector(".user-name").innerHTML = '';
})

function hideUser () {
    userLogout.classList.remove('open')
}
function showUser () {
    userLogout.classList.add('open')
}

function hideUserLogin () {
    userLogin.classList.add('close')
}

function showUserLogin () {
    userLogin.classList.remove('close')
}

function validator(formSelector) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = elementl.parentElement;
        }
    }

    var formRules = {};

    /*
     *Quy ước tạo rule:
     * - Nếu có lỗi thì return 'errỏr mssage'
     * - Nếu không có lỗi thì return 'undefind'
     */
    var validatorRules = {
        required: function (value) {
            return value ? undefined : 'Please enter this field';
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Please enter your email';
        },
        min: function (min) {
            return function(value) {
            return value.length >= min ? undefined : 'Please enter at least 6 characters';
            }
        },
    };

    //lấy ra form element trong DOM theo 'forrmSelector'
    var formElement = document.querySelector(formSelector)

    //chỉ xử lý element trong DOM
    var inputs = formElement.querySelectorAll('[name][rules]')
    for (var input of inputs) {

        var rules = input.getAttribute('rules').split('|')
        for (var rule of rules) {
            var ruleInfo;
            var isRuleHasValue = rule.includes(':');

            if(rule.includes(':')) {
                ruleInfo = rule.split(':')
                rule = ruleInfo[0];
            }

            var ruleFunc = validatorRules[rule];

            if (isRuleHasValue) {
                ruleFunc = ruleFunc(ruleInfo[1]);
            }

            if (Array.isArray(formRules[input.name])) {
                formRules[input.name].push(ruleFunc);
            } else {
                formRules[input.name] = [ruleFunc]; 
            }
        }


        //lắng nghe sự kiện để validate (blur, change, ...)

        input.onblur = handleValidate;
        input.oninput = handleClearError;

    }

    //Hàm thực hiện validate
    function handleValidate(event) {
        var rules = formRules[event.target.name];
        var errorMessage;
        
        rules.find(function (rule) {
            errorMessage = rule(event.target.value);
            return errorMessage;
        });

        //Nếu có lỗi thì hiển thị message ra UI
        if (errorMessage) {
            var formGroup = getParent(event.target, '.form-group');
            if (formGroup) {
                formGroup.classList.add('invalid')
                var formMessage = formGroup.querySelector('.form-message');
                if (formMessage) {
                    formMessage.innerText = errorMessage;
                }
            }
        }
        return !errorMessage;
    }

    function handleClearError(event) {
        var formGroup = getParent(event.target, '.form-group');
        if (formGroup.classList.contains('invalid')) {
            formGroup.classList.remove('invalid');
            var formMessage = formGroup.querySelector('.form-message');
            if (formMessage) {
                formMessage.innerText ='';
            }
        }
    }
   

    
}

filterSelection("all")
        function filterSelection(c){
            var x,i;
            x = document.getElementsByClassName('sale-img')
            if (c=="all") c="";
            for ( i =0 ; i<x.length; i++){
                w3RemoveClass(x[i], "show");
                if (x[i].className.indexOf(c) > -1)
                w3Addclass(x[i], "show");
            }
        }

        function w3Addclass(element, name) {
            var i, arr1, arr2;
            arr1 = element.className.split(" ");
            arr2 = name.split(" ");
            for (i=0; i< arr2.length; i++){
                if(arr1.indexOf(arr2[i]) == -1)
                {element.className += " " + arr2[i];}
            }
        }

        function w3RemoveClass(element, name){
            var i, arr1, arr2;
            arr1 = element.className.split(" ");
            arr2 = name.split(" ");
            for (i=0; i< arr2.length; i++){
                while(arr1.indexOf(arr2[i]) > -1){
                    arr1.splice(arr1.indexOf(arr2[i]), 1);
                }
            }
            element.className = arr1.join(" ");
        }

        //add
        var btnContainer = document.getElementById("myBtnContainer");
        var btns = btnContainer.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++){
            btns[i].addEventListener("click", function(){
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
        
        //FilterRent
        filterrent("all")
        function filterrent(c){
            var x,i;
            x = document.getElementsByClassName('rent-img')
            if (c=="all") c="";
            for ( i =0 ; i<x.length; i++){
                w3RemoveClass(x[i], "showrent");
                if (x[i].className.indexOf(c) > -1)
                w3Addclass(x[i], "showrent");
            }
        }

        function rentAddclass(element, name) {
            var i, arr1, arr2;
            arr1 = element.className.split(" ");
            arr2 = name.split(" ");
            for (i=0; i< arr2.length; i++){
                if(arr1.indexOf(arr2[i]) == -1)
                {element.className += " " + arr2[i];}
            }
        }

        function rentRemoveClass(element, name){
            var i, arr1, arr2;
            arr1 = element.className.split(" ");
            arr2 = name.split(" ");
            for (i=0; i< arr2.length; i++){
                while(arr1.indexOf(arr2[i]) > -1){
                    arr1.splice(arr1.indexOf(arr2[i]), 1);
                }
            }
            element.className = arr1.join(" ");
        }

        //add
        var btnRentContainer = document.getElementById("myRentBtnContainer");
        var btns = btnContainer.getElementsByClassName("btn");
        for (var i = 0; i < btns.length; i++){
            btns[i].addEventListener("click", function(){
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
        