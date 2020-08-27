function usd(thisAmount) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  const result =format((thisAmount/100));
  return  result;
}


function statement (invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisAmount = 0;
    thisAmount = getThisAmount(play, thisAmount, performance);
    volumeCredits += Math.max(performance.audience - 30, 0);
    if ('comedy' === play.type) volumeCredits += Math.floor(performance.audience / 5);
    result += ` ${play.name}: ${usd(thisAmount)} (${performance.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}


function getThisAmount(play, thisAmount, perf) {
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case 'comedy':
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

module.exports = {
  statement,
};