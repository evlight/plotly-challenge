//Function for metadata 
function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the sample number you want
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      // Use d3 to select the panel with id you need 
      var table = d3.select("#sample-metadata");
      // Clear existing data
      table.html("");
      // add each key and value pair from the dictionary or array...
           
      Object.entries(result).forEach(([key, value]) => {
        table.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
    
    });
  }
  function buildChart(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
      
      // Build the Bubbles
      var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);
      var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
      var barData = [
        {
          y: yticks,
          x: sample_values.slice(0, 10).reverse(),
          text: otu_labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        }
      ];
      var barLayout = {
        title: "Top 10 Bacteria Cultures Found",
        margin: { t: 30, l: 150 }
      };
      Plotly.newPlot("bar", barData, barLayout);
    });
  }
  //function init to run the whole thing 
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildChart(firstSample);
      buildMetadata(firstSample);
    });
  }
  function optionChanged(newSample) {
    // Get new data each time a new sample is selected
    buildChart(newSample);
    buildMetadata(newSample);
  }
  init();
  
//example review 
//Create an array of each country's numbers
// var us = Object.values(data.us);
// var uk = Object.values(data.uk);
// var canada = Object.values(data.canada);

// // Create an array of music provider labels
// var labels = Object.keys(data.us);

// // Display the default plot
// function init() {
//   var data = [{
//     values: us,
//     labels: labels,
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("pie", data, layout);
// }

// On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
  
//   
//   if (dataset == 'sample') {
//       data = us;
//   }
//   else if (dataset == 'ETHNICITY') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

// init();

// // Initializes the page with a default plot
// // function init() {
// //     data = [{
// //       x: [1, 2, 3, 4, 5],
// //       y: [1, 2, 4, 8, 16],
// //       type: 'line' }];
  
// //     var CHART = d3.select("#plot").node();
  
// //     Plotly.newPlot(CHART, data);
// //   }
  
//   // Call updatePlotly() when a change takes place to the #selDataset drop down
//   // d3.select("select").on("change", updatePlotly);
//   d3.select("#selDataset").on("change", update);
//   // d3.select("body").on("change", updatePlotly);
  
//   // This function is called when a dropdown menu item is selected
//   function update() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.node().value;
  
// //     var CHART = d3.select("#plot").node();
  
// //     // Initialize x and y arrays
// //     var x = [];
// //     var y = [];
  
// //     switch(dataset) {
// //       case "dataset1":
// //         x = [1, 2, 3, 4, 5];
// //         y = [1, 2, 4, 8, 16];
// //         break;
  
// //       case "dataset2":
// //         x = [10, 20, 30, 40, 50];
// //         y = [1, 10, 100, 1000, 10000];
// //         break;
  
// //       case "dataset3":
// //         x = [100, 200, 300, 400, 500];
// //         y = [10, 100, 50, 10, 0];
// //         break;
  
// //       default:
// //         x = [1, 2, 3, 4, 5];
// //         y = [1, 2, 3, 4, 5];
// //         break;
// //     }
  
  
// //     // Note the extra brackets around 'x' and 'y'
// //     Plotly.restyle(CHART, "x", [x]);
// //     Plotly.restyle(CHART, "y", [y]);
// //     Plotly.restyle(CHART, "type", type);
// //   }
  
// //   init()