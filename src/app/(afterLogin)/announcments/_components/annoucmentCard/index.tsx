'use client';
import { Announcement } from '@/types/features/announcment';
import { Card } from 'antd';
import Link from 'next/link';
import React from 'react';

interface AnnouncmentCardProps {
  announcements?: Announcement[];
}

const AnnouncmentCard: React.FC<AnnouncmentCardProps> = ({ announcements }) => {
  return (
    <div className="container mx-auto py-4 grid grid-cols-3 gap-4">
      {announcements?.map((announcement) => (
        <Link
          className="hover:translate-y-1 "
          key={announcement.id}
          href={`/announcments/${announcement.id}`}
        >
          <Card className="mb-4 shadow-sm hover:shadow-lg flex justify-between items-center">
            <div className="">
              <h3 className="text-xl font-bold">{announcement.name}</h3>
              <p>End Date: {announcement.endDate}</p>
            </div>
            <div className=""></div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default AnnouncmentCard;
