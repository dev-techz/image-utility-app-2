import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import clsx from 'clsx';

interface DropzoneProps {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
  className?: string;
}

const Dropzone: React.FC<DropzoneProps> = ({ 
  onFileSelect, 
  accept = { 'image/*': [] }, 
  multiple = false,
  className
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      onFileSelect(acceptedFiles);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors duration-200",
        isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400 hover:bg-gray-50",
        className
      )}
    >
      <input {...getInputProps()} />
      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-4 text-lg font-medium text-gray-900">
        {isDragActive ? "Drop the files here..." : "Drag & drop images here, or click to select"}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Supports JPG, PNG, WEBP, AVIF
      </p>
    </div>
  );
};

export default Dropzone;
