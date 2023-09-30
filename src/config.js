let fetchURL = "https://meddbook-server.onrender.com/invoke";
let mailURL = "https://meddbook-server.onrender.com/sendMail";
let uploadUrl = "https://meddbook-server.onrender.com/upload";
let downloadUrl = "https://meddbook-server.onrender.com/retrieve";
let socketURL = "https://meddbook-server.onrender.com";

if (__DEV__) {
  fetchURL = "http://127.0.0.1:5000/invoke";
  mailURL = "http://127.0.0.1:5000/sendMail";
  uploadUrl = "http://127.0.0.1/upload";
  downloadUrl = "http://127.0.0.1/retrieve";
  socketURL = "http://127.0.0.1:5000";
}

export default {
  fetchURL,
  mailURL,
  uploadUrl,
  downloadUrl,
  socketURL,
};
