import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { clsx } from 'clsx';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: Record<string, string[]>;
  maxSize?: number; // in bytes
}

const UploadZone = ({ onFileSelect, accept = { 'image/*': [] }, maxSize = 10 * 1024 * 1024 }: UploadZoneProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out",
        isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50",
        isDragReject && "border-red-500 bg-red-50"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-indigo-100 rounded-full">
          <UploadCloud className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <p className="text-lg font-medium text-gray-900">
            {isDragActive ? "Drop the image here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            SVG, PNG, JPG or GIF (max. 10MB)
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
