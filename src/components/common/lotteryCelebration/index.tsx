"use client"; // This makes the component a Next.js Client Component

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

interface LotteryCelebrationProps {
  winMessage?: string;
  confettiPieces?: number;
}

const LotteryCelebration: React.FC<LotteryCelebrationProps> = ({
  winMessage = "You won the lottery!",
  confettiPieces = 500,
}) => {
  const [isWinner, setIsWinner] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWinner(true);
    }, 3000);

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-200 relative">
      {isWinner && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={confettiPieces}
          recycle={false}
        />
      )}

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-yellow-500">
          {isWinner ? "Congratulations!" : "Checking results..."}
        </h1>
        {isWinner ? (
          <p className="mt-4 text-lg text-green-600">{winMessage}</p>
        ) : (
          <p className="mt-4 text-lg text-gray-500">Waiting for results...</p>
        )}
      </div>

      {isWinner && (
        <div className="mt-6 animate-bounce bg-yellow-500 text-white py-3 px-6 rounded-full text-lg">
          Claim Your Prize!
        </div>
      )}
    </div>
  );
};

export default LotteryCelebration;
