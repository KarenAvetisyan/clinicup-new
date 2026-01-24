"use strict";

const MIN_USERS = 5;

const formatPrice = n => n.toLocaleString('ru-RU');

const config = {
  support:  "_support",
  months:   "_months",
  obuchenie:"_obuchenie",
  ipt:      "_ipt",
  kkt:      "_kkt",
  egis3:    "_egis3",
  sms:      "_sms"
};

const getRadio = name =>
  document.querySelector(`input[name="${name}"]:checked`);

export function initCalculator() {
  const userInput     = document.querySelector('[data-target="point_users"]');
  const calcPriceTotal = document.getElementById('calcPriceTotal');
  const hiddenFields  = document.querySelector(".js-calcHiddenFields");
  if (!userInput || !calcPriceTotal) return;

  const setRow = (point, text, value) => {
    const row = document.querySelector(`[data-target-point="${point}"]`);
    if (!row) return;

    const textEl  = row.querySelector('[data-point-text-value]');
    const valueEl = row.querySelector('[data-point-value]');

    textEl  && (textEl.textContent  = text);
    valueEl && (valueEl.textContent = value);
  };

  const setHidden = (name, value) => {
    const input = hiddenFields?.querySelector(`[name="${name}"]`);
    input && (input.value = value);
  };

  const updatePrice = () => {
    const users = Math.max(+userInput.value || MIN_USERS, MIN_USERS);
    userInput.value = users;

    const eachUserPrice = +userInput.dataset.eachUserPrice || 0;

    let sum    = users * eachUserPrice;
    let months = 1;

    setRow('point_users', users, formatPrice(sum));
    setHidden('users', users);

    Object.entries(config).forEach(([key, radioName]) => {
      const radio = getRadio(radioName);
      if (!radio) return;

      const text  = radio.dataset.textValue || '';
      const value = +radio.dataset.value || 0;

      setRow(
        `point_${key}`,
        text,
        key === 'months' ? value : formatPrice(value)
      );

      setHidden(key, text);

      key === 'months' ? (months = value) : (sum += value);
    });

    const total = sum * months;

    calcPriceTotal.textContent = formatPrice(total);
    setHidden('totalPrice', total);
  };

  document.addEventListener('change', e => {
    if (e.target.matches('input[type="radio"]')) {
      updatePrice();
    }
  });

  document.querySelector('.js-increase')?.addEventListener('click', () => {
    userInput.value++;
    updatePrice();
  });

  document.querySelector('.js-decrease')?.addEventListener('click', () => {
    if (+userInput.value > MIN_USERS) {
      userInput.value--;
      updatePrice();
    }
  });

  updatePrice();
}
