# PRIME50 email signup connection

The 15-question assessment works without an email address. Quiz responses stay in the browser page; they are not stored or sent to MailerLite.

## Connect the optional button

1. In MailerLite, create a dedicated group named PRIME50 Scorecard Leads.
2. Create a signup form linked to that group. Explain that subscribers receive PRIME50 tips and discovery-call invitations. Configure sender details, unsubscribe footer and confirmation settings in MailerLite.
3. Copy the public HTTPS signup form URL.
4. Set MAILERLITE_FORM_URL in scorecard.js to that URL. The results screen will then show Get PRIME50 Emails.
5. Configure an automation triggered when a subscriber joins the group: immediate welcome, a useful follow-up after 2 days, then a discovery-call invitation after 3 more days. All booking CTAs should use Jeff's supplied HubSpot meetings URL.
6. Test with an address you control: submit the form, complete confirmation if enabled, verify group membership, automation enrollment and actual email delivery.

Clicking the website button only opens the signup form. The nurture sequence starts after successful signup/confirmation and enrollment under MailerLite's configured rules. No automation has been activated by this repository.

## Booked-call suppression

A HubSpot booking link alone cannot stop MailerLite reminders. A separate verified integration must update a booked-call group or field, and the automation must check it before each booking reminder. Until that is configured, exclude booked contacts manually. Never add API keys to public repository files.
