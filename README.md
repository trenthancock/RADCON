# RADCON

Research and Developments by Camelot Homes.

## Paragon control sheet

`paragon-dashboard.html` is a single, self-contained project dashboard for Paragon,
the eight-home luxury infill community run as a capital partnership with Circle Road.

Open the file directly in a browser. No build step, no dependencies beyond Google Fonts.

### What it covers

- Current phase and the seven-phase arc, with upcoming milestones for the next 90 days
- Decisions awaiting approval, each with its options, cost impact, decider and due date
- Action items across every discipline, each with an owner and a due date
- Discipline sheets: architecture, engineering, construction, finance, sales
- Links to source files, one row per document
- A weekly accomplishment log, six weeks deep
- Flags for anything late, blocked, or missing an owner

### The shared board

Action items, decisions and the weekly log are held in the artifact's shared database,
so edits persist and every viewer sees them. Editors can reassign an owner, change a
due date, mark an item done or reopen it, approve or send back a decision, and add to
the weekly log. Changes stream to anyone with the page open.

Opened as a local file with no store available, the page falls back to the embedded
sample and edits stay in that browser for the session. The title block says which mode
it is in: `Shared, live`, `Shared, view only`, or `Local copy`.

### Roles and access

Two different things, and only one of them is real.

**Write access is enforced.** The database declares `{path: "", read: "interact",
write: "admin"}`. Anyone who can open the page reads it; only viewers with edit access
can write. Verified: a write attempted at view level is refused by the server, not by
the interface.

**Read access is not segmented.** The role selector (Managing Director, Project
Manager, Consultant) hides sheets and fields in the interface only. Finance and
partnership figures are in the page source regardless of the selected role. Do not
send this link to anyone who should not see the partnership economics. Segmented reads
need authentication and a server that filters before delivery.

### Data sources

The page now carries two classes of data and labels every block with which it is.

**From the proforma.** Finance, unit economics, model drivers, the absorption
timeline and the phase rail are read from `Paragon Cash Flow - TH 7.21.26.xlsx`
(SharePoint > Communities > Active Communities > Paragon (31st St & Winchcomb) >
Proformas (formerly known as Budgets), last modified 21 Aug 2026). Confirmed
canonical by Trent Hancock, 16 Sep 2026. One cost line, the fees and carry remainder, is derived as total
cost less acquisition, horizontal and vertical; it is marked Derived in the table.

**Still sample.** Action items, decisions, milestones, consultant names, source file
rows and the weekly log. Their reference date is pinned to 11 Sep 2026 so the sample
stays internally consistent.

The sales sheet deliberately shows no per-lot pricing. The canonical model prices all
eight lots off a single blended average, so a per-lot schedule would have to be
invented. The gap is shown instead.

### Account

The board must be published from the Camelot Claude organization, not a personal
account. Because it declares a shared database it is organization-internal, so
readers and writers must be members of the owner's organization. See `MIGRATION.md`
for the runbook, and `tools/build-seed.js` for the seed.

### Next steps

1. Republish under the Camelot organization, per MIGRATION.md
2. Point the source file rows at real SharePoint URLs
3. Supply a per-lot price schedule, the one real input the sales sheet is missing
4. Replace the sample action items, decisions and consultant names with the real ones
5. Segment read access, which needs authentication and server-side filtering
