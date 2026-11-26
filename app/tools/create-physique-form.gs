/** Run createPrime50PhysiqueForm once in https://script.google.com/ while signed in as the club owner. */
function createPrime50PhysiqueForm() {
  const properties = PropertiesService.getScriptProperties();
  const existing = properties.getProperty('PRIME50_PHYSIQUE_FORM_ID');
  if (existing) {
    const form = FormApp.openById(existing);
    console.log('Edit form: ' + form.getEditUrl());
    console.log('Member link: ' + form.getPublishedUrl());
    return;
  }
  const form = FormApp.create('PRIME50 Performance Club — Physique & Progress Check-In');
  form.setDescription('Optional coaching check-in for adult club members. Answers are shared with the club owner through Google Forms; this is separate from the app’s device-only tracker. Do not include medical records or diagnoses. Ask your coach about access and retention before submitting. This is not a medical assessment. Fields are optional unless marked required.');
  form.setCollectEmail(false);
  form.addCheckboxItem().setTitle('I understand my submitted answers will be visible to the Prime50 club owner for coaching check-ins.').setChoiceValues(['I understand and choose to submit this check-in.']).setRequired(true);
  form.addTextItem().setTitle('Preferred name or member nickname').setRequired(true);
  form.addTextItem().setTitle('Contact email (optional)').setHelpText('Only if you would like a reply.');
  form.addDateItem().setTitle('Check-in date').setRequired(true);
  const positive = FormApp.createTextValidation().requireNumberGreaterThan(0).setHelpText('Enter a positive number without units.').build();
  ['Height (inches)', 'Weight (lb)', 'Waist (inches)', 'Hips (inches)', 'Chest (inches)', 'Upper arm (inches)', 'Thigh (inches)'].forEach(title => form.addTextItem().setTitle(title).setValidation(positive));
  form.addSectionHeaderItem().setTitle('Optional DEXA scan results').setHelpText('Copy only actual scan readings. BMI is not a DEXA result. Leave blank if you have no scan to report.');
  form.addDateItem().setTitle('DEXA scan date');
  form.addTextItem().setTitle('DEXA body fat (%)').setValidation(FormApp.createTextValidation().requireNumberBetween(1,75).build());
  ['DEXA fat mass (lb)', 'DEXA lean mass (lb)'].forEach(title => form.addTextItem().setTitle(title).setValidation(positive));
  form.addParagraphTextItem().setTitle('What feels stronger or easier in everyday life?');
  form.addParagraphTextItem().setTitle('What would you like help with next?');
  form.setConfirmationMessage('Thanks for checking in. Keep your focus on sustainable habits, strength and how you feel. Contact your coach if you need guidance.');
  form.setAllowResponseEdits(true);
  form.setPublishingSummary(false);
  if (typeof form.setPublished === 'function') form.setPublished(true);
  form.setAcceptingResponses(true);
  properties.setProperty('PRIME50_PHYSIQUE_FORM_ID', form.getId());
  console.log('Edit form: ' + form.getEditUrl());
  console.log('Member link: ' + form.getPublishedUrl());
}
