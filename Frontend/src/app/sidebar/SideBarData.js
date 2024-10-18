import { FaInbox } from 'react-icons/fa';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';
import { PiCoinsThin } from 'react-icons/pi';
import { SiSimpleanalytics } from 'react-icons/si';

export const SideBarData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IoHomeOutline />
  },
  {
    title: 'Budget',
    path: '/budget',
    icon: <PiCoinsThin />
  },
  {
    title: 'Categories',
    path: '/categories',
    icon: <FaInbox />
  },
  {
    title: 'Analytics',
    path: '/analytics',
    icon: <SiSimpleanalytics />,
    iconClosed: <RiArrowDownSFill />,
    iconOpened: <RiArrowUpSFill />,
    subNav: [
     
      { title: 'Income', 
        path: '/income' },

    { title: 'Expenses', 
      path: '/expenses' },
      { title: 'Inc vs Exp', 
        path: '/IncxExp' ,
      }
      
    ]
  }
];
