const table = document.getElementById('myTable');
const tbody = table.querySelector('tbody');
const filterInput = document.getElementById('filterInput');
const sortSelect = document.getElementById('sortSelect');

filterInput.addEventListener('keyup', () => {
  const filterValue = filterInput.value.toLowerCase();
  const rows = tbody.querySelectorAll('tr');

  rows.forEach(row => {
    const rowText = row.textContent.toLowerCase();
    row.style.display = rowText.includes(filterValue) ? '' : 'none';
  });
});

sortSelect.addEventListener('change', () => {
  const value = sortSelect.value;
  let column = 0;
  let order = 'asc';

  if (value.startsWith('name')) column = 0;
  else if (value.startsWith('age')) column = 1;
  else if (value.startsWith('city')) column = 2;

  if (value.endsWith('desc')) order = 'desc';

  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    let cellA = a.children[column].textContent.trim().toLowerCase();
    let cellB = b.children[column].textContent.trim().toLowerCase();

    if (column === 1) {
      cellA = parseInt(cellA, 10);
      cellB = parseInt(cellB, 10);
      return order === 'asc' ? cellA - cellB : cellB - cellA;
    } else {
      return order === 'asc' ? cellA.localeCompare(cellB) : cellB.localeCompare(cellA);
    }
  });

  tbody.innerHTML = '';
  rows.forEach(row => tbody.appendChild(row));
});
