const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  console.log('Navigating to localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 60000 });
  } catch(e) {
    console.log("Could not load page. Is the server running?");
    process.exit(1);
  }

  // Hide scrollbars for cleaner mockups
  await page.addStyleTag({content: '::-webkit-scrollbar { display: none; }'});
  
  // Wait a bit for animations/images to load
  await new Promise(r => setTimeout(r, 2000));

  console.log('Taking desktop screenshot...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.screenshot({ path: 'desktop.png' });

  console.log('Taking mobile screenshot...');
  // iPhone 13 Pro viewport
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.addStyleTag({content: '::-webkit-scrollbar { display: none; }'});
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: 'mobile.png' });

  console.log('Generating mockup HTML...');
  const desktopImg = fs.readFileSync('desktop.png', 'base64');
  const mobileImg = fs.readFileSync('mobile.png', 'base64');

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          margin: 0;
          padding: 0;
          width: 1024px;
          height: 768px;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Decorative background elements */
        .circle-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          top: -200px;
          right: -100px;
        }
        .circle-2 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          bottom: -100px;
          left: -150px;
        }

        .title {
          position: absolute;
          top: 40px;
          left: 50px;
          color: white;
        }
        .title h1 {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .title p {
          margin: 5px 0 0 0;
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
        }

        .mockup-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          margin-top: 50px;
          z-index: 10;
        }

        /* Laptop Mockup */
        .laptop-container {
          position: relative;
          width: 600px;
          height: 380px;
        }
        .laptop-screen {
          width: 500px;
          height: 312px;
          background: #000;
          border-radius: 8px 8px 0 0;
          margin: 0 auto;
          position: relative;
          border: 12px solid #333;
          border-bottom: 20px solid #222;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          overflow: hidden;
        }
        .laptop-screen img {
          width: 100%;
          height: auto;
          display: block;
        }
        .laptop-base {
          width: 600px;
          height: 15px;
          background: #cfcfcf;
          border-radius: 0 0 15px 15px;
          position: absolute;
          bottom: 40px;
          left: 0;
          box-shadow: inset 0 -3px 5px rgba(0,0,0,0.2), 0 10px 20px rgba(0,0,0,0.3);
        }
        .laptop-base::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: #a0a0a0;
          border-radius: 0 0 4px 4px;
        }

        /* Phone Mockup */
        .phone-container {
          position: relative;
          width: 180px;
          height: 360px;
          background: #111;
          border-radius: 30px;
          padding: 8px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 2px #444;
          z-index: 11;
          margin-top: 30px;
        }
        .phone-notch {
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 20px;
          background: #111;
          border-radius: 0 0 12px 12px;
          z-index: 20;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
        }
        .phone-screen img {
          width: 100%;
          height: auto;
          display: block;
        }

        .badge {
          position: absolute;
          bottom: 40px;
          right: 50px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 10px 20px;
          border-radius: 30px;
          color: white;
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .badge span {
          width: 10px;
          height: 10px;
          background: #4ade80;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px #4ade80;
        }
      </style>
    </head>
    <body>
      <div class="circle-1"></div>
      <div class="circle-2"></div>
      
      <div class="title">
        <h1>Quadra Home Tuitions</h1>
        <p>Responsive MERN Stack Application</p>
      </div>

      <div class="mockup-container">
        <div class="laptop-container">
          <div class="laptop-screen">
            <img src="data:image/png;base64,${desktopImg}" alt="Desktop view">
          </div>
          <div class="laptop-base"></div>
        </div>
        
        <div class="phone-container">
          <div class="phone-notch"></div>
          <div class="phone-screen">
            <img src="data:image/png;base64,${mobileImg}" alt="Mobile view">
          </div>
        </div>
      </div>

      <div class="badge">
        <span></span> 100% Fully Responsive
      </div>
    </body>
    </html>
  `;
  
  fs.writeFileSync('mockup.html', htmlContent);

  console.log('Rendering final mockup image...');
  await page.setViewport({ width: 1024, height: 768 });
  const localHtmlUrl = 'file://' + path.resolve('mockup.html');
  await page.goto(localHtmlUrl, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: '05_Responsive_Desktop_Mobile.png' });

  await browser.close();
  console.log('Done!');
})();
