public class BankAccount {
    private double balance = 0;

    public void deposit(double amount) {
        checkAmount(amount);
        if (!Double.isFinite(balance + amount)) {
            throw new IllegalArgumentException("Túl nagy összeg.");
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        checkAmount(amount);
        if (amount > balance) {
            throw new IllegalArgumentException("Nincs elegendő pénz a számlán.");
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }

    private void checkAmount(double amount) {
        if (!Double.isFinite(amount) || amount <= 0) {
            throw new IllegalArgumentException("Az összegnek pozitív, véges számnak kell lennie.");
        }
    }
}
