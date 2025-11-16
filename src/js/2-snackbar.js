import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

// const submitForm = document.querySelector('.form');
// const delayInput = document.querySelector('input[name="delay"]');
// const fulInput = document.querySelector('input[value="fulfilled"]');
// const rejInput = document.querySelector('input[value="rejected"]');

// const executor = (resolve,reject) => {
//     const inputValue = parseInt(delayInput.value);
//     const fulCheck = fulInput.checked;
//     const rejCheck = rejInput.checked;
//     setTimeout (() => {
//         if (fulCheck) {
//             resolve(inputValue)
//         } else if (rejCheck) {
//             reject(inputValue)
//         }
//     }, inputValue)
// }

// const onFormSubmit = event => {
//     event.preventDefault();
//     const promise = new Promise(executor);
//     promise.then(ms => {
//         iziToast.show({
//             message: ✅ Fulfilled promise in ${ms}ms,
//             color: 'green',
//             position: 'topRight'
//         });
//     }).catch(error => {
//         iziToast.show({
//             message: ❌ Rejected promise in ${error}ms,
//             color: 'red',
//             position: 'topRight'
//         });
//     })
// };

// submitForm.addEventListener('submit', onFormSubmit);
const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(ms => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${ms}ms`,
        position: 'topRight',
        backgroundColor: 'green',
        messageColor: 'white',
      });
    })
    .catch(ms => {
      iziToast.show({
        message: `❌ Rejected promise in ${ms}ms`,
        position: 'topRight',
        backgroundColor: 'red',
        messageColor: 'white',
      });
    });
});