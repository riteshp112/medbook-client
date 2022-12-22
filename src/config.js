let fetchURL = "http://127.0.0.1:5000/invoke"; //local
// fetchURL="http://10.0.2.2:5000/invoke";// local emulator
// fetchURL = "https://riteshp112.pythonanywhere.com/invoke"; //live
// fetchURL='http://127.0.0.1:2020/invoke'//local-node
// fetchURL = "https://medbook1.herokuapp.com/invoke"
// fetchURL='https://medbook-server.azurewebsites.net/invoke'
fetchURL = "https://meddbook-server.onrender.com/invoke";

let mailURL = "https://riteshp112.pythonanywhere.com/sendMail"; // live
// mailURL = "http://127.0.0.1:5000/sendMail"; //local
// mailURL = "https://medbook1.herokuapp.com/sendMail"
// mailURL = "https://medbook-server.azurewebsites.net/sendMail";
mailURL = "https://meddbook-server.onrender.com/sendMail";

export { fetchURL, mailURL };
