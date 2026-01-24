"use strict";

export function initFormValidation() {
  const forms = document.querySelectorAll("._form");
  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener('submit', e => handleSubmit(e, form));
  });

  initPhoneMask();
}

function handleSubmit(e, form) {
  e.preventDefault();

  // const submitBtn = document.activeElement.closest('button[type="submit"][data-btnfrom]');
  // const btnFromValue = submitBtn?.dataset.btnfrom || '';
  // form.querySelectorAll('.js-buttonfrom').forEach(input => input.value = btnFromValue);

  const error = formValidate(form);

  if (error === 0) {
    form.submit(); 
    form.reset();
  }
}


/* ================= Validation ================= */

function formValidate(form) {
  let error = 0;
  const formReq = form.querySelectorAll('._req');

  formReq.forEach(input => {
    removeErrors(input);

    if (input.type === 'checkbox') {
      if (!input.checked) {
        addRequiredError(input);
        error++;
      }
    }

    else if (input.classList.contains('_email')) {
      if (!input.value.trim()) {
        addRequiredError(input);
        error++;
      } else if (!isValidEmail(input.value)) {
        addError(input);
        error++;
      }
    }

    else if (input.classList.contains('_phone')) {
      if (!input.value.trim()) {
        addRequiredError(input);
        error++;
      } else if (!isPhoneLengthValid(input.value)) {
        addError(input);
        error++;
      }
    }

    else {
      if (!input.value.trim()) {
        addRequiredError(input);
        error++;
      }
    }
  });

  return error;
}

function isPhoneLengthValid(value) {
  return value.replace(/\D/g, '').length === 11;
}

function isValidEmail(value) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(value);
}

function addRequiredError(input) {
  input.closest('._form-group')?.classList.add('req_error');
}

function addError(input) {
  input.closest('._form-group')?.classList.add('error_error');
}

function removeErrors(input) {
  const group = input.closest('._form-group');
  group?.classList.remove('req_error', 'error_error');
}

/* ================= Phone mask ================= */

function initPhoneMask() {
  const inputs = document.querySelectorAll(".phone-mask");
  if (!inputs.length) return;

  inputs.forEach(input => {
    input.addEventListener("input", () => maskPhone(input));
    input.addEventListener("keydown", e => clearOnDelete(e, input));
  });
}

function maskPhone(input) {
  let value = input.value.replace(/\D+/g, "");
  const maxLength = 11;
  let result = "+";

  if (value.startsWith("8")) result = "";

  const prefixNumber = n => {
    if (n === "7") return "7 (";
    if (n === "8") return "8 (";
    if (n === "9") return "7 (9";
    return "7 (";
  };

  for (let i = 0; i < value.length && i < maxLength; i++) {
    switch (i) {
      case 0: result += prefixNumber(value[i]); continue;
      case 4: result += ") "; break;
      case 7:
      case 9: result += "-"; break;
    }
    result += value[i];
  }

  input.value = result;
}

function clearOnDelete(e, input) {
  if (["Backspace", "Delete"].includes(e.key) || (e.ctrlKey && e.key === "a")) {
    const digits = input.value.replace(/\D+/g, "");
    if (digits.length <= 1) input.value = "";
  }
}
