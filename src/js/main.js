import "../css/globals.css";
import "../css/hero.style.css";
import "../css/calculator-card.style.css";
import "../css/about.style.css";
import "../css/features.style.css";
import "../css/limitations.style.css";

const unitSelectorMetric = document.getElementById("metric");
const unitSelectorImperial = document.getElementById("imperial");
const unitHeight1 = document.getElementById("unit-height-1");
const unitWeight1 = document.getElementById("unit-weight-1");
const unitsInputGroup = document.querySelector(".units-input-group");
const unitsInputJustImperial = document.querySelectorAll(".just-imperial");

const inputHeight1 = document.getElementById("input-height-1");
const inputHeight2 = document.getElementById("input-height-2");
const inputWeight1 = document.getElementById("input-weight-1");
const inputWeight2 = document.getElementById("input-weight-2");

const allNumberInputs = document.querySelectorAll("input[type=number]");
const resultContainer = document.querySelector(".result-container");

// variables
const metricInputs = [inputHeight1, inputWeight1];
const imperialInputs = [inputHeight1, inputWeight1, inputHeight2, inputWeight2];

// Reset Values and inputs and result text
const resetAllInputs = () => {
  allNumberInputs.forEach((item) => (item.value = ""));
};
const resetResultContainer = () => {
  resultContainer.innerHTML = `
          <div class="result-empty">
             <p class="empty-title">Welcome!</p>
             <p class="empty-description result-description">
               Enter your height and weight and you’ll see your BMI result
               here
             </p>
          </div>
`;
};

// Update result for metric
const updateResultForMetric = (result) => {
  resultContainer.innerHTML = `
      <div class="result-left-container">
        <p class="result-title">Your BMI is...</p>
        <p class="result-number">${result}</p>
      </div>
      <div class="result-right-container">
        <div class="result-description">
          <p>
            Your BMI suggests you’re a healthy weight. Your ideal weight
            is between <span class="result-bold">63.3kgs - 85.2kgs</span>
          </p>
        </div>
      </div>
  `;
};

// Update result for Imperial
const updateResultImperial = (result) => {
  resultContainer.innerHTML = `
      <div class="result-left-container">
        <p class="result-title">Your BMI is...</p>
        <p class="result-number">${result}</p>
      </div>
      <div class="result-right-container">
        <div class="result-description">
          <p>
          Your BMI suggests you’re a healthy weight. Your ideal weight
          is between <span class="result-bold" >9st 6lbs - 12st 10lbs.</span>
          </p>
        </div>
      </div>
  `;
};

// Calculation in Metric units
const handleUnitMetricSelection = (e) => {
  unitSelectorImperial.checked = false;
  unitHeight1.textContent = "cm";
  unitWeight1.textContent = "kg";
  unitsInputGroup.classList.remove("make-column");
  unitsInputJustImperial.forEach((item) => (item.style.display = "none"));
  resetAllInputs();
  resetResultContainer();
};

const calculateBMIInMetric = () => {
  let result;

  if (unitSelectorImperial.checked) return;

  if (inputHeight1.value !== "" && inputWeight1.value !== "") {
    result =
      (inputWeight1.value / inputHeight1.value / inputHeight1.value) * 10000;
    updateResultForMetric(Number.parseFloat(result).toFixed(1));
  } else {
    return;
  }

  return result;
};

// Calculation in Imperial units
const handleUnitImperialSelection = (e) => {
  unitSelectorMetric.checked = false;
  unitHeight1.textContent = "ft";
  unitWeight1.textContent = "st";
  unitsInputGroup.classList.add("make-column");
  unitsInputJustImperial.forEach((item) => (item.style.display = "flex"));
  resetAllInputs();
  resetResultContainer();
};

const calculateBMIInImperial = () => {
  let result;

  if (unitSelectorMetric.checked) return;

  if (
    inputHeight1.value !== "" &&
    inputWeight1.value !== "" &&
    inputHeight2.value !== "" &&
    inputWeight2.value !== ""
  ) {
    let height = inputHeight1.value * 12 + inputHeight2.value;
    let weight = inputWeight1.value * 14 + inputWeight2.value;
    result = (weight / height / height) * 703;
    updateResultImperial(Number.parseFloat(result).toFixed(1));
  } else {
    return;
  }

  return result;
};

// Event Listeners
unitSelectorMetric.addEventListener("change", handleUnitMetricSelection);
unitSelectorImperial.addEventListener("change", handleUnitImperialSelection);

metricInputs.forEach((item) =>
  item.addEventListener("change", calculateBMIInMetric)
);

imperialInputs.forEach((item) =>
  item.addEventListener("change", calculateBMIInImperial)
);

// change border color of inputs at active state
allNumberInputs.forEach((elm) =>
  elm.addEventListener(
    "focus",
    () => (elm.parentElement.style.borderColor = "#345ff6")
  )
);

allNumberInputs.forEach((elm) =>
  elm.addEventListener(
    "focusout",
    () => (elm.parentElement.style.borderColor = "#5e6e85")
  )
);
