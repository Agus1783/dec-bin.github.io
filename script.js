const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const switchBtn = document.getElementById("switch-btn");
const converterTitle = document.getElementById("converter-title");
const inputLabel = document.getElementById("input-label");
const historyContainer = document.getElementById("history-container");

// mode untuk mengganti decimal-binary / binary-decimal
let mode = "decToBin";

const decimalToBinary = (input) => {
    if (input === 0 || input === 1) {
        return String(input);
    } else {
        return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
};

// fitur 8 digit untuk bilangan biner
const padBinary = (binStr) => {
    return binStr.padStart(8, "0")
};

// fitur mengubah bilangan binary ke decimal
const binaryToDecimal = (binStr) => {
    return parseInt(binStr, 2)
};

// fitur menambahkan ke history
const addToHistory = (input, output) => {
    const li = document.createElement("li");
    li.textContent = `${input} = ${output} (${mode})`;
    historyContainer.prepend(li);
};


// fungsi cek input dari user
const checkUserInput = () => {
    // mode decimal ke biner
    if (mode === "decToBin") {
        const inputInt = parseInt(numberInput.value);
        if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
            alert("Please provide a decimal number greater than or equal to 0");
            return;
        }
        const bin = padBinary(decimalToBinary(inputInt));
        result.textContent = bin;
        addToHistory(inputInt, bin);
    } else {
        // mode biner ke decimal
        const binStr = numberInput.value.trim();
        if (!/^[01]{1,8}$/.test(binStr)) {
            alert('Please provide a binary number (max 8 digits, only 0 or 1');
            return;
        }
        const dec = binaryToDecimal(binStr);
        result.textContent = dec;
        addToHistory(binStr, dec);
    }
    numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkUserInput();
    }
});

// mode switch convert
switchBtn.addEventListener("click", () => {
    if (mode === "decToBin") {
        mode = "binToDec";
        converterTitle.textContent = "Binary to Decimal";
        inputLabel.textContent = "Enter a binary number:";
        numberInput.type = "text";
        result.textContent = "";
    } else {
        mode = "decToBin";
        converterTitle.textContent = "Decimal to Binary";
        inputLabel.textContent = "Enter a decimal number:";
        numberInput.type = "number";
        result.textContent = "";
    }
});