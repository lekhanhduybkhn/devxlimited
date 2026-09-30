const fs=require('node:fs');
const path=require('node:path');
const source=path.join(__dirname,'build.cjs');
let text=fs.readFileSync(source,'utf8');
text=text.replace("for(const lang of ['vi','en']){", "for(const lang of ['en']){");
text=text.replace("path.join(__dirname,'dist',en?'en':'')", "path.join(__dirname,'dist')");
text=text.replace(/<a class="lang"[^]*?<\/a>/, '');
text=text.replaceAll("${en?'../':''}", '');
text=text.replace('Generated 10 localized pages.', 'Generated 5 English pages.');
fs.writeFileSync(source,text);
require('./build.cjs');
// Keep former English links working without maintaining duplicate pages.
for(const file of fs.readdirSync(path.join(__dirname,'dist','en'))){
 if(!file.endsWith('.html'))continue;
 fs.writeFileSync(path.join(__dirname,'dist','en',file),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=../${file}"><title>DEVX LIMITED</title></head><body><a href="../${file}">Continue to DEVX LIMITED</a></body></html>`);
}
let css=fs.readFileSync(path.join(__dirname,'dist','style.css'),'utf8').replace("@import url('data:text/css,');\n",'');
css+='\n@media(max-width:680px){.menu{margin-left:auto}}\n';
fs.writeFileSync(path.join(__dirname,'dist','style.css'),css);
let readme=fs.readFileSync(path.join(__dirname,'README.md'),'utf8').replace('Responsive Vietnamese and English company website.','Responsive English-only company website.').replace('Each language includes the home, privacy policy, terms, cookie policy and contact pages.','Includes home, privacy policy, terms, cookie policy and contact pages.');
fs.writeFileSync(path.join(__dirname,'README.md'),readme);
