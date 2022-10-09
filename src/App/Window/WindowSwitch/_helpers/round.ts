function round(value: number, maximumFractionDigits = 20) {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits }).format(
    value
  );
}

export default round;
