// TODO: Implementar lo del ; en el prettier de PHP

// * Este será el archivo donde vamos aplicar los ChartJS.
// * Los datos lo vamos a sacar de una API.

// * Si nos fijamos en el objetivo, el primer gráfico va a ser de tipo doughnut, donde las labels son los nombres de los modelos y lo que esta representando el gráfico es la cantidad de montañas rusas por cada uno.

// * Algo interesante y que hay que saber, es que por norma general cuando tu tienes un juego de Charts dentro de un producto, todos comparten algunas características, en este caso en partícular, el color del texto que es blanco. Esto, ChartJS lo resuelve de forma global, podemos aplicar valores por defecto a todos los Charts.
Chart.defaults.color = "#fff";
// * Esto lo hacemos principalmente por el featuresChart, configurando el tercer punto de que no se ve el radar.
Chart.defaults.borderColor = "#444";

const printChart = () => {
  fetchCoastersData(
    "https://coasters-api.herokuapp.com",
    "https://coasters-api.herokuapp.com/country/Spain"
  )
    // Una vez esté todo listo, voy a recibir un array donde en la primera posición voy a tener todas las montañas y en la segunda las nacionales.
    .then(([allCoasters, nationalCoasters]) => {
      renderModelsChart(allCoasters);
      renderFeaturesChart(nationalCoasters);
    });
};

const renderModelsChart = (coasters) => {
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

// * Ahora toca el gráfico de tipo radar, todavía no vamos a resolver la interacción sino que simplemente vamos a trazar el Chart en relación a la altura de cada una de las montañas rusas, pero únicamente de las nacionales.

const renderFeaturesChart = (coasters) => {
  // * OJO, empezó renderizando la label altura porque por defecto es la que siempre va a estar seleccionado cuando apenas se cargue la página.
  const data = {
    labels: coasters.map((coaster) => coaster.name),
    // En este caso en los datasets, hay una particularidad, en ciertos Charts como este cada uno de los datasets puede tener su label porque tenemos las labels a nivel de Chart pero luego la comparativa puede estar referida a una u otra propiedad, como es en este caso.
    datasets: [
      {
        label: "Altura (m)",
        data: coasters.map((coaster) => coaster.height),
        // Voy a utilizar la misma paleta de colores, pero en este caso solamente me voy a pillar el primer color porque este Chart no tiene diferentes colores
        borderColor: getDataColors()[0],
        backgroundColor: getDataColors(20)[0],
      },
    ],
  };

  const options = {
    plugins: {
      // Con esto configuramos el primer punto de que no queremos mostrar los labels.
      legend: { display: false },
    },
    // Con esta propiedad, en todos los Charts, podemos modificar si se ven o no se ven las escalas vertical horizontal x y o si que tengan legend a nivel escala, el mínimo, el máximo, un millón de movidas.
    scales: {
      r: {
        ticks: { display: false },
      },
    },
  };

  new Chart("featuresChart", { type: "radar", data, options });
};
