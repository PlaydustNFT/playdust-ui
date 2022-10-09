const getWindowHash = () => {
  if (typeof window === undefined) {
    return '';
  }

  return window.location.hash;
};

export default getWindowHash;
