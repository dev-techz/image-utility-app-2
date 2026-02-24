import { useState } from 'react';
import UploadZone from '../components/UploadZone';
import axios from 'axios';
import { Loader2, Download, ArrowRight, RefreshCcw } from 'lucide-react';

const ConvertImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<string>('png');
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
    formData.append('format', format);

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
      setError('Failed to convert image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <RefreshCcw className="w-8 h-8 text-indigo-600" />
          Convert Format
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Convert your images to different formats like PNG, JPG, WebP, and AVIF.
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
                    Original: {file.type.split('/')[1].toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="format" className="block text-sm font-medium text-gray-700 mb-2">
                    Convert to:
                  </label>
                  <select
                    id="format"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  >
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="webp">WebP</option>
                    <option value="avif">AVIF</option>
                  </select>
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
                        Converting...
                      </>
                    ) : (
                      <>
                        Convert
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
            <h2 className="text-xl font-semibold text-gray-900">Conversion Complete!</h2>
            
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
              download={`converted-${file?.name.split('.')[0]}.${format}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Converted Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertImage;
