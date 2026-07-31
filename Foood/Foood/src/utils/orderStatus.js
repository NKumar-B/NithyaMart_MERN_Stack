export const STATUS_FLOW = ['Pending', 'Preparing', 'Ready', 'Completed'];

export function nextStatus(current) {
  const idx = STATUS_FLOW.indexOf(current);
  if (idx === -1 || idx === STATUS_FLOW.length - 1) return current;
  return STATUS_FLOW[idx + 1];
}

export function statusClass(status) {
  switch (status) {
    case 'Pending':
      return 'status-pending';
    case 'Preparing':
      return 'status-preparing';
    case 'Ready':
      return 'status-ready';
    case 'Completed':
      return 'status-completed';
    default:
      return '';
  }
}

export default STATUS_FLOW;
