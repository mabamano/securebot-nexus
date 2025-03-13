
import React from 'react';
import { Upload, Loader, Shield } from 'lucide-react';
import GlassContainer from '../../../ui-custom/GlassContainer';

interface UploadTabProps {
  isLoading: boolean;
  uploadSuccess: boolean;
  handleFileUpload: () => void;
}

const UploadTab: React.FC<UploadTabProps> = ({ 
  isLoading, 
  uploadSuccess, 
  handleFileUpload 
}) => {
  return (
    <GlassContainer className="p-6">
      <div className="text-center max-w-md mx-auto py-8">
        <div className="w-16 h-16 bg-cybershield-100/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-cybershield-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Upload Log Files</h3>
        <p className="text-cybershield-400 text-sm mb-6">
          Upload network logs (PCAP), system logs, or security event logs for analysis and anomaly detection
        </p>
        
        <div className="border-2 border-dashed border-cybershield-100 rounded-lg p-8 mb-4 text-center">
          <input type="file" className="hidden" id="log-file-input" accept=".pcap,.xml,.log,.csv,.json" />
          <label 
            htmlFor="log-file-input"
            className="cursor-pointer block"
          >
            <div className="text-sm text-cybershield-400 mb-2">
              Drag and drop files here, or click to browse
            </div>
            <div className="text-xs text-cybershield-300">
              Supported formats: .pcap, .xml, .log, .csv, .json
            </div>
          </label>
        </div>
        
        <button
          onClick={handleFileUpload}
          disabled={isLoading}
          className="cybershield-button w-full flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Upload & Analyze
            </>
          )}
        </button>
        
        {uploadSuccess && (
          <div className="mt-4 text-cybershield-success text-sm flex items-center justify-center animate-fade-in">
            <Shield className="w-4 h-4 mr-2" />
            Log file processed successfully. View results in the Dashboard.
          </div>
        )}
        
        <div className="mt-8 text-sm text-cybershield-400">
          <h4 className="font-medium mb-2">Note:</h4>
          <p>
            In this demo version, we simulate log processing. In a production environment, 
            this module would analyze actual network and system logs to detect real anomalies.
          </p>
        </div>
      </div>
    </GlassContainer>
  );
};

export default UploadTab;
