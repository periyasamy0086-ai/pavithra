







let editingRow = null; // track currently editing row

document.getElementById("marksForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const roll = document.getElementById("roll").value.trim();
  const name = document.getElementById("name").value.trim();
  const marks = [
    Number(document.getElementById("sub1").value),
    Number(document.getElementById("sub2").value),
    Number(document.getElementById("sub3").value),
    Number(document.getElementById("sub4").value),
    Number(document.getElementById("sub5").value)
  ];

  // Validation
  if (!roll || !name) {
    alert("Roll number and Name are required");
    return;
  }
  if (marks.some(m => isNaN(m) || m < 0 || m > 100)) {
    alert("Each mark must be between 0 and 100");
    return;
  }

  const total = marks.reduce((a, b) => a + b, 0);
  const percentage = ((total / 500) * 100).toFixed(2);
  const isPass = marks.every(m => m >= 35);
  const statusText = isPass ? "PASS" : "FAIL";

  const tableBody = document.querySelector("#studentsTable tbody");

  // If editing, update existing row instead of adding new
  let row;
  if (editingRow) {
    row = editingRow; // use existing row
    editingRow = null; // reset editing mode
  } else {
    row = document.createElement("tr");
    tableBody.appendChild(row);
  }

  // Roll & Name
  row.innerHTML = `<td>${roll}</td><td>${name}</td>`;

  // Subject marks with individual pass/fail color
  marks.forEach(m => {
    row.innerHTML += `<td class="${m < 35 ? "fail" : "pass"}">${m}</td>`;
  });

  // Total, Percentage, Status
  row.innerHTML += `<td>${total}</td>
                    <td>${percentage}%</td>
                    <td class="${isPass ? "pass" : "fail"}">${statusText}</td>`;

  // Edit & Delete buttons
  row.innerHTML += `<td>
                      <button id="editBtn">Edit</button>
                      <button id="deleteBtn">Delete</button>
                    </td>`;

  // Delete functionality
  row.querySelector(".deleteBtn").addEventListener("click", () => {
    row.remove();
  });

  // Edit functionality
  row.querySelector(".editBtn").addEventListener("click", () => {
    document.getElementById("roll").value = roll;
    document.getElementById("name").value = name;
    document.getElementById("sub1").value = marks[0];
    document.getElementById("sub2").value = marks[1];
    document.getElementById("sub3").value = marks[2];
    document.getElementById("sub4").value = marks[3];
    document.getElementById("sub5").value = marks[4];

    editingRow = row; // mark this row as editing
  });

  this.reset();
});


function downloadTableAsCSV(filename = 'students.csv') {
  const rows = document.querySelectorAll("#studentsTable tr");
  const csv = [];
  
  rows.forEach(row => {
    const cols = row.querySelectorAll("td, th");
    const rowData = Array.from(cols).map(col => col.textContent);
    csv.push(rowData.join(","));
  });

  // Create CSV blob
  const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
  const downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

document.getElementById("downloadBtn").addEventListener("click", function() {
  downloadTableAsCSV();
});
















