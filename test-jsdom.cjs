const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'dist', 'index.html'), 'utf-8');

const virtualConsole = new (require('jsdom').VirtualConsole)();
virtualConsole.on("error", () => { console.error("PAGE ERROR:", ...arguments); });
virtualConsole.on("warn", () => { console.warn("PAGE WARN:", ...arguments); });
virtualConsole.on("info", () => { console.info("PAGE INFO:", ...arguments); });
virtualConsole.on("log", () => { console.log("PAGE LOG:", ...arguments); });

// JSDOM requires absolute file URLs or running a local server to fetch external resources like JS/CSS
const dom = new JSDOM(html, {
  url: 'http://localhost/',
  runScripts: "dangerously",
  resources: "usable",
  virtualConsole
});

// Since standard relative paths from dist won't work perfectly, let's inject the JS directly
setTimeout(() => {
  const jsFiles = fs.readdirSync(path.join(__dirname, 'dist', 'assets')).filter(f => f.endsWith('.js'));
  if(jsFiles.length > 0) {
     const jsContent = fs.readFileSync(path.join(__dirname, 'dist', 'assets', jsFiles[0]), 'utf-8');
     const scriptEl = dom.window.document.createElement('script');
     scriptEl.textContent = jsContent;
     dom.window.document.body.appendChild(scriptEl);
     console.log("Injected built JS");
  } else {
     console.log("No JS file found");
  }
}, 500);

setTimeout(() => {
  console.log("Root content:", dom.window.document.getElementById('root').innerHTML.substring(0, 200));
  process.exit(0);
}, 3000);
