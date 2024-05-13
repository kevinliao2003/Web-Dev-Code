
document.querySelector("#myTextField").onchange = displaySqrts;

function displaySqrts() {
    let maximum = Number(document.querySelector("#myTextField").value);

    let answer = "<table border='1'>";
    for (let i = 1; i <= maximum; i++) {
        answer += "<tr>";
        answer += "<td>" + i + "</td>";
        answer += "<td>" + Math.sqrt(i) + "</td>";
        answer += "</tr>";

    }
    answer += "</table>";
    document.querySelector("#displayArea").innerHTML = answer;
}
