// * Para tener un código mas reutilizable, mas modularizado y mas limpio.

// Una function para obtener los datos
const fetchCoastersData = (...urls) => {
  const promises = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );
  // El promise.all va a retornar un array donde cada una de las posiciones va a ser una de las respuestas del servidor para cada una de las URLs/Promesas.
  return Promise.all(promises);
};

// Una function que dependiendo si existe opacity, va a retornar los colores con esa opacity aplicada, en caso de que no, retorna el color normal.
const getDataColors = (opacity) => {
  const colors = [
    "#7448c2",
    "#21c0d7",
    "#d99e2b",
    "#cd3a81",
    "#9c99cc",
    "#e14eca",
    "#ffffff",
    "#ff0000",
    "#d6ff00",
    "#0038ff",
  ];
  return colors.map((color) => (opacity ? `${color + opacity}` : color));
};

const getCoastersByYear = (coasters, years) => {
  const coastersByYear = years.map((yearsRange) => {
    const [from, to] = yearsRange.split("-");
    return coasters.filter(
      (eachCoaster) => eachCoaster.year >= from && eachCoaster.year <= to
    ).length;
  });
  return coastersByYear;
};

const updateChartData = (chartId, data, label) => {
  const chart = Chart.getChart(chartId);
  chart.data.datasets[0].data = data;
  chart.data.datasets[0].label = label;
  chart.update();
};
