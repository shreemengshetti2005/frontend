"use client"

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

export default function UploadPage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file: File) => {
        // Validate file type and size
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'image/jpeg',
            'image/png',
            'image/gif'
        ];

        if (file.size > maxSize) {
            alert('File size must be less than 10MB');
            return;
        }

        if (!allowedTypes.includes(file.type)) {
            alert('Please upload a valid file type (PDF, DOC, DOCX, TXT, or image files)');
            return;
        }

        setSelectedFile(file);
        setUploadProgress(0);
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const simulateUpload = () => {
        setIsUploading(true);
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    const handleContinue = () => {
        router.push('/dashboard');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <main className="min-h-screen bg-white dark:bg-[#111111]">
            <Header />
            
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                            Upload Your <span className="text-[#7A7FEE]">File</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Choose a file to get started with your project
                        </p>
                    </div>

                    {/* Upload Area */}
                    <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                        {!selectedFile ? (
                            <div
                                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                                    dragActive
                                        ? 'border-[#7A7FEE] bg-[#7A7FEE]/5'
                                        : 'border-gray-300 dark:border-gray-600 hover:border-[#7A7FEE] hover:bg-[#7A7FEE]/5'
                                }`}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <div className="space-y-4">
                                    <div className="mx-auto w-16 h-16 bg-[#7A7FEE]/10 rounded-full flex items-center justify-center">
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
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Drop your file here
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                                            or click to browse files
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-6 py-2 bg-[#7A7FEE] text-white rounded-lg hover:bg-[#6366f1] transition-colors"
                                    >
                                        Choose File
                                    </button>
                                    <p className="text-sm text-gray-500 dark:text-gray-500">
                                        Supports PDF, DOC, DOCX, TXT, and image files up to 10MB
                                    </p>
                                </div>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                                />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* File Info */}
                                <div className="bg-white dark:bg-[#111111] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-[#7A7FEE]/10 rounded-lg flex items-center justify-center">
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
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {selectedFile.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {formatFileSize(selectedFile.size)}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Upload Progress */}
                                {isUploading && (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Uploading...</span>
                                            <span className="text-gray-600 dark:text-gray-400">{uploadProgress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                            <div
                                                className="bg-[#7A7FEE] h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    {!isUploading && uploadProgress === 0 && (
                                        <button
                                            onClick={simulateUpload}
                                            className="flex-1 bg-[#7A7FEE] text-white py-3 px-6 rounded-xl hover:bg-[#6366f1] transition-colors font-medium"
                                        >
                                            Upload File
                                        </button>
                                    )}
                                    
                                    {uploadProgress === 100 && (
                                        <button
                                            onClick={handleContinue}
                                            className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors font-medium"
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
                        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <p className="text-green-800 dark:text-green-200 font-medium">
                                    File uploaded successfully! Ready to continue.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </main>
    );
}
