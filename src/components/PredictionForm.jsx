import { useState } from 'react';
import { ChartBar, Loader2, BookOpen, Brain, School, Calculator } from 'lucide-react';

// Floating Card Component
const FloatingCard = ({ children, delay = "0s" }) => {
  return (
    <div 
      style={{
        animation: `float 8s ease-in-out infinite`,
        animationDelay: delay
      }}
    >
      {children}
    </div>
  );
};

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    daysPresence: '',
    daysAbsence: '',
    attendancePercentage: '',
    englishBook: '',
    bahasaMelayuBook: '',
    mathTestMark: '',
    mathTestMarkPercentage: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch('https://students-prediction-backend.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || 'Failed to get prediction');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  // Keyframes for floating animation
  const floatingKeyframes = `
    @keyframes float {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  `;

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <style>{floatingKeyframes}</style>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
          Student Performance Prediction System
        </h2>

        <FloatingCard delay="0s">
          <div className="bg-gray-800/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <Brain className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-blue-400">Performance Analysis Tool</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Enter student information below to predict academic performance. This tool uses machine learning to analyze various factors and provide insights.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <School className="w-4 h-4" />
              <span>Powered by advanced educational metrics</span>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard delay="0.5s">
          <div className="bg-gray-800/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-blue-500/70">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Details Section */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Age</span>
                    <input
                      type="number"
                      name="age"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter age"
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Days Present</span>
                    <input
                      type="number"
                      name="daysPresence"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter days present"
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Days Absent</span>
                    <input
                      type="number"
                      name="daysAbsence"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter days absent"
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Attendance Percentage</span>
                    <input
                      type="number"
                      name="attendancePercentage"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter attendance percentage"
                    />
                  </label>
                </div>

                {/* Academic Performance Section */}
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">English Book Score</span>
                    <input
                      type="number"
                      name="englishBook"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter English score"
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Bahasa Melayu Book Score</span>
                    <input
                      type="number"
                      name="bahasaMelayuBook"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter Bahasa Melayu score"
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Math Test Mark</span>
                    <input
                      type="number"
                      name="mathTestMark"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter math mark"
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-blue-400 mb-1 block">Math Test Percentage</span>
                    <input
                      type="number"
                      name="mathTestMarkPercentage"
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
                      placeholder="Enter math percentage"
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-3 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    <span>Predict Performance</span>
                  </>
                )}
              </button>
            </form>

            {prediction && (
              <div className="mt-6 bg-green-400/10 border border-green-400/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <ChartBar className="w-5 h-5" />
                  <span className="font-semibold">Prediction Result</span>
                </div>
                <p className="text-gray-300 mt-2">{prediction}</p>
              </div>
            )}

            {error && (
              <div className="mt-6 bg-red-400/10 border border-red-400/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Error</span>
                </div>
                <p className="text-gray-300 mt-2">{error}</p>
              </div>
            )}
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default PredictionForm;