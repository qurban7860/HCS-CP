

// function to get the earliest date from graph data
export const getEarliestDateFromGraphData = (data, timePeriod, dateFrom, dateTo) => {
  if (data.length === 0) return new Date(dateFrom);

  let minDate = new Date(dateTo);

  data.forEach((item) => {
    let itemDate;
    if (timePeriod === 'Hourly') {
      itemDate = parseHourlyDate(item._id, dateFrom.getFullYear());
    } else if (timePeriod === 'Daily') {
      const [day, month] = item._id.split('/');
      itemDate = new Date(`${dateFrom.getFullYear()}-${month}-${day}`);
    } else if (timePeriod === 'Monthly') {
      itemDate = new Date(item._id.replace(/(\w+)\s(\d+)/, (_, m, y) => `${m} 1, 20${y}`));
    } else if (timePeriod === 'Quarterly') {
      const [year, quarterStr] = item._id.split('-Q');
      const month = (parseInt(quarterStr, 10) - 1) * 3;
      itemDate = new Date(parseInt(year, 10), month);
    } else if (timePeriod === 'Yearly') {
      itemDate = new Date(parseInt(item._id, 10), 0);
    } else {
      itemDate = new Date(dateFrom);
    }
    if (itemDate && !Number.isNaN(itemDate) && itemDate < minDate) {
      minDate = itemDate;
    }
  });

  return minDate;
};

// function to parse hourly date
export const parseHourlyDate = (id, baseYear) => {
  try {
    const [monthDay, hourStr] = id.split(' ');
    if (!monthDay || !hourStr) return null;

    const [month, day] = monthDay.split('/');
    if (!month || !day) return null;

    const hour = parseInt(hourStr, 10);
    if (Number.isNaN(hour)) return null;

    return new Date(`${baseYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${hour.toString().padStart(2, '0')}:00:00`);
  } catch (error) {
    return null;
  }
};

// function to process graph data
export const processGraphData = (rawData, timePeriod, dateFrom, dateTo, skipZeroValues) => {
  if (!rawData || rawData.length === 0) return null;

  const convertedDataToMeters = rawData.map(item => ({
    ...item,
    componentLength: item.componentLength / 1000,
    waste: item.waste / 1000,
    _id: timePeriod === 'Monthly' ? item._id.replace(/^Sep /, 'Sept ') : item._id,
  }));

  const dataMap = new Map();
  convertedDataToMeters.forEach((item) => dataMap.set(item._id, item));

  const labels = [];
  let startDate = new Date(dateFrom);
  const effectiveEndDate = new Date(dateTo);

  if (!skipZeroValues && convertedDataToMeters.length > 0) {
    startDate = getEarliestDateFromGraphData(convertedDataToMeters, timePeriod, dateFrom, dateTo);
  }

  const addLabel = (label) => {
    if (!labels.includes(label)) labels.push(label);
  };

  if (timePeriod === 'Hourly') {
    const current = new Date(startDate);
    effectiveEndDate.setHours(23, 59, 59, 999);
    let count = 0;
    while (current <= effectiveEndDate && count < 24) {
      const label = `${(current.getMonth() + 1).toString().padStart(2, '0')}/${current.getDate().toString().padStart(2, '0')} ${current.getHours().toString().padStart(2, '0')}`;
      if (dataMap.has(label) || !skipZeroValues) {
        addLabel(label);
        count += 1;
      }
      current.setHours(current.getHours() + 1);
    }
  } else if (timePeriod === 'Daily') {
    const current = new Date(startDate);
    let count = 0;
    while (current <= effectiveEndDate && count < 30) {
      const label = `${current.getDate().toString().padStart(2, '0')}/${(current.getMonth() + 1).toString().padStart(2, '0')}`;
      if (dataMap.has(label) || !skipZeroValues) {
        addLabel(label);
        count += 1;
      }
      current.setDate(current.getDate() + 1);
    }
  } else if (timePeriod === 'Monthly') {
    const current = new Date(startDate);
    let count = 0;
    while (current <= effectiveEndDate && count < 12) {
      const label = `${current.toLocaleString('default', { month: 'short' })} ${String(current.getFullYear()).slice(-2)}`;
      if (dataMap.has(label) || !skipZeroValues) {
        addLabel(label);
        count += 1;
      }
      current.setMonth(current.getMonth() + 1);
    }
  } else if (timePeriod === 'Quarterly') {
    const current = new Date(startDate);
    let count = 0;
    while (current <= effectiveEndDate && count < 4) {
      const year = current.getFullYear();
      const quarter = Math.floor(current.getMonth() / 3) + 1;
      const label = `${year}-Q${quarter}`;
      if (dataMap.has(label) || !skipZeroValues) {
        addLabel(label);
        count += 1;
      }
      current.setMonth(current.getMonth() + 3);
    }
  } else if (timePeriod === 'Yearly') {
    const current = new Date(startDate);
    let count = 0;
    while (current <= effectiveEndDate && count < 5) {
      const label = String(current.getFullYear());
      if (dataMap.has(label) || !skipZeroValues) {
        addLabel(label);
        count += 1;
      }
      current.setFullYear(current.getFullYear() + 1);
    }
  } else {
    return null;
  }

  const producedLength = labels.map((label) => dataMap.get(label)?.componentLength || 0);
  const wasteLength = labels.map((label) => dataMap.get(label)?.waste || 0);

  return {
    categories: labels,
    series: [
      { name: 'Produced Length (m)', data: producedLength },
      { name: 'Waste Length (m)', data: wasteLength },
    ],
  };
};