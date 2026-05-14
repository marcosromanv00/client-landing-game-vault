import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Dynamic import of pdf-parse (CommonJS)
const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;

const BASE = 'C:\\Users\\marco\\OneDrive\\Desktop\\Proyectos\\2- Activos\\3- Otros\\old_vanilla_site_backup';

const files = [
  { key: 'avance2', path: join(BASE, 'Proyecto 2_ Prototipo Web Responsive.pdf') },
  { key: 'avance1', path: join(BASE, 'Avance 1 Proyecto Diseño de Sitios Web - Marcos Román Valverde.docx.pdf') },
];

for (const { key, path } of files) {
  try {
    const buf = readFileSync(path);
    const data = await pdfParse(buf);
    writeFileSync(join(__dirname, `${key}_text.txt`), data.text, 'utf8');
    console.log(`✓ ${key}: ${data.numpages} pages, ${data.text.length} chars`);
  } catch (e) {
    console.error(`✗ ${key}:`, e.message);
  }
}
