const theZooOffers = {
  birthday: 'Birthday package',
  family: 'Family package',
  student: 'Student price enquiry',
  rate: 'Room-rate enquiry',
};

export function createTheZooDemoReservation(input) {
  const offerName = theZooOffers[input.offer];
  if (!offerName) throw new Error('Choose an offer before continuing.');
  if (!input.date || !input.time) throw new Error('Choose a date and time before creating a request.');

  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1) throw new Error('Enter a valid guest count.');

  return {
    reference: `DEMO-ZOO-${input.offer.toUpperCase()}-${input.date.replaceAll('-', '')}-${input.time.replace(':', '')}`,
    offerName,
    date: input.date,
    time: input.time,
    guests,
    deposit: 'To be confirmed by the venue',
    status: 'Deposit pending',
  };
}

export function confirmTheZooDemoDeposit(reservation) {
  if (reservation.status !== 'Deposit pending') throw new Error('Only a deposit-pending request can be confirmed.');
  return { ...reservation, status: 'Deposit confirmed' };
}
