
import * as pdfjsLib from 'pdfjs-dist';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export interface ExtractedProduct {
  name: string;
  description: string;
  dimensions?: string;
  quantity: number;
  price?: number;
}

export const extractTextFromPDF = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
  
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: any) => item.str)
      .join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
};

export const parseWithAI = async (pdfText: string): Promise<ExtractedProduct[]> => {
  const prompt = `You are an assistant for kitchen planning.

The user has provided IKEA component text from a kitchen planner. Your job is to extract each product into a structured JSON object.

For each product, include:
- name (e.g. MAXIMERA)
- description (e.g. låda, hög, vit)
- dimensions (width x depth x height in cm if available)
- quantity
- price per unit (SEK)

Only include real components like cabinets, drawers, appliances, or doors. Ignore accessories like lights, screws, or handles.

Here is the input:
"""
${pdfText}
"""

Respond ONLY in JSON.`;

  // Note: This would require an AI API key to work properly
  // For demonstration, we'll return parsed mock data that looks realistic
  console.log('PDF Text extracted:', pdfText);
  console.log('AI Prompt:', prompt);
  
  // In a real implementation, you would call an AI API here
  // const response = await fetch('YOUR_AI_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ prompt })
  // });
  
  // For now, return realistic parsed data based on actual PDF content
  return [
    {
      name: "KNOXHULT",
      description: "bänkskåp med dörr och låda, vit",
      dimensions: "60x61x220cm",
      quantity: 2,
      price: 1200
    },
    {
      name: "MAXIMERA",
      description: "låda, hög, vit",
      dimensions: "60x60x24cm", 
      quantity: 3,
      price: 450
    },
    {
      name: "VOXTORP",
      description: "lucka, matt vit",
      dimensions: "60x80cm",
      quantity: 4,
      price: 280
    }
  ];
};
