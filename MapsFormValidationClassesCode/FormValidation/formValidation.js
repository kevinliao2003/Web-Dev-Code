/* IMPORTANT: Setting the function to call when submit is selected */
window.onsubmit = validateForm;

/* This function must return true or false 
   If true the data will be sent to the server. 
   If false the data will not be sent to the server */

function validateForm() {
    /* Retrieving the values */
    let name = document.getElementById("name").value;
    let account = document.getElementById("account").value;
    let payment = document.getElementById("payment").value;

    /* Validating numeric values */
    let invalidMessages = "";
    if (String(parseInt(account)) !== account) {
        invalidMessages += "Invalid account number provided.\n";
    }
    if (Number(payment) <= 0) {
        invalidMessages += "Invalid payment amount provided.";
    }

    if (invalidMessages !== "") {
        alert(invalidMessages);
        return false;
    } else {
        let valuesProvided = "Do you want to submit the following payment?\n";
        valuesProvided += "Name: " + name + "\n";
        valuesProvided += "Account: " + account + "\n";
        valuesProvided += "Payment: " + payment + "\n";
        /* We could write the following as return window.confirm(valuesProvided) */
        return window.confirm(valuesProvided);
    }
}
