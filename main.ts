// Завдання

// Потрібно реалізувати функціонал як на відео UserListчерез typescriptвикористовуючи класи та інтерфейси, а саме:
// 1.	При кліку на кнопку Adduserзапускаєте функцію addUser() яка робить наступне:
// a.	Стягуєте дані з полів і формує об’єкт.
// b.	Цей об’єкт пушитю в масив.
// c.	Поля зачищає.
// d.	Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.

// 2.	При кліку накнопку Deleteзапускаєте функцію deleteUser()яка робить наступне:
// a.	Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// b.	По цьому індексу видаляємо елемент з масиву.
// c.	Запускаєм заново функцію render().

// 3.	При кліку накнопку Editзапускаєте функцію editUser()яка робить наступне:
// a.	Дізнаєтеся в якому рядку ви клікнули(тобто індекс).
// b.	По цьому індексу витягуємо конкретрний елемент(тобто об’єкт) з масиву.
// c.	З об’єкт достаємо дані і передаємо в форму(тобто у valueінпутів).
// d.	Запам’ятовуємо даний індекс в змінну userIndex.
// e.	Показуємо кнопку Edituserі приховуємо Adduser.

// 4.	При кліку накнопку EditUserзапускаєте функцію saveEditUser()яка робить наступне:
// a.	Стягуєте дані з полів і формує об’єкт через клас.
// b.	Цей об’єкт додається на місце старого об’єкту через userIndex.
// c.	Поля зачищає.
// d.	Запускаєм функцію render() яка генерую всю інфу в таблицю відносно вашого масиву.


let f1 = document.forms[`f1`]
let arr: Array<IObj> = []
let EditId: number
let tbl = document.querySelector('.thead')
let editBtn = document.querySelector('.edit')

interface IObj {
    log: string;
    pas: string;
    eml: string;
}

class Obj implements IObj{
    constructor(public log : string, 
        public pas: string, 
        public eml:string) {}
}

f1.addUserBt.addEventListener(`click`, UserList)
f1.saveUserBt.addEventListener(`click`, saveEditUser)
tbl.addEventListener('click', deleteUser)
editBtn.addEventListener('click',  editUser)

function UserList():void{
    if (f1.login.value !==''&&
    f1.password.value !==''&&
    f1.email.value !=='') {
        let obj = new Obj(f1.login.value, f1.password.value, f1.email.value)
            arr.push(obj)    
            render()        
            f1.reset()
    }
}

function render(): void {  
    tbl.innerHTML = ''
    arr.forEach((el, i)=> {
        tbl.innerHTML   += `<tr>
        <td>${i+1}</td>
        <td>${el.log}</td>
        <td>${el.pas}</td>
        <td>${el.eml}</td>
        <td><button class="btnEdit" id="${i}"> Edit</button></td>
        <td class="delBut"><button class="btnDelete" id="${i}">Delete</button></td>
      </tr>`
    })
}

function deleteUser(e) : void {
    let event: string = e.path[0].innerHTML
    if(event ==='Delete') {
        const id: number = e.path[0].id
        arr.splice(id ,1)
        render()
    }
}
function editUser(e) :void {
    let event = e.target
    if(event.className === `btnEdit`){     
        const obj: IObj = arr.find((el, i) => +event.id === i)
        EditId = event.id
        f1.login.value = obj.log
        f1.password.value = obj.pas
        f1.email.value = obj.eml 
        toggleForForm(f1.saveUserBt , f1.addUserBt)
    }

    
}

function saveEditUser(e) : void { 
    if (f1.login.value !==''&&
    f1.password.value !=='' &&
    f1.email.value !=='') {
    let obj = new Obj(f1.login.value, f1.password.value, f1.email.value)
    arr[EditId] = obj
    render()
    toggleForForm(f1.addUserBt, f1.saveUserBt)
    f1.reset()
    }
}

function toggleForForm(name1, name2): void{
    name1.style.display = 'block'
    name2.style.display = 'none'
}