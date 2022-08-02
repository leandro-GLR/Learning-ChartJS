// TODO: Implementar lo del ; en el prettier de PHP

// * Este será el archivo donde vamos aplicar los ChartJS.
// * Los datos lo vamos a sacar de una API.

// * Si nos fijamos en el objetivo, el primer gráfico va a ser de tipo doughnut, donde las labels son los nombres de los modelos y lo que esta representando el gráfico es la cantidad de montañas rusas por cada uno.

// * Algo interesante y que hay que saber, es que por norma general cuando tu tienes un juego de Charts dentro de un producto, todos comparten algunas características, en este caso en partícular, el color del texto que es blanco. Esto, ChartJS lo resuelve de forma global, podemos aplicar valores por defecto a todos los Charts.
Chart.defaults.color = "#fff";
Chart.defaults.borderColor = "#444";

const printChart = () => {
  fetchCoastersData(
    "https://coasters-api.herokuapp.com",
    "https://coasters-api.herokuapp.com/country/Spain"
  )
    // Una vez esté todo listo, voy a recibir un array donde en la primera posición voy a tener todas las montañas y en la segunda las nacionales.
    .then(([allCoasters, nationalCoasters]) => {
      renderModelsChart(allCoasters);
      console.log(allCoasters, nationalCoasters);
    });
};

renderModelsChart = (coasters) => {
  // Con esto voy a obtener los nombres de los modelos, pero se van a repetir.
  //const models = coasters.map((coaster) => coaster.model);

  // De esta forma el Set me va a quitar las duplicidades de modelos y luego voy a pasar todos los datos del Set a un array.
  const uniqueModels = [...new Set(coasters.map((coaster) => coaster.model))];

  const data = {
    labels: uniqueModels,
    // Los datasets es un array de objetos y... ¿Por qué es un array de objetos y no un objeto con los datos y demas? porque por lo general podemos jugar con varios juegos de datos, casi todos o todos los Charts de la librería, permiten recibir mas de un objeto dentro de los juegos de datos o datasets. Nosotros trabajaremos con un único objeto pero podríamos pasarle tantos como quisieramos dependiendo del Chart, la librería los combinaría una u otra forma.
    datasets: [
      {
        data: uniqueModels.map(
          (currentModel) =>
            coasters.filter((coaster) => coaster.model === currentModel).length
        ),
        // Queremos diferentes colores para cada uno de las secciones.
        borderColor: getDataColors(),
        backgroundColor: getDataColors(20),
      },
    ],
  };

  const options = {
    // Queremos la legend a la izquierda.
    plugins: {
      legend: { position: "left" },
    },
  };
  // Indicando que vamos a crear una instancia de ChartJS
  new Chart("modelsChart", { type: "doughnut", data, options });
};

printChart();
