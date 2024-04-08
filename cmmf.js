class Customer {
    constructor() {
        this._rate = 0.17;
        // this.newAmount = null;

        this.selectedRow = null;
        this._taxableRate = 0.05;
    }
    get rate() {
        // to return the percentage
        return this._rate *100;
    }
    get taxableRate(){
        return this._taxableRate;
    }


    // we fetch the user input and automatically  display the  simple interest rate
    // automatically display the  total

    calculateSimpleInterest(newAmount) {

        return (newAmount * this.rate)/100 ;


    }
    calculateTax(newAmount) {
        const interest = this.calculateSimpleInterest(newAmount);
        const taxableRate = 0.05;
        // two decimal point
        return (interest * taxableRate).toFixed(2);
    }
    // input  the output of this function in the  total variable


    calculateTotal(amount) {
        const interest = this.calculateSimpleInterest(amount);
        const tax = this.calculateTax(amount);
        const amountWithInterest = parseFloat(amount) + parseFloat(interest);
        return (amountWithInterest - tax).toFixed(2);
    }

    // read form data 
    read() {
        const fund = document.getElementById("fund").value;
        const amount = document.getElementById("amount").value;

        document.getElementById("rate").value = this.rate
        document.getElementById("taxableRate").value = this._taxableRate;

        return {
            fund,
            amount,
            rate:this.rate,
            simpleInterest:this.calculateSimpleInterest(amount),
            taxableRate:this._taxableRate,
            tax:this.calculateTax(amount),
            total:this.calculateTotal(amount),
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

        // Disable other input fields during editing
        document.getElementById("taxableRate").disabled = true;
        document.getElementById("tax").disabled = true;
    }
    // reset the Form 
    resetForm() {
        document.getElementById("fund").value = "";
        document.getElementById("amount").value = "";
        // document.getElementById("rate").value = "";
        // document.getElementById("simpleInterest").value = "";
        document.getElementById("taxableRate").value = "";
        document.getElementById("tax").value = "";


        this.selectedRow = null;
    }


    // implement promises here :still pending 
    onFormSubmit() {
        const formData = this.read();
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
              const data = JSON.parse(storedData);
              this.insert(data);
              resolve(data);
            } catch (error) {
              reject(new Error("Error parsing stored data"));
            }
          } else {
            resolve("No data found in localStorage"); // Optional message
          }
        });
      }

}
const customer = new Customer();
// Load data on page load
customer.loadData();
const amountInput = document.getElementById("amount");

// built-in events:display the default value after the amount field value  has been keyed in  
amountInput.addEventListener("change", () => {
  const amount = amountInput.value;
  if (amount) { 
    const simpleInterest = customer.calculateSimpleInterest(amount);
    document.getElementById("simpleInterest").value = simpleInterest;
    document.getElementById("rate").value= customer.rate;
    document.getElementById("tax").value = customer.calculateTax(amount);
    document.getElementById("total").value = customer.calculateTotal(amount);
    document.getElementById("taxableRate").value = customer.taxableRate;
    // create another change Event to implement the display of total 
    // document.getElementById("total").value =customer.calculateTotal(amount) ;
  } else {
    console.log("Error");
  }
});

