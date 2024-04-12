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

// Define routes with their images
const routes = [
    { name: 'Nairobi - Kisii', image: 'nairobi_kisii.jpg' },
    { name: 'Kisii - Nairobi', image: 'kisii_nairobi.jpg' },
    { name: 'Kisumu - Nairobi', image: 'kisumu_nairobi.jpg' },
    { name: 'Nairobi - Kisumu', image: 'nairobi_kisumu.jpg' },
    { name: 'Nairobi - Migori', image: 'nairobi_migori.jpg' },
    { name: 'Migori - Nairobi', image: 'migori_nairobi.jpg' },
    { name: 'Nairobi - Kendubay', image: 'nairobi_kendubay.jpg' },
    { name: 'Kendubay - Nairobi', image: 'kendubay_nairobi.jpg' }
];

// Render route cards
const routeCardsContainer = document.getElementById('routeCards');
routes.forEach(route => {
    const card = document.createElement('div');
    card.classList.add('route-card');

    const img = document.createElement('img');
    img.src = `Assests/${route.image}`;
    img.alt = route.name;

    const name = document.createElement('p');
    name.textContent = route.name;

    const selectButton = document.createElement('button');
    selectButton.textContent = 'Select';
    selectButton.onclick = () => {
        document.getElementById('route').value = route.name;
        document.getElementById('bookingForm').style.display = 'block';
    };

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(selectButton);

    routeCardsContainer.appendChild(card);
});
