export const getStationPrefix = (station: string): string => {
  return station.endsWith("й") ? "вокзал" : "";
};