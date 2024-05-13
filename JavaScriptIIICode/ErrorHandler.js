
window.onerror = handleErr;

function handleErr(msg, url, line) {
   let message = "Error: " + msg + "\n";

   message += "URL: " + url + "\n";
   message += "Line Number: " + line;
   alert(message);

   return true;
}
