const fs = require('fs');
const path = require('path');

try {
  const pngPath = path.join(__dirname, 'favicon.png');
  const svgPath = path.join(__dirname, 'favicon.svg');
  
  // Read the favicon.png
  const pngBuffer = fs.readFileSync(pngPath);
  
  // Convert to base64
  const base64Data = pngBuffer.toString('base64');
  const dataUri = `data:image/png;base64,${base64Data}`;
  
  // Create SVG content
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="circleClip">
      <circle cx="50" cy="50" r="48" />
    </clipPath>
  </defs>
  <image href="${dataUri}" width="100" height="100" clip-path="url(#circleClip)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

  // Write to favicon.svg
  fs.writeFileSync(svgPath, svgContent);
  console.log('Successfully generated base64 embedded favicon.svg');
} catch (error) {
  console.error('Error:', error.message);
}
