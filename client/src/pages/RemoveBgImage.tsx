import { useState, useCallback } from 'react';
import { removeBackground } from '@imgly/background-removal';
import UploadZone from '../components/UploadZone';
import { Loader2, Download, Wand2, RefreshCcw } from 'lucide-react';

const RemoveBgImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('Initializing...');

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setProcessedImage(null);
    setError(null);
    setProgress('Ready to process');
  };

  const handleProcess = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setProgress('Loading AI models...');

    try {
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
             // Simple progress tracking
             const percent = Math.round((current / total) * 100);
             setProgress(`Processing: ${percent}%`);
        }
      });
      
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (err) {
      console.error(err);
      setError('Failed to remove background. Please try again or use a simpler image.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
      setFile(null);
      setProcessedImage(null);
      setError(null);
      setProgress('Initializing...');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Wand2 className="w-8 h-8 text-indigo-600" />
          Remove Background
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Automatically remove the background from your photos using AI.
          <span className="block text-xs mt-2 text-indigo-500 font-medium">100% Client-side processing (Privacy focused)</span>
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        {!file ? (
          <UploadZone onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Original */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center">Original</h3>
                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="Original" 
                    className="max-h-full max-w-full object-contain" 
                  />
                </div>
              </div>

              {/* Processed / Placeholder */}
              <div className="space-y-4">
                 <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider text-center">Result</h3>
                <div className="relative aspect-square bg-[url('https://media.istockphoto.com/id/1346580956/vector/transparent-background-seamless-pattern.jpg?s=612x612&w=0&k=20&c=Lw-b6Y2Tz70v7t6g_j4v-A1kZ_mG8-Q_u_X-Z_Z_Z_Z')] bg-repeat rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 bg-gray-50">
                  {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20">
                      <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mb-2" />
                      <span className="text-sm font-medium text-gray-600">{progress}</span>
                    </div>
                  ) : processedImage ? (
                    <img 
                      src={processedImage} 
                      alt="Processed" 
                      className="max-h-full max-w-full object-contain relative z-10" 
                    />
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center p-4 text-center">
                      <Wand2 className="w-12 h-12 mb-2 opacity-20" />
                      <span className="text-sm">Click "Remove Background" to see the magic</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {!processedImage && !loading && (
                 <div className="flex justify-center pt-4 gap-4">
                    <button
                        onClick={reset}
                        className="px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                    >
                        Cancel
                    </button>
                     <button
                        onClick={handleProcess}
                        className="flex items-center px-8 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                    >
                        <Wand2 className="w-4 h-4 mr-2" />
                        Remove Background
                    </button>
                 </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            {processedImage && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 border-t border-gray-100">
                <button
                    onClick={reset}
                    className="flex items-center justify-center px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Start Over
                </button>
                <a
                  href={processedImage}
                  download={`nobg-${file.name.split('.')[0]}.png`}
                  className="inline-flex items-center justify-center px-8 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download PNG
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveBgImage;
