document.addEventListener("DOMContentLoaded", () => {

  /* ===== 1. CAMBIO DE IMAGEN PRINCIPAL ===== */
  const heroImg = document.querySelector(".hero-img");
  const thumbs = document.querySelectorAll(".thumb img");

  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      heroImg.src = thumb.src;
      heroImg.classList.add("fade");
      setTimeout(() => heroImg.classList.remove("fade"), 300);
    });
  });

  /* ===== 2. CALCULO TOTAL RESERVA ===== */
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");
  const guests = document.getElementById("guests");
  const totalPrice = document.getElementById("totalPrice");

  const pricePerNight = 250000; // Precio base por noche COP
  const formatterCOP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0
  });

  function calculateTotal() {
    const inDate = new Date(checkin.value);
    const outDate = new Date(checkout.value);
    const numGuests = parseInt(guests.value) || 1;

    if (checkin.value && checkout.value && outDate > inDate) {
      const nights = (outDate - inDate) / (1000*60*60*24);
      const total = nights * pricePerNight * numGuests;
      totalPrice.textContent = formatterCOP.format(total);
    } else {
      totalPrice.textContent = "$0";
    }
  }

  [checkin, checkout, guests].forEach(input => input.addEventListener("change", calculateTotal));

  /* ===== 3. TOAST / RESERVA ===== */
  const reserveBtn = document.getElementById("reserveBtn");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  document.body.appendChild(toast);

  reserveBtn.addEventListener("click", () => {
    const total = totalPrice.textContent;
    if (total === "$0") {
      showToast("Selecciona fechas válidas antes de reservar 🗓️", true);
      return;
    }
    showToast(`Reserva completada por ${total} ✅`);
  });

  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.background = isError ? "#b91c1c" : "#047857";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* ===== 4. EXPANDIR DESCRIPCIÓN ===== */
  const expandBtn = document.getElementById("expandDesc");
  const extraDesc = document.getElementById("extraDesc");
  extraDesc.style.display = "none";

  expandBtn.addEventListener("click", () => {
    if(extraDesc.style.display === "none") {
      extraDesc.style.display = "block";
      expandBtn.textContent = "Mostrar menos";
    } else {
      extraDesc.style.display = "none";
      expandBtn.textContent = "Mostrar más";
    }
  });

});
