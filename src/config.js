let fetchURL = "http://127.0.0.1:5000/invoke"; //local
// fetchURL="http://10.0.2.2:5000/invoke";// local emulator
// fetchURL = "https://medbook1.herokuapp.com/invoke"; //live
// fetchURL='http://127.0.0.1:2020/invoke'//local-node

let mailURL = "https://medbook1.herokuapp.com/sendMail"; // live
mailURL = "http://127.0.0.1:5000/sendMail"; //local

export { fetchURL, mailURL };
