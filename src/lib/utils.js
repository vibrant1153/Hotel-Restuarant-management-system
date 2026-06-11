export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function getRoomTypeLabel(type) {
  const labels = {
    STANDARD: 'Standard',
    DELUXE: 'Deluxe',
    SUITE: 'Suite',
    PRESIDENTIAL: 'Presidential',
  };
  return labels[type] || type;
}

export function getRoomStatusColor(status) {
  const colors = {
    AVAILABLE: 'var(--color-success)',
    OCCUPIED: 'var(--color-warning)',
    MAINTENANCE: 'var(--color-error)',
  };
  return colors[status] || 'var(--color-gray)';
}

export function getFoodCategoryLabel(category) {
  const labels = {
    BREAKFAST: 'Breakfast',
    LUNCH: 'Lunch',
    DINNER: 'Dinner',
    SNACKS: 'Snacks',
    DRINKS: 'Drinks',
  };
  return labels[category] || category;
}

export function getOrderStatusColor(status) {
  const colors = {
    PENDING: '#D4AF37',
    PREPARING: '#3A86FF',
    DELIVERED: '#10B981',
    CANCELLED: '#EF4444',
  };
  return colors[status] || '#A0A7B5';
}

export function truncate(str, length = 100) {
  if (!str) return '';
  return str.length > length ? str.slice(0, length) + '...' : str;
}

export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function generateOccupancyData() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month) => ({
    month,
    occupancy: Math.floor(Math.random() * 40) + 55,
    revenue: Math.floor(Math.random() * 50000) + 80000,
  }));
}
