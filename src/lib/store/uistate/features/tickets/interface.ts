export interface TicketsUIState {
    selectedNumbers: number[];
    currentPage: number;
    timeLeft: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };
    setSelectedNumbers: (numbers: number[]) => void;
    setCurrentPage: (page: number) => void;
    setTimeLeft: (time: { days: number; hours: number; minutes: number; seconds: number }) => void;
  }
  