import { navigateTo } from '@devvit/web/client';
import { useEffect, useState } from 'react';

/* -------------------- DAILY QUESTIONS -------------------- */
const QUESTIONS = [
  {
    text: 'Have you ever upvoted a post just because everyone else did?',
    jokes: {
      yes: 'Hive mind detected 🐝',
      no: 'Independent thinker alert 🧠',
      depends: 'Peer pressure loading...',
    },
  },
  {
    text: 'Have you opened Reddit to study and ended up scrolling for 2 hours?',
    jokes: {
      yes: 'Productivity left the chat 📉',
      no: 'Teach us your ways, sensei 🙏',
      depends: 'Denial is a powerful thing.',
    },
  },
  {
    text: 'Have you ever joined a subreddit just to understand one post?',
    jokes: {
      yes: 'Commitment unlocked 🔓',
      no: 'Casual scrolling energy.',
      depends: 'Curiosity comes and goes.',
    },
  },
  {
    text: 'Have you ever trusted a comment more than the actual source?',
    jokes: {
      yes: 'Upvoted truth syndrome.',
      no: 'Fact-checker detected.',
      depends: 'Context is everything.',
    },
  },
  {
    text: 'Have you ever refreshed Reddit hoping for new posts?',
    jokes: {
      yes: 'Dopamine farming 🚜',
      no: 'Healthy boundaries!',
      depends: 'Sometimes it works.',
    },
  },
  {
    text: 'Have you ever read a thread you didn’t even care about?',
    jokes: {
      yes: 'Still read till the end though.',
      no: 'You escaped the trap.',
      depends: 'Accidental interest happens.',
    },
  },
  {
    text: 'Have you ever learned something useful from Reddit?',
    jokes: {
      yes: 'Internet university 🎓',
      no: 'Wrong sub maybe?',
      depends: 'Rare but possible.',
    },
  },
  {
    text: 'Have you ever checked comments to see if others agree with you?',
    jokes: {
      yes: 'Validation achieved.',
      no: 'Strong self-confidence.',
      depends: 'Mood-based behavior.',
    },
  },
  {
    text: 'Have you ever upvoted a comment that roasted someone?',
    jokes: {
      yes: 'Savage appreciation.',
      no: 'Mercy level 100.',
      depends: 'Depends on the roast.',
    },
  },
  {
    text: 'Have you ever scrolled Reddit instead of replying to messages?',
    jokes: {
      yes: 'Social battery in power-saving mode.',
      no: 'Communication champ.',
      depends: 'Notifications ignored.',
    },
  },
  {
    text: 'Have you ever Googled something and ended up on Reddit?',
    jokes: {
      yes: 'Correct destination.',
      no: 'Missed the shortcut.',
      depends: 'Google knows.',
    },
  },
  {
    text: 'Have you ever felt personally attacked by a Reddit post?',
    jokes: {
      yes: 'Why is this so accurate?',
      no: 'Emotional armor on.',
      depends: 'Some posts hit hard.',
    },
  },  
  {
    text: 'Have you saved a post knowing you’ll never read it again?',
    jokes: {
      yes: 'Saved = emotionally processed.',
      no: 'You are too powerful.',
      depends: 'Hope is doing the heavy lifting.',
    },
  },
  {
    text: 'Have you read comments before the actual post?',
    jokes: {
      yes: 'Plot twist enjoyer 🎭',
      no: 'Rare species spotted.',
      depends: 'Comments are tempting.',
    },
  },
  {
    text: 'Have you typed a long reply and then deleted it?',
    jokes: {
      yes: 'Inner peace achieved ☮️',
      no: 'Brave keyboard warrior.',
      depends: 'Self-control buffering...',
    },
  },
];

/* -------------------- HELPERS -------------------- */
const getTodayKey = () => new Date().toDateString();

const getDailyQuestion = () => {
  const index = new Date().getDate() % QUESTIONS.length;
  return QUESTIONS[index];
};

/* -------------------- APP -------------------- */
export const App = () => {
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState<'yes' | 'no' | 'depends' | null>(null);
  const [streak, setStreak] = useState(0);
  const [topComment] = useState(
    '“Honestly, I feel personally attacked by this question.”'
  );

  const todayKey = getTodayKey();
  const question = getDailyQuestion();

  /* -------------------- STREAK LOGIC -------------------- */
  useEffect(() => {
    const lastPlayed = localStorage.getItem('lastPlayed');
    const savedStreak = Number(localStorage.getItem('streak') || 0);

    if (lastPlayed === todayKey) {
      setAnswered(true);
      setStreak(savedStreak);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastPlayed === yesterday.toDateString()) {
        setStreak(savedStreak);
      } else {
        setStreak(0);
      }
    }
  }, []);

  const handleAnswer = (value: 'yes' | 'no' | 'depends') => {
    if (answered) return;

    const newStreak = streak + 1;
    setAnswer(value);
    setAnswered(true);
    setStreak(newStreak);

    localStorage.setItem('lastPlayed', todayKey);
    localStorage.setItem('streak', String(newStreak));
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4 text-center">
      <img src="/snoo.png" alt="Snoo" className="w-24 mx-auto" />

      {/* CONTEXT INTRO */}
      <p className="text-sm text-gray-500 italic">
        Today’s question is based on extremely common Reddit behavior.
      </p>

      {/* QUESTION */}
      <h1 className="text-2xl font-bold max-w-xl">
        {question.text}
      </h1>

      {/* OPTIONS */}
      <div className="flex gap-4 mt-2">
        {(['yes', 'no', 'depends'] as const).map((opt) => (
          <button
            key={opt}
            disabled={answered}
            onClick={() => handleAnswer(opt)}
            className={`px-5 py-2 rounded-full text-white transition ${
              answered
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#d93900] hover:opacity-90'
            }`}
          >
            {opt.toUpperCase()}
          </button>
        ))}
      </div>

      {/* JOKE RESULT */}
      {answered && answer && (
        <div className="mt-4 text-lg font-medium">
          {question.jokes[answer]}
        </div>
      )}

      {/* DAILY STREAK */}
      {answered && (
        <div className="mt-2 text-sm text-gray-600">
          🔥 You’ve played <b>{streak}</b> day{streak > 1 ? 's' : ''} in a row
        </div>
      )}

      {/* TOP COMMENT */}
      <div className="mt-6 max-w-md bg-gray-100 rounded-lg p-4 text-sm">
        <div className="font-semibold mb-1">🏆 Top comment today</div>
        <div className="italic text-gray-700">{topComment}</div>
      </div>

      {/* FOOTER */}
      <footer className="mt-8 flex gap-3 text-xs text-gray-500">
        <button onClick={() => navigateTo('https://developers.reddit.com/docs')}>
          Docs
        </button>
        <span>|</span>
        <button onClick={() => navigateTo('https://www.reddit.com/r/Devvit')}>
          r/Devvit
        </button>
        <span>|</span>
        <button onClick={() => navigateTo('https://discord.com/invite/R7yu2wh9Qz')}>
          Discord
        </button>
      </footer>
    </div>
  );
};
