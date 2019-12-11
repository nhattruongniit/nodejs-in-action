const canadianDollar = 0.91;

function roundTwo(amount) {
  return Math.round(amount * 100) / 100;
}

export const canadianToUS = canadian => roundTwo(canadian * canadianDollar);

export const USToCanadian = us => roundTwo(us / canadianDollar);
