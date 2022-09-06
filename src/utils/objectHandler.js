export function objectSort(obj, sortByPriority, sortBySecondary) {
  return Object.keys(obj).sort((a, b) => {
    if (obj[a][sortByPriority].id < obj[b][sortByPriority].id) {
      return -1;
    }
    if (obj[a][sortByPriority].id === obj[b][sortByPriority].id) {
      if (obj[a][sortBySecondary].id < obj[b][sortBySecondary].id) {
        return -1;
      } else {
        return 1;
      }
    }
    if (obj[a][sortByPriority].id > obj[b][sortByPriority].id) {
      return 1;
    }
    return 0;
  }).reduce((result, key) => {
    result[key] = obj[key];
    return result;
  } , {});
}

export function findUniqueAirports(obj) {
  const uniqueAirports = {};
  Object.keys(obj).forEach(key => {
    if (!Object.keys(uniqueAirports).includes(obj[key].departure.id)) {
      uniqueAirports[obj[key].departure.id] = obj[key].departure;
      uniqueAirports[obj[key].departure.id].type = "departure";
    } else {
      if (uniqueAirports[obj[key].departure.id].type === "destination") {
        uniqueAirports[obj[key].departure.id].type = "both";
      }
    }
    if (!Object.keys(uniqueAirports).includes(obj[key].destination.id)) {
      uniqueAirports[obj[key].destination.id] = obj[key].destination;
      uniqueAirports[obj[key].destination.id].type = "destination";
    } else {
      if (uniqueAirports[obj[key].destination.id].type === "departure") {
        uniqueAirports[obj[key].destination.id].type = "both";
      }
    }
  });
  return uniqueAirports;
}