//element
const form = document.querySelector(".formSubmit");
const outPutBill = document.getElementById("outPutBill");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("hi");
    const price = document.getElementById("price").value;
    const pay = document.getElementById("pay").value;

    const change = calChange(pay, price);
    const [bills, coils] = countBill(change);
    renderBill(bills, coils);
  });
}

const calChange = (pay, price) => {
  let change = pay - price;

  if (change === 0) {
    alert("Thank you : No any change");
    return 0;
  } else if (change < 0) {
    alert("Please pay more");
    return;
  } else {
    outPutBill.innerHTML = `Recieve the change : ${change} `;
    let bill = [];

    if (change / 100) {
      let calBill = Math.floor(change / 100);
      change = change - calBill * 100;

      while (calBill > 0) {
        if (calBill > 5) {
          bill.push(500);
          calBill -= 5;
        } else {
          bill.push(100);
          calBill -= 1;
        }
      }
    }

    if (change / 10) {
      let calBill = Math.floor(change / 10);
      change = change - calBill * 10;
      while (calBill > 0) {
        if (calBill > 5) {
          bill.push(50);
          calBill -= 5;
        } else if (calBill >= 2) {
          bill.push(20);
          calBill -= 2;
        } else {
          bill.push(10);
          calBill -= 1;
        }
      }
    }

    if (change < 10) {
      let calBill = change;
      while (calBill > 0) {
        if (calBill > 5) {
          bill.push(5);
          calBill -= 5;
        } else if (calBill >= 2) {
          bill.push(2);
          calBill -= 2;
        } else {
          bill.push(1);
          calBill -= 1;
        }
      }
    }

    return bill;
  }
};

const countBill = (bill) => {
  //   console.log(bill);
  let countBill = {
    bill_500: bill.filter((el) => el === 500).length,
    bill_100: bill.filter((el) => el === 100).length,
    bill_50: bill.filter((el) => el === 50).length,
    bill_20: bill.filter((el) => el === 20).length,
  };
  let countCoil = {
    bill_10: bill.filter((el) => el === 10).length,
    bill_5: bill.filter((el) => el === 5).length,
    bill_2: bill.filter((el) => el === 2).length,
    bill_1: bill.filter((el) => el === 1).length,
  };
  return [countBill, countCoil];
};

const renderBill = (bills, coils) => {
  for (const [key, val] of Object.entries(bills)) {
    if (val !== 0) {
      outPutBill.insertAdjacentHTML(
        "beforeend",
        `<p>Bill ${key.toString().split("_")[1]} x ${val} bills</p>`
      );
    }
  }

  for (const [key, val] of Object.entries(coils)) {
    if (val !== 0) {
      outPutBill.insertAdjacentHTML(
        "beforeend",
        `<p>Coil ${key.toString().split("_")[1]} x ${val} coils</p>`
      );
    }
  }
};
