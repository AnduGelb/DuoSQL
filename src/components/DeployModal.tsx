import React from 'react';
import { X, Database, Cloud, Boxes } from 'lucide-react';

interface DeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (platform: string) => void;
}

export function DeployModal({ isOpen, onClose, onDeploy }: DeployModalProps) {
  if (!isOpen) return null;

  const platforms = [
    {
      id: 'fabric',
      name: 'Microsoft Fabric',
      icon: <Database className="w-6 h-6" />,
      description: 'Deploy to Microsoft Fabric Data Warehouse'
    },
    {
      id: 'snowflake',
      name: 'Snowflake',
      icon: <Cloud className="w-6 h-6" />,
      description: 'Deploy to Snowflake Data Cloud'
    },
    {
      id: 'databricks',
      name: 'Databricks',
      icon: <Boxes className="w-6 h-6" />,
      description: 'Deploy to Databricks Lakehouse Platform'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Select Data Warehouse</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => onDeploy(platform.id)}
              className="w-full p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 text-gray-400 group-hover:text-indigo-600">
                  {platform.icon}
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium text-gray-900">{platform.name}</h3>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}