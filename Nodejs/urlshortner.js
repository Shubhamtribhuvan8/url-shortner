const fs = require('fs');

const data = fs.readFileSync('urls.json');
const urls = JSON.parse(data);

function generateShortCode() {
  let shortCode = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 6; i++) {
    shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return shortCode;
}
function addUrl(url) {
  const shortCode = generateShortCode();
  urls.push({ url: url, shortCode: shortCode });
  fs.writeFileSync('urls.json', JSON.stringify(urls));
  return shortCode;
}

function getUrl(shortCode) {
  const result = urls.find((item) => item.shortCode === shortCode);
  return result ? result.url : null;
}
