
// Функция срабатывает при загрузке страницы
window.onload = function () {
    renderCountries();
}

// Очищаем tbody
const clearFields = selector => {
    $(`${selector}`).html("").val("");
}

// Задаем события
const setListeners = (object) => {

    // Событие для селекта    
    // Меняется опция - фильтруются страны согласно региону
    $('#select').change(e => {
        clearFields('#table tbody');
        clearFields('#search');
        let newRegions = object.filter(elem => elem.region == e.currentTarget.value);
        addToDom(newRegions);
    });

    // Событие для инпута
    $('#search').keyup(e => {
        let query = e.currentTarget.value.toLowerCase();
        let newRegions = object.filter(elem => elem.name.toLowerCase().includes(query) || elem.capital.toLowerCase().includes(query) || elem.region.toLowerCase().includes(query));
        if (newRegions.length > 0) {
            clearFields('#table tbody');
            addToDom(newRegions);
        }
    })

};


// Главная функция
const renderCountries = () => {
    // Получаем страны (GET request)
    $.ajax('https://restcountries.eu/rest/v2/all')
        .then(data => {
            console.log(data); // Просто выводим в консоль объекты с результатами
            addToDom(data);
            filterRegions(data);
            setListeners(data);
        })
        .catch(err => console.log(err)); // Если GET запрос не удался - выводим ошибку
}


// Фильтрация регионов через select
function filterRegions(object) {

    // Создаем новый массив с регионами
    const regions = object.map(el => {
        // Если у страны нет региона, то вместо пробела оставляем "No Region"    
        el.region ? el.region === "" : el.region = "No Region";
        return el.region;
    });

    console.log(removeDuplicates(regions));

    removeDuplicates(regions).forEach((elem, index) => {
        // Наполняем селект регионами    
        $('#select').append(`<option value="${elem}">${elem}</option>`);
    })

}

// Убираем повторы из массива
const removeDuplicates = arr => [...new Set(arr)];


// Добавляем свойства объекта в DOM
const addToDom = object => {
    object.forEach((elem, index) => {
        $('#table tbody').append(`<tr>
<td>${index + 1}</td>
<td>${elem.name}</td>
<td>${elem.capital}</td>
<td>${elem.region}</td>
<td>${elem.population}</td>
<td>${elem.area}</td>
<td><img src="${elem.flag}" width="50px"></img></td>
</tr>`);
    })
}
