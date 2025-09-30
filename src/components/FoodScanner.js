import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, BarChart3, FileText, Image, X } from 'lucide-react';
import { analyzeFoodImage } from '../services/nutritionAPI';

const FoodScanner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      // Fallback to file input if camera is not available
    }
  };

  const captureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setCapturedImage(imageDataUrl);
      setIsScanning(true);
      
      try {
        // Analyze the food image using our API service
        const foodResult = await analyzeFoodImage(imageDataUrl);
        setIsScanning(false);
        navigate('/food/new', { state: { food: foodResult, isNew: true } });
      } catch (error) {
        console.error('Error analyzing food:', error);
        setIsScanning(false);
        // Could show an error message to user
      }
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setCapturedImage(e.target.result);
        setIsScanning(true);
        
        try {
          // Analyze the uploaded image
          const foodResult = await analyzeFoodImage(e.target.result);
          setIsScanning(false);
          navigate('/food/new', { state: { food: foodResult, isNew: true } });
        } catch (error) {
          console.error('Error analyzing food:', error);
          setIsScanning(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (isScanning) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          {capturedImage && (
            <div className="mb-6">
              <img 
                src={capturedImage} 
                alt="Captured food" 
                className="w-64 h-64 object-cover rounded-lg mx-auto"
              />
            </div>
          )}
          <div className="text-white mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg">Analyzing your food...</p>
            <p className="text-sm text-gray-300">Please wait while we identify the nutritional content</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-black bg-opacity-50 rounded-full p-2"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <button className="bg-black bg-opacity-50 rounded-full p-2">
            <X className="text-white" size={24} />
          </button>
        </div>
      </div>

      {/* Camera view */}
      <div className="relative w-full h-full">
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas 
          ref={canvasRef}
          className="hidden"
        />
        
        {/* Camera overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-2 border-white border-dashed rounded-lg"></div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex justify-center mb-6">
          <button
            onClick={captureImage}
            className="bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-lg"
          >
            <div className="bg-black rounded-full w-16 h-16"></div>
          </button>
        </div>
        
        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <button 
              onClick={captureImage}
              className="bg-white bg-opacity-20 rounded-full p-4 mb-2"
            >
              <Camera className="text-white" size={24} />
            </button>
            <span className="text-white text-sm">Scan Food</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="bg-white bg-opacity-20 rounded-full p-4 mb-2">
              <BarChart3 className="text-white" size={24} />
            </button>
            <span className="text-white text-sm">Barcode</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button className="bg-white bg-opacity-20 rounded-full p-4 mb-2">
              <FileText className="text-white" size={24} />
            </button>
            <span className="text-white text-sm">Food label</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-white bg-opacity-20 rounded-full p-4 mb-2"
            >
              <Image className="text-white" size={24} />
            </button>
            <span className="text-white text-sm">Gallery</span>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FoodScanner;