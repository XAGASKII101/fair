import { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X, QrCode, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onClose: () => void;
  onScanSuccess?: (decodedText: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onClose, onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    requestCameraPermission();
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setHasPermission(true);
      startScanning();
    } catch (err) {
      setError('Camera permission denied. Please enable camera access.');
      setHasPermission(false);
    }
  };

  const startScanning = async () => {
    try {
      setScanning(true);
      setError(null);
      
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          setScannedData(decodedText);
          setScanning(false);
          scanner.stop();
          if (onScanSuccess) {
            onScanSuccess(decodedText);
          }
        },
        (errorMessage) => {
          // Ignore scan errors, they happen continuously
        }
      );
    } catch (err: any) {
      setError(err.message || 'Failed to start scanner');
      setScanning(false);
    }
  };

  const handleClose = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().catch(console.error);
    }
    onClose();
  };

  const handleScanSuccess = (decodedText: string) => {
    setScannedData(decodedText);
    setScanning(false);
    if (scannerRef.current) {
      scannerRef.current.stop().catch(console.error);
    }
    
    // Show success toast
    toast({
      title: "QR Code Scanned!",
      description: "Processing payment information...",
      duration: 3000,
    });
    
    if (onScanSuccess) {
      onScanSuccess(decodedText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black to-transparent">
        <div className="flex items-center space-x-3">
          <QrCode className="w-6 h-6 text-green-400" />
          <div>
            <h2 className="text-white font-bold text-lg">QR Scanner</h2>
            <p className="text-gray-400 text-xs">Position QR code within frame</p>
          </div>
        </div>
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full"
          data-testid="button-close-scanner"
        >
          <X className="w-6 h-6" />
        </Button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {error && (
          <Card className="max-w-sm w-full bg-red-500/20 border-red-500/50 backdrop-blur-sm mb-4">
            <CardContent className="p-4 flex items-center space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-100 text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {scannedData ? (
          <Card className="max-w-sm w-full bg-green-500/20 border-green-500/50 backdrop-blur-sm animate-scaleIn">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Scan Successful!</h3>
              <p className="text-green-100 text-sm mb-4 break-all bg-black/30 p-3 rounded-lg">
                {scannedData}
              </p>
              <Button
                onClick={handleClose}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold"
                data-testid="button-done-scanning"
              >
                Done
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="relative w-full max-w-sm">
            {/* Scanner Container with Fancy Frame */}
            <div className="relative">
              {/* Corner decorations */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-l-4 border-t-4 border-green-400 rounded-tl-3xl animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-16 h-16 border-r-4 border-t-4 border-green-400 rounded-tr-3xl animate-pulse delay-75"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-l-4 border-b-4 border-green-400 rounded-bl-3xl animate-pulse delay-150"></div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r-4 border-b-4 border-green-400 rounded-br-3xl animate-pulse delay-200"></div>

              {/* Scanner Element */}
              <div 
                id="qr-reader" 
                className="rounded-2xl overflow-hidden shadow-2xl"
              ></div>

              {/* Scanning line animation */}
              {scanning && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-scan-line shadow-lg shadow-green-400/50"></div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Zap className="w-4 h-4 text-green-400 animate-pulse" />
                <p className="text-white font-medium">Scanning...</p>
              </div>
              <p className="text-gray-400 text-sm">
                Point your camera at a QR code
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Info */}
      <div className="p-4 bg-gradient-to-t from-black to-transparent">
        <p className="text-gray-500 text-xs text-center">
          Ensure good lighting for best results
        </p>
      </div>
    </div>
  );
};

export default QRScanner;
