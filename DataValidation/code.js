window.onsubmit = verifyInfo;

/*function main() {
    document.getElementById("submitInfo").addEventListener("click", verifyInfo);
}*/

function verifyInfo() {
    let errorMessage = ""; //single error message to display

    /* 
    Verify that a valid phone number has been provided.
    A valid phone number has the format ### ### #### where # is a digit. 
    The message "Invalid phone number" will be generated if an invalid phone number is provided.
    */
    let phonePart1 = document.getElementById("phoneFirstPart").value;
    let phonePart2 = document.getElementById("phoneSecondPart").value;
    let phonePart3 = document.getElementById("phoneThirdPart").value;
    if (!(phonePart1.length === 3 && phonePart2.length == 3 && phonePart3.length == 4 &&
        typeof phonePart1 === 'string' && !isNaN(phonePart1) &&
        typeof phonePart2 === 'string' && !isNaN(phonePart2) &&
        typeof phonePart3 === 'string' && !isNaN(phonePart3))) {
            errorMessage += "Invalid phone number\n";
    }

    /*
    Verify that at least one condition ("High Blood Pressure","Diabetes", "Glaucoma", "Asthma", "None") 
    has been selected.
    If no condition is provided, your program must generate the error message "No conditions selected". 
    If the user selects any condition and also "None", your program will generate the error message "Invalid conditions selection".
    */
    let conditionsChecked = 0 //number of conditions selected
    let conditions = ["highBloodPressure", "diabetes", "glaucoma", "asthma", "none"];
    for (let i=0; i<conditions.length;i++) {
        if (document.getElementById(conditions[i]).checked) {
            conditionsChecked += 1
        }
    }

    if (conditionsChecked==0) {
        errorMessage += "No conditions selected\n";
    } else if (conditionsChecked>1 && document.getElementById("none").checked) {
        errorMessage += "No conditions selected\n";
    }
   
    /*
    Verify that at least one time period was selected.
    Your program will generate the message "No time period selected" if none has been selected.
    */
    let timesSelected = 0 //number of time periods selected
    let timePeriods = ["never", "lessThanAYear", "oneToTwo", "moreThanTwo"]
    for (let i=0; i<timePeriods.length;i++) {
        if (document.getElementById(timePeriods[i]).checked) {
            timesSelected += 1
        }
    }

    if (timesSelected==0) {
        errorMessage += "No time period selected\n";
    }

    /*
    Verify that a valid study id has been provided.
    Valid ids have the following format A### B### where # is a digit. 
    Your program will generate the message "Invalid study id" if an invalid id is provided.
    */
    let firstFour = document.getElementById("firstFourDigits").value;
    let secondFour = document.getElementById("secondFourDigits").value;
    if (!(firstFour.length === 4 && secondFour.length === 4 &&
        firstFour.charAt(0) === 'A' && !isNaN(firstFour.slice(1)) &&
        secondFour.charAt(0) === 'B' && !isNaN(secondFour.slice(1)))) {
            errorMessage += "Invalid study id\n";
    }

    //if there're errors, display them using alert
    if (errorMessage !== "") {
        alert(errorMessage);
        return false;
    } else {
        //when all data is valid
        alert("Do you want to submit the form data?");
        return true;
    }
}