import fs from 'fs';
import path from 'path';

const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

export async function GET() {
  const fileData = fs.readFileSync(contactsFilePath, 'utf-8');
  const contacts = JSON.parse(fileData);
  return new Response(JSON.stringify({ contacts }), { status: 200 });
}