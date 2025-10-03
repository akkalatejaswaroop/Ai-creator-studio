
import React from 'react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up">
      <div className="bg-gradient-to-br from-[#161B22] to-[#0D1117] rounded-2xl border border-white/10 shadow-2xl max-w-lg w-full p-8 text-center">
        <WelcomeIcon />
        <h2 className="text-3xl font-bold text-white mb-4">Welcome to IntelliForge Ai!</h2>
        <p className="text-gray-400 mb-6">
          This is your creative co-pilot, designed to help you bring ideas to life, faster. Whether you're writing, coding, or creating, there's a specialized tool waiting for you. Here's how to dive in:
        </p>
        <ul className="text-left space-y-3 text-gray-300 mb-8">
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">&#10148;</span>
            <span><strong className="font-semibold text-white">Search Anything:</strong> Use the search bar on the dashboard to instantly find the perfect tool for your task.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">&#10148;</span>
            <span><strong className="font-semibold text-white">Explore Tools:</strong> Discover powerful capabilities in the "Featured Tools" section or browse the full library using the sidebar.</span>
          </li>
           <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">&#10148;</span>
            <span><strong className="font-semibold text-white">Check Your History:</strong> Your recent generations are automatically saved. Click the "History" tab in the sidebar to review and reuse your past creations.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">&#10148;</span>
            <span><strong className="font-semibold text-white">Chat with Ricky:</strong> Need help? Our AI assistant, Ricky, is in the bottom-right corner, ready to answer your questions about the app.</span>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="bg-cyan-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-cyan-700 transition-all duration-300 w-full"
        >
          Let's Get Started!
        </button>
      </div>
    </div>
  );
};