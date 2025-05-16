const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);


let allElems = $$('.elem')
let fullElemPage = $$('.fullElem');
let fullElemPageBackBtn = $$('.fullElem .back');
allElems.forEach(function(elem){
    elem.addEventListener('click', function(){
        // console.log(elem.id);
         fullElemPage[elem.id].style.display = 'block';
    })
})
 
fullElemPageBackBtn.forEach(function(back){
    back.addEventListener('click', function(){
        fullElemPage[back.id].style.display = 'none';
    })
})