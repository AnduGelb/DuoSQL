import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { MetricData } from './MetricForm';

interface MetricCardProps {
  metric: MetricData;
  onEdit: (metric: MetricData) => void;
  onDelete: (id: string) => void;
}

export function MetricCard({ metric, onEdit, onDelete }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{metric.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(metric)}
            className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(metric.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-4">{metric.description}</p>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Calculation</h4>
          <pre className="bg-gray-50 p-2 rounded text-sm font-mono text-gray-800 overflow-x-auto">
            {metric.calculation}
          </pre>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Data Source</h4>
          <p className="text-sm text-gray-600">{metric.dataSource}</p>
        </div>
      </div>
    </div>
  );
}