const checkboxes = document.querySelectorAll(".row-only");

let count = 0;

function toggle(source) {
  console.log(checkboxes);
  checkboxes.forEach((el) => {
    el.checked = source.checked;
  });
  if (source.checked) {
    count = checkboxes.length;
  } else {
    count = 0;
  }
  document.querySelector("button").classList.add("show");
  if (count == 0) {
    document.querySelector("button").classList.remove("show");
  }
  console.log(count);
}

checkboxes.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.checked) {
      count++;
      if (count === checkboxes.length) {
        document.querySelector("#all-table").checked = true;
      }
    } else {
      count--;
      document.querySelector("#all-table").checked = false;
    }
    if (count > 0) {
      document.querySelector("button").classList.add("show");
    } else {
      document.querySelector("button").classList.remove("show");
    }
    console.log(count);
  });
});

document.querySelector("button").addEventListener("click", () => {
  checkboxes.forEach((el) => {
    if (el.checked) {
      el.closest("tr").remove();
    }
  });
});
