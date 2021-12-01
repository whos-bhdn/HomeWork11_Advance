let f1 = document.forms[`f1`];
let arr = [];
let EditId;
let tbl = document.querySelector('.thead');
let editBtn = document.querySelector('.edit');
class Obj {
    log;
    pas;
    eml;
    constructor(log, pas, eml) {
        this.log = log;
        this.pas = pas;
        this.eml = eml;
    }
}
f1.addUserBt.addEventListener(`click`, UserList);
f1.saveUserBt.addEventListener(`click`, saveEditUser);
tbl.addEventListener('click', deleteUser);
editBtn.addEventListener('click', editUser);
function UserList() {
    if (f1.login.value !== '' &&
        f1.password.value !== '' &&
        f1.email.value !== '') {
        let obj = new Obj(f1.login.value, f1.password.value, f1.email.value);
        arr.push(obj);
        render();
        f1.reset();
    }
}
function render() {
    tbl.innerHTML = '';
    arr.forEach((el, i) => {
        tbl.innerHTML += `<tr>
        <td>${i + 1}</td>
        <td>${el.log}</td>
        <td>${el.pas}</td>
        <td>${el.eml}</td>
        <td><button class="btnEdit" id="${i}"> Edit</button></td>
        <td class="delBut"><button class="btnDelete" id="${i}">Delete</button></td>
      </tr>`;
    });
}
function deleteUser(e) {
    let event = e.path[0].innerHTML;
    if (event === 'Delete') {
        const id = e.path[0].id;
        arr.splice(id, 1);
        render();
    }
}
function editUser(e) {
    let event = e.target;
    if (event.className === `btnEdit`) {
        const obj = arr.find((el, i) => +event.id === i);
        EditId = event.id;
        f1.login.value = obj.log;
        f1.password.value = obj.pas;
        f1.email.value = obj.eml;
        toggleForForm(f1.saveUserBt, f1.addUserBt);
    }
}
function saveEditUser(e) {
    if (f1.login.value !== '' &&
        f1.password.value !== '' &&
        f1.email.value !== '') {
        let obj = new Obj(f1.login.value, f1.password.value, f1.email.value);
        arr[EditId] = obj;
        render();
        toggleForForm(f1.addUserBt, f1.saveUserBt);
        f1.reset();
    }
}
function toggleForForm(name1, name2) {
    name1.style.display = 'block';
    name2.style.display = 'none';
}
