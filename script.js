const serverURL = 'http://localhost:3000/tickets';

function updateRemainingTickets() {
  fetch(serverURL)
    .then(response => response.json())
    .then(data => {
      let remainingTickets = 51; 
      data.forEach(ticket => {
        remainingTickets -= ticket.seats;
      });
      document.getElementById('remainingTickets').textContent = `Remaining Tickets: ${remainingTickets}`;
    })
    .catch(error => console.error('Error fetching tickets:', error));
}

function bookTicket() {
  const route = document.getElementById('route').value;
  const name = document.getElementById('name').value;
  const seats = parseInt(document.getElementById('seats').value);

  const ticket = { route, name, seats };

  fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticket)
  })
  .then(() => {
    updateRemainingTickets();
    alert('Ticket booked successfully!');
  })
  .catch(error => console.error('Error booking ticket:', error));
}

updateRemainingTickets();
