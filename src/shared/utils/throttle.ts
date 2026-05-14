export default (func: Function, limit: number) => {
  let inThrottle: boolean = false;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    } else {
      console.log("throttled");
    }
  };
};
