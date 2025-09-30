import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, Camera, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { Screen, FoodItem } from '../types';
import { recognizeFood } from '../utils/foodRecognition';

interface CameraScreenProps {
  onNavigate: (screen: Screen) => void;
  onFoodCaptured: (food: FoodItem) => void;
  onCameraCapture: (imageData: string) => void;
  capturedImage?: string;
}

const CameraScreen: React.FC<CameraScreenProps> = ({ 
  onNavigate, 
  onFoodCaptured, 
  onCameraCapture,
  capturedImage 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const startCamera = async () => {
    try {
      setError('');
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        videoRef.current.play();
      }
      setStream(newStream);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    
    onCameraCapture(imageData);
    processImage(imageData);
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    try {
      const recognizedFood = await recognizeFood(imageData);
      onFoodCaptured(recognizedFood);
    } catch (err) {
      console.error('Error processing image:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      onCameraCapture(imageData);
      processImage(imageData);
    };
    reader.readAsDataURL(file);
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col h-screen bg-gray-900 items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Analyzing your meal...</h2>
          <p className="text-gray-300">Please wait while we identify the food</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between p-4 pt-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex space-x-2">
            <button
              onClick={switchCamera}
              className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
            >
              <RotateCcw size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative overflow-hidden">
        {error ? (
          <div className="h-full flex items-center justify-center text-white text-center p-6">
            <div>
              <p className="mb-4">{error}</p>
              <button
                onClick={startCamera}
                className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
            
            {/* Food scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white border-dashed rounded-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-sm opacity-75 mb-2">Position food here</div>
                  <div className="text-xs opacity-50">Make sure the food is well lit</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Camera Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center space-x-8 p-8">
          {/* Gallery Button */}
          <label className="p-3 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors cursor-pointer">
            <ImageIcon size={24} />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Capture Button */}
          <button
            onClick={capturePhoto}
            disabled={!!error}
            className="w-16 h-16 rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Camera size={28} className="text-gray-900" />
          </button>

          {/* Placeholder for balance */}
          <div className="w-12 h-12"></div>
        </div>

        {/* Instructions */}
        <div className="text-center text-white/80 pb-6">
          <div className="text-sm mb-1">Tap to scan your meal</div>
          <div className="text-xs opacity-75">Or upload from gallery</div>
        </div>
      </div>

      {/* Hidden canvas for image capture */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default CameraScreen;