"use strict";

const modalAdd = document.querySelector(".modal__add");
const addAd = document.querySelector(".add__ad");
const closeBtnAdd = modalAdd.querySelector(".modal__close");
const submitBtnAdd = modalAdd.querySelector(".modal__btn-submit");
const formAdd = modalAdd.querySelector(".modal__submit");

const catalog = document.querySelector(".catalog");
const modalItem = document.querySelector(".modal__item");
const closeBtnItem = modalItem.querySelector(".modal__close");

const modalInputElements = [...formAdd.elements].filter(
  (elem) => elem.tagName !== "BUTTON"
);
const modalBtnWarning = modalAdd.querySelector(".modal__btn-warning");

const dataBase = JSON.parse(localStorage.getItem("awito")) || []; // получаем из локала строку и переводим сразу в объект. Если в сторадже null тогда получаем пустой массив куда можно запушить

const saveDataBase = () =>
  localStorage.setItem("awito", JSON.stringify(dataBase)); // переводим в строку

const modalFileInput = modalAdd.querySelector(".modal__file-input");
const modalFileBtn = modalAdd.querySelector(".modal__file-btn");
const modalImageAdd = modalAdd.querySelector(".modal__image-add");
const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

const photoInfo = {};

// modalAdd

const openModalAdd = () => {
  modalAdd.classList.remove("hide");
  submitBtnAdd.disabled = true;
  document.addEventListener("keydown", closeFormEscHandler);
  formAdd.addEventListener("input", formInputHandler);
  formAdd.addEventListener("submit", formSubmitHandler);
  modalFileInput.addEventListener("change", addPhotoChangeHandler);
};

addAd.addEventListener("click", openModalAdd);

const closeModalAdd = () => {
  modalAdd.classList.add("hide");
  formAdd.reset();
  modalBtnWarning.style.display = "";
  document.removeEventListener("keydown", closeFormEscHandler);
  formAdd.removeEventListener("input", formInputHandler);
  formAdd.removeEventListener("submit", formSubmitHandler);
  modalFileBtn.textContent = textFileBtn;
  modalImageAdd.src = srcModalImage;
  modalFileInput.removeEventListener("change", addPhotoChangeHandler);
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
  const validForm = modalInputElements.every((elem) => elem.value); // если есть значение dj всех инпутах то true
  submitBtnAdd.disabled = !validForm; // когда все поля заполнены validForm true - инвертируем и разблокируем кнопку
  modalBtnWarning.style.display = validForm ? "none" : "";
};

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  let itemObj = {};
  for (const elem of modalInputElements) {
    itemObj[elem.name] = elem.value;
  }
  itemObj.image = photoInfo.base64;
  dataBase.push(itemObj);
  saveDataBase(); // сохраняем объект с add в localStorage
  closeModalAdd();
  renderCard();
};

// render

const renderCard = () => {
  catalog.textContent = "";
  dataBase.forEach((item, i) => {
    catalog.insertAdjacentHTML(
      "beforeend",
      `
    <li class="card" data-id="${i}">
        <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test">
        <div class="card__description">
            <h3 class="card__header">${item.nameItem}</h3>
            <div class="card__price">${item.costItem} ₽</div>
        </div>
    </li>
        `
    );
  });
};

renderCard();

// Add Photo

const addPhotoChangeHandler = (evt) => {
  const reader = new FileReader();

  const file = evt.target.files[0];

  photoInfo.name = file.name;
  photoInfo.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener("load", (evt) => {
    if (photoInfo.size < 200000) {
      modalFileBtn.textContent = photoInfo.name;
      photoInfo.base64 = btoa(event.target.result);
      modalImageAdd.src = `data:image/jpeg;base64,${photoInfo.base64}`;
    } else {
      modalFileBtn.textContent = "Воу воу! Не больше 200кб";
      modalFileInput.value = "";
    }
  });
};

//modalItem

// заполняем большую карточку товара данными из dataBase
const fillBigAddWithData = (evt) => {
  let cardId = evt.target.parentElement.dataset.id;
  if (!cardId) {
    cardId = target.parentElement.parentElement.dataset.id;
  }

  if (evt.target.closest(".card")) {
    modalItem.querySelector(".modal__image-item").src =
      "data:image/jpeg;base64," + dataBase[cardId].image;
    modalItem.querySelector(".modal__header-item").textContent =
      dataBase[cardId].nameItem;
    if (dataBase[cardId].status === "old") {
      modalItem.querySelector(".modal__status-item").textContent = "б/у";
    } else {
      modalItem.querySelector(".modal__status-item").textContent = "отличное";
    }

    modalItem.querySelector(".modal__description-item").textContent =
      dataBase[cardId].descriptionItem;
    modalItem.querySelector(".modal__cost-item").textContent =
      dataBase[cardId].costItem + " ₽";
  }
};

const openModalItem = (evt) => {
  if (evt.target.closest(".card")) {
    modalItem.classList.remove("hide");
    fillBigAddWithData(evt);
    document.addEventListener("keydown", closeFormEscHandler);
  }
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
