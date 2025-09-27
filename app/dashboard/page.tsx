"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      label: "Total Projects",
      value: "12",
      change: "+2 this month",
      positive: true,
    },
    { label: "Active Files", value: "8", change: "+1 today", positive: true },
    {
      label: "Processing Time",
      value: "2.3h",
      change: "-0.5h avg",
      positive: true,
    },
    {
      label: "Success Rate",
      value: "94%",
      change: "+2% this week",
      positive: true,
    },
  ];

  const recentFiles = [
    {
      name: "Research Paper.pdf",
      size: "2.4 MB",
      uploaded: "2 hours ago",
      status: "Completed",
    },
    {
      name: "Data Analysis.xlsx",
      size: "1.8 MB",
      uploaded: "5 hours ago",
      status: "Processing",
    },
    {
      name: "Presentation.pptx",
      size: "4.2 MB",
      uploaded: "1 day ago",
      status: "Completed",
    },
    {
      name: "Meeting Notes.txt",
      size: "0.3 MB",
      uploaded: "2 days ago",
      status: "Completed",
    },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#111111]">
      <Header />

      <div className="container mx-auto px-4 py-36">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2">
            eDNA Analysis <span className="text-[#7A7FEE]">Report</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            An overview of your eDNA analysis results and project statistics.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: "overview", label: "Overview" },
              { id: "files", label: "Files" },
              { id: "analytics", label: "Analytics" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-[#7A7FEE] text-[#7A7FEE]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`text-sm ${
                        stat.positive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-[#7A7FEE]/10 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-[#7A7FEE]"
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
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {file.size} • {file.uploaded}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        file.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {file.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Your Files
              </h3>
              <button className="bg-[#7A7FEE] text-white px-4 py-2 rounded-lg hover:bg-[#6366f1] transition-colors text-sm">
                Upload New File
              </button>
            </div>
            <div className="space-y-3">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white dark:bg-[#111111] rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#7A7FEE]/10 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-[#7A7FEE]"
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
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {file.size} • {file.uploaded}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        file.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}
                    >
                      {file.status}
                    </span>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
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
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Usage Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#111111] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    File Processing
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        PDF Files
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        45%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-[#7A7FEE] h-2 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="bg-white dark:bg-[#111111] rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Processing Time
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Average
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        2.3 min
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Account Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Notifications
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-[#7A7FEE] focus:ring-[#7A7FEE] border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Receive notifications about file processing status
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Auto-delete processed files
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#7A7FEE] focus:ring-[#7A7FEE] border-gray-300 dark:border-gray-600 rounded"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically delete files after 30 days
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Processing Priority
                </label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#111111] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A7FEE]">
                  <option>Standard</option>
                  <option>High Priority</option>
                  <option>Low Priority</option>
                </select>
              </div>
              <div className="pt-4">
                <button className="bg-[#7A7FEE] text-white px-6 py-2 rounded-lg hover:bg-[#6366f1] transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
