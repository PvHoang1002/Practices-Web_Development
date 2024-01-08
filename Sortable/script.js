// Thêm mũi tên tăng/giảm cho các header có class="sortcol"
var sortTables = document.querySelectorAll(".sortable");
sortTables.forEach((table) => {
  let headerCells = table.rows[0].cells;
  for (let i = 0; i < headerCells.length; i++) {
    if (headerCells[i].classList.contains("sortcol")) {
      headerCells[i].innerHTML += '<span class="arrow"></span>';
    }
  }
});

// Lấy tất cả các header của bảng có class="sortcol"
var sortColHeaders = document.querySelectorAll(".sortable .sortcol");
for (let j = 0; j < sortColHeaders.length; j++) {
  sortColHeaders[j].addEventListener("click", function () {
    let colIndex = sortColHeaders[j].cellIndex;
    let isAscending = true;

    // Lấy table là cha của header đang được click
    let table = sortColHeaders[j].closest("table.sortable");

    // Lấy tất cả header trong bảng
    let tableHeaders = table.rows[0].cells;

    // Khi một header đc click, các header khác sẽ trở về mũi tên mặc định
    for (let i = 0; i < tableHeaders.length; i++) {
      if (
        i != colIndex &&
        (tableHeaders[i].classList.contains("ascending") ||
          tableHeaders[i].classList.contains("descending"))
      ) {
        tableHeaders[i].classList.remove("ascending");
        tableHeaders[i].classList.remove("descending");
      }
    }

    // Tạo một mảng chứa các dòng trong bảng, loại bỏ dòng header
    let rowArray = Array.prototype.slice.call(table.rows, 1);

    // Kiểm tra xem cột được click có đang được sắp xếp tăng dần hay giảm dần
    if (sortColHeaders[j].classList.contains("ascending")) {
      isAscending = false;
      sortColHeaders[j].classList.remove("ascending");
      sortColHeaders[j].classList.add("descending");
    } else {
      sortColHeaders[j].classList.remove("descending");
      sortColHeaders[j].classList.add("ascending");
    }

    // Sắp xếp mảng các dòng theo cột được click và kiểu sắp xếp (tăng/giảm)
    rowArray.sort((row1, row2) => {
      let cell1 = row1.cells[colIndex].textContent.trim();
      let cell2 = row2.cells[colIndex].textContent.trim();

      if (isAscending) {
        return cell1.localeCompare(cell2);
      } else {
        return cell2.localeCompare(cell1);
      }
    });

    // Điền lại số thứ tự của bảng
    for (let j = 0; j < rowArray.length; j++) {
      rowArray[j].cells[0].textContent = j + 1;
    }

    // Xóa tất cả các dòng hiện có trong bảng
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }

    // Thêm lại các dòng đã được sắp xếp
    for (let j = 0; j < rowArray.length; j++) {
      table.appendChild(rowArray[j]);
    }
  });
}
