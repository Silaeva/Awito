"use strict";

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const closeBtnAdd = modalAdd.querySelector(".modal__close");
const submitBtnAdd = modalAdd.querySelector(".modal__btn-submit");
const formAdd = modalAdd.querySelector(".modal__submit");

const catalog = document.querySelector(".catalog");
const modalItem = document.querySelector(".modal__item");
const closeBtnItem = modalItem.querySelector(".modal__close");

const modalInputElements = [...formAdd.elements].filter(elem => elem.tagName !== 'BUTTON');
const modalBtnWarning = modalAdd.querySelector(".modal__btn-warning");

let dataBase = [];

// modalAdd

const openModalAdd = () => {
  modalAdd.classList.remove("hide");
  submitBtnAdd.disabled = true;
  document.addEventListener("keydown", closeFormEscHandler);
  formAdd.addEventListener("input", formInputHandler);
  formAdd.addEventListener("submit", formSubmitHandler);
};

addAd.addEventListener("click", openModalAdd);

const closeModalAdd = () => {
  modalAdd.classList.add("hide");
  formAdd.reset();
  modalBtnWarning.style.display = "";
  document.removeEventListener("keydown", closeFormEscHandler);
  formAdd.removeEventListener("input", formInputHandler);
  formAdd.removeEventListener("submit", formSubmitHandler);
};

modalAdd.addEventListener("click", (evt) => {
  if (evt.target === closeBtnAdd || evt.target === modalAdd) {
    closeModalAdd();
  }
});

const closeFormEscHandler = (evt) => {
  if (evt.keyCode === 27) {
    closeModalAdd();
    closeModalItem();
  }
};

const formInputHandler = () => {
    const validForm = modalInputElements.every(elem => elem.value); // если есть значение dj всех инпутах то true
    submitBtnAdd.disabled = !validForm; // когда все поля заполнены validForm true - инвертируем и разблокируем кнопку
    modalBtnWarning.style.display = validForm ? 'none' : '';
}

const formSubmitHandler = (evt) => {
    evt.preventDefault();
    let itemObj = {};
    for (const elem of modalInputElements) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    
    closeModalAdd();
};

//modalItem

const openModalItem = (evt) => {
  if (evt.target.closest(".card")) {
    modalItem.classList.remove("hide");
  }
  document.addEventListener("keydown", closeFormEscHandler);
};

catalog.addEventListener("click", openModalItem);

const closeModalItem = () => {
  modalItem.classList.add("hide");
  document.removeEventListener("keydown", closeFormEscHandler);
};

modalItem.addEventListener("click", (evt) => {
  if (evt.target === closeBtnItem || evt.target === modalItem) {
    closeModalItem();
  }
});
