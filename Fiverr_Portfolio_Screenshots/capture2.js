const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Set exact viewport as requested
  await page.setViewport({ width: 1024, height: 768 });

  console.log('Navigating to Login page...');
  try {
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2', timeout: 60000 });
  } catch(e) {
    console.log("Could not load login page.");
    process.exit(1);
  }

  // Hide scrollbars
  await page.addStyleTag({content: '::-webkit-scrollbar { display: none; }'});
  await new Promise(r => setTimeout(r, 1000));
  
  console.log('Taking Login screenshot...');
  await page.screenshot({ path: '04_Login_Register.png' });

  // Now setup interception for the admin dashboard
  console.log('Setting up intercepts for Admin Dashboard...');
  await page.setRequestInterception(true);
  
  page.on('request', request => {
    const url = request.url();
    if (url.includes('/api/auth/me')) {
      request.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          user: { _id: 'admin1', name: 'Admin Manager', email: 'admin@quadra.com', role: 'admin', hasPaidRegistrationFee: true } 
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
            { _id: 'u6', name: 'Robert Wilson', email: 'robert.w@example.com', role: 'student', isActive: true, createdAt: '2023-05-05T12:00:00Z' }
          ]
        })
      });
    } else {
      request.continue();
    }
  });

  // Navigate to root to set localStorage and trigger auth check
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await page.evaluate(() => {
    localStorage.setItem('token', 'dummy-admin-token');
  });

  console.log('Navigating to Admin Dashboard...');
  // Now navigate to admin
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle2' });
  
  await page.addStyleTag({content: '::-webkit-scrollbar { display: none; }'});
  await new Promise(r => setTimeout(r, 2000)); // wait for animations and render
  
  console.log('Taking Admin Dashboard screenshot...');
  await page.screenshot({ path: '05_Admin_Dashboard.png' });

  await browser.close();
  console.log('Done!');
})();
