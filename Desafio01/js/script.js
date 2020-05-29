let people = document.querySelector('#people');
let statistics = document.querySelector('#statistics');
let inputName = document.querySelector('#name');
let btnSeach = document.querySelector('#btnSeach');
let numberFormat = null;
let listPeople = [];
let selectedPeople = [];

window.addEventListener('load', () => {
    numberFormat = Intl.NumberFormat('pt-BR');
    btnSeach.classList.add('disabled');
    btnSeach.addEventListener('click', seachPeople);
    clearBox();
    startSeach();
    fetchPeople();
})

const startSeach = () => {

    const handleTyping = (event) => {
        let hasText = !!event.target.value && event.target.value.trim() !== '';
        if (hasText) {
            btnSeach.classList.remove('disabled');
            if (event.key === 'Enter') {
                seachPeople();
            }
        } else {
            btnSeach.classList.add('disabled');
            clearBox();
        }
    }
    inputName.focus();
    inputName.addEventListener('keyup', handleTyping);
}

const seachPeople = () => {
    let name = inputName.value.toLowerCase();
    let filter = listPeople.filter(p => {
        return p.name.toLowerCase().includes(name);
    })
    if (filter.length === 0) {
        clearBox();
        people.innerHTML = 'Nenhum usuário filtrado';
        return;
    }
    render(filter);
}

const clearBox = () => {
    people.innerHTML = 'Aguardando pesquisa';
    statistics.innerHTML = 'Nada a ser exibido';
}

const fetchPeople = async () => {
    const res = await fetch("https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo");
    const json = await res.json();
    listPeople = json.results.map(person => {
        const {
            name,
            dob,
            gender,
            picture
        } = person;
        return {
            name: name.first + ' ' + name.last,
            age: dob.age,
            gender: gender === 'female' ? 'F' : 'M',
            img: picture.thumbnail
        }
    });
};

const render = (filter) => {
    renderPeopleList(filter);
    renderStatusList(filter);
}
const renderPeopleList = async (filter) => {
    console.log(filter)
    let peopleListHTML = ''
    if (filter.length === 1) {
        peopleListHTML = `<h4>1 usuário encontrado</h4>`;
    } else {
        peopleListHTML = `<h4>${filter.length} usuários encontrados</h4>`;
    }
    filter.forEach(person => {
        const {
            name,
            age,
            img
        } = person;

        const peopleHTML = `
          <div class='person'>
            <div>
              <img src="${img}" alt="${img}">
            </div>
            <div>
              <p>${name}, ${age}</p>
            </div>
          </div>  
        `;

        peopleListHTML += peopleHTML;
    });
    peopleListHTML += '</div>';
    people.innerHTML = peopleListHTML;
};

const renderStatusList = async (filter) => {
    let totalAge = null;
    let totalMale = null;
    let totalFemale = null;

    filter.forEach(person => {
        totalAge += person.age;
        person.gender === 'M' ? totalMale += 1 : totalFemale += 1;
    });
    let statusListHTML = `
        <div>
            <h4>Estatísticas</h4>
            <div class='status'>
                <p>Sexo masculino: ${totalMale}</p>
                <p>Sexo feminino: ${totalFemale}</p>
                <p>Soma das idades: ${numberFormat.format(totalAge)}</p>
                <p>Média das idades: ${numberFormat.format(totalAge / listPeople.length)}</p>
            </div>
        </div>`;

    statistics.innerHTML = statusListHTML;
};