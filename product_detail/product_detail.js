
var loginBtn = document.querySelector('.js-login')
var signIn = document.querySelector('.js-sign-in')
var signInContainer = document.querySelector('.js-signin-container')
var signInClose = document.querySelector('.js-signin-close')

var registerBtn = document.querySelector('.js-register')
var signUp = document.querySelector('.js-sign-up')
var signUpContainer = document.querySelector('.js-sign-up-container')
var signUpClose = document.querySelector('.js-signup-close')

var callBtn = document.querySelector('.js-call-btn')
var callRequest = document.querySelector('.js-call-request')
var callRequestContainer = document.querySelector('.js-call-container')

var callRequestClose = document.querySelector('.js-call-close')

var userLogout = document.querySelector('.js-dropdown-logout')
var userLogin = document.querySelector('.js-dropdown-login')
var logoutBtn = document.querySelector('.js-logout')


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

function showSignIn() {
    signIn.classList.add('open');
}
function showSignUp() {
    signUp.classList.add('open');
}


function hideSignIn() {
    signIn.classList.remove('open');
}
function hideSignUp() {
    signUp.classList.remove('open');
}


var mainApp={
  
handleEvent(){
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

   
    
  
    


},
angularJsEvent(){
    var app=angular.module('myApp',[]);
    app.config(['$compileProvider',
        function($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
        }]);
    app.controller("myController",function($scope,$http,$window){
        $http.get('yachts.json').then(function(response){
            $scope.list=response.data.yachtsList;
            $scope.openEvent=function(item){
                    $scope.openActive=item;    
            }
            $scope.closeEvent=function(item){
                if($scope.openActive==item){
                    $scope.openActive='';    
                }  
            }
            $scope.favoriteNum=0;
            $scope.showAddBtn=function(item){
                if($scope.showAdd==true){
                    $scope.showAdd=!$scope.showAdd;
                    $scope.favoriteNum=0;
                    $scope.hideFavoriteTable=false;
                }else{
                    $scope.showAdd=true;
                    $scope.favoriteNum=1;
                    $scope.hideFavoriteTable=true;
                }
            }
            $scope.senEmail=function(){
                emailjs.send("service_ial1gm1","template_aua3mki",{
                    from_name: "Fanstatic Yacht",
                    to_name: $scope.myName,
                    email_id: $scope.myEmail,
                    phone: $scope.myPhone,
                    }).then(function(res){
                        alert("Thank you !Information has been sent to your email!"+res.status)
                    });
            }

        })
        $scope.downloadInfo=function(item){
            var jsObj = $scope.list[item-1];
            
              var blob = new Blob([angular.toJson(jsObj)], {
                type: 'text/json;charset=utf-8'
              });
            
              var downloadLink = angular.element('<a></a>');
            
              var url = $window.URL || $window.webkitURL;
            
              downloadLink.attr('href', url.createObjectURL(blob));
            
              downloadLink.attr('download', 'info.doc');
            
              downloadLink[0].click();
        }
    });
   
},

start(){
    this.angularJsEvent();
    this.handleEvent();
    }
   

    
}
mainApp.start()


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
  } else {
    alert("Login failed");
  }
});



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