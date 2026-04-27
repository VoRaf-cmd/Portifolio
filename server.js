const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================

// CORS Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  res.header('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.static(path.join(__dirname)));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES - STATIC PAGES
// ============================================

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// API ROUTES
// ============================================

// GET - Light Effect Configuration
app.get('/api/light-config', (req, res) => {
  res.json({
    success: true,
    data: {
      enabled: true,
      intensity: 0.2,
      radius: 500,
      blurAmount: 60,
      color: {
        r: 0,
        g: 168,
        b: 107,
        hex: '#00A86B',
      },
      mixBlendMode: 'screen',
      cursor: {
        enabled: true,
        size: 20,
        glow: true,
      },
      animation: {
        smooth: true,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
    meta: {
      version: '1.0.0',
      lastUpdated: new Date().toISOString(),
    },
  });
});

// GET - Portfolio Data
app.get('/api/portfolio', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Rafael Carlesso',
      title: 'Designer & Developer',
      subtitle: 'Crafting interfaces that inspire & interact',
      description: 'Sou um desenvolvedor criativo com paixão por design minimalista e experiências de usuário intuitivas.',
      skills: {
        frontend: {
          category: 'Frontend',
          items: ['HTML5', 'CSS3', 'JavaScript'],
          proficiency: [95, 92, 88],
        },
        backend: {
          category: 'Backend & Tools',
          items: ['Python', 'Lua', 'Design/UX'],
          proficiency: [85, 78, 90],
        },
      },
      projects: 5,
      experience: '12+',
      experienceUnit: 'Months',
      stats: {
        completed: 5,
        satisfaction: 100,
      },
    },
  });
});

// POST - Contact Form Submission
app.post('/api/contact', (req, res) => {
  const { name, email, message, timestamp } = req.body;

  // Validation
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push('Invalid email format');
  }

  if (!message || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      errors: errors,
      message: 'Validation failed',
    });
  }

  // Log the contact
  const contactLog = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    submittedAt: timestamp || new Date().toISOString(),
    ipAddress: req.ip,
  };

  console.log('📧 New contact submission:', contactLog);

  // In production, you would save this to a database
  // For now, we'll just log it

  res.status(200).json({
    success: true,
    message: 'Contact form submitted successfully',
    data: {
      name: contactLog.name,
      email: contactLog.email,
      submittedAt: contactLog.submittedAt,
    },
  });
});

// POST - Track Mouse Events (Optional Analytics)
app.post('/api/track-mouse', (req, res) => {
  const { x, y, timestamp } = req.body;

  if (!x || !y) {
    return res.status(400).json({
      success: false,
      error: 'Missing coordinates',
    });
  }

  // Log mouse tracking (in production, store in DB)
  console.log(`Mouse event: (${x}, ${y}) at ${new Date(timestamp).toISOString()}`);

  res.json({
    success: true,
    message: 'Mouse position tracked',
    data: { x, y, timestamp },
  });
});

// GET - Analytics Data
app.get('/api/analytics/light-effect', (req, res) => {
  res.json({
    success: true,
    data: {
      effectName: 'Radial Gradient Mouse Follower',
      version: '1.0.0',
      status: 'active',
      performance: {
        fps: 60,
        renderTime: '< 16ms',
        blurFilter: 'enabled',
        gpuAccelerated: true,
        mixBlendMode: 'screen',
      },
      features: [
        'Smooth mouse tracking',
        'Radial gradient light',
        'Dynamic cursor glow',
        'Responsive to viewport',
        'Performance optimized',
        'Dark mode compatible',
        'Mobile friendly',
      ],
      uptime: '99.9%',
      lastMaintenance: new Date().toISOString(),
    },
  });
});

// GET - Skills Detailed
app.get('/api/skills', (req, res) => {
  res.json({
    success: true,
    skills: [
      {
        category: 'Frontend',
        description: 'Modern web development',
        items: [
          { name: 'HTML5', proficiency: 95, years: 5 },
          { name: 'CSS3', proficiency: 92, years: 5 },
          { name: 'JavaScript', proficiency: 88, years: 4 },
        ],
      },
      {
        category: 'Backend',
        description: 'Server-side technologies',
        items: [
          { name: 'Python', proficiency: 85, years: 3 },
          { name: 'Lua', proficiency: 78, years: 2 },
          { name: 'Node.js', proficiency: 82, years: 3 },
        ],
      },
      {
        category: 'Design',
        description: 'UX/UI and Design',
        items: [
          { name: 'UX Design', proficiency: 90, years: 4 },
          { name: 'UI Design', proficiency: 88, years: 4 },
          { name: 'Figma', proficiency: 85, years: 3 },
        ],
      },
    ],
  });
});

// GET - Projects Detailed
app.get('/api/projects', (req, res) => {
  res.json({
    success: true,
    projects: [
      {
        id: 1,
        title: 'E-commerce Minimalista',
        description: 'Plataforma de vendas com design clean, carrinho interativo e checkout otimizado.',
        icon: '💻',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        status: 'completed',
        featured: true,
      },
      {
        id: 2,
        title: 'Dashboard UI Kit',
        description: 'Sistema de componentes reusáveis com animações suaves e tema adaptativo.',
        icon: '🎨',
        technologies: ['CSS Grid', 'JS Vanilla', 'Responsive'],
        status: 'completed',
        featured: true,
      },
      {
        id: 3,
        title: 'Landing Page Criativa',
        description: 'Site com scroll animations, parallax avançado e call-to-actions otimizados.',
        icon: '🚀',
        technologies: ['Animations', 'Parallax', 'Web Design'],
        status: 'completed',
        featured: true,
      },
    ],
  });
});

// GET - Health Check
app.get('/api/health', (req, res) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  res.json({
    success: true,
    status: 'healthy',
    server: {
      timestamp: new Date().toISOString(),
      uptime: Math.floor(uptime),
      uptimeFormatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      node: process.version,
      environment: process.env.NODE_ENV || 'development',
    },
    performance: {
      memory: {
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      },
    },
  });
});

// ============================================
// STATIC FILE ROUTES
// ============================================

app.get('/css/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'css', req.params.filename);
  res.sendFile(filePath);
});

app.get('/js/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'js', req.params.filename);
  res.sendFile(filePath);
});

app.get('/img/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'img', req.params.filename);
  res.sendFile(filePath);
});

// ============================================
// ERROR HANDLERS
// ============================================

// 404 Not Found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    path: req.path,
    message: `The route ${req.path} does not exist`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message;

  console.error(`[ERROR] ${status}: ${message}`);

  res.status(status).json({
    success: false,
    error: {
      status: status,
      message: message,
      timestamp: new Date().toISOString(),
    },
  });
});

// ============================================
// SERVER STARTUP
// ============================================

const server = app.listen(PORT, () => {
  const asciiArt = `
╔════════════════════════════════════════════════════╗
║    🎨 RAFAEL CARLESSO - PROFESSIONAL PORTFOLIO    ║
║              SERVER RUNNING SUCCESSFULLY            ║
╚════════════════════════════════════════════════════╝

📍 Local URL:    http://localhost:${PORT}
🌐 Environment:  ${process.env.NODE_ENV || 'development'}
⏰ Started at:   ${new Date().toLocaleString()}

✨ FEATURES ENABLED:
  ✓ Advanced Mouse Light Effect
  ✓ Smooth Parallax 3D
  ✓ Responsive Design
  ✓ Dark/Light Theme
  ✓ Form Validation
  ✓ API Endpoints
  ✓ Performance Optimized

📊 API ENDPOINTS:
  GET  /api/light-config           → Light effect configuration
  GET  /api/portfolio              → Portfolio data
  GET  /api/skills                 → Detailed skills
  GET  /api/projects               → Detailed projects
  POST /api/contact                → Contact form submission
  GET  /api/analytics/light-effect → Light effect analytics
  GET  /api/health                 → Server health status

💡 TIPS:
  • Press Ctrl+C to stop the server
  • API responses are in JSON format
  • All routes support CORS
  • Forms have real-time validation

═══════════════════════════════════════════════════════
  `;

  console.log(asciiArt);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\n\n👋 Server shutting down gracefully...');
  server.close(() => {
    console.log('✓ Server closed successfully');
    process.exit(0);
  });
  // Force shutdown after 10 seconds
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
});

module.exports = app;
