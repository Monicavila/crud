import cars from './cars.js';


const loadCar = {}

function printCars () {
    const preList = document.getElementById('pre-list');
    preList.innerHTML = '';

    cars.forEach( car => {
        let row = `<tr>
                        <th>${car.brand}</th>
                        <th>${car.model}</th>
                        <th>${car.color}</th>
                        <th>${car.year}</th>
                        <th>${car.price}</th>
                    </tr>`;
        preList.innerHTML += row;
    })
}
printCars();

window.onload = function () {
    
    var localStorageKeyBrand = 'data';

    loadFromLocalStorage();

    document.querySelector('#btn-add').addEventListener('click', function () {
        var brand = document.getElementById('brand'),
            model = document.getElementById('model'),
            color = document.getElementById('color'),
            year = document.getElementById('year'),
            price = document.getElementById('price');

        // Validate
        if (brand.value.length === 0 || model.value.length === 0 || color.value.length === 0 || year.value.length === 0 || !parseInt(price.value)) return;

        var car = {
            brand: brand.value,
            model: model.value,
            color: color.value,
            year: year.value,
            price: price.value
        };

        // Clean data
        brand.value = '';
        model.value = '';
        color.value = '';
        year.value = '';
        price.value = '';

        // Append to my localStorage
        appendObjectToLocalStorage(car);
    })

    function appendObjectToLocalStorage(obj) {
        var cars = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyBrand);

        if (dataInLocalStorage !== null) {
            cars = JSON.parse(dataInLocalStorage);
        }

        cars.push(obj);

        localStorage.setItem(localStorageKeyBrand, JSON.stringify(cars));

        loadFromLocalStorage();
    }

    function loadFromLocalStorage() {
        var cars = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyBrand),
            gridBody = document.querySelector('#grid tbody');

        if (dataInLocalStorage !== null) {
            cars = JSON.parse(dataInLocalStorage);
        }

        // Draw TR from TBODY
        gridBody.innerHTML = '';

        cars.forEach(function (x, i) {
            var tr = document.createElement('tr'),
                tdBrand = document.createElement('td'),
                tdModel = document.createElement('td'),
                tdColor = document.createElement('td'),
                tdYear = document.createElement('td'),
                tdPrice = document.createElement('td'),
                tdRemove = document.createElement('td'),
                btnRemove = document.createElement('button');
            
            const formatterDolar = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            })

            tdBrand.innerHTML = x.brand;
            tdModel.innerHTML = x.model;
            tdColor.innerHTML = x.color;
            tdYear.innerHTML = x.year;
            tdPrice.innerHTML = formatterDolar.format(x.price);

            
            // *** Remove
            btnRemove.textContent = 'Remove';     // Set atributes
            btnRemove.className = 'btn btn-xs btn-danger';
            btnRemove.addEventListener('click', function(){
                removeFromLocalStorage(i);
            });

            tdRemove.appendChild(btnRemove);

            tr.appendChild(tdBrand);
            tr.appendChild(tdModel);
            tr.appendChild(tdColor);
            tr.appendChild(tdYear);
            tr.appendChild(tdPrice);
            tr.appendChild(tdRemove);

            gridBody.appendChild(tr);
        });
    }

    function removeFromLocalStorage(index){
        var cars = [],
            dataInLocalStorage = localStorage.getItem(localStorageKeyBrand);

        cars = JSON.parse(dataInLocalStorage);

        cars.splice(index, 1);

        localStorage.setItem(localStorageKeyBrand, JSON.stringify(cars));

        loadFromLocalStorage();
    }
}