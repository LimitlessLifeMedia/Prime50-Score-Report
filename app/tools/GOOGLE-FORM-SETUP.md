# Create the club’s Google Form

The app tracker is functional without Google. No live form has been created from this workspace, which has no Google account connection.

1. Open https://script.google.com/ and create a new project in the club owner’s Google account.
2. Paste `create-physique-form.gs` into the editor and save.
3. Select `createPrime50PhysiqueForm`, click Run, and authorize Google Forms access for your own script.
4. Open the Edit form link in the execution log. Review questions, privacy wording, responder access, and publication. Keep response summaries off. Test in a signed-out browser using non-sensitive sample answers; delete the sample afterward.
5. Copy the Member link from the log. Share it in chat so it can be connected, or put it into `app/body-config.json` as `googleFormUrl` and commit to main. Never put the editor link in the app.

The script is designed to reuse its previously created form on subsequent runs. It creates one form per Apps Script project. It does not send invitations, create a response spreadsheet, or make answers public. No photo upload is requested: physique photos are sensitive and need a separate access/retention workflow. Review who can access responses and tell members your retention policy before collecting real check-ins. The form does not calculate BMI; the app does. Google account authorization, script execution, live form behavior and publication still need owner validation.
