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

### Status

Sample data throughout. Every figure, name and date is illustrative and no external
system is connected. The reference date is pinned to 11 Sep 2026 so the sample stays
internally consistent.

### Next steps, when it is time to connect things

1. Replace the `ITEMS`, `DECISIONS`, `MILESTONES` and `LOG` arrays with a data feed
2. Point the source file rows at real SharePoint and OneDrive URLs
3. Add authentication and enforce the role model server side
4. Persist approvals and check-offs so the page holds state between visits
