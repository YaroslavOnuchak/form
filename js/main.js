"use strict";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms.form;

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);
    let formData = new FormData(document.getElementById("form"));
    formData.append("image", formImg.files[0]);
    if (error === 0) {
      // console.log("formData :>> ", formData.form);
      var request = new XMLHttpRequest();
      // POST to httpbin which returns the POST data as JSON
      request.open("POST", "sendmail.php", /* async = */ false);
      // var formData = new FormData(document.getElementById("form"));
      request.send(formData);
      console.log("image :>> ", formData.get("image"));
      form.classList.add("_sending");

      // let response = await fetch("sendmail.php", {
      //   method: "POST",
      //   body: formData,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      // });
      // .then((res) => res.json())
      // .then((response) => {
      //   console.log("response :>> ", response);
      // });

      if (request.status === 200) {
        // console.log("response.status :>> ", response.json());
        // let result = await response.json();
        // alert(result.message);
        formPreview.innerHTML = "";
        form.reset();
        form.classList.remove("_sending");
      } else {
        console.log("mistake :>> ");
        alert("mistake with sending");
        form.classList.remove("_sending");
      }
    } else {
      alert("fill forms");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formRequired = document.querySelectorAll("._req");
    console.log("object :>>1 ");
    for (let index = 0; index < formRequired.length; index++) {
      const input = formRequired[index];
      formRemoveError(input);
      if (input.classList.contains("_mail")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute("type") === "checkbox" &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  // check email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
  ///
  const formImg = document.getElementById("imageE");
  const formPreview = document.getElementById("formPreview");

  formImg.addEventListener("change", () => {
    uploadFile(formImg.files[0]);
  });

  function uploadFile(file) {
    // console.log("object :>>eeeee ");
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("only img");

      formImg.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("only less than 2MB");
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      formPreview.innerHTML = `<img src='${e.target.result}' alt='foto'>`;
    };

    reader.onerror = function (e) {
      alert("some mistake with foto");
    };
    reader.readAsDataURL(file);
  }
});
