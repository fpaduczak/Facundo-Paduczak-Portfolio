import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Helper function to create the ATS CV PDF
function createATSCV(outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 0.5 inch margins are common for resumes
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 40, bottom: 40, left: 45, right: 45 },
      bufferPages: true
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);

  // Colors
  const textColor = '#333333';
  const primaryColor = '#1e3a8a'; // Deep blue
  const secondaryColor = '#4b5563'; // Slate gray
  const lineColor = '#d1d5db'; // Light gray

  // Typography helpers
  const title = (text: string) => {
    doc.fillColor(primaryColor)
       .fontSize(24)
       .font('Helvetica-Bold')
       .text(text, { align: 'center' });
  };

  const subtitle = (text: string) => {
    doc.fillColor(secondaryColor)
       .fontSize(11)
       .font('Helvetica')
       .text(text, { align: 'center' });
  };

  const contactInfo = (text: string) => {
    doc.fillColor(secondaryColor)
       .fontSize(8.5)
       .font('Helvetica')
       .text(text, { align: 'center' });
  };

  const sectionHeader = (text: string) => {
    doc.moveDown(1.2);
    const spacedText = text.toUpperCase().split('').join(' ');
    doc.fillColor(primaryColor)
       .fontSize(10)
       .font('Helvetica-Bold')
       .text(spacedText);
    
    // Draw horizontal rule below section text
    const y = doc.y + 2;
    doc.moveTo(45, y)
       .lineTo(567, y)
       .strokeColor(lineColor)
       .lineWidth(1)
       .stroke();
    doc.moveDown(0.6);
  };

  // Main details
  title('Facundo Paduczak');
  doc.moveDown(0.2);
  subtitle('Creative Strategist | Bilingual Copywriter (EN/ES) | AI-Powered Marketing');
  doc.moveDown(0.2);
  contactInfo('Buenos Aires, Argentina | +54 9 11 4448 1804 | fpaduczak@gmail.com');
  contactInfo('linkedin.com/in/facundo-paduczak-259089185 | behance.net/4e31f888');

  // Professional Summary
  sectionHeader('Professional Summary');
  doc.fillColor(textColor)
     .fontSize(9)
     .font('Helvetica')
     .text(
       'Creative Strategist and Copywriter with 4+ years of experience building integrated campaigns, brand narratives, and performance-driven content for global accounts — spanning ATL, BTL, digital, social, CRM, PR, and experiential. Track record of delivering creative across complex, fast-paced agency and consulting environments, from campaign concepting to final copy. Currently embedding generative AI and prompt engineering into creative production pipelines to accelerate output and drive personalization at scale.',
       { align: 'justify', lineGap: 3 }
     );

  // Professional Experience
  sectionHeader('Professional Experience');

  // Experience 1
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10.5).text('Creative Copywriter ', { continued: true });
  doc.font('Helvetica').text('| VML', { continued: true });
  doc.font('Helvetica').text(' '.repeat(65) + 'Jan 2024 – Present', { align: 'right' });
  
  doc.fillColor(secondaryColor).font('Helvetica-Oblique').fontSize(8.5).text('Global Account: United Airlines — ATL, Digital, Social, CRM');
  doc.moveDown(0.3);
  
  const bullet = (text: string) => {
    doc.fillColor(textColor)
       .font('Helvetica')
       .fontSize(9)
       .text('•  ' + text, { 
         indent: 12, 
         align: 'left', 
         lineGap: 2.5 
       });
  };

  bullet("Develop integrated campaign concepts, taglines, and brand narratives for one of the world's largest airline brands, in close collaboration with art directors, creative directors, and strategy teams.");
  bullet("Write and optimize copy for paid social, display, OOH, email, and CRM touchpoints — applying A/B testing results to improve click-through and conversion performance.");
  bullet("Embed generative AI tools (OpenAI, Claude, Gemini) into the creative workflow to accelerate ideation, copy iteration, and content personalization across markets.");
  bullet("Maintain consistent brand voice and messaging standards across all English and Spanish customer touchpoints within airline industry compliance guidelines.");

  doc.moveDown(0.8);

  // Experience 2
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10.5).text('Lecturer — Creativity, Digital Advertising & AI ', { continued: true });
  doc.font('Helvetica').text('| UADE', { continued: true });
  doc.font('Helvetica').text(' '.repeat(32) + 'Mar 2024 – Present', { align: 'right' });
  
  doc.fillColor(secondaryColor).font('Helvetica-Oblique').fontSize(8.5).text('School of Communication — Faculty of Design and Communication');
  doc.moveDown(0.3);
  bullet("Design and deliver undergraduate curricula on Creativity & Technology, Digital Advertising, and Artificial Intelligence for Communication, covering real agency workflows and current industry frameworks.");
  bullet("Guide students through campaign strategy, copywriting workshops, and AI-powered content production projects that mirror professional practice.");

  doc.moveDown(0.8);

  // Experience 3
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10.5).text('Bilingual Communications Analyst ', { continued: true });
  doc.font('Helvetica').text('| Accenture', { continued: true });
  doc.font('Helvetica').text(' '.repeat(45) + 'Jan 2023 – Dec 2023', { align: 'right' });
  
  doc.fillColor(secondaryColor).font('Helvetica-Oblique').fontSize(8.5).text('Communication & Change Management Practice');
  doc.moveDown(0.3);
  bullet("Produced English and Spanish communications for large-scale organizational change management programs across multinational clients, including executive messaging, leadership scripts, and employee engagement content.");
  bullet("Built stakeholder messaging frameworks and communication matrices to support complex corporate transformation initiatives across globally distributed teams.");

  // For multipage control, we force a page break for section Skills, Industry, Education etc.
  doc.addPage();

  // Header on Page 2
  doc.fillColor(primaryColor)
     .fontSize(14)
     .font('Helvetica-Bold')
     .text('Facundo Paduczak', { align: 'left' });
  doc.fillColor(secondaryColor)
     .fontSize(8.5)
     .font('Helvetica')
     .text('Creative Strategist | Bilingual Copywriter | AI-Powered Marketing', { align: 'left' });
  
  doc.moveTo(45, doc.y + 3)
     .lineTo(567, doc.y + 3)
     .strokeColor(lineColor)
     .lineWidth(0.5)
     .stroke();
  doc.moveDown(0.5);

  // Experience 4 (Magma Agency)
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10.5).text('Creative Copywriter ', { continued: true });
  doc.font('Helvetica').text('| Magma Agency', { continued: true });
  doc.font('Helvetica').text(' '.repeat(60) + 'Jan 2022 – Dec 2022', { align: 'right' });
  
  doc.fillColor(secondaryColor).font('Helvetica-Oblique').fontSize(8.5).text('Copywriting & Content Strategy — Beauty, Health, Winery, Technology');
  doc.moveDown(0.3);
  bullet("Concepted and executed integrated campaigns across ATL, BTL, digital, and social — from brand activations and retail POP to influencer briefs, short-form video (Reels, TikTok, Shorts), and paid social.");
  bullet("Developed brand positioning documents, go-to-market plans, and creative briefs in collaboration with strategy and account teams across multiple simultaneous client accounts.");

  // Skills Section on page 2
  sectionHeader('Skills');
  
  const skillLabel = (category: string, list: string) => {
    doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9).text(category + ': ', { continued: true });
    doc.font('Helvetica').fillColor('#444444').text(list, { lineGap: 3 });
    doc.moveDown(0.4);
  };

  skillLabel('Creative & Strategy', 'Creative Strategy, Campaign Concepting, Copywriting (ATL / BTL / Digital), Brand Positioning, Integrated Campaigns, Go-to-Market Planning, Content Strategy, Storytelling, Editorial Content, Cultural Insights, Trend Analysis');
  skillLabel('Digital, Social & Performance', 'Social Media Management (Instagram, TikTok, LinkedIn, X), Short-form Video (Reels, TikTok, Shorts), Paid Social & Display Advertising, Influencer Marketing, UGC & Branded Content, Meta Ads Manager, Google Analytics, A/B Testing, Looker Studio, Power BI, KPI Reporting');
  skillLabel('AI & Emerging Technology', 'Generative AI, Prompt Engineering, LLMs, AI Workflows, OpenAI, Claude (Anthropic), Gemini, Perplexity, RAG, Vector Databases, Chatbots & AI Agents, AR/VR, Interactive Experiences');
  skillLabel('Creative Production', 'Adobe Photoshop, Adobe Illustrator, Adobe Premiere Pro, Adobe After Effects, Adobe Animate, Figma, Canva, CapCut');
  skillLabel('CRM & Marketing Ops', 'Salesforce, HubSpot, Customer Journey Mapping, Email Marketing, Marketing Automation, Microsoft Excel, Office 365');
  skillLabel('BTL & Experiential', 'Brand Activations, Events & Launches, Retail & POP Displays, Sponsorships, Merchandise, Press & PR, Media Kits, Partnerships & Collaborations, Earned Media');
  skillLabel('Project Management', 'Trello, Slack, Jira, Notion, Cross-functional Collaboration');
  skillLabel('Core Competencies', 'Creative Thinking, Strategic Communication, Problem-Solving, Adaptability, Team Leadership, Time Management, Cultural Intelligence');

  // Industry Experience
  sectionHeader('Industry Experience');
  doc.fillColor(textColor)
     .font('Helvetica')
     .fontSize(9)
     .text('Airlines   |   Technology   |   Beauty   |   Health   |   Agro-industrial   |   Mining   |   Travel   |   Winery', { align: 'center' });

  // Education
  sectionHeader('Education');
  
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10).text('Bachelor\'s Degree in Advertising', { continued: true });
  doc.font('Helvetica').text(' '.repeat(65) + '2019 – 2023', { align: 'right' });
  doc.fillColor(secondaryColor).font('Helvetica').fontSize(8.5).text('Universidad de Moron — Buenos Aires, Argentina');
  doc.font('Helvetica-Oblique').text('Focus: Creative Strategy, Brand Communication, Integrated Campaign Development');

  doc.moveDown(0.6);

  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(10).text('International High School Diploma — Cambridge ICE', { continued: true });
  doc.font('Helvetica').text(' '.repeat(40) + '2013 – 2018', { align: 'right' });
  doc.fillColor(secondaryColor).font('Helvetica').fontSize(8.5).text('Sarmiento International School — Buenos Aires, Argentina');
  doc.font('Helvetica-Oblique').text('Cambridge International Certificate of Education | Orientation: Social Sciences');

  // Certifications & Languages
  sectionHeader('Certifications & Languages');
  
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9).text('Certifications: ', { continued: true });
  doc.font('Helvetica').text('First Certificate in English (FCE) — Cambridge University (2018)', { lineGap: 3 });
  
  doc.moveDown(0.3);
  
  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9).text('Languages: ', { continued: true });
  doc.font('Helvetica').text('Spanish (Native)   |   English (Bilingual C2 — Cambridge FCE Certified)   |   Portuguese (Intermediate B1)');

  doc.end();
  });
}

// Helper function to create the One Page CV PDF (styled, matching design)
function createOnePageCV(outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 35, bottom: 35, left: 35, right: 35 }
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);

  // Design Theme colors (high contrast and crisp)
  const textColor = '#1a1a1a';
  const mutedTextColor = '#4b5563';
  const accentColor = '#2563eb'; // blue-600
  const lightBgHex = '#f9fafb';
  
  // Custom styled background or blocks can be drawn directly
  
  // Header: Hola Hello Olá banner / Facundo Paduczak
  doc.rect(35, 35, 542, 80).fill('#f3f4f6');
  
  // Draw text on the left of header
  doc.fillColor(textColor)
     .font('Helvetica-Bold')
     .fontSize(22)
     .text('Hola\nHello\nOlá', 45, 45, { lineGap: -2 });

  // Facundo Paduczak
  doc.fillColor(textColor)
     .font('Helvetica-Bold')
     .fontSize(24)
     .text('Facundo Paduczak', 180, 50);

  // Subtitle
  doc.fillColor(mutedTextColor)
     .font('Helvetica')
     .fontSize(10)
     .text('Creative Strategist | Bilingual Copywriter (EN/ES)', 180, 78);

  // Short Bio / About box on the right
  doc.rect(400, 45, 165, 60).lineWidth(1).stroke('#e5e7eb');
  doc.fillColor(textColor)
     .font('Helvetica-Oblique')
     .fontSize(8)
     .text('I look for the tension between attention and trust. That\'s where the strongest ideas live.', 410, 52, { width: 145, align: 'center', lineGap: 2 });

  doc.y = 130; // reset y position

  // Draw 2-column layout below
  // Column 1: WORK EXPERIENCE & SKILLS (Width: 260)
  // Column 2: EDUCATION, LANGUAGES & CAPABILITIES (Width: 260, x: 315)
  
  const col1X = 35;
  const col2X = 315;
  const colWidth = 250;

  // Let's store current coordinates
  let col1Y = 130;
  let col2Y = 130;

  // Left Column Content: WORK EXPERIENCE
  doc.text('', col1X, col1Y); // move to start parameter
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text('WORK EXPERIENCE');
  doc.moveTo(doc.x, doc.y + 2).lineTo(col1X + colWidth, doc.y + 2).strokeColor('#e5e7eb').lineWidth(1).stroke();
  doc.moveDown(0.5);

  const expItem = (title: string, company: string, date: string, desc: string) => {
    doc.fillColor(textColor).font('Helvetica-Bold').fontSize(9).text(title);
    doc.fillColor(mutedTextColor).font('Helvetica').fontSize(8.5).text(`${company}  |  ${date}`);
    doc.fillColor('#374151').font('Helvetica-Oblique').fontSize(8).text(desc, { width: colWidth, lineGap: 2 });
    doc.moveDown(0.6);
  };

  expItem('Creative Copywriter', 'VML', '2024-Today', 'Bilingual copywriter for United Airlines.');
  expItem('Teacher: Creativity & AI', 'UADE', '2024-Today', 'School of Communication - Digital Advertising & AI.');
  expItem('Bilingual Communications Analyst', 'Accenture', '2023-2024', 'Communication and Change Management.');
  expItem('Creative Copywriter', 'Magma Agency', '2022-2023', 'Copywriting and content strategy.');

  // Left Column Content: SKILLS & INDUSTRIES
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text('SKILLS');
  doc.moveTo(doc.x, doc.y + 2).lineTo(col1X + colWidth, doc.y + 2).strokeColor('#e5e7eb').lineWidth(1).stroke();
  doc.moveDown(0.5);

  doc.fillColor(textColor).font('Helvetica').fontSize(8)
     .text('Creativity   •   Communication   •   Problem-solving   •   Time Management\nAdaptability   •   Team Building   •   Strategic Thinking', { lineGap: 3 });
  
  doc.moveDown(0.8);
  
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(10).text('INDUSTRIES OF EXPERTISE');
  doc.fillColor(textColor).font('Helvetica-Oblique').fontSize(8)
     .text('Airlines | Agro-industrial | Beauty | Health | Minery | Technology | Travel | Winery', { lineGap: 2 });

  col1Y = doc.y;

  // Right Column Content: EDUCATION
  doc.y = col2Y;
  doc.x = col2X;
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text('EDUCATION', col2X, col2Y);
  doc.moveTo(col2X, doc.y + 2).lineTo(col2X + colWidth, doc.y + 2).strokeColor('#e5e7eb').lineWidth(1).stroke();
  doc.moveDown(0.5);

  const eduItem = (degree: string, school: string, date: string) => {
    doc.fillColor(textColor).font('Helvetica-Bold').fontSize(8.5).text(degree, col2X);
    doc.fillColor(mutedTextColor).font('Helvetica').fontSize(8).text(`${school}  •  ${date}`);
    doc.moveDown(0.4);
  };

  eduItem('Degree in Advertising', 'Moron University', '2019-2023');
  eduItem('First Certificate in English', 'Cambridge University', '2018');
  eduItem('Internacional High School Diploma', 'Sarmiento School (Cambridge ICE)', '2013-2018');

  // Right Column Content: LANGUAGES
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text('LANGUAGES', col2X);
  doc.moveTo(col2X, doc.y + 2).lineTo(col2X + colWidth, doc.y + 2).strokeColor('#e5e7eb').lineWidth(1).stroke();
  doc.moveDown(0.5);

  doc.fillColor(textColor).font('Helvetica-Bold').fontSize(8.5).text('Spanish:  Native', col2X);
  doc.text('English:  Bilingual (Cambridge FCE Certified)');
  doc.text('Portuguese:  Intermediate (B1)');

  doc.moveDown(0.8);

  // Right Column Content: CAPABILITIES
  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text('KEY CAPABILITIES', col2X);
  doc.moveTo(col2X, doc.y + 2).lineTo(col2X + colWidth, doc.y + 2).strokeColor('#e5e7eb').lineWidth(1).stroke();
  doc.moveDown(0.5);

  const capItem = (catLabel: string, items: string) => {
    doc.fillColor(textColor).font('Helvetica-Bold').fontSize(8).text(catLabel + ': ', { continued: true });
    doc.font('Helvetica').fillColor(mutedTextColor).text(items, { lineGap: 1.5 });
    doc.moveDown(0.3);
  };

  capItem('Creative Systems', 'Photoshop, Illustrator, Canva, Figma');
  capItem('Content & Motion', 'Premiere Pro, After Effects, CapCut');
  capItem('Growth & Performance', 'Google Analytics, Meta Ads Manager, Looker Studio');
  capItem('AI & Creative Intelligence', 'ChatGPT, Claude, Gemini, Prompt Engineering');

  col2Y = doc.y;

  // Let's resolve the final bottom part for Creative Output
  const maxColumnY = Math.max(col1Y, col2Y) + 15;
  doc.x = 35;
  doc.y = maxColumnY;

  doc.fillColor(accentColor).font('Helvetica-Bold').fontSize(11).text('CREATIVE OUTPUT');
  doc.moveTo(35, doc.y + 2).lineTo(577, doc.y + 2).strokeColor('#e5e7eb').lineWidth(1).stroke();
  doc.moveDown(0.5);

  doc.fillColor(textColor).font('Helvetica').fontSize(7.5);
  doc.text('• Digital & Social: TikTok, IG, LinkedIn, YouTube Reels, display advertising and influencer branding briefs.', { indent: 10, lineGap: 1.5 });
  doc.text('• Content & Storytelling: Copywriting (ATL / BTL / Digital), multi-platform campaign hooks, and editorial.', { indent: 10, lineGap: 1.5 });
  doc.text('• Experiential & BTL: Activations, product launches, retail POP layouts, and custom media collaborations.', { indent: 10, lineGap: 1.5 });

  // Draw elegant bottom border/bar
  doc.rect(35, 735, 542, 25).fill('#1e3a8a');
  doc.fillColor('#ffffff')
     .font('Helvetica-Bold')
     .fontSize(8)
     .text('fpaduczak@gmail.com   |   +5491144481804   |   LinkedIn: @facundo-paduczak   |   Behance: /4e31f888', 40, 743, { align: 'center' });

  doc.end();
  });
}

async function runGeneration() {
  console.log('Generating PDFs...');
  try {
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    await createATSCV(path.join(publicDir, 'Facundo_Paduczak_CV_ATS.pdf'));
    await createOnePageCV(path.join(publicDir, 'Facundo_Paduczak_CV_One_Page.pdf'));
    console.log('PDFs generated successfully!');
  } catch (err) {
    console.error('Error generating PDFs:', err);
    process.exit(1);
  }
}

runGeneration();
