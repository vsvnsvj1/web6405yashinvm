document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#model-table tbody');


    async function fetchModels() {
        try {
            const response = await fetch('http://localhost:8000/models', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }

            const result = await response.json();
            populateTable(result.data);
        } catch (error) {
            console.error('Ошибка при получении данных:', error);
            alert('Не удалось загрузить данные о моделях.');
        }
    }


    function populateTable(models) {
        tableBody.innerHTML = '';

        models.forEach(model => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = model.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = model.name;

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = model.description;

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(descriptionCell);

            tableBody.appendChild(row);
        });
    }

    fetchModels();
});
