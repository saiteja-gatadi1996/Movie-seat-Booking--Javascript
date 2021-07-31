const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// let ticketPrice = Number(movieSelect.value)
// const ticketPrice = parseInt(movieSelect.value)
let ticketPrice = +movieSelect.value;
// console.log(typeof ticketPrice)

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// we will get the number of selectedSeats by dom method and then calc part
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // seats is the one which are occupied, as per line 2,
  //seatsIndex is used for seat number
  //Ex: seat 0 to seat 32 (which one you have selected)
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  // console.log(seatsIndex)

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  const selectedSeatsLength = selectedSeats.length;
  // console.log(selectedSeatsLength)

  count.innerText = selectedSeatsLength;
  total.innerText = selectedSeatsLength * ticketPrice;
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeats) if anything in local storage, it will display

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    //here we are setting the movie index and value
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  // console.log(ticketPrice)

  //related to select and its value ----> 2 '8
  // console.log(e.target.selectedIndex, e.target.value)
  //here we are fetch the movie index and value
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Only on not occupied seats, my event should work,
//Ex: inside container which contains seat but not occupied will now gets class toggled like seat or seat selected

container.addEventListener('click', (e) => {
  // console.log(e.target);
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    // console.log(e.target)
    // To use this class further, we need to use .row .seat.selected
    e.target.classList.toggle('selected');
  }

  updateSelectedCount();
});
