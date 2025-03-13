
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { JSDOM } from 'https://esm.sh/jsdom';

// Define the Supabase URL and key from environment variables or configuration
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Cors headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ImportRequest {
  url: string;
  type: 'who-we-are' | 'activities' | 'concerned-parties' | 'events' | 'faq' | 'meetings';
  language: 'fr' | 'en' | 'ar';
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with admin privileges
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    if (req.method === 'POST') {
      const { url, type, language } = await req.json() as ImportRequest;
      console.log(`Starting import from ${url} as ${type} in ${language}`);
      
      // Fetch content from the URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch content from ${url}: ${response.statusText}`);
      }
      
      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Extract content based on type
      let result;
      
      switch (type) {
        case 'who-we-are':
          result = await importWhoWeAre(document, supabase, language);
          break;
        case 'activities':
          result = await importActivities(document, supabase, language);
          break;
        case 'concerned-parties':
          result = await importConcernedParties(document, supabase, language);
          break;
        case 'events':
          result = await importEvents(document, supabase, language);
          break;
        case 'faq':
          result = await importFAQ(document, supabase, language);
          break;
        case 'meetings':
          result = await importMeetings(document, supabase, language);
          break;
        default:
          throw new Error(`Unknown content type: ${type}`);
      }
      
      return new Response(JSON.stringify({
        success: true,
        message: `Successfully imported content from ${url}`,
        result
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({
      error: 'Method not allowed',
    }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error during import:', error.message);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

// Helper functions to extract and save content
async function importWhoWeAre(document: Document, supabase: any, language: string) {
  // Extract the main content area
  const contentDiv = document.querySelector('.entry-content');
  if (!contentDiv) {
    throw new Error('Could not find main content');
  }
  
  // Extract title
  const title = document.querySelector('h1.entry-title')?.textContent || 'Qui sommes-nous?';
  
  // Get content HTML
  const contentHtml = contentDiv.innerHTML;
  
  // Extract any images
  const images = Array.from(contentDiv.querySelectorAll('img')).map(img => img.src);
  
  // Check if the page already exists
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'about')
    .single();
    
  let pageId;
  
  if (existingPage) {
    pageId = existingPage.id;
  } else {
    // Create the page
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .insert([{ slug: 'about' }])
      .select();
      
    if (pageError) throw new Error(`Error creating page: ${pageError.message}`);
    pageId = pageData[0].id;
  }
  
  // Check if translation exists
  const { data: existingTranslation } = await supabase
    .from('page_translations')
    .select('id')
    .eq('page_id', pageId)
    .eq('language', language)
    .single();
  
  const content = {
    body: contentHtml,
    images: images
  };
  
  if (existingTranslation) {
    // Update translation
    const { error: updateError } = await supabase
      .from('page_translations')
      .update({
        title,
        content,
        meta_description: title
      })
      .eq('id', existingTranslation.id);
      
    if (updateError) throw new Error(`Error updating translation: ${updateError.message}`);
    return { action: 'updated', pageId, translationId: existingTranslation.id };
  } else {
    // Create translation
    const { data: translationData, error: translationError } = await supabase
      .from('page_translations')
      .insert([{
        page_id: pageId,
        language,
        title,
        content,
        meta_description: title
      }])
      .select();
      
    if (translationError) throw new Error(`Error creating translation: ${translationError.message}`);
    return { action: 'created', pageId, translationId: translationData[0].id };
  }
}

async function importActivities(document: Document, supabase: any, language: string) {
  // Similar structure to importWhoWeAre but for activities page
  const contentDiv = document.querySelector('.entry-content');
  if (!contentDiv) {
    throw new Error('Could not find main content');
  }
  
  const title = document.querySelector('h1.entry-title')?.textContent || 'Activités';
  const contentHtml = contentDiv.innerHTML;
  const images = Array.from(contentDiv.querySelectorAll('img')).map(img => img.src);
  
  // Check if the page already exists
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'activities')
    .single();
    
  let pageId;
  
  if (existingPage) {
    pageId = existingPage.id;
  } else {
    // Create the page
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .insert([{ slug: 'activities' }])
      .select();
      
    if (pageError) throw new Error(`Error creating page: ${pageError.message}`);
    pageId = pageData[0].id;
  }
  
  // Check if translation exists
  const { data: existingTranslation } = await supabase
    .from('page_translations')
    .select('id')
    .eq('page_id', pageId)
    .eq('language', language)
    .single();
  
  const content = {
    body: contentHtml,
    images: images
  };
  
  if (existingTranslation) {
    // Update translation
    const { error: updateError } = await supabase
      .from('page_translations')
      .update({
        title,
        content,
        meta_description: title
      })
      .eq('id', existingTranslation.id);
      
    if (updateError) throw new Error(`Error updating translation: ${updateError.message}`);
    return { action: 'updated', pageId, translationId: existingTranslation.id };
  } else {
    // Create translation
    const { data: translationData, error: translationError } = await supabase
      .from('page_translations')
      .insert([{
        page_id: pageId,
        language,
        title,
        content,
        meta_description: title
      }])
      .select();
      
    if (translationError) throw new Error(`Error creating translation: ${translationError.message}`);
    return { action: 'created', pageId, translationId: translationData[0].id };
  }
}

async function importConcernedParties(document: Document, supabase: any, language: string) {
  // Similar structure for concerned parties
  const contentDiv = document.querySelector('.entry-content');
  if (!contentDiv) {
    throw new Error('Could not find main content');
  }
  
  const title = document.querySelector('h1.entry-title')?.textContent || 'Les concernés par le traitement';
  const contentHtml = contentDiv.innerHTML;
  const images = Array.from(contentDiv.querySelectorAll('img')).map(img => img.src);
  
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'concerned-parties')
    .single();
    
  let pageId;
  
  if (existingPage) {
    pageId = existingPage.id;
  } else {
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .insert([{ slug: 'concerned-parties' }])
      .select();
      
    if (pageError) throw new Error(`Error creating page: ${pageError.message}`);
    pageId = pageData[0].id;
  }
  
  const { data: existingTranslation } = await supabase
    .from('page_translations')
    .select('id')
    .eq('page_id', pageId)
    .eq('language', language)
    .single();
  
  const content = {
    body: contentHtml,
    images: images
  };
  
  if (existingTranslation) {
    const { error: updateError } = await supabase
      .from('page_translations')
      .update({
        title,
        content,
        meta_description: title
      })
      .eq('id', existingTranslation.id);
      
    if (updateError) throw new Error(`Error updating translation: ${updateError.message}`);
    return { action: 'updated', pageId, translationId: existingTranslation.id };
  } else {
    const { data: translationData, error: translationError } = await supabase
      .from('page_translations')
      .insert([{
        page_id: pageId,
        language,
        title,
        content,
        meta_description: title
      }])
      .select();
      
    if (translationError) throw new Error(`Error creating translation: ${translationError.message}`);
    return { action: 'created', pageId, translationId: translationData[0].id };
  }
}

async function importEvents(document: Document, supabase: any, language: string) {
  // For events, we'll extract individual event items
  const contentDiv = document.querySelector('.entry-content');
  if (!contentDiv) {
    throw new Error('Could not find main content');
  }
  
  // Look for article items or other containers that might hold events
  const eventItems = Array.from(document.querySelectorAll('article.post') || 
                               document.querySelectorAll('.entry-content > div') || 
                               [contentDiv]);
  
  const results = [];
  
  for (const item of eventItems) {
    const title = item.querySelector('h2')?.textContent || 
                 item.querySelector('h3')?.textContent || 
                 'Événement';
                 
    const dateText = item.querySelector('.post-date')?.textContent || '';
    const dateMatch = dateText.match(/\d{1,2}\/\d{1,2}\/\d{4}/);
    const dateString = dateMatch ? dateMatch[0] : new Date().toISOString();
    
    // Try to parse the date
    let eventDate;
    try {
      if (dateMatch) {
        const [day, month, year] = dateString.split('/').map(Number);
        eventDate = new Date(year, month - 1, day);
      } else {
        eventDate = new Date();
      }
    } catch (e) {
      eventDate = new Date();
    }
    
    const imageElement = item.querySelector('img');
    const imageUrl = imageElement ? imageElement.src : null;
    
    const descriptionElement = item.querySelector('p') || item.querySelector('.post-content');
    const description = descriptionElement ? descriptionElement.textContent : '';
    
    // Insert the event
    const { data: eventData, error: eventError } = await supabase
      .from('events')
      .insert([{
        start_date: eventDate.toISOString(),
        image_url: imageUrl,
        is_published: true
      }])
      .select();
      
    if (eventError) {
      console.error(`Error creating event: ${eventError.message}`);
      continue;
    }
    
    const eventId = eventData[0].id;
    
    // Insert the event translation
    const { data: translationData, error: translationError } = await supabase
      .from('event_translations')
      .insert([{
        event_id: eventId,
        language,
        title,
        description
      }])
      .select();
      
    if (translationError) {
      console.error(`Error creating event translation: ${translationError.message}`);
      continue;
    }
    
    results.push({
      action: 'created',
      eventId,
      translationId: translationData[0].id
    });
  }
  
  return results;
}

async function importFAQ(document: Document, supabase: any, language: string) {
  const contentDiv = document.querySelector('.entry-content');
  if (!contentDiv) {
    throw new Error('Could not find main content');
  }
  
  // Try to identify FAQ questions and answers
  // This might need adjustments based on the actual structure of the page
  const headings = Array.from(contentDiv.querySelectorAll('h2, h3, h4'));
  const results = [];
  
  // Try to extract category from page title
  const pageTitle = document.querySelector('h1.entry-title')?.textContent || '';
  const category = pageTitle.includes('Loi') ? 'Loi N°18-07' : 
                   pageTitle.includes('Notions') ? 'Notions Clés' : 'Général';
  
  for (let i = 0; i < headings.length; i++) {
    const question = headings[i].textContent || '';
    
    // Get the content until the next heading or the end of the content
    let answer = '';
    let currentNode = headings[i].nextSibling;
    
    while (currentNode && 
           (currentNode.nodeName !== 'H2' && 
            currentNode.nodeName !== 'H3' && 
            currentNode.nodeName !== 'H4' || 
            i === headings.length - 1)) {
      if (currentNode.textContent) {
        answer += currentNode.textContent + ' ';
      }
      
      if (!currentNode.nextSibling || 
          (i < headings.length - 1 && currentNode.nextSibling === headings[i + 1])) {
        break;
      }
      
      currentNode = currentNode.nextSibling;
    }
    
    // Clean up the answer
    answer = answer.trim();
    
    if (question && answer) {
      // Insert the FAQ
      const { data: faqData, error: faqError } = await supabase
        .from('faqs')
        .insert([{
          category,
          position: i,
          is_published: true
        }])
        .select();
        
      if (faqError) {
        console.error(`Error creating FAQ: ${faqError.message}`);
        continue;
      }
      
      const faqId = faqData[0].id;
      
      // Insert the FAQ translation
      const { data: translationData, error: translationError } = await supabase
        .from('faq_translations')
        .insert([{
          faq_id: faqId,
          language,
          question,
          answer
        }])
        .select();
        
      if (translationError) {
        console.error(`Error creating FAQ translation: ${translationError.message}`);
        continue;
      }
      
      results.push({
        action: 'created',
        faqId,
        translationId: translationData[0].id
      });
    }
  }
  
  return results;
}

async function importMeetings(document: Document, supabase: any, language: string) {
  const contentDiv = document.querySelector('.entry-content');
  if (!contentDiv) {
    throw new Error('Could not find main content');
  }
  
  // Look for meeting items
  // This might need adjustments based on the actual structure of the page
  const meetingItems = Array.from(contentDiv.querySelectorAll('article') || 
                                contentDiv.querySelectorAll('.entry-content > div') || 
                                [contentDiv]);
  
  const results = [];
  
  for (const item of meetingItems) {
    const title = item.querySelector('h2')?.textContent || 
                 item.querySelector('h3')?.textContent || 
                 'Réunion de l\'ANPDP';
                 
    // Try to extract date
    const dateText = item.querySelector('.post-date')?.textContent || 
                    item.textContent?.match(/\d{1,2}\/\d{1,2}\/\d{4}/) || 
                    '';
    
    let meetingDate;
    try {
      if (typeof dateText === 'string' && dateText.includes('/')) {
        const [day, month, year] = dateText.split('/').map(Number);
        meetingDate = new Date(year, month - 1, day);
      } else {
        meetingDate = new Date();
      }
    } catch (e) {
      meetingDate = new Date();
    }
    
    // Extract location
    const locationText = item.textContent?.match(/lieu\s*:\s*([^,\.]+)/i) || 
                        item.textContent?.match(/location\s*:\s*([^,\.]+)/i) || 
                        ['', 'Siège de l\'ANPDP'];
    const location = locationText[1] || 'Siège de l\'ANPDP';
    
    // Extract any document URLs
    const documentLink = item.querySelector('a[href$=".pdf"]');
    const documentUrl = documentLink ? documentLink.href : null;
    
    // Extract summary or agenda
    const paragraphs = Array.from(item.querySelectorAll('p'));
    let summary = '';
    let agenda = '';
    
    if (paragraphs.length > 0) {
      summary = paragraphs[0].textContent || '';
      
      if (paragraphs.length > 1) {
        agenda = paragraphs.slice(1).map(p => p.textContent).join('\n');
      }
    }
    
    // Insert the meeting
    const { data: meetingData, error: meetingError } = await supabase
      .from('meetings')
      .insert([{
        meeting_date: meetingDate.toISOString(),
        location,
        document_url: documentUrl,
        is_published: true
      }])
      .select();
      
    if (meetingError) {
      console.error(`Error creating meeting: ${meetingError.message}`);
      continue;
    }
    
    const meetingId = meetingData[0].id;
    
    // Insert the meeting translation
    const { data: translationData, error: translationError } = await supabase
      .from('meeting_translations')
      .insert([{
        meeting_id: meetingId,
        language,
        title,
        summary,
        agenda
      }])
      .select();
      
    if (translationError) {
      console.error(`Error creating meeting translation: ${translationError.message}`);
      continue;
    }
    
    results.push({
      action: 'created',
      meetingId,
      translationId: translationData[0].id
    });
  }
  
  return results;
}
