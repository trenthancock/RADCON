# Moving the Paragon control sheet to the Camelot Claude account

The board was first published from a personal Claude account. Because it declares a
shared database, the artifact is organization-internal: readers and writers must be
signed-in members of the owner's organization. A personal account has no Camelot
organization behind it, so colleagues on `camelothomes.com` cannot open it.

This is the runbook to republish it under the Camelot organization.

## Before you start

The shared database does **not** move between accounts. Republishing creates a new
artifact with an empty store. The seeded starting data regenerates from the page file,
but any real edits made on the personal copy are lost. Do not do real work on the
personal board before migrating.

## Steps

Run these from a Claude session signed in on `trenth@camelothomes.com`, working in
this repository on branch `claude/camelot-homes-dashboard-lgtmeq`.

### 1. Publish the page

Publish `paragon-dashboard.html` with the database capability and its access rules:

```json
{
  "db": {
    "rules": [
      { "path": "", "read": "interact", "write": "admin" }
    ]
  }
}
```

That rule means anyone who can open the page reads it, and only viewers with edit
access can write. Note the new artifact URL; the old one is not reused.

Also pass a favicon on this first publish: 📐

### 2. Build the seed

```
node tools/build-seed.js
```

Writes 41 documents to `.seed/` and an `_writes.json` ready to hand to the batch call.
The script reads the arrays out of the page itself, so the seed cannot drift from what
the file renders offline.

### 3. Seed the store

One `ArtifactData` call, `action: "batch"`, passing the contents of `.seed/_writes.json`
as `writes`, with the new artifact URL. 41 writes, one approval, all or nothing.

Collections created: `items` (30), `decisions` (5), `log` (6).

### 4. Verify the write rule is real

Do not skip this. It is the only access boundary on the board that is actually
enforced, so confirm it rather than assume it.

- Read any item with `as_level: "interact"`. It should succeed.
- Attempt a write to the same document with `as_level: "interact"`. It must be
  refused. A refusal reads as "no such document"; that is expected, refusals and
  absences are deliberately indistinguishable.
- Read the document again at full level and confirm it is unchanged.

### 5. Set sharing

- Alex Dodge: **can edit**. This is the boundary the server enforces.
- Consultants: **can view**, and only once the read caveat below is acceptable.

### 6. Retire the personal copy

Delete the artifact at `https://claude.ai/artifact/E2DxkabecC3mke4eipM383` so there is
one board rather than two drifting copies.

## The caveat that does not go away

Write access is enforced. **Read access is not segmented.** The role selector hides
sheets and fields in the interface only. Finance and partnership figures are present
in the page source whatever role is chosen, so anyone with view access can read them.

Segmenting reads needs authentication and a server that filters before delivery. Until
that exists, treat view access as full read access to every number on the board.
