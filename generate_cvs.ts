import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

// Helper function to create the clean classic serif resume (matching the user's template exactly)
function createATSCV(outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 0.5 inch margins (36 points) for high density and elegant alignment
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: { top: 40, bottom: 40, left: 45, right: 45 },
      bufferPages: true
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);
    
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);

    // Color definitions (high contrast executive look)
    const primaryColor = '#000000';
    const secondaryColor = '#374151'; // Slate gray
    const lineColor = '#4b5563'; // Charcoal-gray rule line
    const textColor = '#1a1a1a'; // Deep off-black body

    // 1. Header (Centered, uppercase name, clean contact info with link annotations)
    doc.fillColor(primaryColor)
       .font('Times-Bold')
       .fontSize(23)
       .text('FACUNDO PADUCZAK', { align: 'center' });
    
    doc.moveDown(0.2);

    // Contact info block with clickable links
    doc.fillColor(secondaryColor)
       .font('Times-Roman')
       .fontSize(9.5);
    
    doc.text('Buenos Aires, AR  |  +54 9 11 4448-1804  |  ', { align: 'center', continued: true })
       .fillColor('#000000')
       .text('fpaduczak@gmail.com', { link: 'mailto:fpaduczak@gmail.com', underline: true, continued: true })
       .fillColor(secondaryColor)
       .text('  |  ', { continued: true })
       .fillColor('#000000')
       .text('LinkedIn', { link: 'https://linkedin.com/in/facundo-paduczak-259089185', underline: true, continued: true })
       .fillColor(secondaryColor)
       .text('  |  ', { continued: true })
       .fillColor('#000000')
       .text('Portfolio', { link: 'https://behance.net/4e31f888', underline: true });

    doc.moveDown(0.3);

    // Section Header Helper
    const addSectionHeader = (titleText: string) => {
      doc.moveDown(0.8);
      const currentY = doc.y;
      
      doc.fillColor(primaryColor)
         .font('Times-Bold')
         .fontSize(10.5)
         .text(titleText.toUpperCase(), 45, currentY);
      
      const lineY = doc.y + 2;
      doc.moveTo(45, lineY)
         .lineTo(567, lineY)
         .strokeColor(lineColor)
         .lineWidth(0.5)
         .stroke();
      
      doc.y = lineY + 6; // Move below the rule line
    };

    // --- SUMMARY SECTION ---
    addSectionHeader('Summary');
    doc.fillColor(textColor)
       .font('Times-Roman')
       .fontSize(9.5)
       .text(
         'Bilingual (EN/ES) Creative Strategist with 4+ years driving integrated campaigns across digital, ATL and BTL channels. Expertise in campaign concepting, content strategy, AI-powered workflows, and change management communications. Proven impact across Airlines, Technology, Beauty, Health, and Winery sectors. Currently working as a Copywriter at VML Argentina and teaching Advertising students at UADE.',
         { align: 'justify', lineGap: 2.5 }
       );

    // --- EXPERIENCE SECTION ---
    addSectionHeader('Experience');

    // Experience Row Builder
    const addExperienceRow = (title: string, company: string, date: string) => {
      doc.moveDown(0.4);
      const currentY = doc.y;
      
      // Left side: Job Title and Company
      doc.fillColor(primaryColor)
         .font('Times-Bold')
         .fontSize(10)
         .text(`${title} · `, 45, currentY, { continued: true })
         .font('Times-Italic')
         .text(company);
      
      // Right side: Dates
      doc.fillColor(secondaryColor)
         .font('Times-Roman')
         .fontSize(9.5)
         .text(date, 45, currentY, { align: 'right', width: 522 });
      
      doc.y = currentY + 14; // advance line down
    };

    // Bullet generator
    const addBullet = (bulletText: string) => {
      doc.fillColor(textColor)
         .font('Times-Roman')
         .fontSize(9)
         .text('•  ', { indent: 10, continued: true })
         .text(bulletText, { 
           indent: 10, 
           align: 'justify', 
           lineGap: 1.5 
         });
    };

    // 1. VML
    addExperienceRow('Creative Copywriter', 'VML', '2024 – Present');
    addBullet('Lead bilingual EN/ES copywriting for United Airlines across digital, paid social, OOH, and video — ATL and BTL.');
    addBullet('Develop campaign concepts and brand messaging in collaboration with strategy and design teams.');
    addBullet('Integrate AI workflows and prompt engineering to accelerate content production.');

    // 2. UADE
    addExperienceRow('University Professor', 'UADE', '2024 – Present');
    addBullet('Teach Creativity & Technology, Digital Advertising and AI applied to advertising, communication and entertainment.');

    // 3. Accenture
    addExperienceRow('Bilingual Communications & Change Management Analyst', 'Accenture', '2023 – 2024');
    addBullet('Designed and executed EN/ES change management communications for large-scale transformation projects across multiple industries.');
    addBullet('Produced stakeholder-facing materials and internal campaigns, working with global teams.');

    // 4. Magma Agency
    addExperienceRow('Creative Copywriter', 'Magma Agency', '2022 – 2023');
    addBullet('Developed brand strategy, copywriting and digital content for a wide range of clients.');

    // 5. Independent
    addExperienceRow('Freelance Creative Strategist', 'Independent', '2019 – Present');
    addBullet('End-to-end creative strategy, go-to-market planning, influencer/UGC content, and immersive digital experiences (AR/VR) for different industries.');


    // --- EDUCATION SECTION ---
    addSectionHeader('Education');

    const addEducationRow = (degree: string, school: string, date: string) => {
      doc.moveDown(0.3);
      const currentY = doc.y;
      
      doc.fillColor(primaryColor)
         .font('Times-Bold')
         .fontSize(9.5)
         .text(`${degree} · `, 45, currentY, { continued: true })
         .font('Times-Italic')
         .text(school);
      
      doc.fillColor(secondaryColor)
         .font('Times-Roman')
         .fontSize(9.5)
         .text(date, 45, currentY, { align: 'right', width: 522 });
      
      doc.y = currentY + 13;
    };

    addEducationRow('Degree in Advertising', 'Universidad de Morón', '2023');
    addEducationRow('Cambridge First Certificate in English (FCE)', 'Cambridge University', '2018');
    addEducationRow('Cambridge International Certificate (ICE)', 'Cambridge University', '2018');
    addEducationRow('International High School Diploma', 'Sarmiento International School', '2018');


    // --- LANGUAGES SECTION ---
    addSectionHeader('Languages');
    doc.moveDown(0.2);
    
    // Inline or simple list for languages to keep it tight & matching original
    doc.fillColor(textColor)
       .font('Times-Roman')
       .fontSize(9.5);
    
    addBullet('Spanish (Native)');
    addBullet('English (Bilingual)');
    addBullet('Portuguese (Intermediate)');


    // --- SKILLS SECTION ---
    addSectionHeader('Skills');
    doc.moveDown(0.3);

    const addSkillCategory = (categoryName: string, skillsList: string) => {
      doc.fillColor(primaryColor)
         .font('Times-Bold')
         .fontSize(9.5)
         .text(`${categoryName}: `, { continued: true })
         .font('Times-Roman')
         .fillColor(textColor)
         .text(skillsList, { lineGap: 1.5 });
      doc.moveDown(0.2);
    };

    addSkillCategory('Creative', 'Copywriting (ATL/BTL/Digital), Campaign Concepting, Brand Positioning, Content Strategy, Storytelling, Editorial.');
    addSkillCategory('Digital & Performance', 'Meta Ads Manager, Google Analytics, Looker Studio, Power BI, A/B Testing, SEO/SEM, Paid Social.');
    addSkillCategory('AI & Innovation', 'Prompt Engineering, LLMs (GPT-4, Claude, Gemini), RAG, AI Workflows, Chatbots, AI Agents, API, AR/VR, AI powered Campaigns.');
    addSkillCategory('Tools', 'Adobe CC (Photoshop, Illustrator, Premiere, After Effects), Figma, Canva, Salesforce, HubSpot, Notion, Jira.');
    addSkillCategory('Industries', 'Airlines, Agro-industrial, Beauty, Health, Mining, Technology, Travel and Winery.');

    doc.end();
  });
}

// Keep a duplicate generator targeting One Page CV with exact same structure so both are fully aligned
function createOnePageCV(outputPath: string): Promise<void> {
  return createATSCV(outputPath);
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
    console.error('Error allocating / creating PDFs:', err);
    process.exit(1);
  }
}

runGeneration();
