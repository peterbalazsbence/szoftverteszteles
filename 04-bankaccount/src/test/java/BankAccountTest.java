import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {
    private BankAccount account;
    private static final double DELTA = 0.000001;

    @BeforeEach
    void setUp() {
        account = new BankAccount();
    }

    @Test
    void newAccountHasZeroBalance() {
        assertEquals(0, account.getBalance(), DELTA);
    }

    @Test
    void depositIncreasesBalance() {
        account.deposit(1000);
        assertEquals(1000, account.getBalance(), DELTA);
    }

    @Test
    void depositsAddUp() {
        account.deposit(1000);
        account.deposit(500);
        account.deposit(250);
        assertEquals(1750, account.getBalance(), DELTA);
    }

    @Test
    void withdrawalDecreasesBalance() {
        account.deposit(1000);
        account.withdraw(400);
        assertEquals(600, account.getBalance(), DELTA);
    }

    @Test
    void fullBalanceCanBeWithdrawn() {
        account.deposit(1000);
        account.withdraw(1000);
        assertEquals(0, account.getBalance(), DELTA);
    }

    @Test
    void withdrawalAboveBalanceIsRejected() {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(1001));
        assertEquals(1000, account.getBalance(), DELTA);
    }

    @Test
    void negativeDepositIsRejected() {
        assertThrows(IllegalArgumentException.class, () -> account.deposit(-100));
        assertEquals(0, account.getBalance(), DELTA);
    }

    @Test
    void zeroDepositIsRejected() {
        assertThrows(IllegalArgumentException.class, () -> account.deposit(0));
        assertEquals(0, account.getBalance(), DELTA);
    }

    @Test
    void negativeWithdrawalIsRejected() {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(-100));
        assertEquals(1000, account.getBalance(), DELTA);
    }

    @Test
    void zeroWithdrawalIsRejected() {
        account.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(0));
        assertEquals(1000, account.getBalance(), DELTA);
    }

    @Test
    void emptyAccountCannotBeOverdrawn() {
        assertThrows(IllegalArgumentException.class, () -> account.withdraw(1));
        assertEquals(0, account.getBalance(), DELTA);
    }

    @Test
    void decimalAmountsAreHandled() {
        account.deposit(100.50);
        account.withdraw(25.25);
        assertEquals(75.25, account.getBalance(), DELTA);
    }

    @Test
    void accountsHaveSeparateBalances() {
        BankAccount other = new BankAccount();
        account.deposit(1000);
        assertEquals(0, other.getBalance(), DELTA);
    }

    @Test
    void nonFiniteAmountsAreRejected() {
        account.deposit(1000);
        for (double amount : new double[]{Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY}) {
            assertThrows(IllegalArgumentException.class, () -> account.deposit(amount));
            assertThrows(IllegalArgumentException.class, () -> account.withdraw(amount));
        }
        assertEquals(1000, account.getBalance(), DELTA);
    }

    @Test
    void overflowingDepositIsRejected() {
        account.deposit(Double.MAX_VALUE);
        assertThrows(IllegalArgumentException.class, () -> account.deposit(Double.MAX_VALUE));
        assertEquals(Double.MAX_VALUE, account.getBalance());
    }
}
