const experiences = {
  standard: { name: 'Standard sing-along room', capacity: 8, deposit: 'RM80' },
  vip: { name: 'VIP celebration room', capacity: 20, deposit: 'RM150' },
  function: { name: 'Function room', capacity: 60, deposit: 'RM300' },
  event: { name: 'Private event enquiry', capacity: 120, deposit: 'RM500' },
};

export function createDemoReservation(input) {
  const experience = experiences[input.experience];
  if (!experience) throw new Error('Choose an experience before continuing.');
  if (!input.date || !input.time) throw new Error('Choose a date and time before creating a request.');

  const guests = Number(input.guests);
  if (!Number.isInteger(guests) || guests < 1) throw new Error('Enter a valid guest count.');
  if (guests > experience.capacity) throw new Error(`${experience.name} supports up to ${experience.capacity} guests.`);

  return {
    reference: `DEMO-${input.experience.toUpperCase()}-${input.date.replaceAll('-', '')}-${input.time.replace(':', '')}`,
    experienceName: experience.name,
    capacity: experience.capacity,
    date: input.date,
    time: input.time,
    guests,
    deposit: experience.deposit,
    status: 'Deposit pending',
  };
}

export function confirmDemoDeposit(reservation) {
  if (reservation.status !== 'Deposit pending') throw new Error('Only a deposit-pending request can be confirmed.');
  return { ...reservation, status: 'Deposit confirmed' };
}
