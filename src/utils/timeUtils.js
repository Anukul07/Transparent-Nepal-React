export const calculateTimeAgo = (updatedAt) => {
  const currentTime = new Date();
  const updatedTime = new Date(updatedAt);

  const diffInMilliseconds = currentTime - updatedTime; // Time difference in milliseconds
  const diffInSeconds = diffInMilliseconds / 1000; // Convert to seconds
  const diffInMinutes = diffInSeconds / 60; // Convert to minutes
  const diffInHours = diffInMinutes / 60; // Convert to hours
  const diffInDays = diffInHours / 24; // Convert to days

  if (diffInDays >= 1) {
    return `${Math.floor(diffInDays)} day${
      Math.floor(diffInDays) > 1 ? "s" : ""
    }`;
  } else if (diffInHours >= 1) {
    return `${Math.floor(diffInHours)} hour${
      Math.floor(diffInHours) > 1 ? "s" : ""
    }`;
  } else if (diffInMinutes >= 1) {
    return `${Math.floor(diffInMinutes)} minute${
      Math.floor(diffInMinutes) > 1 ? "s" : ""
    }`;
  } else {
    return `Just now`;
  }
};
