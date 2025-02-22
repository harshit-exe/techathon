import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const BubbleItem = ({ item }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="m-1 w-full"
    >
      <Link href={item.link}>
        <motion.div
          className="flex items-center p-2 rounded-lg bg-blue-100 shadow-md cursor-pointer hover:bg-blue-200 transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
            <Icon icon={item.icon} className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium text-blue-800">{item.name}</span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export function FloatingBubbleMenu({ items }) {
  return (
    <div className="flex flex-col space-y-2 p-2">
      {items.map((item) => (
        <BubbleItem key={item.name} item={item} />
      ))}
    </div>
  );
}
