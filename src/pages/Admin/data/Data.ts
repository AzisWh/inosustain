import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineArrowUp,
} from 'react-icons/hi';

export const statisticsCardsData = [
  {
    color: 'blue',
    title: 'Total Users',
    amount: '2,300',
    footer: {
      color: 'text-green-500',
      value: '+3%',
      label: 'than last month',
    },
  },
  {
    color: 'pink',
    title: 'New Articles',
    amount: '150',
    footer: {
      color: 'text-green-500',
      value: '+5%',
      label: 'than last month',
    },
  },
  {
    color: 'green',
    title: 'Revenue',
    amount: '$34,000',
    footer: {
      color: 'text-red-500',
      value: '-2%',
      label: 'than last month',
    },
  },
  {
    color: 'orange',
    title: 'Active Projects',
    amount: '45',
    footer: {
      color: 'text-green-500',
      value: '+1%',
      label: 'than last month',
    },
  },
];

export const statisticsChartsData = [
  {
    title: 'User Growth',
    footer: 'Updated 2 hours ago',
  },
  {
    title: 'Article Views',
    footer: 'Updated 1 hour ago',
  },
  {
    title: 'Revenue Trend',
    footer: 'Updated 30 minutes ago',
  },
];

export const projectsTableData = [
  {
    img: 'https://via.placeholder.com/40',
    name: 'Project Alpha',
    members: [
      { img: 'https://via.placeholder.com/30', name: 'John Doe' },
      { img: 'https://via.placeholder.com/30', name: 'Jane Smith' },
    ],
    budget: '$14,000',
    completion: 60,
  },
  {
    img: 'https://via.placeholder.com/40',
    name: 'Project Beta',
    members: [
      { img: 'https://via.placeholder.com/30', name: 'Alice Brown' },
      { img: 'https://via.placeholder.com/30', name: 'Bob Johnson' },
    ],
    budget: '$20,000',
    completion: 80,
  },
  {
    img: 'https://via.placeholder.com/40',
    name: 'Project Gamma',
    members: [{ img: 'https://via.placeholder.com/30', name: 'Charlie Davis' }],
    budget: '$8,000',
    completion: 100,
  },
];

export const ordersOverviewData = [
  {
    icon: HiOutlineCheckCircle,
    color: 'text-green-500',
    title: 'Order #001 Completed',
    description: 'Order has been successfully completed.',
  },
  {
    icon: HiOutlineClock,
    color: 'text-yellow-500',
    title: 'Order #002 Pending',
    description: 'Order is awaiting payment.',
  },
  {
    icon: HiOutlineArrowUp,
    color: 'text-blue-500',
    title: 'Order #003 Shipped',
    description: 'Order has been shipped to the customer.',
  },
];
