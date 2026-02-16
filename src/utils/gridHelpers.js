// Grid optimization utilities to prevent layout shifts

export const createStableGrid = (items, minItems = 6) => {
  const filledItems = [...items];

  // Fill empty slots to maintain consistent grid height
  while (filledItems.length < minItems) {
    filledItems.push({
      id: `empty-${filledItems.length}`,
      isEmpty: true
    });
  }

  return filledItems;
};

export const getGridClasses = (itemCount) => {
  const baseClasses = "grid gap-8 min-h-[600px]";

  if (itemCount === 0) {
    return `${baseClasses} grid-cols-1`;
  }

  if (itemCount <= 2) {
    return `${baseClasses} grid-cols-1 md:grid-cols-2`;
  }

  return `${baseClasses} md:grid-cols-2 lg:grid-cols-3`;
};

export const preventLayoutShift = {
  container: {
    minHeight: '600px',
    display: 'grid',
    gap: '2rem'
  },

  // Responsive grid configuration
  responsive: {
    default: 'grid-cols-1',
    md: 'md:grid-cols-2',
    lg: 'lg:grid-cols-3'
  }
};