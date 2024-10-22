import { serve } from 'bun';
import pdf from 'html-pdf';

const handler = async (req: Request) => {
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }
    var html = await req.text();
    var fileName = `pdf-outputs/${Date.now()}.pdf`;
    const options = { format: "A4" as const }; // You can customize options here
    pdf.create(html, options).toFile(fileName, (err, res) => {
        if (err) return new Response("Failed to convert or save pdf", { status: 400});
    });
    return new Response(`/pdf-outputs/${fileName}`, { status: 200 });
}

serve({
  fetch: handler,
  port: 3000,
});

console.log('Server running on http://localhost:3000');
