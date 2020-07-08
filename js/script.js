"use strict";

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const closeBtnAdd = modalAdd.querySelector(".modal__close");
const submitBtnAdd = modalAdd.querySelector(".modal__btn-submit");
const formAdd = modalAdd.querySelector(".modal__submit");

const catalog = document.querySelector(".catalog");
const modalItem = document.querySelector(".modal__item");
const closeBtnItem = modalItem.querySelector(".modal__close");

// modalAdd

addAd.addEventListener("click", () => {
  modalAdd.classList.remove("hide");
  submitBtnAdd.disabled = true;
});

const closeModalAdd = () => {
  modalAdd.classList.add("hide");
  formAdd.reset();
};

const closeModalItem = () => {
    modalItem.classList.add("hide");
}

modalAdd.addEventListener("click", (evt) => {
  if (evt.target === closeBtnAdd || evt.target === modalAdd) {
    closeModalAdd();
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.keyCode === 27) {
    closeModalAdd();
    closeModalItem();
  }
});

//modalItem

catalog.addEventListener("click", (evt) => {
  if (evt.target.closest(".card")) {
    modalItem.classList.remove("hide");
  }
});

modalItem.addEventListener("click", (evt) => {
  if (evt.target === closeBtnItem || evt.target === modalItem) {
    closeModalItem();
  }
});
