#!/usr/bin/env node
/*
 * Regenerates the shared-database seed for the Paragon control sheet.
 *
 * The board's starting data lives in paragon-dashboard.html as the ITEMS,
 * DECISIONS and LOG arrays. This reads them straight out of the page, so the
 * seed can never drift from what the file renders offline.
 *
 *   node tools/build-seed.js [outDir]
 *
 * Writes one JSON file per document, then prints the `writes` array for the
 * ArtifactData batch call. Safe to re-run; it only writes to outDir.
 */
const fs = require("fs");
const path = require("path");

const pageFile = path.join(__dirname, "..", "paragon-dashboard.html");
const outDir = path.resolve(process.argv[2] || path.join(__dirname, "..", ".seed"));

const script = fs.readFileSync(pageFile, "utf8").match(/<script>([\s\S]*)<\/script>/)[1];

function grab(name) {
  const open = "var " + name + " = [";
  const i = script.indexOf(open);
  if (i < 0) throw new Error("could not find " + name + " in " + pageFile);
  const j = script.indexOf("\n];", i);
  return eval(script.slice(i + open.length - 1, j + 2));
}

const ITEMS = grab("ITEMS");
const DECISIONS = grab("DECISIONS");
const LOG = grab("LOG");

fs.mkdirSync(outDir, { recursive: true });
const writes = [];

function emit(collection, docId, data) {
  const file = path.join(outDir, collection + "_" + docId + ".json");
  fs.writeFileSync(file, JSON.stringify(data));
  writes.push({ op: "set", collection, doc_id: docId, file_path: file });
}

// `done` starts false on every item; the page treats it as the completion flag.
ITEMS.forEach((i) => emit("items", i.id, Object.assign({}, i, { done: false })));
// `status` starts open; approving or sending back a decision overwrites it.
DECISIONS.forEach((d) => emit("decisions", d.id, Object.assign({}, d, { status: "open" })));
// One document per week, keyed by the week-ending date. Entries are an array.
LOG.forEach((w) => emit("log", w.we, w));

if (writes.length > 50) throw new Error("batch cap is 50 writes, got " + writes.length);

fs.writeFileSync(path.join(outDir, "_writes.json"), JSON.stringify(writes, null, 2));

console.log(
  ITEMS.length + " items, " + DECISIONS.length + " decisions, " + LOG.length + " log weeks"
);
console.log(writes.length + " documents written to " + outDir);
console.log("\nPass the contents of this file as the ArtifactData `writes` argument:");
console.log("  " + path.join(outDir, "_writes.json"));
