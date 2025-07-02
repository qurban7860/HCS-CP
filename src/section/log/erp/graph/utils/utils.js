export const processGraphData = (logsGraphData, timePeriod, dateFrom, dateTo, skipZeroValues, unitType) => {
  if (!logsGraphData || logsGraphData.length === 0) return null;

  const dataMap = new Map();

  const convert = (value) => {
    if (unitType === 'Imperial') {
      return value / 25.4; 
    }
    return value / 1000; 
  };

  logsGraphData.forEach((item) => {
    const id =
      timePeriod === 'Monthly' ? item._id.replace(/^Sep /, 'Sept ') : item._id;

    dataMap.set(id, {
      ...item,
      componentLength: convert(item?.componentLength || 0),
      waste: convert(item?.waste || 0)
    });
  });

  const labels = [];
  const current = new Date(dateFrom);
  const end = new Date(dateTo);
  const pad = (n) => n.toString().padStart(2, '0');

  const addLabel = (label) => {
    if (!labels.includes(label)) labels.push(label);
  };

  switch (timePeriod) {
    case 'Hourly':
      current.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      while (current <= end) {
        const label = `${pad(current.getMonth() + 1)}/${pad(current.getDate())} ${pad(current.getHours())}`;
        if (dataMap.has(label) || !skipZeroValues) addLabel(label);
        current.setHours(current.getHours() + 1);
      }
      break;

    case 'Daily':
      current.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);

      while (current <= end) {
        const label = `${pad(current.getDate())}/${pad(current.getMonth() + 1)}`;
        if (dataMap.has(label) || !skipZeroValues) addLabel(label);
        current.setDate(current.getDate() + 1);
      }
      break;

    case 'Monthly':
      current.setDate(1);
      end.setDate(1);

      while (current <= end) {
        const label = `${current.toLocaleString('default', { month: 'short' })} ${String(current.getFullYear()).slice(-2)}`;
        if (dataMap.has(label) || !skipZeroValues) addLabel(label);
        current.setMonth(current.getMonth() + 1);
      }
      break;

    case 'Quarterly':
      current.setMonth(Math.floor(current.getMonth() / 3) * 3, 1);
      current.setHours(0, 0, 0, 0);

      while (current <= end) {
        const year = current.getFullYear();
        const quarter = Math.floor(current.getMonth() / 3) + 1;
        const label = `${year}-Q${quarter}`;
        if (dataMap.has(label) || !skipZeroValues) addLabel(label);
        current.setMonth(current.getMonth() + 3);
      }
      break;

    case 'Yearly':
      current.setMonth(0, 1);
      current.setHours(0, 0, 0, 0);

      while (current <= end) {
        const label = `${current.getFullYear()}`;
        if (dataMap.has(label) || !skipZeroValues) addLabel(label);
        current.setFullYear(current.getFullYear() + 1);
      }
      break;

    default:
      return null;
  }

  const producedLength = labels.map((label) => dataMap.get(label)?.componentLength || 0);
  const wasteLength = labels.map((label) => dataMap.get(label)?.waste || 0);
  const unitLabel = unitType === 'Imperial' ? 'in' : 'm';

  return {
    categories: labels,
    series: [
      { name: `Produced Length (${unitLabel})`, data: producedLength },
      { name: `Waste Length (${unitLabel})`, data: wasteLength },
    ],
  };
};