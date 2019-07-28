// function json2table(json) {
//   //Number of json attributes = number of columns
//   let cols = Object.keys(json[0]);
//   let headerRow = "";
//   let bodyRows = "";
//   cols.map(col => {
//     headerRow += "<th>" + capitilizeFirstLetter(col) + "</th>";
//   });
//   json.map(row => {
//     bodyRows += "<tr>";

//     cols.map(colName => {
//       bodyRows += "<td>" + row[colName] + "<td>";
//     });

//     bodyRows += "</tr>";
//   });
// }

// function capitilizeFirstLetter(string) {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }

// document.getElementById("table").innerHTML = json2table(data);
