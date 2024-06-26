/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  let today = new Date();
  let birthDate = new Date(data);
  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  postMessage(age);
});
