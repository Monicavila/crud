import preLoadedCars from './cars.js';

/*Primero acceder a local storage y cargar los datos de local storage si hay, 
sino escribir los datos desde el arreglo de cars.js
get item = null, escribir hacia local storage*/

function loadPreList() {
    //From localStorage
    const loadCarsFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem ('carsLabel'));
    };
    //From Array preLoadesCars and set at localStorage
    const loadArrayCarList = () => {
        if (!localStorage.getItem('carsLabel')) {
            const arrayCars = preLoadedCars();
            localStorage.setItem('carsLabel', JSON.stringify(arrayCars, null, 2)
            );
        }
        return loadCarsFromLocalStorage();
    };
    // Display for users    
    const displayCarList = (carsToPrint) => {
        const carList = document.getElementById('pre-list');
        const formatterDolar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        if (carList) {
            let rows = '';
             carsToPrint.forEach( car => {
                rows += `<tr>
                            <th>${car.brand}</th>
                            <th>${car.model}</th>
                            <th>${car.color}</th>
                            <th>${car.year}</th>
                            <th>${formatterDolar.format(car.price)}</th>
                            <th>
                            <button onclick="removeCar(${car.id})" class="btn btn-danger">Delete</button>
                            </th>
                            <th>
                            <button onclick="editCar(${car.id})" class="btn btn-warning">Edit</button>
                            </th>
                        </tr>`;
            });
            carList.innerHTML = rows;
        }
    };
    let cars = loadArrayCarList ();
    displayCarList(cars);
}
loadPreList();

document.querySelector('#btn-add').addEventListener('click', function () {
    var id = getId(),
        brand = document.getElementById('brand'),
        model = document.getElementById('model'),
        color = document.getElementById('color'),
        year = document.getElementById('year'),
        price = document.getElementById('price');

    // Validate
    if (brand.value.length === 0 || model.value.length === 0 || color.value.length === 0 || year.value.length === 0 || !parseInt(price.value)) return;

    var car = {
        id: id.value,
        brand: brand.value,
        model: model.value,
        color: color.value,
        year: year.value,
        price: price.value
    };

    // Clean data
        id.value = '';
        brand.value = '';
        model.value = '';
        color.value = '';
        year.value = '';
        price.value = '';

    // Append to my localStorage
    addNewCarToLocalStorage(car);
});

function addNewCarToLocalStorage(obj) {
    var localStorageNewCar = 'data';
    var cars = [],
        dataInLocalStorage = localStorage.getItem(localStorageNewCar);

    if (dataInLocalStorage !== null) {
        cars = JSON.parse(dataInLocalStorage);
    }

}
