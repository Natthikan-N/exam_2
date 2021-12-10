//element
const form = document.querySelector(".formSubmit");
const outPutBill = document.getElementById("outPutBill");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const price = document.getElementById("price").value;
    const pay = document.getElementById("pay").value;

    const change = calChange(pay, price);
    const [bills, coils] = countBill(change);
    renderBill(bills, coils);
  });
}

const calChange = (pay, price) => {
  //CALCULATE CHANGE
  let change = pay - price; //EX. 1234

  //CHECK INPUT BILL PAYMENT

  if (change === 0) {
    //A> IN CASE NO NEED TO CHANGE
    alert("Thank you : No any change");
    return 0;
  } else if (change < 0) {
    //B> IN CASE CUSTOMER INPUT LESS THAN INPUT PRICE
    alert("Please pay more");
    return;
  } else {
    //C> CALCULATE CHANGE
    outPutBill.innerHTML = `Recieve the change : ${change} `;

    const billArr = [1000, 500, 100, 50, 20, 10, 5, 2, 1]; // ALL BILL WE HAVE
    let billChange = []; // ARRAY FOR RECIEVE BILL FOR CHANGE
    let i = 10; //FOR SEPARATE THE BILL

    while (change > 0) {
      let num = change % i; // MOD TO FIND EACH UNIT =>  4 ,30 ,200,1000
      change -= num; // MINUS THE CHANGE FOR NEXT LOOP  => 1230 ,1200,1000

      billArr.map((el) => {
        // FIND THE BILL WE HAVE
        while (num >= el) {
          billChange.push(el); // IF THE NUM >= THE BILL WE HAVE JUST PUSH IN ARRAY FOR CHANGE
          num -= el;
        }
      });
      i *= 10;
    }
    return billChange;
  }
};

//THIS IS FOR COUNT THE BILL AND RENDER TO HTML

const countBill = (bill) => {
  let countBill = {
    bill_1000: bill.filter((el) => el === 1000).length,
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
