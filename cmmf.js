class Customer {
    constructor() {
        this._rate = 0.17;
        // this.newAmount = null;

        this.selectedRow = null;
        this.simpleInterest = null;
        this.total = null;
    }
    get rate() {
        return this._rate;
    }


    // we fetch the user input and automatically  display the  simple interest rate
    // automatically display the  total

    calculateSimpleInterest(newAmount) {

        return newAmount * this.rate ;


    }
    // input  the output of this function in the  total variable

    calculateTotal(newAmount) {

        const  toBeReceived = this.simpleInterest;
        return   newAmount + toBeReceived;

    }
    read() {
        const fund = document.getElementById("fund").value;
        const amount = document.getElementById("amount").value;

        const rate = document.getElementById("rate").value;

        const taxableRate = document.getElementById("taxableRate").value;
        const tax = document.getElementById("tax").value;

        // after fetching the amount ,we pass it to calculateSimpleInterest function

        this.simpleInterest = this.calculateSimpleInterest(amount);

        this.total = this.calculateTotal(amount);

        // total value should be set by calculateTotal method
        // const total = document.getElementById("total").value;

        return {
            fund,
            amount,
            rate,
            simpleInterest:this.simpleInterest,
            taxableRate,
            tax,
            total :this.total,
        };
    }
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
        <button onClick="customer.onEdit(this)" style ="border-radius:4px;background-image: url('image.png'); margin:5px; color:white; border:none; padding:14px 20px;">Edit</button>
        <button onClick="customer.onDelete(this)" style="border-radius:4px;background-image: url('image.png');margin:5px;  color:white; border:none;padding:14px 20px;">Delete</button>`;


    }
    update(formData) {
        this.selectedRow.cells[0].innerHTML = formData.fund;
        this.selectedRow.cells[1].innerHTML = formData.amount;
        this.selectedRow.cells[2].innerHTML = formData.rate;
        this.selectedRow.cells[3].innerHTML = formData.simpleInterest;
        this.selectedRow.cells[4].innerHTML = formData.taxableRate;
        this.selectedRow.cells[5].innerHTML = formData.tax;
        // this.selectedRow.cells[6].innerHTML = formData.total;

    }
    delete(td) {
        const row = td.parentElement.parentElement;
        document.getElementById("cmmfList").deleteRow(row.rowIndex);
        this.resetForm();
    }
    onEdit(td) {
        this.selectedRow = td.parentElement.parentElement;
        document.getElementById("fund").value = this.selectedRow.cells[0].innerHTML;
        document.getElementById("amount").value = this.selectedRow.cells[1].innerHTML;
        // document.getElementById("rate").value = this.selectedRow.cells[2].innerHTML;
        // document.getElementById("simpleInterest").value = this.selectedRow.cells[3].innerHTML;
        document.getElementById("taxableRate").value = this.selectedRow.cell[2].innerHTML;
        document.getElementById("tax").value = this.selectedRow.cell[3].innerHTML;


    }
    resetForm() {
        document.getElementById("fund").value = "";
        document.getElementById("amount").value = "";
        // document.getElementById("rate").value = "";
        // document.getElementById("simpleInterest").value = "";
        document.getElementById("taxableRate").value = "";
        document.getElementById("tax").value = "";


        this.selectedRow = null;
    }


    // implement promises here 
    onFormSubmit() {
        const formData = this.read();
        if (this.selectedRow === null) {
            this.insert(formData);
        } else {
            this.update(formData);
        }
        this.resetForm();

    }

}
const customer = new Customer();
