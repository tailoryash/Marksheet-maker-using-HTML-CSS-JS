function addMarksheet() {
  if (validateName() & validateTotalMarks()) {
    let inputSub;
    var inputObtain;
    var lastRowThirdCellTotal;
    const name = document.getElementById("fullName").value;
    const noOfSubjects = document.getElementById("no-subjects").value;
    const totalMarks = document.getElementById("total-marks").value;
    let totalObtainMarks = 0;

    let table = document.querySelector("table");
    const tableBody = document.createElement("tbody");
    const divTag = document.createElement("div");

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

    let obtainArray = [];

    for (let i = 0; i <= noOfSubjects; i++) {
      const row = document.createElement("tr");
      const cell1 = document.createElement("td");
      const cell2 = document.createElement("td");
      const cell3 = document.createElement("td");
      const cell4 = document.createElement("td");
      let cell4Span = document.createElement("span");
      cell4Span.id = "mark-result";

      var lastRowThirdCellTotal = document.createElement("b");

      const cellText1 = document.createTextNode(`${i + 1}`);

      if (i < noOfSubjects) {
        inputSub = document.createElement("input");
        inputSub.type = "text";
        inputSub.class = "form-control";
        inputSub.id = "sub-name" + i;
        inputSub.placeholder = "enter subject name";
        let subError = document.createElement("span");
        subError.id = "sub-error";

        const cellText3 = document.createTextNode(`${totalMarks}`);

        inputObtain = document.createElement("input");
        inputObtain.type = "number";
        inputObtain.max = `${totalMarks}`;
        inputObtain.min = `${0}`;
        inputObtain.class = "form-control";
        inputObtain.placeholder = "0";
        inputObtain.id = "obtain-marks" + i;
        inputObtain.onblur = function () {
          let obtainMark = parseFloat(
            document.getElementById("obtain-marks" + i).value
          );
          // console.log(obtainMark);
          if (obtainMark >= 0 && obtainMark <= totalMarks) {
            totalObtainMarks += obtainMark;
            obtainArray.push(obtainMark);
            console.log(totalObtainMarks);

            // let obtainTotalValue = document.createTextNode(
            //   `${totalObtainMarks}`
            // );
            // cell4Span.appendChild(obtainTotalValue);
            document.getElementById("mark-result").innerHTML =
              `${totalObtainMarks}` + "/" + `${noOfSubjects * totalMarks}`;

            obtainMark = 0;
          }
        };

        cell2.appendChild(inputSub);
        cell2.appendChild(subError);
        cell3.appendChild(cellText3);
        cell4.appendChild(inputObtain);
      } else {
        const lastRowFirstCellTotal = document.createElement("b");
        const lastRowFirstCellTotalText = document.createTextNode("Total");
        lastRowFirstCellTotal.appendChild(lastRowFirstCellTotalText);
        cell2.appendChild(lastRowFirstCellTotal);

        const lastRowSecondCellTotal = document.createElement("b");
        const totalDisplayValue = document.createTextNode(
          `${noOfSubjects * totalMarks}`
        );

        lastRowSecondCellTotal.appendChild(totalDisplayValue);
        cell3.appendChild(lastRowSecondCellTotal);
        cell4.appendChild(cell4Span);
      }

      console.log(obtainArray);
      cell1.appendChild(cellText1);

      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      divTag.appendChild(row);
      // divTag.id = "div" + i;
      // tableBody.appendChild(divTag);
      tableBody.appendChild(row);
      divTag.appendChild(tableBody);

      let person = {
        fullName: name,
        subjects: [
          {
            name: document.getElementById("sub-name" + i).value,
            total: totalMarks,
            obtainmark: document.getElementById("obtain-marks" + i).value,
          },
        ],
      };
    }

    table.appendChild(tableBody);
    table.setAttribute("border", "2");
    console.log("Name is:", name);
    console.log("Total subjects:", noOfSubjects);
    console.log("Total marks:", totalMarks);

    document.getElementById("form-data").reset();
    // console.log("inputSub", inputSub);
    // for (let i = 0; i < noOfSubjects; i++) {
    //   let subName = document.getElementById("sub-name" + i).value;
    //   inputSub.onblur = `validateSubjects(${subName})`;
    //   if (validateSubjects(subName)) {
    //     console.log("true");
    //   } else {
    //     console.log("false");
    //   }
    // }
  } else {
    validateName();
    validateTotalMarks();
  }

  // totalObtainMarks = 0;
}

function validateName() {
  var name = document.getElementById("fullName").value;
  if (name.trim() == "") {
    document.querySelector("#name-error").innerHTML = "Name is Required";
    return false;
  } else {
    if (
      !name.match(
        /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/
      )
    ) {
      document.querySelector("#name-error").innerHTML = "Write full name";
      return false;
    } else if (name.trim().length > 50) {
      document.querySelector("#name-error").innerHTML =
        "length should be below 50 letters !";
      return false;
    }
  }
  document.querySelector("#name-error").innerHTML = "";
  return true;
}

function validateTotalMarks() {
  const totalMarks = document.getElementById("total-marks").value;
  if (totalMarks <= 0) {
    document.getElementById("total-marks-error").innerHTML =
      "marks should be greater than zero or only digits allowed";
    return false;
  } else {
    if (!totalMarks.match(/^(10|1[0-9]{2}|[2-9][0-9]{2}|1000)$/)) {
      document.getElementById("total-marks-error").innerHTML =
        "marks should be 10-1000";
      return false;
    }
  }

  document.getElementById("total-marks-error").innerHTML = "";
  return true;
}

function validateSubjects(subName) {
  if (subName.trim() == "") {
    document.getElementById("sub-error").innerHTML = "subject is Required";
    return false;
  } else {
    if (!subName.match(/^[\w\s-]+$/i)) {
      document.querySelector("#sub-error").innerHTML = "Invalid name";
      return false;
    } else if (subName.trim().length > 50) {
      document.querySelector("#sub-error").innerHTML =
        "length should be below 50 letters !";
      return false;
    }
  }
  document.querySelector("#sub-error").innerHTML = "";
  return true;
}
