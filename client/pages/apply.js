import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Apply = () => {
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', username);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Upload failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="h-screen bg-white overflow-hidden relative">
      {/* Background Blur Elements */}
      <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob'></div>
      <div className='absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000'></div>
      <div className='absolute -bottom-32 right-[10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000'></div>
      <div className='absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-pink-400/20 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-6000'></div>

      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:30px_30px]" />

      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800">
        <div className="flex items-center space-x-8">
          <Image src="/cutwhitelogo.gif" alt="Apprazer Logo" width={120} height={40} className="object-contain translate-y-0.5" />
          <div className="flex space-x-6">
            <Link href="/dashboard" className="text-white/90 font-medium">Dashboard</Link>
            <Link href="/settings" className="text-white/60 hover:text-white/90">Settings</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white/60 hover:text-white/90">
            <Bell className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </div>
            <span className="text-white/90">{username}</span>
          </div>
        </div>
      </nav>

      {/* Main Content - Modified for centering */}
      <main className="relative z-10 flex-1 flex items-center justify-center min-h-[calc(100vh-76px)]">
        <div className="w-full max-w-2xl px-8">
          <div className="bg-white/70 backdrop-blur-md rounded-xl border border-white/50 shadow-xl p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">New Loan Application</h1>
              <p className="text-gray-500">Upload your loan application documents (PDF only)</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/50'
                    : file
                    ? 'border-green-500 bg-green-50/50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center">
                  {file ? (
                    <>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Upload className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFile(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-1">
                        Drop your file here, or click to browse
                      </p>
                      <p className="text-sm text-gray-500">PDF files only</p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Link
                  href="/dashboard"
                  className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200/50 rounded-lg transition-colors relative group"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!file}
                  className={`px-8 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-lg ${
                    file
                      ? 'bg-gradient-to-r from-blue-800 to-blue-900 hover:scale-105 shadow-blue-800/20'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Apply;
