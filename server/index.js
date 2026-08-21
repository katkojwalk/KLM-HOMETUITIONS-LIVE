const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy is required for express-rate-limit to work behind Render/Heroku
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    const defaultOrigins = [
      'http://localhost:3000',
      'https://quadrahometuitions.in',
      'https://www.quadrahometuitions.in'
    ];
    let allowedOrigins = [...defaultOrigins];
    if (process.env.CLIENT_URL) {
      const envOrigins = process.env.CLIENT_URL.split(',').map(url => url.trim());
      allowedOrigins = [...allowedOrigins, ...envOrigins];
    }
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (mongoUri) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.error('CRITICAL: MONGO_URI / MONGODB_URI environment variable is missing from .env');
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


// Static SEO & Sitemap endpoints
app.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  res.sendFile(path.join(__dirname, '../client/public/sitemap.xml'));
});

app.get('/robots.txt', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.sendFile(path.join(__dirname, '../client/public/robots.txt'));
});

app.get('/google08a9ff9267e6b1be.html', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '../client/public/google08a9ff9267e6b1be.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Quadra Home Tuitions API is running',
    mongoConnected: mongoose.connection.readyState === 1
  });
});

// Add root route for connection message
app.get('/', (req, res) => {
  res.send('Backend server is connected');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
