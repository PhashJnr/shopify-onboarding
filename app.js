function toggleDropdown(event) {
  const targetId = event.target.getAttribute("data-target");
  const dropdown = document.getElementById(targetId);

  const isVisible = window.getComputedStyle(dropdown).display === "block";

  const allDropdowns = document.querySelectorAll(".dropdownContent");

  allDropdowns.forEach((item) => {
    if (item.id !== targetId) {
      item.style.display = "none";
    }
  });

  dropdown.style.display = isVisible ? "none" : "block";

  if (dropdown.style.display === "block") {
    const firstLink = dropdown.querySelector("li");

    if (firstLink) {
      firstLink.focus();
    }
  }
}

function handleKeyboardNavigation(event) {
  const listItem = event.target.closest("li");
  const dropdown = listItem.parentElement.parentElement;
  const links = dropdown.querySelectorAll("a");
  const listItems = dropdown.querySelectorAll("li");

  if (event.key === "Escape") {
    dropdown.style.display = "none";
    const associatedButton = document.querySelector(
      `[data-target="${dropdown.id}"]`
    );

    if (associatedButton) {
      associatedButton.focus();
    }

    // event.target.focus();
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    let index = Array.from(listItems).indexOf(listItem);

    if (event.key === "ArrowDown") {
      index = (index + 1) % listItems.length;
    } else {
      index = (index - 1 + listItems.length) % listItems.length;
    }
    listItems[index].focus();
  }
}

function handleButtonKeyPress(event) {
  if (event.key === "Enter") {
    toggleDropdown(event);
  }
}

function handleDropdownkeyPress(event) {
  if (event.key === "Enter") {
    const link = event.target.querySelector("a");
    if (link) {
      link.click();
    }
  }
}

const buttons = document.querySelectorAll(".dropdownButton");

buttons.forEach((button) => {
  button.addEventListener("click", toggleDropdown);
  button.addEventListener("keypress", handleButtonKeyPress);
});

const dropdownItems = document.querySelectorAll(".dropdownContent li");
dropdownItems.forEach((items) => {
  items.addEventListener("keypress", handleDropdownkeyPress);
});

const dropdownLists = document.querySelectorAll(".dropdownContent ul");

dropdownLists.forEach((link) => {
  link.addEventListener("keydown", handleKeyboardNavigation);
});
