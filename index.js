const form = document.querySelector('form');
const input = document.querySelector('#search-input');
const resultList = document.querySelector('#search-results');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const inputVal = input.value;
    if (inputVal.length < 3) {
        alert('Введите репозиторий состоящий более,чем из 3 знаков');
        return;
    }
    resultList.innerHTML = '';
    fetch(`https://api.github.com/search/repositories?q=${inputVal}`)
        .then(res => res.json())
        .then(data => {
            if (data.items.length === 0) {
                resultList.textContent = 'Ничего не найдено';
            } else {
                const ol=document.createElement('ol')
                data.items.slice(0, 10).forEach(repos => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                        a.href = repos.html_url;
                        a.target = '_blank';
                        a.textContent = repos.name;
                        li.appendChild(a);
                    const p = document.createElement('p');
                        p.textContent = `Описание:${repos.description} | Язык:${repos.language}`;
                        li.appendChild(p);
                        ol.appendChild(li)
                        resultList.appendChild(ol);
                });
            }
        })
        .catch(error => {
            console.error(error);
            alert('Произошла ошибка');
        });
});


// Второй вариант
// const mainEl=document.querySelector('.main');
// const formEl=document.createElement('form');
// formEl.classList.add('search');
// formEl.addEventListener('submit',async (e)=>{
// e.preventDefault();
// const inputValue=Object.fromEntries(new FormData(e.target));
// if(inputValue.name==""){
//     alert("Ничего не найдено")
// }else{
//     fetch(`https://api.github.com/search/repositories?q=${inputVal}`).then(res=>{
//         return res.json();
//     })
//     .then(data=>{
//         data=data.items.slice(0,10)
//         console.log(data);
//         if (data.length == 0){
//             const markup =`
//                 <p class="user">Ничего не найдено</p>`
//                 document.querySelector('a').insertAdjacentHTML('beforeend',markup)
//         }else{
//             data.forEach(user=>{
//                 const markup =`<li>
//                 <p class="user">Имя пользователя:<p class="user-info">${user.owner.login}</p></p>
//                 <p class="user">Описание:<p class="user-info">${user.description}</p></p>
//                 <p class="user">Репозиторий:<a href=${user.html_url} target="_blank"><p class="user-info">${user.full_name}</p></a></p>
//                 </li>`
//                 document.querySelector('ol').insertAdjacentHTML('beforeend',markup)
//             })
//         }
//     })
// }
// })
// const inputEl=document.createElement('input');
// inputEl.classList.add('seacrh-input');
// inputEl.placeholder='Введите репозиторий...'
// inputEl.setAttribute('name','name')
// const searchButtonEl=document.createElement('button');
// searchButtonEl.classList.add('search-button');
// searchButtonEl.setAttribute('type','submit');
// searchButtonEl.innerText="Поиск";

// formEl.appendChild(inputEl);
// formEl.appendChild(searchButtonEl);
// mainEl.appendChild(formEl);
