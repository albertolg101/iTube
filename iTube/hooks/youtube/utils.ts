export function numberToShortFormat(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)} B`;
  } else if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)} M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)} K`;
  }
  return num.toString();
}

export function toTimeAgoString(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
}

export function toTime(duration: number): string {
  const days = Math.floor(duration / 86400);
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let time = `${minutes}:${seconds}`;
  if (hours > 0) {
    time = `${hours}:${time}`;
  }
  if (days > 0) {
    time = `${days}:${time}`;
  }

  return time;
}
