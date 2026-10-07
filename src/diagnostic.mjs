const channelPoints = { whatsapp: 18, phone: 16, dm: 18, form: 8, online: 0 };
const volumePoints = { high: 16, medium: 9, low: 0 };
const depositPoints = { none: 26, manual: 20, invoice: 14, online: 0 };
const offerPoints = { many: 15, some: 9, few: 0 };
const recordPoints = { none: 18, spreadsheet: 13, crm: 0 };
const languagePoints = { one: 0, two: 5, three: 0 };

function buildPrimaryGap(input) {
  if (input.depositMethod === 'none') return 'A customer can choose an option, but there is no deposit step to hold the booking.';
  if (input.depositMethod === 'manual' || input.depositMethod === 'invoice') return 'The deposit journey relies on manual follow-up, which can leave high-intent enquiries unconfirmed.';
  if (input.records === 'none' || input.records === 'spreadsheet') return 'Booking enquiries are not yet captured in one structured customer record.';
  return 'The next step is a focused discovery call to confirm whether any measurable booking gap remains.';
}

function buildPriorities(input) {
  const priorities = [];
  if (input.depositMethod !== 'online') priorities.push('Add a clear deposit status after date, package and guest-count selection.');
  if (input.enquiryChannel !== 'online') priorities.push('Give social and WhatsApp visitors one mobile booking page before a staff handover.');
  if (input.records !== 'crm') priorities.push('Save enquiry source, booking status and contact consent in a usable customer record.');
  if (input.languages !== 'three') priorities.push('Confirm the languages required for the venue’s actual guest mix.');
  return priorities.slice(0, 3);
}

export function scoreDiagnostic(input) {
  const alreadySelfService = input.enquiryChannel === 'online'
    && input.depositMethod === 'online'
    && input.records === 'crm';

  if (alreadySelfService) {
    return {
      score: 0,
      tier: 'Needs discovery',
      price: 'Scope to confirm',
      primaryGap: 'The current answers indicate a self-service booking and deposit flow. We would first confirm whether a specific operational gap remains.',
      priorities: ['Review the actual booking handover, cancellation process and reporting needs before recommending a build.'],
    };
  }

  const score = Math.min(100,
    channelPoints[input.enquiryChannel]
    + volumePoints[input.enquiryVolume]
    + depositPoints[input.depositMethod]
    + offerPoints[input.offers]
    + recordPoints[input.records]
    + languagePoints[input.languages]);
  const tier = score >= 80 ? 'Booking & Operations' : score >= 35 ? 'Booking Starter' : 'Needs discovery';
  const price = tier === 'Booking & Operations' ? 'RM9,800' : tier === 'Booking Starter' ? 'RM4,800' : 'Scope to confirm';

  return {
    score,
    tier,
    price,
    primaryGap: buildPrimaryGap(input),
    priorities: buildPriorities(input),
  };
}
