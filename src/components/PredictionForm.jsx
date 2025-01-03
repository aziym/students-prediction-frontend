import { useState } from 'react';
import { ChartBar, Loader2, Brain, School, Calculator } from 'lucide-react';

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

const PredictionForm = ({ isDarkMode }) => {
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
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
      setFormData({ ...formData, [e.target.name]: value });
    }
  };

  const validateForm = () => {
    const values = Object.values(formData);
    return values.every(value => value !== '' && !isNaN(value) && parseFloat(value) >= 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill all fields with valid positive numbers');
      return;
    }

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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.prediction !== undefined) {
        setPrediction(`Predicted Performance Score: ${data.prediction.toFixed(2)}`);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(
        err.message === 'Failed to fetch' 
          ? 'Unable to connect to the prediction server. Please try again later.' 
          : `Prediction failed: ${err.message}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-8`}>
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
      
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center">
          Student Performance Prediction Model
        </h2>

        <FloatingCard delay="0s">
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} mb-8`}>
            <div className="flex items-center space-x-4 mb-6">
              <Brain className="w-6 h-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-blue-400">Performance Analysis Tool</h3>
            </div>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              Enter student information below to predict academic performance. All fields must be filled with valid positive numbers.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <School className="w-4 h-4" />
              <span>Powered by advanced educational metrics</span>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard delay="0.5s">
          <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-blue-500/70`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {[
                    { name: 'age', label: 'Age' },
                    { name: 'daysPresence', label: 'Days Present' },
                    { name: 'daysAbsence', label: 'Days Absent' },
                    { name: 'attendancePercentage', label: 'Attendance Percentage' }
                  ].map(field => (
                    <label key={field.name} className="block">
                      <span className="text-blue-400 mb-1 block">{field.label}</span>
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        min="0"
                        step="any"
                        required
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </label>
                  ))}
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'englishBook', label: 'English Book Score' },
                    { name: 'bahasaMelayuBook', label: 'Bahasa Melayu Book Score' },
                    { name: 'mathTestMark', label: 'Math Test Mark' },
                    { name: 'mathTestMarkPercentage', label: 'Math Test Percentage' }
                  ].map(field => (
                    <label key={field.name} className="block">
                      <span className="text-blue-400 mb-1 block">{field.label}</span>
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        min="0"
                        step="any"
                        required
                        className={`w-full ${isDarkMode ? 'bg-gray-700/50 border-gray-600 text-gray-200' : 'bg-gray-50 border-gray-300 text-gray-900'} border rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors`}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </label>
                  ))}
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
              <div className={`mt-6 ${isDarkMode ? 'bg-green-400/10 border-green-400/20' : 'bg-green-50 border-green-200'} border rounded-lg p-4`}>
                <div className="flex items-center space-x-2 text-green-400">
                  <ChartBar className="w-5 h-5" />
                  <span className="font-semibold">Prediction Result</span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{prediction}</p>
              </div>
            )}

            {error && (
              <div className={`mt-6 ${isDarkMode ? 'bg-red-400/10 border-red-400/20' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
                <div className="flex items-center space-x-2 text-red-400">
                  <span className="font-semibold">Error</span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{error}</p>
              </div>
            )}
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default PredictionForm;