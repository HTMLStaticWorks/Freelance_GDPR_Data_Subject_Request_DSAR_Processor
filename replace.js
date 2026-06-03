const fs = require('fs');
const path = require('path');

const dir = 'd:\\April Websites\\Freelance GDPR Data Subject Request (DSAR) Processor';

const replacements = [
    { regex: /\bWe\b/g, replacement: 'I' },
    { regex: /\bwe\b/g, replacement: 'I' },
    { regex: /\bOur\b/g, replacement: 'My' },
    { regex: /\bour\b/g, replacement: 'my' },
    { regex: /\bUs\b/g, replacement: 'Me' },
    { regex: /\bus\b/g, replacement: 'me' },
    { regex: /\bOurs\b/g, replacement: 'Mine' },
    { regex: /\bours\b/g, replacement: 'mine' },
];

let changedFiles = 0;

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        replacements.forEach(({regex, replacement}) => {
            content = content.replace(regex, replacement);
        });
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
            changedFiles++;
        }
    }
});

console.log(`Total files updated: ${changedFiles}`);
