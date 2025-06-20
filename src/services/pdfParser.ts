
import * as pdfjsLib from 'pdfjs-dist';

// Configure PDF.js worker using CDN URL directly
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export interface ExtractedProduct {
  name: string;
  description: string;
  dimensions?: string;
  quantity: number;
  price?: number;
}

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    console.log('Starting PDF text extraction...');
    const arrayBuffer = await file.arrayBuffer();
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      verbosity: 0 // Reduce console spam
    });
    
    const pdf = await loadingTask.promise;
    console.log(`PDF loaded successfully. Pages: ${pdf.numPages}`);
    
    let fullText = '';
    
    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Processing page ${i}/${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      
      const pageText = textContent.items
        .map((item: any) => {
          if ('str' in item) {
            return item.str;
          }
          return '';
        })
        .filter(str => str.trim().length > 0)
        .join(' ');
      
      fullText += pageText + '\n';
    }
    
    console.log(`Text extraction complete. Total length: ${fullText.length} characters`);
    return fullText.trim();
  } catch (error) {
    console.error('PDF text extraction failed:', error);
    throw error;
  }
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

  console.log('PDF Text extracted for AI analysis:', pdfText.substring(0, 500) + '...');
  console.log('AI Prompt prepared, length:', prompt.length);
  
  // TODO: Replace this with actual AI API call
  // Example implementation would be:
  // const response = await fetch('YOUR_AI_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer YOUR_API_KEY'
  //   },
  //   body: JSON.stringify({ 
  //     model: 'gpt-3.5-turbo',
  //     messages: [{ role: 'user', content: prompt }],
  //     temperature: 0.1
  //   })
  // });
  // const data = await response.json();
  // return JSON.parse(data.choices[0].message.content);
  
  // For now, return realistic parsed data based on actual PDF content
  // This would be replaced with real AI API call
  console.log('Using mock AI response - replace with real AI API call');
  
  // Try to extract some basic patterns from the text
  const products: ExtractedProduct[] = [];
  const lines = pdfText.toLowerCase().split('\n');
  
  lines.forEach(line => {
    // Look for IKEA product patterns
    if (line.includes('maximera') || line.includes('knoxhult') || line.includes('voxtorp')) {
      const quantityMatch = line.match(/(\d+)\s*st/i) || line.match(/(\d+)\s*x/i);
      const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
      
      let name = '';
      let description = line.trim();
      
      if (line.includes('maximera')) {
        name = 'MAXIMERA';
        description = 'låda, hög, vit';
      } else if (line.includes('knoxhult')) {
        name = 'KNOXHULT'; 
        description = 'bänkskåp med dörr och låda, vit';
      } else if (line.includes('voxtorp')) {
        name = 'VOXTORP';
        description = 'lucka, matt vit';
      }
      
      if (name) {
        products.push({
          name,
          description,
          dimensions: '60x60x24cm', // Default dimension
          quantity,
          price: Math.floor(Math.random() * 1000) + 200 // Mock price
        });
      }
    }
  });
  
  // If no products found, return default mock data
  if (products.length === 0) {
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
  }
  
  return products;
};
