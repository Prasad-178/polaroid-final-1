var original_seat_count = retrieve_no_seats();

// for testing purposes
// var original_seat_count = 3;

var seat_matrix = [
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1, 0, 1, 1, 1, 0]
];

var seat_list = [];

function render_seats() {
  var seat_container = document.getElementById('seat-container');
  var seat = document.getElementById('00');
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      var copy = seat.cloneNode(true);
      copy.id = "" + i + j;
      // console.log(copy.id);
      if (seat_matrix[i][j] === 0)
        copy.classList.add("Occupied");
      seat_container.append(copy);
    }
  }

  seat_container.removeChild(seat_container.firstElementChild);
}

function retrieve_no_seats() {
  var url = window.location.href;
  // var url = window.location.href + "/123456" + "/3";

  var url_objects = url.split("/");
  var no_of_seats = +(url_objects[url_objects.length - 1]);


  return no_of_seats;
}

function seat_selection(id) {
  var seat = document.getElementById(id);
  var i = +(Math.floor(id / 10));
  var j = +(id % 10);

  if (seat_matrix[i][j] === 1) {
    seat.classList.add("selected");
    seat_matrix[i][j]++;
    seat_list.push("" + i +j);

    // console.log(seat_list);
  }
  else if (seat_matrix[i][j] === 2) {
    seat.classList.remove("selected");
    seat_matrix[i][j]--;

    // remove the element by id
    var index = seat_list.indexOf("" + i +j);
    if (index !== -1)
      seat_list.splice(index, 1);

    // console.log(seat_list);
  }

}

function finalize_seat() {
  // console.log(seat_list.length);

  if (seat_list.length !== original_seat_count) {
    document.getElementById('submit-button').disabled = true;
    document.getElementById('info-zone').style.color = "#eb455f";
  }
  else {
    document.getElementById('submit-button').disabled = false;
    document.getElementById('info-zone').style.color = "LimeGreen";
  }

  document.getElementById('info-zone').innerHTML = seat_list.length;



  // localStorage.setItem("seat_list", seat_list);
  // console.log(localStorage.getItem("seat_list"));
}

// render_seats();
document.addEventListener("DOMContentLoaded", render_seats);
document.addEventListener("DOMContentLoaded", finalize_seat);

function seat_list_ret() {
  localStorage.setItem("seat_list", seat_list);

  // console.log(localStorage.getItem("seat_list"));

  return true;
}
