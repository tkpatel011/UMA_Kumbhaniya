const fs = require('fs');

function cleanFile(filePath, type) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (type === 'css') {
    // Remove CSS comments /* ... */
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
  } else if (type === 'js') {
    // Remove JS comments // and /* ... */
    content = content.replace(/\/\*[\s\S]*?\*\//g, '');
    content = content.replace(/\/\/.*$/gm, '');
  } else if (type === 'html') {
    // Remove HTML comments <!-- ... -->
    content = content.replace(/<!--[\s\S]*?-->/g, '');
  }
  // Also remove multiple empty lines
  content = content.replace(/\n\s*\n/g, '\n');
  fs.writeFileSync(filePath, content, 'utf8');
}

cleanFile('style.css', 'css');
cleanFile('script.js', 'js');
cleanFile('index.html', 'html');
console.log('Comments removed.');
