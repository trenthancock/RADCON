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

### Roles

A role selector switches between Managing Director, Project Manager, and Consultant.
Consultants see architecture, engineering, construction and the log; finance, sales
and the decision queue are hidden. Partner capital terms are Managing Director only.

This is a visual preview of the access model, not enforced security. Real enforcement
needs a backend and authentication.

### Data sources

The page now carries two classes of data and labels every block with which it is.

**From the proforma.** Finance, unit economics, model drivers, the absorption
timeline and the phase rail are read from `Paragon Cash Flow - TH 7.21.26.xlsx`
(SharePoint > Communities > Active Communities > Paragon (31st St & Winchcomb) >
Proformas (formerly known as Budgets), last modified 21 Aug 2026). That workbook is
the canonical model. One cost line, the fees and carry remainder, is derived as total
cost less acquisition, horizontal and vertical; it is marked Derived in the table.

**Still sample.** Action items, decisions, milestones, consultant names, source file
rows and the weekly log. Their reference date is pinned to 11 Sep 2026 so the sample
stays internally consistent.

The sales sheet deliberately shows no per-lot pricing. The canonical model prices all
eight lots off a single blended average, so a per-lot schedule would have to be
invented. The gap is shown instead.

### Next steps

1. Persist action items, decisions and the weekly log so the page holds state between
   visits and across viewers
2. Point the source file rows at real SharePoint URLs
3. Supply a per-lot price schedule, the one real input the sales sheet is missing
4. Add authentication and enforce the role model server side
