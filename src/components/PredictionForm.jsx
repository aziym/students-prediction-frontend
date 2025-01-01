import { useState } from 'react';

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
    try {
      const response = await fetch('https://tcpi-predict-backend.vercel.app/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to get prediction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Student Performance Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="number" name="daysPresence" placeholder="Days Present" onChange={handleChange} required />
        <input type="number" name="daysAbsence" placeholder="Days Absent" onChange={handleChange} required />
        <input type="number" name="attendancePercentage" placeholder="Attendance Percentage" onChange={handleChange} required />
        <input type="number" name="englishBook" placeholder="English Book" onChange={handleChange} required />
        <input type="number" name="bahasaMelayuBook" placeholder="Bahasa Melayu Book" onChange={handleChange} required />
        <input type="number" name="mathTestMark" placeholder="Math Test Mark" onChange={handleChange} required />
        <input type="number" name="mathTestMarkPercentage" placeholder="Math Test Mark Percentage" onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>Predict</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {prediction && <p>Prediction: {prediction}</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default PredictionForm;