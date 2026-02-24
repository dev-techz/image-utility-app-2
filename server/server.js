import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage (in-memory is faster for processing, but disk is safer for large files)
// For this utility app, memory storage is efficient enough for typical image sizes
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Routes

// Health check
app.get('/', (req, res) => {
  res.send('Image Utility Server is running');
});

// Resize & Convert Endpoint
app.post('/api/process', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { width, height, format, quality } = req.body;
    
    let pipeline = sharp(req.file.buffer);

    // Resize if dimensions provided
    if (width || height) {
      pipeline = pipeline.resize({
        width: width ? parseInt(width) : null,
        height: height ? parseInt(height) : null,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });
    }

    // Format conversion & Compression
    const outputFormat = format || 'jpeg';
    const outputQuality = quality ? parseInt(quality) : 80;

    switch (outputFormat) {
      case 'png':
        pipeline = pipeline.png({ quality: outputQuality });
        break;
      case 'webp':
        pipeline = pipeline.webp({ quality: outputQuality });
        break;
      case 'avif':
        pipeline = pipeline.avif({ quality: outputQuality });
        break;
      case 'jpeg':
      case 'jpg':
      default:
        pipeline = pipeline.jpeg({ quality: outputQuality });
        break;
    }

    const processedBuffer = await pipeline.toBuffer();

    res.set('Content-Type', `image/${outputFormat}`);
    res.send(processedBuffer);

  } catch (error) {
    console.error('Processing error:', error);
    res.status(500).json({ error: 'Image processing failed', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
