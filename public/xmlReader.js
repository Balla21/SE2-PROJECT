var patient1 = new Patient();

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      myFunction(this);
    }
  };
  xhttp.open("GET", "test.xml", true);
  xhttp.send();
}
function myFunction(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("Dataset");
  for (i = 0; i < x.length; i++) {
    //  ID //
    patient1.attributes.push(
      x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue
    );

    // Clump Thickness //
    patient1.attributes.push(
      x[i].getElementsByTagName("clump_thickness")[0].childNodes[0].nodeValue
    );
    // uniformity_cell_size //
    patient1.attributes.push(
      x[i].getElementsByTagName("uniformity_cell_size")[0].childNodes[0]
        .nodeValue
    );
    // <uniformity_cell_shape>1</uniformity_cell_shape> //
    patient1.attributes.push(
      x[i].getElementsByTagName("uniformity_cell_shape")[0].childNodes[0]
        .nodeValue
    );

    // <marginal_adhesion>1</marginal_adhesion> //
    patient1.attributes.push(
      x[i].getElementsByTagName("marginal_adhesion")[0].childNodes[0].nodeValue
    );

    // <single_epithelial_cell_size>2</single_epithelial_cell_size> //
    patient1.attributes.push(
      x[i].getElementsByTagName("single_epithelial_cell_size")[0].childNodes[0]
        .nodeValue
    );

    // <bare_nuclei>1</bare_nuclei> //
    patient1.attributes.push(
      x[i].getElementsByTagName("bare_nuclei")[0].childNodes[0].nodeValue
    );

    //  <bland_chromatin>2</bland_chromatin> //
    patient1.attributes.push(
      x[i].getElementsByTagName("bland_chromatin")[0].childNodes[0].nodeValue
    );
    // <normal_nucleoli>2</normal_nucleoli> //
    patient1.attributes.push(
      x[i].getElementsByTagName("normal_nucleoli")[0].childNodes[0].nodeValue
    );

    // <mitoses>1</mitoses>//
    patient1.attributes.push(
      x[i].getElementsByTagName("mitoses")[0].childNodes[0].nodeValue
    );

    // <class>2</class> //
    patient1.attributes.push(
      x[i].getElementsByTagName("class")[0].childNodes[0].nodeValue
    );
  }
  patient1.print();
}
