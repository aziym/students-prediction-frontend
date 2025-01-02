import { useState } from 'react';
import { ChartBar, Loader2, Brain, School, Calculator } from 'lucide-react';

const FloatingCard = ({ children, delay = "0s", className = "" }) => (
  <div 
    className={`transition-colors duration-200 ${className}`}
    style={{ animation: `float 8s ease-in-out infinite`, animationDelay: delay }}
  >
    {children}
  </div>
);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      if (data.prediction !== undefined) {
        setPrediction(`Predicted Performance Score: ${data.prediction.toFixed(2)}`);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      setError(err.message === 'Failed to fetch' 
        ? 'Unable to connect to the prediction server. Please try again later.' 
        : `Prediction failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'} p-8 transition-colors duration-200`}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold mb-8 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          Student Performance Prediction Model
        </h2>

        <FloatingCard 
          delay="0s" 
          className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white'} backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}
        >
          <div className="flex items-center space-x-4 mb-6">
            <Brain className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Performance Analysis Tool
            </h3>
          </div>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
            Enter student information below to predict academic performance. All fields must be filled with valid positive numbers.
          </p>
          <div className={`flex items-center space-x-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <School className="w-4 h-4" />
            <span>Powered by advanced educational metrics</span>
          </div>
        </FloatingCard>

        <FloatingCard 
          delay="0.5s" 
          className={`${isDarkMode ? 'bg-gray-800/95' : 'bg-white'} backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[['age', 'daysPresence', 'daysAbsence', 'attendancePercentage'], 
                ['englishBook', 'bahasaMelayuBook', 'mathTestMark', 'mathTestMarkPercentage']
              ].map((column, colIndex) => (
                <div key={colIndex} className="space-y-4">
                  {column.map(field => (
                    <label key={field} className="block">
                      <span className={`${isDarkMode ? 'text-gray-300' : 'text-blue-500'} mb-1 block`}>
                        {field.split(/(?=[A-Z])/).join(' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                      <input
                        type="number"
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        min="0"
                        step="any"
                        required
                        className={`w-full ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                        } border rounded-lg p-2 focus:outline-none focus:border-blue-400 transition-colors`}
                        placeholder={`Enter ${field.split(/(?=[A-Z])/).join(' ').toLowerCase()}`}
                      />
                    </label>
                  ))}
                </div>
              ))}
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
            <div className={`mt-6 ${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'} border rounded-lg p-4`}>
              <div className="flex items-center space-x-2 text-green-400">
                <ChartBar className="w-5 h-5" />
                <span className="font-semibold">Prediction Result</span>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{prediction}</p>
            </div>
          )}

          {error && (
            <div className={`mt-6 ${isDarkMode ? 'bg-red-900/30 border-red-700' : 'bg-red-50 border-red-200'} border rounded-lg p-4`}>
              <div className="flex items-center space-x-2 text-red-400">
                <span className="font-semibold">Error</span>
              </div>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{error}</p>
            </div>
          )}
        </FloatingCard>
      </div>
    </div>
  );
};

export default PredictionForm;