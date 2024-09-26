const url = `https://web-and-cloud-ex6.onrender.com`;
let vacations = [];
(async () => {
    vacations = await getVacations();
    window.onload = () => {
        loadVacations(vacations);
        loadDeleteEvent();
    };
})();

const loadDeleteEvent = () => {
    const btns = document.querySelectorAll('.delete-icon');
    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const card = e.target.closest('.card');
            const vacation_id = card.getAttribute('aria-id');
            const result = await fetch(`${ url } /vacations/${ vacation_id } `, {
                method: 'DELETE'
            });
            if (result.ok)
                card.remove();
        });
    });
};

const getVacations = async () => {
    try {
        const response = await fetch(`${ url }/vacations`);
            const vacations = response.json();
            return vacations;
        } catch (error) {
            console.error(error);
        }
    };

    const loadVacations = (vacations) => {
        const container = document.getElementsByClassName('vacations-list')[0];
        vacations.forEach(vacation => {
            const card = createCard(vacation);
            container.appendChild(card);
        });
    };

    const createCard = (vacation) => {
        const { vacation_id, location, price, image_url, name } = vacation;
        const card = document.createElement('div');
        card.setAttribute('aria-id', vacation_id);
        card.className = 'card';
        card.innerHTML =
            `<div class="card" aria-id="${vacation_id}>
            <div class="card-background"></div>
            <img class="image-icon" alt="location_image" src="${image_url}">
            <b class="greecevillage">${name}</b>
            <b class="maldives">${location}</b>
            <b class="b">$${price}</b>
            <img class="location-icon" alt="location_icon" src="location_icon.svg">
            <button class="delete-icon"></button>
            <button class="edit-icon"></button>
        </div>`;
        return card;
    };





