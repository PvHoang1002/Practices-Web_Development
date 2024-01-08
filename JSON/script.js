document.querySelector("#my-btn").onclick = function () {
  this.disabled = true;
  fetch("data.json")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Request failed!");
      }
    })
    .then((data) => {
      const tbody = document.querySelector("#my-tbl tbody");
      tbody.innerHTML = "";
      data.forEach((person) => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.textContent = person.name;
        const tdAge = document.createElement("td");
        tdAge.textContent = person.age;
        const tdCars = document.createElement("td");
        tdCars.id = "cars-info";
        const carNames = person.cars
          .map((car) => {
            return car.name + " - " + car.models;
          })
          .join("<br>");
        tdCars.innerHTML = person.cars.length + "</br>" + carNames;
        tr.appendChild(tdName);
        tr.appendChild(tdAge);
        tr.appendChild(tdCars);
        tbody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
