import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { Moon, Sun, BarChart2, GraduationCap, ClipboardList, TrendingUp, Brain, ChartBar, Users, Mail, Phone, MapPin, Target, Sparkles, Bot, LineChart } from 'lucide-react';

// Keyframes for floating animation
const floatingKeyframes = `
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;

// Floating Card Component with animation
const FloatingCard = ({ children, delay = "0s" }) => {
  return (
    <div 
      className="animate-float"
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: delay
      }}
    >
      {children}
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navLinks = [
    { path: '/', label: 'General Information', icon: <GraduationCap className="w-5 h-5" /> },
    { path: '/prediction', label: 'Student Prediction Model', icon: <BarChart2 className="w-5 h-5" /> },
    { path: '/results', label: 'Predicted Results 2023', icon: <ClipboardList className="w-5 h-5" /> },
    { path: '/predictions-2024', label: 'Predicted Result 2024', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/actions', label: 'Suggested Actions', icon: <ClipboardList className="w-5 h-5" /> },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* Desktop Top Bar */}
      <div className="hidden md:block fixed top-0 right-0 left-72 z-20">
        <div className={`h-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} px-6 flex items-center justify-end`}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg hover:bg-gray-700/50"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <header className={`fixed top-0 left-0 right-0 z-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} md:hidden`}>
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              TCPIPredict
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg hover:bg-gray-700/50"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-700/50"
            >
              {isMobileMenuOpen ? 
                <span className="text-xl">✕</span> : 
                <span className="text-xl">☰</span>
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`fixed inset-x-0 top-16 z-10 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium ${
                  isActive
                    ? isDarkMode 
                      ? 'bg-gray-700 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
        <div className={`flex flex-col flex-grow overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex items-center justify-center px-6 h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                TCPIPredict
              </span>
            </div>
          </div>
          <nav className="flex-1 px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-xl ${
                    isActive
                      ? isDarkMode 
                        ? 'bg-gray-700 text-blue-400'
                        : 'bg-blue-50 text-blue-600'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-72">
        <main className="pt-16 min-h-screen">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

const CompanyInfo = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="flex items-center gap-3 mb-8">
        <GraduationCap className="w-8 h-8 text-blue-400" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to TCPIPredict
        </h2>
      </div>
      
      <FloatingCard delay="0.2s">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl shadow-xl rounded-2xl p-8 mb-6 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              About Our Studies
            </h3>
          </div>
          
          <p className="text-gray-300 mb-8 leading-relaxed">
            Our study focused on developing a machine learning model to predict student performance at Tadika Cahaya Permata Ibu. By analyzing historical student data, we aimed to identify key factors that impact academic success. The model provides educators with early insights into student performance, enabling them to offer timely support and personalize learning strategies.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-xl p-6 backdrop-blur-xl hover:border-purple-400/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                <h4 className="font-semibold text-purple-400 group-hover:text-purple-300">Prediction Module</h4>
              </div>
              <p className="text-sm text-gray-300">
                Utilizes SVM model to predict student performance based on various metrics.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-xl p-6 backdrop-blur-xl hover:border-blue-400/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <ChartBar className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <h4 className="font-semibold text-blue-400 group-hover:text-blue-300">Data Analytics</h4>
              </div>
              <p className="text-sm text-gray-300">
                Comprehensive analysis of student attendance and academic performance.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/20 rounded-xl p-6 backdrop-blur-xl hover:border-pink-400/30 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-pink-400 group-hover:text-pink-300" />
                <h4 className="font-semibold text-pink-400 group-hover:text-pink-300">Insightful Feedback</h4>
              </div>
              <p className="text-sm text-gray-300">
                Generates actionable insights based on student performance predictions.
              </p>
            </div>
          </div>
        </div>
      </FloatingCard>
      
      <FloatingCard delay="0.4s">
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-purple-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Contact Information
            </h3>
          </div>

          <div className="space-y-4 text-gray-300">
            <div className="flex items-center gap-3 group">
              <Mail className="w-5 h-5 text-blue-400 group-hover:text-purple-300" />
              <p><strong className="text-blue-400 mr-2">Email:</strong> azim.bakri2002@gmail.com</p>
            </div>
            <div className="flex items-center gap-3 group">
              <Phone className="w-5 h-5 text-blue-400 group-hover:text-pink-300" />
              <p><strong className="text-blue-400 mr-2">Phone:</strong> +60 19 858-0756</p>
            </div>
            <div className="flex items-center gap-3 group">
              <MapPin className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              <p><strong className="text-blue-400 mr-2">Address:</strong> Faculty of Computing University Malaysia Pahang Al-Sultan Abdullah (UMPSA), 26600 Pekan, Pahang</p>
            </div>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
};

const PastResults = () => {
  const [results] = useState([
    {
      id: 1,
      studentName: 'AIDAN HADIF BIN MOHAMAD FARHAN',
      predictedScore: 90.10,
      actualScore: 87.2,
      date: '2023-11-25',
      accuracy: 96.67,
    },
    {
      id: 2,
      studentName: 'AINUL MARDEEYAH JAMEL',
      predictedScore: 75.10,
      actualScore: 75.0,
      date: '2023-11-25',
      accuracy: 99.87,
    },
    {
      id: 3,
      studentName: 'NUR ARISSA AZZAHRA BINTI MUHAMMAD EFFENDI',
      predictedScore: 72.36,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 96.63,
    },
    {
      id: 4,
      studentName: 'MUHAMMAD SAFWAN HAZIQ BIN MOHD SOLIHIN',
      predictedScore: 94.99,
      actualScore: 97.0,
      date: '2023-11-25',
      accuracy: 97.93,
    },
    {
      id: 5,
      studentName: 'MUHAMMAD EHSAN KHALEQ MOHD AIZAT',
      predictedScore: 86.87,
      actualScore: 90.0,
      date: '2023-11-25',
      accuracy: 96.52,
    },
    {
      id: 6,
      studentName: 'MUHAMMAD UMAR AL-HAFIY BIN HAFIZUDDIN',
      predictedScore: 99.42,
      actualScore: 98.0,
      date: '2023-11-25',
      accuracy: 98.55,
    },
    {
      id: 7,
      studentName: 'SHARIFAH ZAHRA KHADEEJA BINTI SYED ADNAN',
      predictedScore: 86.87,
      actualScore: 80.0,
      date: '2023-11-25',
      accuracy: 91.41,
    },
    {
      id: 8,
      studentName: 'AZWA AMEENA BINTI ADAM',
      predictedScore: 86.87,
      actualScore: 86.0,
      date: '2023-11-25',
      accuracy: 98.99,
    },
    {
      id: 9,
      studentName: 'MUHAMMAD RAYYAN BIN MOHD AZLAN',
      predictedScore: 77.48,
      actualScore: 74.0,
      date: '2023-11-25',
      accuracy: 95.30,
    },
    {
      id: 10,
      studentName: 'ARISHA FATEHA BINTI ZULKEFLI',
      predictedScore: 66.59,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 95.13,
    },
    {
      id: 11,
      studentName: 'MUHAMMAD AZWAR WAZIF BIN MOHD MAZUAN',
      predictedScore: 71.60,
      actualScore: 75.0,
      date: '2023-11-25',
      accuracy: 95.47,
    },
    {
      id: 12,
      studentName: 'MUHAMMAD FAYYADH RIFQI BIN MOHD SUKRI',
      predictedScore: 72.16,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 96.91,
    },
    {
      id: 13,
      studentName: 'MUHAMMAD ADAM QAYYUM BIN LUKMAN',
      predictedScore: 70.13,
      actualScore: 65.0,
      date: '2023-11-25',
      accuracy: 92.11,
    },
    {
      id: 14,
      studentName: 'ESHAL MIKAYLA BINTI MOHD SHAAFILY',
      predictedScore: 72.24,
      actualScore: 68.0,
      date: '2023-11-25',
      accuracy: 93.76,
    },
    {
      id: 15,
      studentName: 'MUHAMMAD HAKEEM ZAFRAN BIN MOHAMAD AMIRUL FIKRI',
      predictedScore: 79.90,
      actualScore: 80.0,
      date: '2023-11-25',
      accuracy: 99.88,
    },
    {
      id: 16,
      studentName: 'AYESHA RANIA BINTI RUL AlIF',
      predictedScore: 80.34,
      actualScore: 78.0,
      date: '2023-11-25',
      accuracy: 97.00,
    },
    {
      id: 17,
      studentName: 'MUHAMMAD EIJAZ UKASYAH BIN UMAR FARUQI',
      predictedScore: 77.76,
      actualScore: 75.0,
      date: '2023-11-25',
      accuracy: 96.32,
    },
    {
      id: 18,
      studentName: 'NUR AFYA HANA BINTI MUHAMMAD ARIFF',
      predictedScore: 65.68,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 93.83,
    },
    {
      id: 19,
      studentName: 'AQIL HADI BIN AZHAN',
      predictedScore:  56.79,
      actualScore: 60.0,
      date: '2023-11-25',
      accuracy: 94.65,
    },
    {
      id: 20,
      studentName: 'NURIN AFIQAH BINTI MUHAMMAD FAIZ',
      predictedScore: 68.74,
      actualScore: 60.0,
      date: '2023-11-25',
      accuracy: 85.43,
    },
    {
      id: 21,
      studentName: 'NUR AQILAH HASYA BT MUHD KHAIRUL NAEM',
      predictedScore: 61.71,
      actualScore: 65.0,
      date: '2023-11-25',
      accuracy: 94.94,
    },
    {
      id: 22,
      studentName: 'MUHAMMAD RIZHAN DAYYAN AL KHAIR BIN MOHD AZRUL',
      predictedScore: 87.35,
      actualScore: 90.0,
      date: '2023-11-25',
      accuracy: 97.06,
    },
    {
      id: 23,
      studentName: 'MOHAMAD HARRAZ ADWA BIN MOHAMAD AKASYAH',
      predictedScore: 90.78,
      actualScore: 92.0,
      date: '2023-11-25',
      accuracy: 98.67,
    },
    {
      id: 24,
      studentName: 'NUR QHAIREEN AULIEYA BINTI YAHYA',
      predictedScore: 93.72,
      actualScore: 88.0,
      date: '2023-11-25',
      accuracy: 93.50,
    },
    {
      id: 25,
      studentName: 'NOR FAIHA HAARISA BINTI FAUZAN',
      predictedScore: 71.58,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 97.74,
    },
    {
      id: 26,
      studentName: 'QURRATUL AAFIYAH BINTI AMIR',
      predictedScore: 72.84,
      actualScore: 74.0,
      date: '2023-11-25',
      accuracy: 98.43,
    },
    {
      id: 27,
      studentName: 'IZDIYAD MIRZA BIN IZMAR',
      predictedScore: 70.66,
      actualScore: 60.0,
      date: '2023-11-25',
      accuracy: 82.23,
    },
    {
      id: 28,
      studentName: 'MUHAMMAD WAFIQ ZAYYAD BIN MOHD WAZIR',
      predictedScore: 72.83,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 95.96,
    },
    {
      id: 29,
      studentName: 'MUHAMMAD ATHAAR NAFIS BIN MUHAMAD ATHIFI',
      predictedScore: 79.69,
      actualScore: 68.0,
      date: '2023-11-25',
      accuracy: 82.81,
    },
    {
      id: 30,
      studentName: 'NUR WAFA ADRIANA BINTI MUHAMMAD ADAM',
      predictedScore: 88.72,
      actualScore: 98.0,
      date: '2023-11-25',
      accuracy: 90.53,
    },
    {
      id: 31,
      studentName: 'CAYLA ADELINE BINTI MOHD ASWAT',
      predictedScore: 99.90,
      actualScore: 100.0,
      date: '2023-11-25',
      accuracy: 99.90,
    },
    {
      id: 32,
      studentName: 'AQIF MALIQUE BIN MUHAMMAD NUR HAZIMIN ',
      predictedScore: 91.10,
      actualScore: 88.0,
      date: '2023-11-25',
      accuracy: 96.48,
    },
    {
      id: 33,
      studentName: 'AHMAD ADRIAN RAYYAN BIN HANAFI',
      predictedScore: 87.47,
      actualScore: 95.0,
      date: '2023-11-25',
      accuracy: 92.07,
    },
    {
      id: 34,
      studentName: 'NUR HIDAYATUL HUSNA BINTI MHD ZAIRI ',
      predictedScore: 89.73,
      actualScore: 88.0,
      date: '2023-11-25',
      accuracy: 98.03,
    },
    {
      id: 35,
      studentName: 'MELISSA SOFFEA BINTI MOHD SUKRI',
      predictedScore: 90.86,
      actualScore: 98.0,
      date: '2023-11-25',
      accuracy: 92.71,
    },
    {
      id: 36,
      studentName: 'NUR ALISYA HUMAIRA BINTI MUHAMMAD FARHAN',
      predictedScore: 84.08,
      actualScore: 80.0,
      date: '2023-11-25',
      accuracy: 94.90,
    },
    {
      id: 37,
      studentName: 'MUHAMMAD ADAM RIZQI BIN MOHD FUAD',
      predictedScore: 93.56,
      actualScore: 94.0,
      date: '2023-11-25',
      accuracy: 99.53,
    },
    {
      id: 38,
      studentName: 'AYRA SUMAYYAH BINTI MOHAMAD MUSTAIN',
      predictedScore: 92.04,
      actualScore: 85.0,
      date: '2023-11-25',
      accuracy: 91.72,
    },
    {
      id: 39,
      studentName: 'ALEESA AISYAH BINTI MUHAMAD AZMAN',
      predictedScore: 81.30,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 83.86,
    },
    {
      id: 40,
      studentName: 'MUHAMMAD IZZAR RAYYAN BIN MUHAMAD IZUAN',
      predictedScore: 70.76,
      actualScore: 70.0,
      date: '2023-11-25',
      accuracy: 98.91,
    },
    {
      id: 41,
      studentName: 'ADAM WAIZ BIN MOHD NASARUDIN',
      predictedScore: 92.68,
      actualScore: 95.0,
      date: '2023-11-25',
      accuracy: 97.56,
    },
    {
      id: 42,
      studentName: 'MOHAMAD HAZIQ IRFAN BIN MOHD KHARI',
      predictedScore: 95.25,
      actualScore: 95.0,
      date: '2023-11-25',
      accuracy: 99.74,
    },
    {
      id: 43,
      studentName: 'MOHAMAD AQEEL BHIZIQRI BIN MOHD BHIYAMIN',
      predictedScore: 80.09,
      actualScore: 80.0,
      date: '2023-11-25',
      accuracy: 99.89,
    },
    {
      id: 44,
      studentName: 'ARMEL AAZEEN BT MOHD HISHAM',
      predictedScore: 94.00,
      actualScore: 100.0,
      date: '2023-11-25',
      accuracy: 94.00,
    },
    {
      id: 45,
      studentName: 'ABDULLAH FAHMI',
      predictedScore: 99.78,
      actualScore: 98.0,
      date: '2023-11-25',
      accuracy: 98.18,
    },
    {
      id: 46,
      studentName: 'SOFEA INARA',
      predictedScore: 79.89,
      actualScore: 80.0,
      date: '2023-11-25',
      accuracy: 99.86,
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <style>{floatingKeyframes}</style>
      
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Predicted Performance 2023
        </h2>
    
      
      <FloatingCard delay="0.2s">
        <div className="bg-gray-800/50 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Predicted Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Actual Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-700/50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {result.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {result.predictedScore.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {result.actualScore.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {result.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        result.accuracy >= 95 
                          ? 'bg-green-900/50 text-green-400 border border-green-500/50' 
                          : 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/50'
                      }`}>
                        {result.accuracy}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
};

const Predictions2024 = () => {
  const [predictions] = useState([
    {
      id: 1,
      studentName: 'AIDAN HADIF BIN MOHAMAD FARHAN',
      predictedScore: 90.10,
      currentScore: 91.0,
      date: '2024-28-11',
      accuracy: 99.01,
    },
    {
      id: 2,
      studentName: 'AINUL MARDEEYAH JAMEL',
      predictedScore: 75.10,
      currentScore: 74.0,
      date: '2024-28-11',
      accuracy: 98.51,
    },
    {
      id: 3,
      studentName: 'NUR ARISSA AZZAHRA BINTI MUHAMMAD EFFENDI',
      predictedScore: 72.37,
      currentScore: 74.00,
      date: '2024-28-11',
      accuracy: 97.80,
    },
    {
      id: 4,
      studentName: 'MUHAMMAD SAFWAN HAZIQ BIN MOHD SOLIHIN',
      predictedScore: 94.99,
      currentScore: 94.0,
      date: '2024-28-11',
      accuracy: 98.95,
    },
    {
      id: 5,
      studentName: 'MUHAMMAD EHSAN KHALEQ MOHD AIZAT',
      predictedScore: 86.87,
      currentScore: 85.0,
      date: '2024-28-11',
      accuracy: 97.80,
    },
    {
      id: 6,
      studentName: 'MUHAMMAD UMAR AL-HAFIY BIN HAFIZUDDIN',
      predictedScore: 99.42,
      currentScore: 98.0,
      date: '2024-28-11',
      accuracy: 98.55,
    },
    {
      id: 7,
      studentName: 'SHARIFAH ZAHRA KHADEEJA BINTI SYED ADNAN',
      predictedScore: 86.87,
      currentScore: 85.0,
      date: '2024-28-11',
      accuracy: 99.01,
    },
    {
      id: 8,
      studentName: 'AZWA AMEENA BINTI ADAM',
      predictedScore: 86.87,
      currentScore: 87.0,
      date: '2024-28-11',
      accuracy: 97.80,
    },
    {
      id: 9,
      studentName: 'MUHAMMAD RAYYAN BIN MOHD AZLAN',
      predictedScore: 77.48,
      currentScore: 76.0,
      date: '2024-28-11',
      accuracy: 98.05,
    },
    {
      id: 10,
      studentName: 'ARISHA FATEHA BINTI ZULKEFLI',
      predictedScore: 66.59,
      currentScore: 64.0,
      date: '2024-28-11',
      accuracy: 95.59,
    },
    {
      id: 11,
      studentName: 'MUHAMMAD AZWAR WAZIF BIN MOHD MAZUAN',
      predictedScore: 71.60,
      currentScore: 70.0,
      date: '2024-28-11',
      accuracy: 97.71,
    },
    {
      id: 12,
      studentName: 'MUHAMMAD FAYYADH RIFQI BIN MOHD SUKRI',
      predictedScore: 72.16,
      currentScore: 70.0,
      date: '2024-28-11',
      accuracy: 96.91,
    },
    {
      id: 13,
      studentName: 'MUHAMMAD ADAM QAYYUM BIN LUKMAN',
      predictedScore: 73.13,
      currentScore: 74.0,
      date: '2024-28-11',
      accuracy: 98.82,
    },
    {
      id: 14,
      studentName: 'ESHAL MIKAYLA BINTI MOHD SHAAFILY',
      predictedScore: 72.24,
      currentScore: 70.0,
      date: '2024-28-11',
      accuracy: 96.80,
    },
    {
      id: 15,
      studentName: 'MUHAMMAD HAKEEM ZAFRAN BIN MOHAMAD AMIRUL FIKRI',
      predictedScore: 79.90,
      currentScore: 75.0,
      date: '2024-28-11',
      accuracy: 93.47,
    },
    {
      id: 16,
      studentName: 'AYESHA RANIA BINTI RUL AlIF',
      predictedScore: 80.34,
      currentScore: 80.00,
      date: '2024-28-11',
      accuracy: 99.57,
    },
    {
      id: 17,
      studentName: 'MUHAMMAD EIJAZ UKASYAH BIN UMAR FARUQI',
      predictedScore: 77.76,
      currentScore: 65.0,
      date: '2024-28-11',
      accuracy: 80.37,
    },
    {
      id: 18,
      studentName: 'NUR AFYA HANA BINTI MUHAMMAD ARIFF',
      predictedScore: 62.68,
      currentScore: 65.0,
      date: '2024-28-11',
      accuracy: 96.43,
    },
    {
      id: 19,
      studentName: 'AQIL HADI BIN AZHAN',
      predictedScore: 56.79,
      currentScore: 60.0,
      date: '2024-28-11',
      accuracy: 94.65,
    },
    {
      id: 20,
      studentName: 'NURIN AFIQAH BINTI MUHAMMAD FAIZ',
      predictedScore: 68.74,
      currentScore: 65.0,
      date: '2024-28-11',
      accuracy: 94.25,
    },
    {
      id: 21,
      studentName: 'NUR AQILAH HASYA BT MUHD KHAIRUL NAEM',
      predictedScore: 61.71,
      currentScore: 60.0,
      date: '2024-28-11',
      accuracy: 97.15,
    },
    {
      id: 22,
      studentName: 'MUHAMMAD RIZHAN DAYYAN AL KHAIR BIN MOHD AZRUL',
      predictedScore: 87.35,
      currentScore: 85.0,
      date: '2024-28-11',
      accuracy: 97.24,
    },
    {
      id: 23,
      studentName: 'MOHAMAD HARRAZ ADWA BIN MOHAMAD AKASYAH',
      predictedScore: 90.78,
      currentScore: 90.0,
      date: '2024-28-11',
      accuracy: 99.13,
    },
    {
      id: 24,
      studentName: 'NUR QHAIREEN AULIEYA BINTI YAHYA',
      predictedScore: 93.72,
      currentScore: 90.0,
      date: '2024-28-11',
      accuracy: 95.87,
    },
    {
      id: 25,
      studentName: 'NOR FAIHA HAARISA BINTI FAUZAN',
      predictedScore: 71.58,
      currentScore: 70.0,
      date: '2024-28-11',
      accuracy: 97.74,
    },
    {
      id: 26,
      studentName: 'QURRATUL AAFIYAH BINTI AMIR',
      predictedScore: 72.84,
      currentScore: 75.0,
      date: '2024-28-11',
      accuracy: 97.12,
    },
    {
      id: 27,
      studentName: 'IZDIYAD MIRZA BIN IZMAR',
      predictedScore: 70.66,
      currentScore: 70.0,
      date: '2024-28-11',
      accuracy: 99.06,
    },
    {
      id: 28,
      studentName: 'MUHAMMAD WAFIQ ZAYYAD BIN MOHD WAZIR',
      predictedScore: 72.83,
      currentScore: 72.0,
      date: '2024-28-11',
      accuracy: 98.85,
    },
    {
      id: 29,
      studentName: 'MUHAMMAD ATHAAR NAFIS BIN MUHAMAD ATHIFI',
      predictedScore: 79.69,
      currentScore: 78.0,
      date: '2024-28-11',
      accuracy: 97.83,
    },
    {
      id: 30,
      studentName: 'NUR WAFA ADRIANA BINTI MUHAMMAD ADAM ',
      predictedScore: 88.72,
      currentScore: 88.0,
      date: '2024-28-11',
      accuracy: 99.18,
    },
    {
      id: 31,
      studentName: 'CAYLA ADELINE BINTI MOHD ASWAT',
      predictedScore: 99.90,
      currentScore: 95.0,
      date: '2024-28-11',
      accuracy: 94.84,
    },
    {
      id: 32,
      studentName: 'AQIF MALIQUE BIN MUHAMMAD NUR HAZIMIN ',
      predictedScore: 91.10,
      currentScore: 90.0,
      date: '2024-28-11',
      accuracy: 98.78,
    },
    {
      id: 33,
      studentName: 'AHMAD ADRIAN RAYYAN BIN HANAFI',
      predictedScore: 87.47,
      currentScore: 87.0,
      date: '2024-28-11',
      accuracy: 99.46,
    },
    {
      id: 34,
      studentName: 'NUR HIDAYATUL HUSNA BINTI MHD ZAIRI',
      predictedScore: 89.73,
      currentScore: 95.0,
      date: '2024-28-11',
      accuracy: 94.45,
    },
    {
      id: 35,
      studentName: 'MELISSA SOFFEA BINTI MOHD SUKRI',
      predictedScore: 90.86,
      currentScore: 90.0,
      date: '2024-28-11',
      accuracy: 99.04,
    },
    {
      id: 36,
      studentName: 'NUR ALISYA HUMAIRA BINTI MUHAMMAD FARHAN',
      predictedScore: 84.08,
      currentScore: 80.0,
      date: '2024-28-11',
      accuracy: 94.90,
    },
    {
      id: 37,
      studentName: 'MUHAMMAD ADAM RIZQI BIN MOHD FUAD',
      predictedScore: 93.56,
      currentScore: 90.0,
      date: '2024-28-11',
      accuracy: 96.04,
    },
    {
      id: 38,
      studentName: 'AYRA SUMAYYAH BINTI MOHAMAD MUSTAIN',
      predictedScore: 92.04,
      currentScore: 85.0,
      date: '2024-28-11',
      accuracy: 85.58,
    },
    {
      id: 39,
      studentName: 'ALEESA AISYAH BINTI MUHAMAD AZMAN',
      predictedScore: 81.30,
      currentScore: 85.0,
      date: '2024-28-11',
      accuracy: 95.65,
    },
    {
      id: 40,
      studentName: 'MUHAMMAD IZZAR RAYYAN BIN MUHAMAD IZUAN',
      predictedScore: 70.76,
      currentScore: 75.0,
      date: '2024-28-11',
      accuracy: 94.33,
    },
    {
      id: 41,
      studentName: 'ADAM WAIZ BIN MOHD NASARUDIN',
      predictedScore: 92.68,
      currentScore: 95.0,
      date: '2024-28-11',
      accuracy: 97.56,
    },
    {
      id: 42,
      studentName: 'MOHAMAD HAZIQ IRFAN BIN MOHD KHARI',
      predictedScore: 95.25,
      currentScore: 95.0,
      date: '2024-28-11',
      accuracy: 99.74,
    },
    {
      id: 43,
      studentName: 'MOHAMAD AQEEL BHIZIQRI BIN MOHD BHIYAMIN',
      predictedScore: 80.09,
      currentScore: 70.0,
      date: '2024-28-11',
      accuracy: 85.59,
    },
    {
      id: 44,
      studentName: 'ARMEL AAZEEN BT MOHD HISHAM',
      predictedScore: 94.00,
      currentScore: 85.00,
      date: '2024-28-11',
      accuracy: 95.56,
    },
    {
      id: 45,
      studentName: 'ABDULLAH FAHMI',
      predictedScore: 99.78,
      currentScore: 95.00,
      date: '2024-28-11',
      accuracy: 89.13,
    },
    {
      id: 46,
      studentName: 'SOFEA INARA',
      predictedScore: 79.89,
      currentScore: 80.0,
      date: '2024-28-11',
      accuracy: 99.86,
    },
    
    
 
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <style>{floatingKeyframes}</style>
  
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Predicted Performance 2024
        </h2>
      
      
      <FloatingCard delay="0.2s">
        <div className="bg-gray-800/50 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-gray-700/50">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Predicted Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Current Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-blue-400 uppercase tracking-wider">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {predictions.map((prediction) => (
                  <tr key={prediction.id} className="hover:bg-gray-700/50 transition-colors duration-300">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {prediction.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {prediction.predictedScore.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {prediction.currentScore.toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {prediction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        prediction.accuracy >= 95 
                          ? 'bg-green-900/50 text-green-400 border border-green-500/50' 
                          : 'bg-yellow-900/50 text-yellow-400 border border-yellow-500/50'
                      }`}>
                        {prediction.accuracy}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FloatingCard>
    </div>
  );
};

export { DashboardLayout, CompanyInfo, PastResults, Predictions2024 };