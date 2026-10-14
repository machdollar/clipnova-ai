import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const upload = multer({
  dest: '/tmp/clipnova-uploads/',
  limits: {
    fileSize: 100 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith('video/')) {
      callback(null, true);
    } else {
      callback(new Error('Please upload a video file.'));
    }
  }
});

app.get('/', (req, res) => {
  res.json({
    name: 'ClipNova AI API',
    status: 'online',
    message: 'Video processing backend is running.'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'ClipNova AI',
    videoProcessing: 'not connected yet'
  });
});

app.post('/api/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'Please select a video to upload.'
    });
  }

  res.json({
    success: true,
    message: 'Video uploaded successfully. Processing is the next step.',
    file: {
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype
    }
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: err.code === 'LIMIT_FILE_SIZE'
        ? 'Video must be 100 MB or smaller.'
        : err.message
    });
  }

  res.status(400).json({
    error: err.message || 'Something went wrong.'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`ClipNova AI API listening on port ${PORT}`);
});
