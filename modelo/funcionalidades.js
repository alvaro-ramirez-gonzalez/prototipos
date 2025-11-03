// script.js - Interactividad para diseño turístico tipo Airbnb/Trivago (COP Edition)

document.addEventListener("DOMContentLoaded", () => {

  /* ========== 1. CAMBIO DE IMAGEN PRINCIPAL ========== */
  const heroImg = document.querySelector(".hero-img");
  const thumbs = document.querySelectorAll(".thumb img");

  thumbs.forEach(img => {
    img.addEventListener("click", () => {
      heroImg.src = img.src;
      heroImg.classList.add("fade");
      setTimeout(() => heroImg.classList.remove("fade"), 300);
    });
  });

  /* ========== 2. CALCULAR PRECIO TOTAL EN PESOS COLOMBIANOS ========== */
  const checkin = document.querySelector("#checkin");
  const checkout = document.querySelector("#checkout");
  const guests = document.querySelector("#guests");
  const totalDisplay = document.querySelector(".total");

  const pricePerNight = 250000; // 💵 Precio base por noche (en pesos colombianos)
  const formatterCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  });

  function calculateTotal() {
    const inDate = new Date(checkin.value);
    const outDate = new Date(checkout.value);
    const guestCount = parseInt(guests.value) || 1;

    if (checkin.value && checkout.value && outDate > inDate) {
      const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);
      const total = nights * pricePerNight * guestCount;
      totalDisplay.textContent = formatterCOP.format(total);
    } else {
      totalDisplay.textContent = "$0";
    }
  }

  [checkin, checkout, guests].forEach(input => {
    input.addEventListener("change", calculateTotal);
  });

  /* ========== 3. BOTÓN RESERVAR ========== */
  const bookBtn = document.querySelector(".book-btn");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  document.body.appendChild(toast);

  bookBtn.addEventListener("click", () => {
    const total = totalDisplay.textContent;
    if (total === "$0") {
      showToast("Selecciona fechas válidas antes de reservar 🗓️", true);
      return;
    }
    showToast(`Reserva completada por ${total}! 🇨🇴✨`);
  });

  /* ========== 4. FUNCIÓN TOAST (NOTIFICACIÓN) ========== */
  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.background = isError ? "#b91c1c" : "#047857";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* ========== 5. EFECTO SUAVE AL CAMBIAR IMAGEN PRINCIPAL ========== */
  const style = document.createElement("style");
  style.textContent = `
    .fade { 
      animation: fadeIn 0.3s ease; 
    }
    @keyframes fadeIn {
      from { opacity: 0.4; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
});
