# PRIME50 member app — first version

An original responsive web app using the existing site's charcoal/orange palette. No dependencies or build step. The existing landing page and scorecard remain unchanged.

## Run
From `/workspace/Prime50-Score-Report`:

```sh
python3 -m http.server 8080
```

Open the `/app/` path on that server. Use the existing checkout; no worktree is needed.

## Included
- Goal setting, weekly focus planning, completion check-ins and watched status.
- Browser-local storage with no transmission of goals or check-ins.
- User-supplied scorecard video embedded on demand, plus YouTube channel links.
- Links to the existing scorecard and public Skool community page.
- Responsive layout, dialog controls, labels and keyboard focus indicators.

## Boundaries
Prototype only: no accounts, billing, coach dashboard, cloud sync, or prescribed training. Video playback depends on YouTube availability and embedding permissions. The channel could not be fetched from the development environment; only the supplied video ID is included. Curate and verify actual channel videos before adding workout recommendations or durations. Existing scorecard results are not imported into the app.

## Validation
JavaScript syntax and local HTTP delivery checked. Automated browser interaction/layout tests could not run: Playwright's browser was not installed and the browser download domain returned 403. Before release, test goal save/reload, day focus/check-in persistence, watched toggle, video play/close, reset, keyboard use, mobile layout and outbound links. Not deployed or published.
