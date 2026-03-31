const timeToMinutes = (time: string, start: number) => {
  const [hours, minutes] = time.split(":").map(Number);

  const hoursToMinutes = !Number.isNaN(hours) ? hours < start ? (hours + 24) * 60 : hours * 60 : 0;
  return !Number.isNaN(minutes) ? hoursToMinutes + minutes : hoursToMinutes;
};

export default timeToMinutes;
