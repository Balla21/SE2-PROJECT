// array that contains all the patients
var patients = [];

class Patient {
  // array that holds information of the patient
  attributes = [];

  constructor() {
    patients.push(this);
  }

  // randomly generates patient attributes
  generate() {
    this.attributes[0] =
      "10000" + Math.floor(Math.random() * 99 + 10).toString();
    for (var i = 1; i < 10; i++) {
      this.attributes.push(Math.floor(Math.random() * 10) + 1); // random number between 1 and 10
    }
    var rand = Math.floor(Math.random()); // random number between 0 and 1 (exclusive)
    if (rand < 0.5) this.attributes.push(2);
    else this.attributes.push(4); // 2 for benign 4 for malignant
    this.print();
  }

  // i made up the diagnose procedure
  diagnose() {
    if (this.attributes[1] > 3 && this.attributes[5] > 2) {
      return true;
    } else return false;
  }

  // prints patients information to the screen
  print() {
    var table = "<tr><th>Patient</th></tr>";
    table += "<tr><td> ID: " + this.attributes[0].toString() + "</tr></td>";
    table +=
      "<tr><td> Clump Thickness:  " +
      this.attributes[1].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Uniformity Cell Size:  " +
      this.attributes[2].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Uniformity Cell Shape:  " +
      this.attributes[3].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Marginal Adhesion: " +
      this.attributes[4].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Single Epithelial Cell Size: " +
      this.attributes[5].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Bare Nuclei: " + this.attributes[6].toString() + "</tr></td>";
    table +=
      "<tr><td> Bland Chromatin: " +
      this.attributes[7].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Normal Nucleoli: " +
      this.attributes[8].toString() +
      "</tr></td>";
    table +=
      "<tr><td> Mitosis: " + this.attributes[9].toString() + "</tr></td>";
    table += "<tr><td> Class: " + this.attributes[10].toString() + "</tr></td>";

    if (this.diagnose()) {
      table += "<tr><td> Status: Breast Cancer Positive" + "</tr></td>";
    } else table += "<tr><td> Status: Breast Cancer Negative" + "</tr></td>";

    document.getElementById("demo").innerHTML = table;
  }
}
