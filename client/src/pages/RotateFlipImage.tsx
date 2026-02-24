import { useState, useRef, useEffect } from 'react';
import UploadZone from '../components/UploadZone';
import { RotateCw, RotateCcw, FlipHorizontal, FlipVertical, Download, RefreshCw, Loader2 } from 'lucide-react';

const RotateFlipImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageSrc(url);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Calculate bounding box for rotation
        const rads = (rotation * Math.PI) / 180;
        const absCos = Math.abs(Math.cos(rads));
        const absSin = Math.abs(Math.sin(rads));
        
        const newWidth = img.width * absCos + img.height * absSin;
        const newHeight = img.width * absSin + img.height * absCos;

        canvas.width = newWidth;
        canvas.height = newHeight;

        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(rads);
            ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
            ctx.drawImage(img, -img.width / 2, -img.height / 2);
            ctx.restore();
        }
      };
      
      img.src = imageSrc;
    }
  }, [imageSrc, rotation, flipH, flipV]);

  const handleDownload = () => {
    if (canvasRef.current && file) {
        setLoading(true);
        canvasRef.current.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `edited-${file.name}`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
            setLoading(false);
        }, file.type);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
       <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-600" />
          Rotate & Flip
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Rotate your images 90 degrees or flip them horizontally and vertically.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        {!imageSrc ? (
          <UploadZone onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-8">
            {/* Toolbar */}
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-gray-50 rounded-lg">
               <button
                onClick={() => setRotation((r) => r - 90)}
                className="flex flex-col items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                title="Rotate Left"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="text-xs font-medium">Left</span>
              </button>
              
              <button
                onClick={() => setRotation((r) => r + 90)}
                className="flex flex-col items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                title="Rotate Right"
              >
                <RotateCw className="w-5 h-5" />
                <span className="text-xs font-medium">Right</span>
              </button>

              <div className="w-px h-10 bg-gray-300 mx-2 self-center hidden sm:block"></div>

              <button
                onClick={() => setFlipH(!flipH)}
                className={`flex flex-col items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                  flipH 
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                    : 'bg-white border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                }`}
                title="Flip Horizontal"
              >
                <FlipHorizontal className="w-5 h-5" />
                <span className="text-xs font-medium">Flip H</span>
              </button>

              <button
                onClick={() => setFlipV(!flipV)}
                className={`flex flex-col items-center gap-2 px-4 py-2 border rounded-md transition-colors ${
                  flipV
                    ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                    : 'bg-white border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
                }`}
                title="Flip Vertical"
              >
                <FlipVertical className="w-5 h-5" />
                <span className="text-xs font-medium">Flip V</span>
              </button>
            </div>

            {/* Preview */}
            <div className="relative min-h-[400px] bg-gray-100/50 border border-gray-200 rounded-lg flex items-center justify-center p-4 overflow-hidden">
               {/* Hidden canvas for processing */}
               <canvas ref={canvasRef} className="hidden" />
               {/* Visual representation using CSS transform for smoother preview */}
               <img 
                 src={imageSrc} 
                 alt="Preview" 
                 style={{
                   transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                   transition: 'transform 0.3s ease-in-out',
                   maxHeight: '400px',
                   maxWidth: '100%'
                 }}
               />
            </div>

            {/* Actions */}
            <div className="flex gap-4 justify-center pt-4">
              <button
                onClick={() => {
                  setFile(null);
                  setImageSrc(null);
                }}
                className="px-6 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleDownload}
                disabled={loading}
                className="flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Download className="w-4 h-4 mr-2" />}
                Download Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RotateFlipImage;
