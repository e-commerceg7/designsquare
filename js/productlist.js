const womenLink = document.getElementById('women-link')
const menLink = document.getElementById('men-link')
const childrenLink = document.getElementById('children-link')
const womenFilter = document.getElementById('women-filter')
const menFilter = document.getElementById('men-filter')
const childrenFilter = document.getElementById('children-filter')

womenLink.addEventListener('click', ()=>{
    womenFilter.classList.add('active');
    menFilter.classList.remove('active');
    childrenFilter.classList.remove('active');
})

menLink.addEventListener('click', () => {
    menFilter.classList.add('active');
    womenFilter.classList.remove('active');
    childrenFilter.classList.remove('active');
  });

childrenLink.addEventListener('click', () => {
    childrenFilter.classList.add('active');
    womenFilter.classList.remove('active');
    menFilter.classList.remove('active');
  });