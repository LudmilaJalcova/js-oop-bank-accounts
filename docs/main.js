window.onload = () => {
  console.log(document.querySelectorAll('#table-menu'));
  console.log(document.querySelectorAll('#table-menu')[0].rows);
  Array.from(document.querySelectorAll('#table-menu')[0].rows).map(row => {
    if (localStorage.getItem(row.cells[0].innerText) !== null) {
      row.cells[1].innerText = localStorage.getItem(row.cells[0].innerText);
    }
  });

  function Ucet(euro, dollar, sk, cz) {
    this.euro = euro;
    this.dollar = dollar;
    this.sk = sk;
    this.cz = cz;
  }

  function Pokladnik() {}

  function saveToLocalStorage(mena, suma) {
    const lastSuma = localStorage.getItem(mena);
    if (lastSuma === null) {
      localStorage.setItem(mena, suma);
    } else {
      const result = Number(lastSuma) + Number(suma);
      localStorage.setItem(mena, result);
    }
  }

  function removeFromLocalStorage(mena, suma) {
    const lastSuma = localStorage.getItem(mena);
    if (lastSuma === null) {
      localStorage.setItem(mena, suma);
    } else {
      const result = Number(lastSuma) - Number(suma);
      localStorage.setItem(mena, result);
    }
  }

  Pokladnik.prototype.vklad = function(mena, suma) {
    const tableMenu = Array.from(
      document.querySelectorAll('#table-menu')[0].rows
    );
    tableMenu.map(row => {
      if (row.cells[0].innerText === mena) {
        row.cells[1].innerText = Number(row.cells[1].innerText) + Number(suma);
      }
    });

    const newStyle = document.getElementById('newStyles');
    newStyle.remove();
    document
      .getElementsByClassName('dropdown-toggle')[0]
      .setAttribute('value', null);

    saveToLocalStorage(mena, suma);
  };

  Pokladnik.prototype.vyber = function(mena, suma) {
    const tableMenu = Array.from(
      document.querySelectorAll('#table-menu')[0].rows
    );
    tableMenu.map(row => {
      if (row.cells[0].innerText === mena) {
        row.cells[1].innerText = Number(row.cells[1].innerText) - Number(suma);
      }
    });

    const newStyle = document.getElementById('newStyles');
    newStyle.remove();
    document
      .getElementsByClassName('dropdown-toggle')[0]
      .setAttribute('value', null);

    removeFromLocalStorage(mena, suma);
  };

  document.getElementById('input').addEventListener('keypress', e => {
    document.getElementById('error-message').classList.add('d-none');
    e.target.classList.remove('is-invalid');
    document.getElementById('btn-menu').style.borderColor = '';
  });

  document.getElementById('input').addEventListener('focus', e => {
    document.getElementById('error-message').classList.add('d-none');
    e.target.classList.remove('is-invalid');
    document.getElementById('btn-menu').style.borderColor = '';
  });

  document.getElementById('dropdown-menu').addEventListener('click', () => {
    document.getElementById('error-message').classList.add('d-none');
    document.getElementById('input').classList.remove('is-invalid');
    document.getElementById('btn-menu').style.borderColor = '';
  });

  const validation = function(mena, suma) {
    const input = document.getElementById('input');
    const error = document.getElementById('error-message');
    const poleMena = ['$', 'sk', 'cz', '€'];
    console.log(mena, suma);
    if (poleMena.includes(mena) && suma.length > 0) {
      return true;
    } else {
      document.getElementById('btn-menu').style.borderColor = '#dc3545';
      input.classList.add('is-invalid');
      error.classList.remove('d-none');
      setTimeout(function() {
        document.getElementById('error-message').classList.add('d-none');
        document.getElementById('input').classList.remove('is-invalid');
        document.getElementById('btn-menu').style.borderColor = '';
      }, 3000);
      return false;
    }
  };

  document
    .getElementsByClassName('dropdown-toggle')[0]
    .nextSibling.nextSibling.addEventListener('click', e => {
      const znakMeny = e.target.innerText;
      const newStyles = document.createElement('style');
      newStyles.setAttribute('id', 'newStyles');
      newStyles.innerHTML = `
        .dropdown-toggle:after {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border: 0;
          content: '${znakMeny}';          
        }
      `;
      document.head.appendChild(newStyles);
      document
        .getElementsByClassName('dropdown-toggle')[0]
        .setAttribute('value', znakMeny);
    });

  //btn vklad
  document.getElementById('btn-vklad').addEventListener('click', () => {
    let znakMeny = document.getElementsByClassName('dropdown-toggle')[0].value;
    let suma = document.getElementById('input').value;
    if (validation(znakMeny, suma)) {
      const pokladnik = new Pokladnik();
      pokladnik.vklad(znakMeny, suma);
    }
  });

  //btn vyber
  document.getElementById('btn-vyber').addEventListener('click', () => {
    let znakMeny = document.getElementsByClassName('dropdown-toggle')[0].value;
    let suma = document.getElementById('input').value;

    const pokladnik = new Pokladnik();
    pokladnik.vyber(znakMeny, suma);
  });
};
