document.getElementById("btnExport").onclick = function Export() {
  html2canvas(document.getElementById("table"), {
    onrendered: function(canvas) {
      var data = canvas.toDataURL();
      var docDefinition = {
        content: [
          {
            image: data,
            width: 500
          }
        ]
      };
      pdfMake
        .createPdf(docDefinition)
        .download("professor" + Math.ceil(Math.random() * 300) + ".pdf");
    }
  });
};
