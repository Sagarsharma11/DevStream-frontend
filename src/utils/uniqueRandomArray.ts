export const uniqueRandomArray = (arr: any) => {
    const set = new Set();
    const len = arr.length;
    while (set.size < len) {
      const random = Math.floor(Math.random() * len);
      set.add(arr[random])
    }

    return Array.from(set)
  }