import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { MetricForm, type MetricData } from './components/MetricForm';
import { MetricCard } from './components/MetricCard';
import { DeployModal } from './components/DeployModal';

function App() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [isMetricFormOpen, setIsMetricFormOpen] = useState(false);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState<MetricData | null>(null);

  const handleAddMetric = (metric: MetricData) => {
    if (editingMetric) {
      setMetrics(metrics.map(m => m.id === editingMetric.id ? metric : m));
    } else {
      setMetrics([...metrics, metric]);
    }
    setEditingMetric(null);
  };

  const handleEditMetric = (metric: MetricData) => {
    setEditingMetric(metric);
    setIsMetricFormOpen(true);
  };

  const handleDeleteMetric = (id: string) => {
    setMetrics(metrics.filter(metric => metric.id !== id));
  };

  const handleDeploy = (platform: string) => {
    // In a real application, this would integrate with the chosen data warehouse
    console.log(`Deploying metrics to ${platform}`);
    setIsDeployModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Metrics Management</h1>
            <p className="text-gray-600 mt-1">Define and manage your business metrics and KPIs</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsMetricFormOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Metric
            </button>
            {metrics.length > 0 && (
              <button
                onClick={() => setIsDeployModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Deploy Metrics into Data Model
              </button>
            )}
          </div>
        </div>

        {metrics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No metrics defined yet. Click "Add Metric" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                onEdit={handleEditMetric}
                onDelete={handleDeleteMetric}
              />
            ))}
          </div>
        )}

        <MetricForm
          isOpen={isMetricFormOpen}
          onClose={() => {
            setIsMetricFormOpen(false);
            setEditingMetric(null);
          }}
          onSubmit={handleAddMetric}
        />

        <DeployModal
          isOpen={isDeployModalOpen}
          onClose={() => setIsDeployModalOpen(false)}
          onDeploy={handleDeploy}
        />
      </div>
    </div>
  );
}

export default App;