import React from 'react';
import { Trophy, AlertTriangle, TrendingUp, BookOpen, Star, Target } from 'lucide-react';

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

const GeneralActions = () => {
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

  const performanceCategories = [
    {
      id: 1,
      range: "High Performance (90-100%)",
      icon: <Trophy className="w-6 h-6 text-blue-400" />,
      status: "Exceeding Expectations",
      actions: [
        "Provide advanced learning materials",
        "Encourage peer tutoring opportunities",
        "Offer enrichment activities",
        "Consider special projects or competitions",
        "Maintain positive reinforcement"
      ],
      cardColor: "border-green-500/70",
      delay: "0s"
    },
    {
      id: 2,
      range: "Good Performance (80-89%)",
      icon: <Star className="w-6 h-6 text-blue-400" />,
      status: "Meeting Expectations",
      actions: [
        "Continue current learning strategies",
        "Introduce challenging content gradually",
        "Encourage group activities",
        "Maintain regular progress monitoring",
        "Provide positive feedback"
      ],
      cardColor: "border-blue-500/70",
      delay: "0.5s"
    },
    {
      id: 3,
      range: "Average Performance (70-79%)",
      icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
      status: "Needs Enhancement",
      actions: [
        "Implement targeted study plans",
        "Increase interactive learning activities",
        "Schedule regular progress reviews",
        "Enhance parent communication",
        "Provide additional practice materials"
      ],
      cardColor: "border-yellow-500/70",
      delay: "1s"
    },
    {
      id: 4,
      range: "Below Average (<70%)",
      icon: <AlertTriangle className="w-6 h-6 text-blue-400" />,
      status: "Needs Intervention",
      actions: [
        "Implement immediate intervention strategies",
        "Schedule parent-teacher meetings",
        "Provide remedial support",
        "Develop personalized improvement plans",
        "Increase one-on-one attention"
      ],
      cardColor: "border-red-500/70",
      delay: "1.5s"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <style>{floatingKeyframes}</style>
      
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Recommended Actions Based on Performance Levels
      </h2>

      <FloatingCard delay="0s">
        <div className="bg-gray-800/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-gray-700/50 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Target className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-400">Performance Guidelines</h3>
          </div>
          <p className="text-gray-300 mb-4">
            These guidelines provide general recommendations for different performance levels. Actions should be adapted based on individual circumstances and available resources.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <BookOpen className="w-4 h-4" />
            <span>Updated for current academic term</span>
          </div>
        </div>
      </FloatingCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {performanceCategories.map((category) => (
          <FloatingCard key={category.id} delay={category.delay}>
            <div 
              className={`bg-gray-800/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 border ${category.cardColor}`}
            >
              <div className="flex items-center space-x-4 mb-4">
                {category.icon}
                <div>
                  <h3 className="text-lg font-semibold text-blue-400">{category.range}</h3>
                  <p className="text-sm text-gray-400">{category.status}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {category.actions.map((action, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-300">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FloatingCard>
        ))}
      </div>
    </div>
  );
};

export default GeneralActions;