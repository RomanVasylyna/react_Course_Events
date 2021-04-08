
// нужные поля index, name, region, population, area, flag
// 1) вывести табличку с полями
// 2) 

// Задаем события
const setListeners = () => {

};


// Главная функция
const renderCountries = () => {
// Получаем страны (GET request)
$.ajax('https://restcountries.eu/rest/v2/all')
.then(data => {
console.log(data); // Просто выводим в консоль объекты с результатами
addToDom(data);
filterRegions(data);
})
.catch(err => console.log(err)); // Если GET запрос не удался - выводим ошибку
}

// Фильтрация регионов через select
function filterRegions(object) {

// Создаем новый массив с регионами
const regions = object.map(el => el.region);




console.log(regions);

regions.forEach((elem, index) => {
// Наполняем селект регионами    
$('#select').append(`<option value="${index}">${elem.region}</option>`);
})


// $('#select').change(() => {
// const filteredItems = items.filter(item => item.price < 100);
// })    
}


// Добавляем свойства объекта в DOM
const addToDom = object => {
object.forEach((elem, index) => {
$('#table').append(`<tr>
<td>${index+1}</td>
<td>${elem.name}</td>
<td>${elem.capital}</td>
<td>${elem.region}</td>
<td>${elem.population}</td>
<td>${elem.area}</td>
<td><img src="${elem.flag}" width="50px"></img></td>
</tr>`);
})
}
