// Apps Script エディタ（Monaco）の 1 ファイルを置き換える JS を生成する。
//
// usage: node gen-replace.cjs <javascript|json> <old-file> <new-file> <out-js>
//   javascript … Code.gs / json … appsscript.json
//
// 生成した JS は、エディタの内容が <old-file> と一致する場合だけ <new-file> に置き換える。
// 一致しなければ何も変えずに MISMATCH を返す（手で編集された内容を上書きしないため）。
const fs = require('fs');

const [lang, oldPath, newPath, outPath] = process.argv.slice(2);
if (!['javascript', 'json'].includes(lang) || !outPath) {
  console.error('usage: node gen-replace.cjs <javascript|json> <old-file> <new-file> <out-js>');
  process.exit(1);
}

const norm = (s) => s.replace(/\r\n/g, '\n');
const OLD = norm(fs.readFileSync(oldPath, 'utf8'));
const NEW = norm(fs.readFileSync(newPath, 'utf8'));

const body = `
const m = monaco.editor.getModels().find((x) => x.getLanguageId() === ${JSON.stringify(lang)});
const norm = (s) => s.replace(/\\r\\n/g, '\\n').trimEnd();
const OLD = ${JSON.stringify(OLD)};
const NEW = ${JSON.stringify(NEW)};
if (!m) 'NOT LOADED: open the file in the editor first';
else if (norm(m.getValue()) === norm(NEW)) 'already-updated';
else if (norm(m.getValue()) !== norm(OLD)) 'MISMATCH: editor content differs from the expected old version';
else {
  m.pushEditOperations([], [{ range: m.getFullModelRange(), text: NEW }], () => null);
  norm(m.getValue()) === norm(NEW) ? 'replaced: ' + m.getLineCount() + ' lines' : 'replace failed';
}`;
fs.writeFileSync(outPath, body);
console.log(`wrote ${outPath}`);
