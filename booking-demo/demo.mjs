import { confirmDemoDeposit, createDemoReservation } from './src/reservation.mjs';

const form = document.querySelector('#booking-form');
const formPanel = document.querySelector('#form-panel');
const resultPanel = document.querySelector('#result-panel');
const error = document.querySelector('#form-error');
const confirmButton = document.querySelector('#confirm-button');
let reservation;

function renderReservation() {
  document.querySelector('#experience-name').textContent = reservation.experienceName;
  document.querySelector('#booking-summary').textContent = `${reservation.date} at ${reservation.time} · ${reservation.guests} guests`;
  document.querySelector('#reference').textContent = reservation.reference;
  document.querySelector('#deposit').textContent = reservation.deposit;
  document.querySelector('#status').textContent = reservation.status;
  confirmButton.hidden = reservation.status === 'Deposit confirmed';
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  error.textContent = '';
  try {
    reservation = createDemoReservation(Object.fromEntries(new FormData(form).entries()));
    renderReservation();
    formPanel.hidden = true;
    resultPanel.hidden = false;
  } catch (reason) {
    error.textContent = reason.message;
  }
});

confirmButton.addEventListener('click', () => {
  reservation = confirmDemoDeposit(reservation);
  renderReservation();
});

document.querySelector('#restart-button').addEventListener('click', () => {
  form.reset();
  formPanel.hidden = false;
  resultPanel.hidden = true;
  error.textContent = '';
});
