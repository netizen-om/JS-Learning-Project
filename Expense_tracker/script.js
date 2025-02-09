document.addEventListener("DOMContentLoaded" , () => {
    const expanseName = document.getElementById("expense-name");
    const expanseAmount = document.getElementById("expense-amount");
    const submitBtn = document.getElementById("submit");
    const expanselist = document.getElementById("expense-list");
    const totalAmount = document.getElementById("total-amount");
    const expenseForm = document.getElementById("expense-form");
    let total=0;

    const allExpense = JSON.parse(localStorage.getItem("Expense")) || [];

    renderExpense();

    expenseForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const n = expanseName.value;
        const a = parseFloat(expanseAmount.value);
        // console.log(name);
        // console.log(amount);
        const data = {
            id : Date.now(),
            name : n,
            amount : a 
        }

        allExpense.push(data);
        storeExpense();
        renderExpense();
    })

    expanselist.addEventListener("click" , (e) => {
        // console.log(e);
        
        if(e.target.tagName === 'BUTTON' && e.target.classList.contains("removeBtn")){
            const index = e.target.getAttribute("data-index");
            // console.log(index);
            
            allExpense.splice(index,1);
            storeExpense();
            renderExpense();
        }
    })

    function renderExpense(){
        expanselist.innerHTML = "";
        totalAmount.innerText = "";
        allExpense.forEach((e,index) => {
            const data = document.createElement("li");
            data.innerHTML = `${e.name} - $${e.amount} <button data-index=${index} class="removeBtn">Delete</button>`
            expanselist.appendChild(data);
        })
        totalCalc();
    }

    function storeExpense(){
        localStorage.setItem("Expense" , JSON.stringify(allExpense))
    }

    function totalCalc() {
        let total = 0; // Initialize total to 0
        allExpense.forEach(e => {
            total += e.amount; // Add up all amounts
        });
        totalAmount.innerHTML = `${total.toFixed(2)}`; // Display with 2 decimal places
    }

    renderExpense();
})