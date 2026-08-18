const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });

  const recorder = new PuppeteerScreenRecorder(page);
  await recorder.start('Quadra_Showcase.mp4');

  await page.setRequestInterception(true);
  page.on('request', request => {
    const url = request.url();
    if (url.includes('/api/auth/me')) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          user: { _id: 'admin1', name: 'Admin Manager', email: 'admin@quadra.com', role: 'admin', hasPaidRegistrationFee: false } 
        })
      });
    } else if (url.includes('/api/admin/dashboard')) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          statistics: { totalUsers: 245, totalStudents: 198, totalTutors: 45, activeUsers: 230 } 
        })
      });
    } else if (url.includes('/api/admin/users')) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          users: [
            { _id: 'u1', name: 'John Doe', email: 'john.d@example.com', role: 'student', isActive: true, createdAt: '2023-01-10T12:00:00Z' },
            { _id: 'u2', name: 'Sarah Smith', email: 'sarah.s@example.com', role: 'tutor', isActive: true, createdAt: '2023-02-15T12:00:00Z' },
            { _id: 'u3', name: 'Admin Manager', email: 'admin@quadra.com', role: 'admin', isActive: true, createdAt: '2023-01-01T12:00:00Z' },
            { _id: 'u4', name: 'Mike Johnson', email: 'mike.j@example.com', role: 'student', isActive: false, createdAt: '2023-03-20T12:00:00Z' },
            { _id: 'u5', name: 'Emily Davis', email: 'emily.d@example.com', role: 'tutor', isActive: true, createdAt: '2023-04-12T12:00:00Z' },
            { _id: 'u6', name: 'Priya Sharma', email: 'priya.s@example.com', role: 'tutor', isActive: true, createdAt: '2023-05-18T12:00:00Z' },
            { _id: 'u7', name: 'Ravi Kumar', email: 'ravi.k@example.com', role: 'student', isActive: true, createdAt: '2023-06-05T12:00:00Z' },
            { _id: 'u8', name: 'Anita Patel', email: 'anita.p@example.com', role: 'student', isActive: true, createdAt: '2023-07-22T12:00:00Z' }
          ]
        })
      });
    } else if (url.includes('/api/payment/create-order')) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 'order_123', amount: 50000, currency: 'INR' })
      });
    } else {
      request.continue();
    }
  });

  console.log('Recording Home...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.addStyleTag({content: '::-webkit-scrollbar { display: none; }'});
  await new Promise(r => setTimeout(r, 2000));
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 3000));

  await page.evaluate(() => { localStorage.setItem('token', 'dummy-admin-token'); });

  console.log('Recording Admin Users...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: '06_Admin_Users.png' });
  await new Promise(r => setTimeout(r, 2500));

  console.log('Recording Payment...');
  await page.goto('http://localhost:3000/payment', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: '07_Payment_Page.png' });
  await new Promise(r => setTimeout(r, 3000));

  await recorder.stop();
  await browser.close();
  console.log('Done!');
})();
