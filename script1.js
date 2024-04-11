const serverURL = 'http://localhost:3000/tickets';

function updateTicketList() {
  fetch(serverURL)
    .then(response => response.json())
    .then(data => {
      const ticketList = document.getElementById('ticketList');
      ticketList.innerHTML = '';
      data.forEach(ticket => {
        const listItem = document.createElement('li');
        listItem.textContent = `Route: ${ticket.route}, Name: ${ticket.name}, Seats: ${ticket.seats}`;
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.onclick = () => cancelTicket(ticket.id);
        listItem.appendChild(cancelButton);
        ticketList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching tickets:', error));
}

function cancelTicket(ticketId) {
  fetch(`${serverURL}/${ticketId}`, {
    method: 'DELETE',
  })
  .then(() => {
    updateTicketList();
    alert('Ticket canceled successfully!');
  })
  .catch(error => console.error('Error canceling ticket:', error));
}

updateTicketList();
