const form = document.querySelector("form");
nField = form.querySelector(".name");
nInput = nField.querySelector("input");
eField = form.querySelector(".email");
eInput = eField.querySelector("input");
pField = form.querySelector(".password");
pInput = pField.querySelector("input");
p1Field = form.querySelector(".password1");
p1Input = p1Field.querySelector("input");
cField = form.querySelector(".number");
cInput = cField.querySelector("input");

form.onsubmit = (e)=>{
  e.preventDefault(); //preventing from form submitting
  //if email and password is blank then add shake class in it else call specified function
  (nInput.value == "") ? nField.classList.add("shake", "error") : checkName();
  (eInput.value == "") ? eField.classList.add("shake", "error") : checkEmail();
  (pInput.value == "") ? pField.classList.add("shake", "error") : checkPass();
  (p1Input.value == "") ? p1Field.classList.add("shake", "error") : checkPass1();
  (cInput.value == "") ? cField.classList.add("shake", "error") : checkNumber();

  setTimeout(()=>{ //remove shake class after 500ms
    nField.classList.remove("shake");
    eField.classList.remove("shake");
    pField.classList.remove("shake");
    p1Field.classList.remove("shake");
    cField.classList.remove("shake");
  }, 500);

  nInput.onkeyup = ()=>{checkName();} 
  eInput.onkeyup = ()=>{checkEmail();} //calling checkEmail function on email input keyup
  pInput.onkeyup = ()=>{checkPass();} //calling checkPassword function on pass input keyup
  p1Input.onkeyup = ()=>{checkPass1();} 
  cInput.onkeyup = ()=>{checkNumber();} 

  function checkName(){
    if(nInput.value == ""){ 
      nField.classList.add("error");
      nField.classList.remove("valid");
    } else if (nInput.value.length<=3){
        let errorTxt = nField.querySelector(".error-txt");
        (nInput.value != "") ? errorTxt.innerText = "Enter full name" : errorTxt.innerText = "Name cannot be blank";
    }
    else{ //if pass is empty then remove error and add valid class
      nField.classList.remove("error");
      nField.classList.add("valid");
    }
  }


  function checkEmail(){ 
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/; 
    if(!eInput.value.match(pattern)){ 
      eField.classList.add("error");
      eField.classList.remove("valid");
      let errorTxt = eField.querySelector(".error-txt");
      
      (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address" : errorTxt.innerText = "Email can't be blank";
    }else{ 
      eField.classList.remove("error");
      eField.classList.add("valid");
    }
  }

  function checkPass(){ 
    
    if(pInput.value == ""){
      pField.classList.add("error");
      pField.classList.remove("valid");
    }
    else{ 
        let timeout;


        const  password = document.getElementById('password');
        let strengthBadge = document.getElementById('StrengthDisp');
    
    
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})');
        let mediumPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{9,})');
        let weakPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    
        
        function StrengthChecker(PasswordParameter){
    
            if(strongPassword.test(PasswordParameter)) {
                strengthBadge.style.backgroundColor = "green";
                password.style.borderColor = "green";
                strengthBadge.textContent = 'Strong';
                strengthBadge.style.fontSize="12px";
                validp();
                
                
                
            } else if(mediumPassword.test(PasswordParameter)){
                strengthBadge.style.backgroundColor = 'blue';
                password.style.borderColor = "blue";
                strengthBadge.textContent = 'Medium';
                strengthBadge.style.fontSize="12px";
                validp();
                
                
            } else if(weakPassword.test(PasswordParameter)){
                strengthBadge.style.backgroundColor = 'Orange';
                password.style.borderColor = "orange";
                strengthBadge.textContent = 'Weak';
                strengthBadge.style.fontSize="12px";
                validp();
                
            }
            else{
                strengthBadge.style.backgroundColor = 'red';
                password.style.borderColor = "red";
                strengthBadge.textContent = 'Invalid password!';
                strengthBadge.style.fontSize="12px";
                invalid();              
    
            }
        }
    
        
        password.addEventListener('input', () => {
    
    
            strengthBadge.style.display= 'block';
            clearTimeout(timeout);
    
    
            timeout = setTimeout(() => StrengthChecker(password.value), 500);
    
    
            if(password.value.length !== 0){
                strengthBadge.style.display != 'block';
            } else{
                strengthBadge.style.display = 'none';
            }
        }); 
      
    }
    function invalid(){
        pField.classList.remove("valid");
         pField.classList.add("error");
    }
    function validp(){
     pField.classList.remove("error");
      pField.classList.add("valid");
    }
  }

  function checkPass1(){ 
    if(!p1Input.value.match(pInput.value)){ 
        p1Field.classList.add("error");
        p1Field.classList.remove("valid");
        let errorTxt = p1Field.querySelector(".error-txt");
        
        (p1Input.value != "") ? errorTxt.innerText = "Passwords don't match" : errorTxt.innerText = "Password cannot be blank";
      }else{ 
        p1Field.classList.remove("error");
        p1Field.classList.add("valid");
      }
  }

  function checkNumber(){ 
      let pattern1 = /^\s*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})\s*$/;
    //   let pattern2 = /^[0-9]{3}\-\.\ [0-9]{3}\-\.\ [0-9]{4}$/;
    if(!cInput.value.match(pattern1)){
        cField.classList.add("error");
      cField.classList.remove("valid");
      let errorTxt = cField.querySelector(".error-txt");
      
      (cInput.value != "") ? errorTxt.innerText = "Enter a valid phone number" : errorTxt.innerText = "Contact number cannot be blank";
    }else{ 
      cField.classList.remove("error");
      cField.classList.add("valid");
    }
  }

  //if eField and pField doesn't contains error class that mean user filled details properly
  if(!nField.classList.contains("error") && !eField.classList.contains("error") && !pField.classList.contains("error") && !p1Field.classList.contains("error") && !cField.classList.contains("error")){
    window.location.href = form.getAttribute("action"); //redirecting user to the specified url which is inside action attribute of form tag
  }
}

function Pop() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }