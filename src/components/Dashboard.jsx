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
    { path: '/results-2022', label: 'Predicted Results 2022', icon: <ClipboardList className="w-5 h-5" /> },
    { path: '/results', label: 'Predicted Results 2023', icon: <ClipboardList className="w-5 h-5" /> },
    { path: '/predictions-2024', label: 'Predicted Result 2024', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/actions', label: 'Suggested Actions', icon: <Target className="w-5 h-5" /> },
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

        {/* Enhanced Footer with Copyright */}
        <footer className={`relative ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'} backdrop-blur-xl`}>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
          </div>
          
          <div className="relative mx-auto py-8 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Logo and Copyright */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      TCPIPredict
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      © {new Date().getFullYear()} All rights reserved
                    </div>
                  </div>
                </div>

                {/* Developer Info */}
                <div className={`flex items-center gap-3 px-4 py-2 rounded-xl ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'} backdrop-blur-xl hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center gap-2">
                    <Bot className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Developed with ❤️ by
                    </span>
                    <a 
                      href="mailto:azim.bakri2002@gmail.com"
                      className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-500 transition-all duration-300"
                    >
                      Azim M Bakri
                    </a>
                  </div>
                </div>
              </div>

              {/* Extra Info */}
              <div className="mt-6 pt-6 border-t border-gray-700/50 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm">
                <a href="#" className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors duration-300`}>
                  <Mail className="w-4 h-4" />
                  Contact
                </a>
                <a href="#" className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors duration-300`}>
                  <LineChart className="w-4 h-4" />
                  Documentation
                </a>
                <a href="#" className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors duration-300`}>
                  <Target className="w-4 h-4" />
                  Updates
                </a>
                <a href="#" className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'} transition-colors duration-300`}>
                  <Sparkles className="w-4 h-4" />
                  Features
                </a>
              </div>
            </div>
          </div>
        </footer>

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
            Our study focused on developing a machine learning model to predict student performance at Tadika Cahaya Permata Ibu. By analyzing student data, we aimed to identify key factors that impact academic success. The model provides educators with early insights into student performance, enabling them to offer timely support and personalize learning strategies.
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
      predictedScore: 91.5,
      actualScore: 98,
      date: '2023-19-11',
      accuracy: 93.37,
    },
    {
      id: 2,
      studentName: 'AINUL MARDEEYAH JAMEL',
      predictedScore: 74.3,
      actualScore: 75,
      date: '2023-19-11',
      accuracy: 99.07,
    },
    {
      id: 3,
      studentName: 'NUR ARISSA AZZAHRA BINTI MUHAMMAD EFFENDI',
      predictedScore: 69.8,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 99.71,
    },
    {
      id: 4,
      studentName: 'MUHAMMAD SAFWAN HAZIQ BIN MOHD SOLIHIN',
      predictedScore: 91.3,
      actualScore: 97,
      date: '2023-19-11',
      accuracy: 94.12,
    },
    {
      id: 5,
      studentName: 'MUHAMMAD EHSAN KHALEQ MOHD AIZAT',
      predictedScore: 88.7,
      actualScore: 90,
      date: '2023-19-11',
      accuracy: 98.56,
    },
    {
      id: 6,
      studentName: 'MUHAMMAD UMAR AL-HAFIY BIN HAFIZUDDIN',
      predictedScore: 93.6,
      actualScore: 98,
      date: '2023-19-11',
      accuracy: 95.51,
    },
    {
      id: 7,
      studentName: 'SHARIFAH ZAHRA KHADEEJA BINTI SYED ADNAN',
      predictedScore: 88.7,
      actualScore: 80,
      date: '2023-19-11',
      accuracy: 89.13,
    },
    {
      id: 8,
      studentName: 'AZWA AMEENA BINTI ADAM',
      predictedScore: 88.7,
      actualScore: 96,
      date: '2023-19-11',
      accuracy: 92.40,
    },
    {
      id: 9,
      studentName: 'MUHAMMAD RAYYAN BIN MOHD AZLAN',
      predictedScore: 73.9,
      actualScore: 74,
      date: '2023-19-11',
      accuracy: 99.86,
    },
    {
      id: 10,
      studentName: 'ARISHA FATEHA BINTI ZULKEFLI',
      predictedScore: 67.9,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 97.00,
    },
    {
      id: 11,
      studentName: 'MUHAMMAD AZWAR WAZIF BIN MOHD MAZUAN',
      predictedScore: 74.7,
      actualScore: 75,
      date: '2023-19-11',
      accuracy: 99.6,
    },
    {
      id: 12,
      studentName: 'MUHAMMAD FAYYADH RIFQI BIN MOHD SUKRI',
      predictedScore: 72.16,
      actualScore: 70.0,
      date: '2023-19-11',
      accuracy: 96.91,
    },
    {
      id: 13,
      studentName: 'MUHAMMAD ADAM QAYYUM BIN LUKMAN',
      predictedScore: 70.5,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 86.31,
    },
    {
      id: 14,
      studentName: 'ESHAL MIKAYLA BINTI MOHD SHAAFILY',
      predictedScore: 69.8,
      actualScore: 68,
      date: '2023-19-11',
      accuracy: 96.80,
    },
    {
      id: 15,
      studentName: 'MUHAMMAD HAKEEM ZAFRAN BIN MOHAMAD AMIRUL FIKRI',
      predictedScore: 80.10,
      actualScore: 80,
      date: '2023-19-11',
      accuracy: 99.8,
    },
    {
      id: 16,
      studentName: 'AYESHA RANIA BINTI RUL AlIF',
      predictedScore: 78.4,
      actualScore: 78,
      date: '2023-19-11',
      accuracy: 99.49,
    },
    {
      id: 17,
      studentName: 'MUHAMMAD EIJAZ UKASYAH BIN UMAR FARUQI',
      predictedScore: 72.6,
      actualScore: 75,
      date: '2023-19-11',
      accuracy: 96.80,
    },
    {
      id: 18,
      studentName: 'NUR AFYA HANA BINTI MUHAMMAD ARIFF',
      predictedScore: 68.9,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 98.43,
    },
    {
      id: 19,
      studentName: 'AQIL HADI BIN AZHAN',
      predictedScore: 69.8,
      actualScore: 60,
      date: '2023-19-11',
      accuracy: 83.67,
    },
    {
      id: 20,
      studentName: 'NURIN AFIQAH BINTI MUHAMMAD FAIZ',
      predictedScore: 66.4,
      actualScore: 60,
      date: '2023-19-11',
      accuracy: 89.33,
    },
    {
      id: 21,
      studentName: 'NUR AQILAH HASYA BT MUHD KHAIRUL NAEM',
      predictedScore: 67.5,
      actualScore: 65,
      date: '2023-19-11',
      accuracy: 96.15,
    },
    {
      id: 22,
      studentName: 'MUHAMMAD RIZHAN DAYYAN AL KHAIR BIN MOHD AZRUL',
      predictedScore: 91.3,
      actualScore: 90,
      date: '2023-19-11',
      accuracy: 98.56,
    },
    {
      id: 23,
      studentName: 'MOHAMAD HARRAZ ADWA BIN MOHAMAD AKASYAH',
      predictedScore: 93.5,
      actualScore: 92,
      date: '2023-19-11',
      accuracy: 98.37,
    },
    {
      id: 24,
      studentName: 'NUR QHAIREEN AULIEYA BINTI YAHYA',
      predictedScore: 89.1,
      actualScore: 88,
      date: '2023-19-11',
      accuracy: 98.75,
    },
    {
      id: 25,
      studentName: 'NOR FAIHA HAARISA BINTI FAUZAN',
      predictedScore: 71.5,
      actualScore: 70.0,
      date: '2023-19-11',
      accuracy: 97.86,
    },
    {
      id: 26,
      studentName: 'QURRATUL AAFIYAH BINTI AMIR',
      predictedScore: 71.6,
      actualScore: 74,
      date: '2023-19-11',
      accuracy: 96.76,
    },
    {
      id: 27,
      studentName: 'IZDIYAD MIRZA BIN IZMAR',
      predictedScore: 72.1,
      actualScore: 60,
      date: '2023-19-11',
      accuracy: 79.83,
    },
    {
      id: 28,
      studentName: 'MUHAMMAD WAFIQ ZAYYAD BIN MOHD WAZIR',
      predictedScore: 71.4,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 98.00,
    },
    {
      id: 29,
      studentName: 'MUHAMMAD ATHAAR NAFIS BIN MUHAMAD ATHIFI',
      predictedScore: 74.1,
      actualScore: 68,
      date: '2023-19-11',
      accuracy: 91.03,
    },
    {
      id: 30,
      studentName: 'NUR WAFA ADRIANA BINTI MUHAMMAD ADAM ',
      predictedScore: 93.6,
      actualScore: 98,
      date: '2023-19-11',
      accuracy: 95.51,
    },
    {
      id: 31,
      studentName: 'CAYLA ADELINE BINTI MOHD ASWAT',
      predictedScore: 96.6,
      actualScore: 100,
      date: '2023-19-11',
      accuracy: 96.60,
    },
    {
      id: 32,
      studentName: 'AQIF MALIQUE BIN MUHAMMAD NUR HAZIMIN ',
      predictedScore: 91.6,
      actualScore: 88,
      date: '2023-19-11',
      accuracy: 95.91,
    },
    {
      id: 33,
      studentName: 'AHMAD ADRIAN RAYYAN BIN HANAFI',
      predictedScore: 91.1,
      actualScore: 95,
      date: '2023-19-11',
      accuracy: 95.89,
    },
    {
      id: 34,
      studentName: 'NUR HIDAYATUL HUSNA BINTI MHD ZAIRI',
      predictedScore: 89.2,
      actualScore: 88,
      date: '2023-19-11',
      accuracy: 98.64,
    },
    {
      id: 35,
      studentName: 'MELISSA SOFFEA BINTI MOHD SUKRI',
      predictedScore: 95.6,
      actualScore: 98,
      date: '2023-19-11',
      accuracy: 97.55,
    },
    {
      id: 36,
      studentName: 'NUR ALISYA HUMAIRA BINTI MUHAMMAD FARHAN',
      predictedScore: 78.3,
      actualScore: 80,
      date: '2023-19-11',
      accuracy: 97.88,
    },
    {
      id: 37,
      studentName: 'MUHAMMAD ADAM RIZQI BIN MOHD FUAD',
      predictedScore: 90.7,
      actualScore: 94,
      date: '2023-19-11',
      accuracy: 96.49,
    },
    {
      id: 38,
      studentName: 'AYRA SUMAYYAH BINTI MOHAMAD MUSTAIN',
      predictedScore: 91,
      actualScore: 85,
      date: '2023-19-11',
      accuracy: 92.94,
    },
    {
      id: 39,
      studentName: 'ALEESA AISYAH BINTI MUHAMAD AZMAN',
      predictedScore: 79.7,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 86.14,
    },
    {
      id: 40,
      studentName: 'MUHAMMAD IZZAR RAYYAN BIN MUHAMAD IZUAN',
      predictedScore: 71,
      actualScore: 70,
      date: '2023-19-11',
      accuracy: 98.57,
    },
    {
      id: 41,
      studentName: 'ADAM WAIZ BIN MOHD NASARUDIN',
      predictedScore: 86.9,
      actualScore: 95,
      date: '2023-19-11',
      accuracy: 91.47,
    },
    {
      id: 42,
      studentName: 'MOHAMAD HAZIQ IRFAN BIN MOHD KHARI',
      predictedScore: 93.2,
      actualScore: 95.0,
      date: '2023-19-11',
      accuracy: 98.11,
    },
    {
      id: 43,
      studentName: 'MOHAMAD AQEEL BHIZIQRI BIN MOHD BHIYAMIN',
      predictedScore: 80.3,
      actualScore: 80,
      date: '2023-19-11',
      accuracy: 99.63,
    },
    {
      id: 44,
      studentName: 'ARMEL AAZEEN BT MOHD HISHAM',
      predictedScore: 88.9,
      actualScore: 100,
      date: '2023-19-11',
      accuracy: 88.90,
    },
    {
      id: 45,
      studentName: 'ABDULLAH FAHMI',
      predictedScore: 96.3,
      actualScore: 98,
      date: '2023-19-11',
      accuracy: 98.27,
    },
    {
      id: 46,
      studentName: 'SOFEA INARA',
      predictedScore: 78.7,
      actualScore: 80,
      date: '2023-19-11',
      accuracy: 98.38,
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
      predictedScore: 77.2,
      currentScore: 76,
      date: '2024-28-11',
      accuracy: 99.42,
    },
    {
      id: 2,
      studentName: 'AINUL MARDEEYAH JAMEL',
      predictedScore: 84.4,
      currentScore: 85,                   
      date: '2024-28-11',
      accuracy: 99.29,
    },
    {
      id: 3,
      studentName: 'NUR ARISSA AZZAHRA BINTI MUHAMMAD EFFENDI',
      predictedScore: 74.3,
      currentScore: 77,
      date: '2024-28-11',
      accuracy: 96.49,
    },
    {
      id: 4,
      studentName: 'MUHAMMAD SAFWAN HAZIQ BIN MOHD SOLIHIN',
      predictedScore: 77.3,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 96.63,
    },
    {
      id: 5,
      studentName: 'MUHAMMAD EHSAN KHALEQ MOHD AIZAT',
      predictedScore: 85.1,
      currentScore: 85,
      date: '2024-28-11',
      accuracy: 99.88,
    },
    {
      id: 6,
      studentName: 'MUHAMMAD UMAR AL-HAFIY BIN HAFIZUDDIN',
      predictedScore: 80.3,
      currentScore: 83,
      date: '2024-28-11',
      accuracy: 97.93,
    },
    {
      id: 7,
      studentName: 'SHARIFAH ZAHRA KHADEEJA BINTI SYED ADNAN',
      predictedScore: 81.5,
      currentScore: 82,
      date: '2024-28-11',
      accuracy: 99.39,
    },
    {
      id: 8,
      studentName: 'AZWA AMEENA BINTI ADAM',
      predictedScore: 84.8,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 94.00,
    },
    {
      id: 9,
      studentName: 'MUHAMMAD RAYYAN BIN MOHD AZLAN',
      predictedScore: 82,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 97.50,
    },
    {
      id: 10,
      studentName: 'ARISHA FATEHA BINTI ZULKEFLI',
      predictedScore: 81.4,
      currentScore: 85,
      date: '2024-28-11',
      accuracy: 95.76,
    },
    {
      id: 11,
      studentName: 'MUHAMMAD AZWAR WAZIF BIN MOHD MAZUAN',
      predictedScore: 81.6,
      currentScore: 85,
      date: '2024-28-11',
      accuracy: 96.00,
    },
    {
      id: 12,
      studentName: 'MUHAMMAD FAYYADH RIFQI BIN MOHD SUKRI',
      predictedScore: 74.7,
      currentScore: 78,
      date: '2024-28-11',
      accuracy: 95.77,
    },
    {
      id: 13,
      studentName: 'MUHAMMAD ADAM QAYYUM BIN LUKMAN',
      predictedScore: 76.6,
      currentScore: 78,
      date: '2024-28-11',
      accuracy: 98.21,
    },
    {
      id: 14,
      studentName: 'ESHAL MIKAYLA BINTI MOHD SHAAFILY',
      predictedScore: 68.3,
      currentScore: 70,
      date: '2024-28-11',
      accuracy: 97.57,
    },
    {
      id: 15,
      studentName: 'MUHAMMAD HAKEEM ZAFRAN BIN MOHAMAD AMIRUL FIKRI',
      predictedScore: 82.7,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 96.63,
    },
    {
      id: 16,
      studentName: 'AYESHA RANIA BINTI RUL AlIF',
      predictedScore: 72.2,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 90.25,
    },
    {
      id: 17,
      studentName: 'MUHAMMAD EIJAZ UKASYAH BIN UMAR FARUQI',
      predictedScore: 76.8,
      currentScore: 70,
      date: '2024-28-11',
      accuracy: 90.29,
    },
    {
      id: 18,
      studentName: 'NUR AFYA HANA BINTI MUHAMMAD ARIFF',
      predictedScore: 86.0,
      currentScore: 90,
      date: '2024-28-11',
      accuracy: 95.56,
    },
    {
      id: 19,
      studentName: 'AQIL HADI BIN AZHAN',
      predictedScore: 78.1,
      currentScore: 85,
      date: '2024-28-11',
      accuracy: 91.88,
    },
    {
      id: 20,
      studentName: 'NURIN AFIQAH BINTI MUHAMMAD FAIZ',
      predictedScore: 72.4,
      currentScore: 78,
      date: '2024-28-11',
      accuracy: 92.82,
    },
    {
      id: 21,
      studentName: 'NUR AQILAH HASYA BT MUHD KHAIRUL NAEM',
      predictedScore: 72.7,
      currentScore: 75,
      date: '2024-28-11',
      accuracy: 96.93,
    },
    {
      id: 22,
      studentName: 'MUHAMMAD RIZHAN DAYYAN AL KHAIR BIN MOHD AZRUL',
      predictedScore: 81.4,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 98.25,
    },
    {
      id: 23,
      studentName: 'MOHAMAD HARRAZ ADWA BIN MOHAMAD AKASYAH',
      predictedScore: 76.5,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 95.63,
    },
    {
      id: 24,
      studentName: 'NUR QHAIREEN AULIEYA BINTI YAHYA',
      predictedScore: 88.1,
      currentScore: 90,
      date: '2024-28-11',
      accuracy: 97.89,
    },
    {
      id: 25,
      studentName: 'NOR FAIHA HAARISA BINTI FAUZAN',
      predictedScore: 84.0,
      currentScore: 84,
      date: '2024-28-11',
      accuracy: 100.00,
    },
    {
      id: 26,
      studentName: 'QURRATUL AAFIYAH BINTI AMIR',
      predictedScore: 71.3,
      currentScore: 70,
      date: '2024-28-11',
      accuracy: 98.14,
    },
    {
      id: 27,
      studentName: 'IZDIYAD MIRZA BIN IZMAR',
      predictedScore: 75,
      currentScore: 75,
      date: '2024-28-11',
      accuracy: 100.00,
    },
    {
      id: 28,
      studentName: 'MUHAMMAD WAFIQ ZAYYAD BIN MOHD WAZIR',
      predictedScore: 78.2,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 97.75,
    },
    {
      id: 29,
      studentName: 'MUHAMMAD ATHAAR NAFIS BIN MUHAMAD ATHIFI',
      predictedScore: 93.8,
      currentScore: 95,
      date: '2024-28-11',
      accuracy: 98.74,
    },
    {
      id: 30,
      studentName: 'NUR WAFA ADRIANA BINTI MUHAMMAD ADAM ',
      predictedScore: 87.8,
      currentScore: 88,
      date: '2024-28-11',
      accuracy: 99.77,
    },
    {
      id: 31,
      studentName: 'CAYLA ADELINE BINTI MOHD ASWAT',
      predictedScore: 82.6,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 96.75,
    },
    {
      id: 32,
      studentName: 'AQIF MALIQUE BIN MUHAMMAD NUR HAZIMIN ',
      predictedScore: 77.7,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 97.13,
    },
    {
      id: 33,
      studentName: 'AHMAD ADRIAN RAYYAN BIN HANAFI',
      predictedScore: 76.5,
      currentScore: 78,
      date: '2024-28-11',
      accuracy: 98.08,
    },
    {
      id: 34,
      studentName: 'NUR HIDAYATUL HUSNA BINTI MHD ZAIRI',
      predictedScore: 81.4,
      currentScore: 88,
      date: '2024-28-11',
      accuracy: 92.50,
    },
    {
      id: 35,
      studentName: 'MELISSA SOFFEA BINTI MOHD SUKRI',
      predictedScore: 73.2,
      currentScore: 74,
      date: '2024-28-11',
      accuracy: 98.92,
    },
    {
      id: 36,
      studentName: 'NUR ALISYA HUMAIRA BINTI MUHAMMAD FARHAN',
      predictedScore: 88.7,
      currentScore: 90,
      date: '2024-28-11',
      accuracy: 98.56,
    },
    {
      id: 37,
      studentName: 'MUHAMMAD ADAM RIZQI BIN MOHD FUAD',
      predictedScore: 72.0,
      currentScore: 72,
      date: '2024-28-11',
      accuracy: 100.00,
    },
    {
      id: 38,
      studentName: 'AYRA SUMAYYAH BINTI MOHAMAD MUSTAIN',
      predictedScore: 76.9,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 96.13,
    },
    {
      id: 39,
      studentName: 'ALEESA AISYAH BINTI MUHAMAD AZMAN',
      predictedScore: 74.6,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 93.25,
    },
    {
      id: 40,
      studentName: 'MUHAMMAD IZZAR RAYYAN BIN MUHAMAD IZUAN',
      predictedScore: 83.4,
      currentScore: 90,
      date: '2024-28-11',
      accuracy: 92.67,
    },
    {
      id: 41,
      studentName: 'ADAM WAIZ BIN MOHD NASARUDIN',
      predictedScore: 82.6,
      currentScore: 85,
      date: '2024-28-11',
      accuracy: 97.18,
    },
    {
      id: 42,
      studentName: 'MOHAMAD HAZIQ IRFAN BIN MOHD KHARI',
      predictedScore: 71.3,
      currentScore: 70,
      date: '2024-28-11',
      accuracy: 98.14,
    },
    {
      id: 43,
      studentName: 'MOHAMAD AQEEL BHIZIQRI BIN MOHD BHIYAMIN',
      predictedScore: 83.5,
      currentScore: 85,
      date: '2024-28-11',
      accuracy: 98.24,
    },
    {
      id: 44,
      studentName: 'ARMEL AAZEEN BT MOHD HISHAM',
      predictedScore: 76.5,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 95.63,
    },
    {
      id: 45,
      studentName: 'ABDULLAH FAHMI',
      predictedScore: 82.3,
      currentScore: 80,
      date: '2024-28-11',
      accuracy: 97.13,
    },
    {
      id: 46,
      studentName: 'SOFEA INARA',
      predictedScore: 88.1,
      currentScore: 90,
      date: '2024-28-11',
      accuracy: 97.89,
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

const PastResults2022 = () => {
  const [results] = useState([
    {
      id: 1,
      studentName: 'AIDAN HADIF BIN MOHAMAD FARHAN',
      predictedScore: 72.3,
      actualScore: 75,
      date: '2022-11-25',
      accuracy: 96.40,
    },
    {
      id: 2,
      studentName: 'AINUL MARDEEYAH JAMEL',
      predictedScore: 70.4,
      actualScore: 66,
      date: '2022-11-25',
      accuracy: 93.3,
    },
    {
      id: 3,
      studentName: 'NUR ARISSA AZZAHRA BINTI MUHAMMAD EFFENDI',
      predictedScore: 78,
      actualScore: 67.0,
      date: '2022-11-25',
      accuracy: 83.58,
    },
    {
      id: 4,
      studentName: 'MUHAMMAD SAFWAN HAZIQ BIN MOHD SOLIHIN',
      predictedScore: 87.5,
      actualScore: 92,
      date: '2022-11-25',
      accuracy: 95.11,
    },
    {
      id: 5,
      studentName: 'MUHAMMAD EHSAN KHALEQ MOHD AIZAT',
      predictedScore: 70.4,
      actualScore: 94,
      date: '2022-11-25',
      accuracy: 74.89,
    },
    {
      id: 6,
      studentName: 'MUHAMMAD UMAR AL-HAFIY BIN HAFIZUDDIN',
      predictedScore: 82.4,
      actualScore: 82,
      date: '2022-11-25',
      accuracy: 99.51,
    },
    {
      id: 7,
      studentName: 'SHARIFAH ZAHRA KHADEEJA BINTI SYED ADNAN',
      predictedScore: 80.8,
      actualScore: 88,
      date: '2022-11-25',
      accuracy: 91.82,
    },
    {
      id: 8,
      studentName: 'AZWA AMEENA BINTI ADAM',
      predictedScore: 84.7,
      actualScore: 91,
      date: '2022-11-25',
      accuracy: 93.08,
    },
    {
      id: 9,
      studentName: 'MUHAMMAD RAYYAN BIN MOHD AZLAN',
      predictedScore: 78.6,
      actualScore: 76,
      date: '2022-11-25',
      accuracy: 96.58,
    },
    {
      id: 10,
      studentName: 'ARISHA FATEHA BINTI ZULKEFLI',
      predictedScore: 84.4,
      actualScore: 94,
      date: '2022-11-25',
      accuracy: 89.79,
    },
    {
      id: 11,
      studentName: 'MUHAMMAD AZWAR WAZIF BIN MOHD MAZUANI',
      predictedScore: 82.3,
      actualScore: 68,
      date: '2022-11-25',
      accuracy: 78.97,
    },
    {
      id: 12,
      studentName: 'MUHAMMAD FAYYADH RIFQI BIN MOHD SUKRI',
      predictedScore: 72.8,
      actualScore: 74,
      date: '2022-11-25',
      accuracy: 98.38,
    },
    {
      id: 13,
      studentName: 'MUHAMMAD ADAM QAYYUM BIN LUKMAN',
      predictedScore: 79.4,
      actualScore: 84,
      date: '2022-11-25',
      accuracy: 94.52,
    },
    {
      id: 14,
      studentName: 'ESHAL MIKAYLA BINTI MOHD SHAAFILY',
      predictedScore: 72.8,
      actualScore: 74,
      date: '2022-11-25',
      accuracy: 98.38,
    },
    {
      id: 15,
      studentName: 'MUHAMMAD HAKEEM ZAFRAN BIN MOHAMAD AMIRUL FIKRI',
      predictedScore: 75.6,
      actualScore: 76,
      date: '2022-11-25',
      accuracy: 99.47,
    },
    {
      id: 16,
      studentName: 'AYESHA RANIA BINTI RUL AlIF',
      predictedScore: 74.5,
      actualScore: 76,
      date: '2022-11-25',
      accuracy: 98.03,
    },
    {
      id: 17,
      studentName: 'MUHAMMAD EIJAZ UKASYAH BIN UMAR FARUQI',
      predictedScore: 81.4,
      actualScore: 94,
      date: '2022-11-25',
      accuracy: 86.60,
    },
    {
      id: 18,
      studentName: 'NUR AFYA HANA BINTI MUHAMMAD ARIFF',
      predictedScore: 72.7,
      actualScore: 64,
      date: '2022-11-25',
      accuracy: 86.41,
    },
    {
      id: 19,
      studentName: 'AQIL HADI BIN AZHAN',
      predictedScore: 73.7,
      actualScore: 73,
      date: '2022-11-25',
      accuracy: 99.04,
    },
    {
      id: 20,
      studentName: 'NURIN AFIQAH BINTI MUHAMMAD FAIZ',
      predictedScore: 71.9,
      actualScore: 68,
      date: '2022-11-25',
      accuracy: 94.26,
    },
    {
      id: 21,
      studentName: 'NUR AQILAH HASYA BT MUHD KHAIRUL NAEM',
      predictedScore: 84.3,
      actualScore: 82,
      date: '2022-11-25',
      accuracy: 97.20,
    },


  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <style>{floatingKeyframes}</style>
      
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Predicted Performance 2022
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

export { DashboardLayout, CompanyInfo, PastResults, PastResults2022, Predictions2024 };