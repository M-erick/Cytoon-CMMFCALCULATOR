class Customer {
    constructor() {

        this.selectedRow = null;
        // this._taxableRate = 0.05;
    }
    


    // we fetch the user input and automatically  display the  simple interest rate
    // automatically display the  total

    calculateSimpleInterest(newAmount,newRate) {

        return (newAmount * newRate);


    }
    calculateTax(newAmount,newRate,taxableRate) {
        const interest = this.calculateSimpleInterest(newAmount,newRate);
        // const taxableRate = 0.05;
        // two decimal point
        return (interest * taxableRate).toFixed(2);
    }
    // input  the output of this function in the  total variable


    calculateTotal(amount,newRate,taxableRate) {
        const interest = this.calculateSimpleInterest(amount,newRate);
        const tax = this.calculateTax(amount,newRate,taxableRate);
        const amountWithInterest = parseFloat(amount) + parseFloat(interest);
        return (amountWithInterest - tax).toFixed(2);
    }

    // read form data 
    read() {
        const fund = document.getElementById("fund").value;
        const amount = document.getElementById("amount").value;

        const rate = parseFloat(document.getElementById("rate").value);
       const taxableRate =  parseFloat(document.getElementById("taxableRate").value);

        return {
            fund,
            amount,
            rate,
            simpleInterest:this.calculateSimpleInterest(amount,rate),
            taxableRate,
            tax:this.calculateTax(amount,rate,taxableRate),
            total:this.calculateTotal(amount,rate,taxableRate),
        };
    }
    // insert data into the table 
    insert(data) {
        const table = document.getElementById("cmmfList").getElementsByTagName('tbody')[0];
        const newRow = table.insertRow(table.length);

        newRow.insertCell(0).innerHTML = data.fund;
        newRow.insertCell(1).innerHTML = data.amount;
        newRow.insertCell(2).innerHTML = data.rate;
        newRow.insertCell(3).innerHTML = data.simpleInterest;
        newRow.insertCell(4).innerHTML = data.taxableRate;
        newRow.insertCell(5).innerHTML = data.tax;
        newRow.insertCell(6).innerHTML = data.total;



        newRow.insertCell(7).innerHTML = `
        <button onClick="customer.onEdit(this)" style ="border-radius:4px;background-image: url('image.png'); margin:5px; color:white; border:none; padding:14px 10px;">Edit</button>
        <button onClick="customer.onDelete(this)" style="border-radius:4px;background-image: url('image.png');margin:5px;  color:white; border:none;padding:14px 10px;">Delete</button>`;


    }

//   update the  display table 
    update(formData) {
        this.selectedRow.cells[0].innerHTML = formData.fund;
        this.selectedRow.cells[1].innerHTML = formData.amount;
        this.selectedRow.cells[2].innerHTML = formData.rate;
        this.selectedRow.cells[3].innerHTML = formData.simpleInterest;
        this.selectedRow.cells[4].innerHTML = formData.taxableRate;
        this.selectedRow.cells[5].innerHTML = formData.tax;
        this.selectedRow.cells[6].innerHTML = formData.total;

      }
    //   delete the record from the table
    onDelete(td) {
        const row = td.parentElement.parentElement;
        document.getElementById("cmmfList").deleteRow(row.rowIndex);
        this.resetForm();
    }
    // edit the form
    onEdit(td) {
        this.selectedRow = td.parentElement.parentElement;
        document.getElementById("fund").value = this.selectedRow.cells[0].innerHTML;
        document.getElementById("amount").value = this.selectedRow.cells[1].innerHTML;
        document.getElementById("rate").value = this.selectedRow.cells[2].innerHTML;

        document.getElementById("simpleInterest").value = this.selectedRow.cells[3].innerHTML;

        document.getElementById("taxableRate").value = this.selectedRow.cells[4].innerHTML;
        document.getElementById("tax").value = this.selectedRow.cells[5].innerHTML;
        document.getElementById("total").value = this.selectedRow.cells[6].innerHTML;


        

        ;

        
    }
    // reset the Form 
    resetForm() {
        document.getElementById("fund").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("rate").value = "";
        document.getElementById("simpleInterest").value = "";
        document.getElementById("taxableRate").value = "";
        document.getElementById("tax").value = "";


        this.selectedRow = null;
    }


    // implement promises here :still pending 
    onFormSubmit() {
        const formData = this.read();
        // store the data in either way;when insert() or update() is called
        localStorage.setItem("cmmfData", JSON.stringify(formData));
        if (this.selectedRow === null) {
            this.insert(formData);

        } else {
            this.update(formData);
        }
        this.resetForm();

    }
    

    // Promises :try implementing async
      loadData() {
        return new Promise((resolve, reject) => {
          const storedData = localStorage.getItem("cmmfData");
          if (storedData) {
            try {
                //converts stored data in string it back into its original JavaScript object format 
              const data = JSON.parse(storedData);
              this.insert(data);
              resolve(data);
            } catch (error) {
              reject(new Error("Error parsing stored data"));
            }
          } else {
            resolve("No data found in localStorage");
          }
        });
      }

}
const customer = new Customer();
// Load data on page load
customer.loadData();
const amountInput = document.getElementById("amount");
const rateInput = document.getElementById("rate");
const taxableRateInput = document.getElementById("taxableRate");


// implemented three built-in Events :the events below are redundant ;how can i combine them or nest them ?research
amountInput.addEventListener("input", () => {
  const amount = amountInput.value;
  const rate = parseFloat(rateInput.value);
  const taxableRate = parseFloat(taxableRateInput.value);

  

  if (amount) { 
    const simpleInterest = customer.calculateSimpleInterest(amount,rate);
    document.getElementById("simpleInterest").value = simpleInterest.toFixed(2);
    document.getElementById("total").value = customer.calculateTotal(amount,rate,taxableRate);
    document.getElementById("tax").value = customer.calculateTax(amount,rate,taxableRate);


   
  } else {
    console.log("Error");
  }
});


rateInput.addEventListener("input", () => {
  const amount = amountInput.value;
  const rate = parseFloat(rateInput.value);
  const taxableRate = parseFloat(taxableRateInput.value);

  

  if (rate) { 
    const simpleInterest = customer.calculateSimpleInterest(amount,rate);
    document.getElementById("simpleInterest").value = simpleInterest.toFixed(2);
    document.getElementById("total").value = customer.calculateTotal(amount,rate,taxableRate);
    document.getElementById("tax").value = customer.calculateTax(amount,rate,taxableRate);


   
  } else {
    console.log("Error");
  }
});

// taxableRate  userEvent
taxableRateInput.addEventListener("input" , ()=>{
  const taxableRate = parseFloat(taxableRateInput.value);
  const amount = amountInput.value;
  const rate = parseFloat(rateInput.value);

if (taxableRate) {

  document.getElementById("tax").value = customer.calculateTax(amount,rate,taxableRate);
  document.getElementById("total").value = customer.calculateTotal(amount,rate,taxableRate);
}

});

