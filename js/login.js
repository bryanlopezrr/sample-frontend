window.onload = function () {
    const form = document.querySelector(".loginForm");
    // if the form exists, run the class
    if (form) {
        // setup the fields we want to validate, we only have two but you can add others
        const fields = ["userinput", "passinput"];
        // run the class
        const validator = new Login(form, fields);
    }


}


function closeModal(modal_container) {

    // doesnt work
    // var script = document.createElement('h1');
    // script.src = "./js/script.js?version=17" 
    // script.countdown="on"
    // script.label="Please complete the following: "
    // script.enemies="3"
    // document.getElementById('parent').appendChild(script)
    

    modal_container.style.opacity = '0'
    modal_container.style.pointerEvents = 'none'
}

function openModal(modal_container) {
    modal_container.style.opacity = '1'
    modal_container.style.pointerEvents = 'auto'
}

class Login {
    constructor(form, fields) {
        
        this.form = form;
        this.fields = fields;
        this.validateonSubmit();
    }
    


    validateonSubmit() {
        let instance = this;
        
        this.form.addEventListener("submit", (e) => {

            // remove default functionality 
            e.preventDefault();
            var error = 0;
            // loop through the fields and check them against a function for validation
            instance.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`);
                if (instance.validateFields(input) == false) {
                    // if a field does not validate, auto-increment our error integer
                    error++;
                }
                
                // if everything validates, error will be 0 and can continue
                if (error == 0 ) {
                    //do login api here or in this case, just submit the form and set a localStorage item
                    //modal function here
                    const modal_container = document.getElementById('modal-container');
                    const open = document.getElementById('openButton');
                    const close = document.getElementById('closeButton');
                    
                    open.addEventListener('click', function(){ 
                        openModal(modal_container)
                    })

                    close.addEventListener('click', function(){
                        closeModal(modal_container)
                    })
                    
            
                    const credentials = document.getElementById('loginForm');
                    if(credentials.elements['userinput'].value == "username" && 
                       credentials.elements['passinput'].value == "password"){
                        localStorage.setItem("auth", 1);
                        this.form.submit();
                    }
                    else{
                       //figure out how to add error message for wrong credentials and avoid error 
                    }                    

                }
            });
 
        })
    }

    validateFields(field) {
        // remove any whitespace and check to see if the field is blank, if so return false
        if (field.value.trim() === "") {
            // set the status based on the field, the field label, and if it is an error message
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} Password cannot be blank`,
                "error"
            );
            return false;
        } else {
            // if the field is not blank, check to see if it is password
            if (field.type == "password") {
                // if it is a password, check to see if it meets our minimum character requirement
                if (field.value.length < 8) {
                    // set the status based on the field, the field label, and if it is an error message
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} Password must be at least 8 characters`,
                        "error"
                    );
                    return false;
                } else {
                    // set the status based on the field without text and return a success message
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                // set the status based on the field without text and return a success message
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }
    setStatus(field, message, status) {
        // create variable to hold message
        const errorMessage = field.parentElement.querySelector(".error-message");

        // if success, remove messages and error classes
        if (status == "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }
        // if error, add messages and add error classes
        if (status == "error") {
            errorMessage.innerText = message;
            field.classList.add("input-error");
        }
    }
}