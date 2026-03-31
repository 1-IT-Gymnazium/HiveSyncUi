const getLongestMember: (data: unknown[]) => number = (data) => data.reduce<number>((prev, currentItem) => {
  if (Array.isArray(currentItem) && currentItem.length > prev) {
    return currentItem.length;
  }
  return prev;
}, 1);

export default getLongestMember;
