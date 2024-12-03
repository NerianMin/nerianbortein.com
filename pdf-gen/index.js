const PORT = 3000;
const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');

async function generatePDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`, {
    waitUntil: ["load","networkidle0"]
  });
  await page.addStyleTag({ content: 'a[href^="http"]:after { display: none !important; }' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: {
      left: '0px',
      top: '0px',
      right: '0px',
      bottom: '0px'
    } });

  await browser.close();
  return pdfBuffer;
}

async function savePDF() {
  return fs.writeFile(path.resolve(__dirname, '../public/nerian-bortein-lead-exp-designer.pdf'), await generatePDF());
}

savePDF().then(() => console.log('Successfully saved')).catch(console.error);

