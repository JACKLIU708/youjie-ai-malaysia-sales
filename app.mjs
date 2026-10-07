import { scoreDiagnostic } from './src/diagnostic.mjs';
import { buildWhatsAppEnquiryUrl } from './src/contact.mjs';

const form = document.querySelector('#diagnostic-form');
const resultSection = document.querySelector('#result');
const scoreNumber = document.querySelector('#score-number');
const tier = document.querySelector('#result-tier');
const price = document.querySelector('#result-price');
const gap = document.querySelector('#result-gap');
const priorities = document.querySelector('#result-priorities');
const briefButton = document.querySelector('#brief-button');
let latestResult;

const salesWhatsAppNumber = document.querySelector('meta[name="sales-whatsapp"]')?.content;
const whatsAppEnquiryUrl = buildWhatsAppEnquiryUrl(salesWhatsAppNumber);

document.querySelectorAll('[data-whatsapp-cta]').forEach((cta) => {
  if (whatsAppEnquiryUrl) {
    cta.href = whatsAppEnquiryUrl;
    cta.target = '_blank';
    cta.rel = 'noopener';
    return;
  }
  cta.setAttribute('aria-disabled', 'true');
  cta.title = 'WhatsApp link will be enabled after an authorised sales number is configured.';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  latestResult = scoreDiagnostic(values);
  scoreNumber.textContent = String(latestResult.score).padStart(2, '0');
  tier.textContent = latestResult.tier;
  price.textContent = latestResult.price;
  gap.textContent = latestResult.primaryGap;
  priorities.replaceChildren(...latestResult.priorities.map((priority) => {
    const item = document.createElement('li');
    item.textContent = priority;
    return item;
  }));
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

briefButton.addEventListener('click', () => {
  if (!latestResult) return;
  const text = [
    'WEICE YOUJIE — BOOKING-TO-DEPOSIT DISCUSSION BRIEF',
    '',
    `Indicative booking-flow gap: ${latestResult.score}/100`,
    `Recommended starting point: ${latestResult.tier} (${latestResult.price})`,
    '',
    'Primary gap',
    latestResult.primaryGap,
    '',
    'First priorities',
    ...latestResult.priorities.map((priority, index) => `${index + 1}. ${priority}`),
    '',
    'This brief is a discussion aid, not a proposal, contract or acceptance commitment.',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'booking-to-deposit-discussion-brief.txt';
  link.click();
  URL.revokeObjectURL(url);
});
