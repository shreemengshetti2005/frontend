"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

// Constants for better maintainability
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/gif",
];

const UPLOAD_PROGRESS_INTERVAL = 200;
const PROGRESS_INCREMENT = 10;

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isDragEnterOrOver = e.type === "dragenter" || e.type === "dragover";
    setDragActive(isDragEnterOrOver);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.[0]) {
      handleFile(files[0]);
    }
  }, []);

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 10MB";
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "Please upload a valid file type (PDF, DOC, DOCX, TXT, or image files)";
    }

    return null;
  }, []);

  const handleFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        alert(validationError);
        return;
      }

      setSelectedFile(file);
      setUploadProgress(0);
    },
    [validateFile]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.[0]) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const simulateUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + PROGRESS_INCREMENT;
      });
    }, UPLOAD_PROGRESS_INTERVAL);
  }, []);

  const handleContinue = useCallback(() => {
    router.push("/processing");
  }, [router]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  }, []);

  const handleChooseFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }, []);

  // Memoized components for better performance
  const FileIcon = React.memo(() => (
    <svg
      className="w-8 h-8 text-[#7A7FEE]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
      />
    </svg>
  ));

  const DocumentIcon = React.memo(() => (
    <svg
      className="w-6 h-6 text-[#7A7FEE]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ));

  const CloseIcon = React.memo(() => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ));

  const CheckIcon = React.memo(() => (
    <svg
      className="w-5 h-5 text-[#7A7FEE] dark:text-[#8B7FEE] mr-3"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ));

  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#111111]">
      <Header />
      {/* Shift here - Added top padding to account for fixed navbar */}
      <div className="container mx-auto px-4 py-8 pt-20 sm:pt-24 md:pt-28 lg:pt-32">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white mb-3 sm:mb-4">
              Upload Your <span className="text-[#7A7FEE]">File</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
              Choose a file to get started with your project
            </p>
          </div>

          {/* Upload Area */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 mx-4 sm:mx-0">
            {!selectedFile ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-200 cursor-pointer ${
                  dragActive
                    ? "border-[#7A7FEE] bg-[#7A7FEE]/5"
                    : "border-gray-300 dark:border-gray-600 hover:border-[#7A7FEE] hover:bg-[#7A7FEE]/5"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleChooseFile}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleChooseFile();
                  }
                }}
                aria-label="Upload file area"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-[#7A7FEE]/10 rounded-full flex items-center justify-center">
                    <FileIcon />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      Drop your file here
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
                      or click to browse files
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-4 sm:px-6 py-2 bg-[#7A7FEE] text-white rounded-lg hover:bg-[#6366f1] active:bg-[#5856eb] transition-colors font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7A7FEE] focus:ring-offset-2 dark:focus:ring-offset-[#1a1a1a]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Choose File
                  </button>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 px-2">
                    Supports FASTA, CSV, and Excel files up to 10MB
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileInputChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  aria-label="File input"
                />
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* File Info */}
                <div className="bg-white dark:bg-[#111111] rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#7A7FEE]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <DocumentIcon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                        {selectedFile.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label="Remove file"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Uploading...
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#7A7FEE] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                        role="progressbar"
                        aria-valuenow={uploadProgress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 sm:space-x-4">
                  {!isUploading && uploadProgress === 0 && (
                    <button
                      type="button"
                      onClick={simulateUpload}
                      className="flex-1 bg-[#7A7FEE] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-[#6366f1] active:bg-[#5856eb] transition-colors font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7A7FEE] focus:ring-offset-2 dark:focus:ring-offset-[#1a1a1a]"
                    >
                      Upload File
                    </button>
                  )}

                  {uploadProgress === 100 && (
                    <button
                      type="button"
                      onClick={handleContinue}
                      className="flex-1 bg-[#7A7FEE] text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl hover:bg-[#6366f1] active:bg-[#5856eb] transition-colors font-medium text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7A7FEE] focus:ring-offset-2 dark:focus:ring-offset-[#1a1a1a]"
                    >
                      Continue to Dashboard
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Success Message */}
          {uploadProgress === 100 && (
            <div className="mt-4  sm:mt-6 bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 border border-[#7A7FEE]/30 dark:border-[#7A7FEE]/40 rounded-xl p-4 mx-4 sm:mx-0">
              <div className="flex items-center">
                <CheckIcon />
                <p className="text-[#7A7FEE] dark:text-[#8B7FEE] font-medium text-sm sm:text-base">
                  File uploaded successfully! Ready to continue.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <Footer />. */}
    </main>
  );
}
