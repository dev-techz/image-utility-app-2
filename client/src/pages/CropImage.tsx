import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import UploadZone from '../components/UploadZone';
import getCroppedImg from '../utils/canvasUtils';
import { Crop, Download, ArrowRight, RotateCw, RefreshCw } from 'lucide-react';

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const CropImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<PixelCrop | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: PixelCrop) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    const imageDataUrl = await readFile(selectedFile);
    setImageSrc(imageDataUrl as string);
    setCroppedImage(null);
  };

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      if (croppedImageBlob) {
        const url = URL.createObjectURL(croppedImageBlob);
        setCroppedImage(url);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const aspectRatios = [
    { label: 'Free', value: undefined },
    { label: '16:9', value: 16 / 9 },
    { label: '4:3', value: 4 / 3 },
    { label: '1:1', value: 1 },
    { label: '2:3', value: 2 / 3 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
          <Crop className="w-8 h-8 text-indigo-600" />
          Crop Image
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Crop your images to the perfect size and aspect ratio.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        {!imageSrc ? (
          <UploadZone onFileSelect={handleFileSelect} />
        ) : (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio.label}
                        onClick={() => setAspect(ratio.value)}
                        className={`px-3 py-2 text-sm font-medium rounded-md border ${
                          aspect === ratio.value
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {ratio.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zoom: {zoom.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rotation: {rotation}°
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                        onClick={() => setRotation((prev) => (prev - 90) % 360)}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        title="Rotate Left"
                    >
                         <RefreshCw className="w-4 h-4 transform -scale-x-100" />
                    </button>
                     <input
                        type="range"
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        onChange={(e) => setRotation(Number(e.target.value))}
                        className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <button
                        onClick={() => setRotation((prev) => (prev + 90) % 360)}
                        className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        title="Rotate Right"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                 
                </div>

                <div className="pt-4 flex gap-4 flex-col sm:flex-row">
                  <button
                    onClick={() => {
                        setImageSrc(null);
                        setFile(null);
                        setCroppedImage(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showCroppedImage}
                    className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Crop Image
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {croppedImage && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-center space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Crop Complete!</h2>
            
            <div className="flex flex-col items-center justify-center">
               <div className="relative max-w-md w-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200 mb-4 p-2">
                  <img 
                    src={croppedImage} 
                    alt="Processed" 
                    className="max-h-96 max-w-full object-contain" 
                  />
                </div>
            </div>

            <a
              href={croppedImage}
              download={`cropped-${file?.name}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Cropped Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropImage;
