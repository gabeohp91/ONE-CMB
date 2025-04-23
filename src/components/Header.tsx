import React from 'react';
import { Bell, MessageSquare} from 'lucide-react';
import { useSidebar } from './ui/sidebar';

interface HeaderProps {
  employeeInfo: {
    name: string;
    avatar: string;
  } | undefined;
  chatExpanded: boolean;
  setChatExpanded: (value: boolean) => void;
}

const Header = ({ employeeInfo, setChatExpanded, chatExpanded }: HeaderProps) => {

  return (
    <header className='bg-white shadow-sm border-b border-gray-200'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'></div>
          <div className='flex items-center space-x-4'>
          <button 
            onClick={() => setChatExpanded(!chatExpanded)}
            className={`p-2 rounded-full ${
              chatExpanded ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
            title={chatExpanded ? 'Đóng trợ lý AI' : 'Mở trợ lý AI'}
          >
              <MessageSquare size={20} />
            </button>
            <button
              className='relative p-2 text-gray-500 rounded-full hover:bg-gray-100'
            >
              <Bell size={20} />
              <span className='absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full'></span>
            </button>
            <div className='ml-3 relative'>
              {employeeInfo && (
                <div className='text-sm font-medium text-gray-700'>
                  {employeeInfo.name}
                </div>
              )}
            </div>
            {employeeInfo && (
              <div className='h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium'>
                {employeeInfo.avatar}
              </div>
            )}
          </div>
        </div>
      </div >
    </header>
  );
};

export default Header;