function addMarksheet() {
  const name = document.getElementById("fullName").value;
  const noOfSubjects = document.getElementById("no-subjects").value;
  const totalMarks = document.getElementById("total-marks").value;

  let table = document.querySelector("table");
  const tableBody = document.createElement("tbody");

  const headingRow = document.createElement("tr");
  const heading1 = document.createElement("th");
  const heading2 = document.createElement("th");
  const heading3 = document.createElement("th");
  const heading4 = document.createElement("th");

  const serialNo = document.createTextNode("No.");
  const subject = document.createTextNode("Subject");
  const total = document.createTextNode("Total");
  const obtain = document.createTextNode("Obtain");

  heading1.appendChild(serialNo);
  heading2.appendChild(subject);
  heading3.appendChild(total);
  heading4.appendChild(obtain);

  headingRow.appendChild(heading1);
  headingRow.appendChild(heading2);
  headingRow.appendChild(heading3);
  headingRow.appendChild(heading4);
  tableBody.appendChild(headingRow);

  for (let i = 0; i <= noOfSubjects; i++) {
    const row = document.createElement("tr");
    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");
    const cell4 = document.createElement("td");
    for (let j = 0; j <= 2; j++) {
      if (i == 1) {
        row.appendChild(heading);
      }

      // const cell = document.createElement("td");
      // const cellData =
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
  }

  console.log("Name is:", name);
  console.log("Total subjects:", noOfSubjects);
  console.log("Total marks:", totalMarks);
}
