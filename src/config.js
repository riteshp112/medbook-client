let fetchURL = "http://127.0.0.1:5001/user/getUserByToken"; //local
// fetchURL="http://10.0.2.2:5000/invoke";// local emulator
// fetchURL='http://127.0.0.1:2020/invoke'//local-node
// fetchURL='https://medbook-server.azurewebsites.net/invoke'
// fetchURL = "https://meddbook-server.onrender.com/invoke";

let mailURL = "http://127.0.0.1:5001/sendMail"; //local
// mailURL = "https://medbook1.herokuapp.com/sendMail"
// mailURL = "https://medbook-server.azurewebsites.net/sendMail";
// mailURL = "https://meddbook-server.onrender.com/sendMail";

let socketUrl = "http://127.0.0.1:5001";
// socketUrl = "https://meddbook-server.onrender.com";

export { fetchURL, mailURL, socketUrl };
