"use client";
import React, { useEffect } from "react";
import { Button, Card, Pagination, Tooltip } from "antd";
import dayjs from "dayjs";
import "./style.css";

import { AnnouncementDetailProps } from "@/types/features/announcment";
import TicketCard from "./ticketCard";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useGetAnnouncment } from "@/lib/store/server/features/announcment/queries";
import { useUIState } from "@/lib/store/uistate/features/tickets/useStore";

const AnnouncementDetail: React.FC<AnnouncementDetailProps> = ({ params }) => {
  const { data: announcement } = useGetAnnouncment(params.id);

  const selectedNumbers = useUIState((state) => state.selectedNumbers);
  const currentPage = useUIState((state) => state.currentPage);
  const timeLeft = useUIState((state) => state.timeLeft);
  const setSelectedNumbers = useUIState((state) => state.setSelectedNumbers);
  const setCurrentPage = useUIState((state) => state.setCurrentPage);
  const setTimeLeft = useUIState((state) => state.setTimeLeft);

  const pageSize = 20;

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!announcement?.endDate || !announcement?.endTime) return;

      const endDateTime = dayjs(
        `${announcement.endDate}T${announcement.endTime}`
      );
      const now = dayjs();
      const difference = endDateTime.diff(now);

      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 12),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      setTimeLeft(timeLeft);
    };
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [announcement, setTimeLeft]);

  const handleNumberClick = (number: number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTickets = announcement?.tickets?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="container mx-auto py-4 dark:bg-dark dark:text-white min-h-screen">
      <Card className="mb-4 bg-dark border border-gray-700">
        <h2 className="text-2xl font-bold">{announcement?.name}</h2>
        <p>End Date: {announcement?.endDate}</p>
        <p>End Time: {announcement?.endTime}</p>
        <p>Number of Tickets: {announcement?.numberOfTickets}</p>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <div className="flex flex-col items-center bg-gray-900 rounded-md px-2 py-1 sm:px-3 sm:py-2">
              <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm text-gray-300">Day</span>
            </div>
            <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
              :
            </span>
            <div className="flex flex-col items-center bg-gray-900 rounded-md px-2 py-1 sm:px-3 sm:py-2">
              <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm text-gray-300">Hour</span>
            </div>
            <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
              :
            </span>
            <div className="flex flex-col items-center bg-gray-900 rounded-md px-2 py-1 sm:px-3 sm:py-2">
              <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm text-gray-300">Min</span>
            </div>
            <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
              :
            </span>
            <div className="flex flex-col items-center bg-gray-900 rounded-md px-2 py-1 sm:px-3 sm:py-2">
              <span className="text-lg sm:text-2xl lg:text-4xl font-bold text-white">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-xs sm:text-sm text-gray-300">Sec</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-xl text-black font-bold my-8">Tickets</h3>
        <Tooltip title="Active tickets are clickable, taken tickets are shown in purple and are not clickable.">
          <Button type="text" icon={<AiOutlineQuestionCircle size={24} />} />
        </Tooltip>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-10 gap-4">
        {paginatedTickets?.map((ticket, i) => (
          <TicketCard
            key={i}
            ticket={ticket}
            handleNumberClick={() => handleNumberClick(Number(ticket.number))}
            announcementId={params.id}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8 w-full">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={announcement?.tickets?.length}
          onChange={handlePageChange}
          className="bg-white text-black dark:bg-dark dark:text-white"
        />
      </div>
    </div>
  );
};

export default AnnouncementDetail;
