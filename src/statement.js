function usd(thisAmount) {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;
  const result = format((thisAmount / 100));
  return result;
}


function statement(invoice, plays) {
  return printStatementTxt(invoice, plays);
}


function printStatementTxt(invoice, plays) {
  let volumeCredits = 0;
  let totalAmount = getTotalAmount(invoice, plays);
  let result = `Statement for ${invoice.customer}\n`;
  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    let thisAmount = getThisAmount(play, performance);
    volumeCredits = getVolumeCredits(volumeCredits, performance, play);
    result += ` ${play.name}: ${usd(thisAmount)} (${performance.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits \n`;
  return result;
}

function getTotalAmount(invoice, plays) {
  let totalAmount = 0;
  for (let performance of invoice.performances) {
    const play = plays[performance.playID];
    totalAmount += getThisAmount(play, performance);
  }
  return totalAmount;
}

function getVolumeCredits(volumeCredits, performance, play) {
  volumeCredits += Math.max(performance.audience - 30, 0);
  if ('comedy' === play.type)
    volumeCredits += Math.floor(performance.audience / 5);
  return volumeCredits;
}

function getThisAmount(play, perf) {
  let thisAmount = 0;
  switch (play.type) {
    case 'tragedy':
      thisAmount = getTragedyThisAmount(perf);
      break;
    case 'comedy':
      thisAmount = getComedyThisAmount(perf);
      break;
    default:
      throw new Error(`unknown type: ${play.type}`);
  }
  return thisAmount;
}

module.exports = {
  statement,
};

function getComedyThisAmount(perf) {
  let thisAmount = 30000;
  if (perf.audience > 20) {
    thisAmount += 10000 + 500 * (perf.audience - 20);
  }
  thisAmount += 300 * perf.audience;
  return thisAmount;
}

function getTragedyThisAmount(perf) {
  let thisAmount = 40000;
  if (perf.audience > 30) {
    thisAmount += 1000 * (perf.audience - 30);
  }
  return thisAmount;
}
