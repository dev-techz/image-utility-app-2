import { useState } from 'react';
import UploadZone from '../components/UploadZone';
import axios from 'axios';
import { Loader2, Download, ArrowRight, Minimize2 } from 'lucide-react';

const CompressImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setProcessedImage(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('quality', quality.toString());
    
    // Maintain original format for compression unless specified otherwise
    const originalFormat = file.type.split('/')[1];
    formData.append('format', originalFormat === 'jpeg' ? 'jpg' : originalFormat);

    try {
      const response = await axios.post('/api/process', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const url = URL.createObjectURL(response.data);
      setProcessedImage(url);
    } catch (err) {
      console.error(err);
      setError('Failed to compress image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Minimize2 className="w-8 h-8 text-indigo-600" />
          Compress Image
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Reduce the file size of your images while maintaining the best possible quality.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        {!file ? (
          <UploadZone onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Original" 
                    className="max-h-full max-w-full object-contain" 
                  />
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Original: {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                 <div>
                  <label htmlFor="quality" className="block text-sm font-medium text-gray-700 mb-2">
                    Compression Quality: {quality}%
                  </label>
                  <input
                    type="range"
                    id="quality"
                    min="10"
                    max="100"
                    step="5"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Smaller Size</span>
                    <span>Better Quality</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setFile(null)}
                    className="flex-1 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcess}
                    disabled={loading}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Compressing...
                      </>
                    ) : (
                      <>
                        Compress Image
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {processedImage && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Compression Complete!</h2>
            
            <div className="flex flex-col items-center justify-center">
               <div className="relative max-w-md w-full aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 mb-4">
                  <img 
                    src={processedImage} 
                    alt="Processed" 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
            </div>

            <a
              href={processedImage}
              download={`compressed-${file?.name}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Compressed Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompressImage;
