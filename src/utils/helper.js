export function debounce(fn, delay) {
  let lastTime = null;
  return (args) => {
    if (!lastTime) {
      fn(args);
      lastTime = new Date().getTime();
    } else {
      const now = new Date().getTime();
      const delayed = now - lastTime;
      if (delayed / 1000 > delay) {
        fn(args);
        lastTime = new Date().getTime();
      }
    }
  };
}
