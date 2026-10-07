export function buildWhatsAppEnquiryUrl(salesNumber) {
  const normalisedNumber = String(salesNumber ?? '').replace(/\D/g, '');
  if (!normalisedNumber) return null;

  const message = 'Hello Youjie AI, I would like to discuss a booking-to-deposit flow for my venue.';
  return `https://wa.me/${normalisedNumber}?text=${encodeURIComponent(message)}`;
}
