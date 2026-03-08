// FORM.JS - Contact Form Validation & Submission

document.addEventListener("DOMContentLoaded", function () {

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (!contactForm) return;

  // EMAIL VALIDATION
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // FIELD VALIDATION
  function validateField(input) {
    const value = input.value.trim();
    const fieldName = input.name;

    // Required field check
    if (input.hasAttribute("required") && value === "") {
      showFieldError(
        input,
        `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
      );
      return false;
    }

    // Email validation
    if (input.type === "email" && value !== "" && !validateEmail(value)) {
      showFieldError(input, "Please enter a valid email address");
      return false;
    }

    clearFieldError(input);
    return true;
  }

  // SHOW FIELD ERROR
  function showFieldError(input, message) {
    clearFieldError(input);

    input.style.borderColor = "#dc3545";

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.style.color = "#dc3545";
    errorDiv.style.fontSize = "0.875rem";
    errorDiv.style.marginTop = "0.25rem";
    errorDiv.textContent = message;

    input.parentElement.appendChild(errorDiv);
  }

  // CLEAR FIELD ERROR
  function clearFieldError(input) {
    input.style.borderColor = "";

    const existingError = input.parentElement.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
  }

  // REAL-TIME VALIDATION
  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach(input => {

    if (input.name === "_honeypot") return;

    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgb(220, 53, 69)") {
        clearFieldError(this);
      }
    });
  });

  // FORM MESSAGE
  function showFormMessage(message, type) {

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";

    formMessage.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    if (type === "success") {
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  }

  // SUBMIT FORM
  function submitForm() {

    const formData = new FormData(contactForm);

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
      .then(response => {

        if (response.ok) {

          showFormMessage(
            "Thank you for your message! We'll get back to you soon.",
            "success"
          );

          contactForm.reset();

          formInputs.forEach(input => clearFieldError(input));

        } else {

          return response.json().then(data => {

            if (data.errors) {
              const errorMessages = data.errors
                .map(error => error.message)
                .join(". ");

              throw new Error(errorMessages);

            } else {
              throw new Error(
                "An error occurred while sending your message."
              );
            }

          });

        }

      })
      .catch(error => {

        console.error("Form submission error:", error);

        showFormMessage(
          "Sorry, there was an error sending your message. Please try again or contact us directly.",
          "error"
        );

      })
      .finally(() => {

        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;

      });
  }

  // PREVENT MULTIPLE SUBMISSIONS
  let isSubmitting = false;

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    if (isSubmitting) return;

    let isValid = true;

    formInputs.forEach(input => {
      if (input.name !== "_honeypot" && !validateField(input)) {
        isValid = false;
      }
    });

    // Honeypot check
    const honeypot = contactForm.querySelector('input[name="_honeypot"]');

    if (honeypot && honeypot.value !== "") {
      showFormMessage("An error occurred. Please try again.", "error");
      return;
    }

    if (!isValid) {
      showFormMessage(
        "Please fill in all required fields correctly.",
        "error"
      );
      return;
    }

    isSubmitting = true;

    submitForm();

    setTimeout(() => {
      isSubmitting = false;
    }, 3000);

  });

});