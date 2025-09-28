"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing-page/header";
import {
  Check,
  Loader,
  FileCheck,
  Search,
  Microscope,
  BarChart2,
  FileText,
} from "lucide-react";

const processingSteps = [
  {
    name: "Upload Complete",
    description: "Files received and validated",
    icon: FileCheck,
  },
  {
    name: "BLAST Search",
    description: "Running sequence alignment against databases",
    icon: Search,
  },
  {
    name: "Taxonomic Classification",
    description: "Identifying species from sequence matches",
    icon: Microscope,
  },
  {
    name: "Biodiversity Analysis",
    description: "Computing diversity metrics and statistics",
    icon: BarChart2,
  },
  {
    name: "Report Generation",
    description: "Creating visualization and export files",
    icon: FileText,
  },
];

const statusMessages = [
  "Initializing analysis...",
  "Analyzing your eDNA sequences...",
  "Running BLAST search against NCBI database...",
  "Classifying taxonomic units...",
  "Calculating biodiversity indices...",
  "Generating interactive visualizations...",
  "Finalizing reports...",
  "Almost there...",
];

export default function ProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [statusText, setStatusText] = useState(statusMessages[0]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push("/dashboard/ednafound"), 1200);
          return 100;
        }

        const newProgress = prev + 1;
        const step = Math.floor(newProgress / 20);
        const messageIndex = Math.floor(
          newProgress / (100 / (statusMessages.length - 1))
        );

        if (step !== currentStepIndex) {
          setCurrentStepIndex(step);
        }
        if (statusMessages[messageIndex] !== statusText) {
          setStatusText(statusMessages[messageIndex]);
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router, currentStepIndex, statusText]);

  const StepIcon = ({ stepIndex }: { stepIndex: number }) => {
    if (stepIndex < currentStepIndex) {
      return <Check className="w-5 h-5 text-green-500" />;
    }
    if (stepIndex === currentStepIndex) {
      return <Loader className="w-5 h-5 text-[#7A7FEE] animate-spin" />;
    }
    const Icon = processingSteps[stepIndex].icon;
    return <Icon className="w-5 h-5 text-gray-400 dark:text-gray-500" />;
  };

  return (
    <main className="min-h-screen bg-gray-200 dark:bg-[#111111]">
      <Header />

      {/* Main Content Container */}
      <div className="min-h-screen flex flex-col">
        {/* Header Section - Fixed positioning from top */}
        <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4">
              Processing Your <span className="text-[#7A7FEE]">Dataset</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Running advanced eDNA analysis pipeline to identify species and
              compute biodiversity metrics
            </p>
          </div>
        </div>

        {/* Content Section - Centered vertically in remaining space */}
        <div className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="w-full max-w-2xl space-y-6">
            {/* Progress Section */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Analysis Progress
              </h2>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className="bg-[#7A7FEE] h-3 rounded-full transition-all duration-150 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {statusText}
                </p>
                <p className="text-xl font-bold text-[#7A7FEE]">{progress}%</p>
              </div>
            </div>

            {/* Processing Steps Section */}
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Processing Steps
              </h2>

              <div className="space-y-4">
                {processingSteps.map((step, index) => (
                  <div key={step.name} className="flex items-center gap-4">
                    {/* Step Icon */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        index < currentStepIndex
                          ? "bg-green-100 dark:bg-green-900/30 border-green-500"
                          : index === currentStepIndex
                          ? "bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 border-[#7A7FEE]"
                          : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <StepIcon stepIndex={index} />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          index <= currentStepIndex
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {step.name}
                      </h3>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          index <= currentStepIndex
                            ? "text-gray-600 dark:text-gray-300"
                            : "text-gray-400 dark:text-gray-500"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Status Badge */}
                    <div className="flex-shrink-0">
                      {index < currentStepIndex && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                          Completed
                        </span>
                      )}
                      {index === currentStepIndex && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#7A7FEE]/10 dark:bg-[#7A7FEE]/20 text-[#7A7FEE]">
                          Processing...
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
