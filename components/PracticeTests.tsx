
import React from 'react';
import { MOCK_QUESTIONS } from '../constants';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, ChevronRight, RefreshCw, Trophy, Clock, AlertCircle } from 'lucide-react';

const PracticeTests: React.FC = () => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isAnswered, setIsAnswered] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes for quick test

  const currentQuestion = MOCK_QUESTIONS[currentIdx];

  React.useEffect(() => {
    if (isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < MOCK_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      saveProgress();
      setIsFinished(true);
    }
  };

  const saveProgress = () => {
    const existing = localStorage.getItem('k53_stats');
    const stats = existing ? JSON.parse(existing) : { signs: '12/120', tests: '0', time: '0h', score: '0%' };
    
    const totalTests = parseInt(stats.tests) + 1;
    const currentScore = Math.round((score / MOCK_QUESTIONS.length) * 100);
    const avgScore = Math.round((parseInt(stats.score) + currentScore) / (totalTests > 1 ? 2 : 1));

    localStorage.setItem('k53_stats', JSON.stringify({
      ...stats,
      tests: totalTests.toString(),
      score: `${avgScore}%`
    }));
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setTimeLeft(600);
  };

  if (isFinished) {
    const passRate = (score / MOCK_QUESTIONS.length) * 100;
    const isPassed = passRate >= 80; // Standard K53 pass mark is high

    return (
      <div className="max-w-xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 text-center shadow-xl animate-scaleUp">
        <div className={`inline-flex p-6 rounded-full mb-8 ${isPassed ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'}`}>
          {isPassed ? <Trophy size={64} /> : <AlertCircle size={64} />}
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
          {isPassed ? 'Congratulations!' : 'Almost There!'}
        </h2>
        <p className="text-slate-500 mb-8 px-4">
          You answered {score} out of {MOCK_QUESTIONS.length} correctly. 
          {isPassed ? " You've shown excellent knowledge of the rules." : " Review the rules and try again to improve your score."}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Final Score</p>
            <p className="text-3xl font-black text-slate-800">{Math.round(passRate)}%</p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Test Result</p>
            <p className={`text-2xl font-black ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {isPassed ? 'PASSED' : 'FAILED'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={handleReset}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-blue-100"
          >
            <RefreshCw size={20} />
            <span>Try Another Test</span>
          </button>
          <button className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-colors">
            Review Answers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                K53 {currentQuestion.category} Test
             </span>
             <div className="flex items-center text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                <Clock size={12} className="mr-1" />
                {formatTime(timeLeft)}
             </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Practice Exam</h2>
        </div>
        <div className="text-right w-full md:w-auto bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex md:block justify-between items-center">
          <span className="text-xs font-bold text-slate-400 md:block">Question Progress</span>
          <p className="font-black text-blue-600 text-lg">{currentIdx + 1} <span className="text-slate-200">/</span> {MOCK_QUESTIONS.length}</p>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-500 ease-out" 
          style={{ width: `${((currentIdx + 1) / MOCK_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 pointer-events-none"></div>

        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-10 leading-snug relative z-10">
          {currentQuestion.question}
        </h3>

        <div className="space-y-4">
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              className={`
                w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group
                ${selectedOption === i 
                  ? (isAnswered 
                      ? (i === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800')
                      : 'bg-blue-50 border-blue-600 text-blue-800 shadow-md translate-x-1')
                  : (isAnswered && i === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500 text-green-800' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50')}
              `}
            >
              <div className="flex items-center space-x-4">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm
                    ${selectedOption === i ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
                 `}>
                    {String.fromCharCode(65 + i)}
                 </div>
                 <span className="font-semibold">{option}</span>
              </div>
              {isAnswered && (
                i === currentQuestion.correctAnswer 
                  ? <div className="bg-green-500 text-white p-1 rounded-full"><CheckCircle2 size={16} /></div>
                  : (selectedOption === i && <div className="bg-red-500 text-white p-1 rounded-full"><XCircle size={16} /></div>)
              )}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 animate-fadeIn">
            <h4 className="text-xs font-black text-blue-600 mb-2 uppercase tracking-widest flex items-center">
              <Info size={14} className="mr-1.5" /> Instructor's Note
            </h4>
            <p className="text-sm font-medium text-slate-700 leading-relaxed">
               {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-slate-100">
          {!isAnswered ? (
            <button
              onClick={handleCheck}
              disabled={selectedOption === null}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold disabled:opacity-50 hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-100"
            >
              Verify Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center space-x-2 shadow-lg shadow-blue-100"
            >
              <span className="text-lg">{currentIdx === MOCK_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}</span>
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Info: React.FC<{className?: string, size?: number}> = ({className, size = 16}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export default PracticeTests;
