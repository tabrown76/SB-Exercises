class BankAccount{
    constructor(pin, balance=0){
        this.pin = Number(pin);
        this.balance = Number(balance);
    }

    correctPin(pinInput){
        return Number(pinInput) === this.pin;
    }

    checkBalance(pin){
        if(!this.correctPin(pin)) return `Invalid PIN.`;

        return `$${this.balance}`
    }

    deposit(pin, depositAmount){
        if(!this.correctPin(pin)) return `Invalid PIN.`;
        depositAmount = Number(depositAmount);
        this.balance += depositAmount;

        return `Successfully deposited $${depositAmount}. Current balance: $${this.balance}.`
    }

    withdraw(pin, debitAmount){
        if(!this.correctPin(pin)) return `Invalid PIN.`;
        debitAmount = Number(debitAmount);

        if((this.balance - debitAmount) < 0 ){
            return `Withdrawal amount exceeds account balance. Transaction cancelled.`
        }
        else{
            this.balance -= debitAmount;
            return `Successfully withdrew $${debitAmount}. Current balance: $${this.balance}.`
        }
    }

    changePin(pin, newPin){
        if(!this.correctPin(pin)) return `Invalid PIN.`;

        this.pin = Number(newPin);

        return `PIN successfully changed!`
    }
}

function createAccount(pin, amount) {
    return new BankAccount(pin, amount);
}



module.exports = { createAccount };
