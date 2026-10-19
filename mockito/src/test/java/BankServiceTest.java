import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BankServiceTest {
    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private BankService bankService;

    @Test
    void depositUpdatesBalanceAndSendsNotification() {
        BankAccount account = new BankAccount();

        bankService.deposit(account, 1000);

        assertEquals(1000, account.getBalance(), 0.000001);
        verify(notificationService).send("Deposit successful");
        verifyNoMoreInteractions(notificationService);
    }

    @Test
    void eachDepositSendsOneNotification() {
        BankAccount account = new BankAccount();

        bankService.deposit(account, 1000);
        bankService.deposit(account, 500);

        assertEquals(1500, account.getBalance(), 0.000001);
        verify(notificationService, times(2)).send("Deposit successful");
        verifyNoMoreInteractions(notificationService);
    }

    @Test
    void negativeDepositDoesNotSendNotification() {
        BankAccount account = new BankAccount();
        account.deposit(500);

        assertThrows(IllegalArgumentException.class,
                () -> bankService.deposit(account, -100));

        assertEquals(500, account.getBalance(), 0.000001);
        verifyNoInteractions(notificationService);
    }

    @Test
    void zeroDepositDoesNotSendNotification() {
        BankAccount account = new BankAccount();

        assertThrows(IllegalArgumentException.class,
                () -> bankService.deposit(account, 0));

        assertEquals(0, account.getBalance(), 0.000001);
        verifyNoInteractions(notificationService);
    }

    @Test
    void notificationIsSentAfterBalanceChanges() {
        BankAccount account = new BankAccount();
        doAnswer(invocation -> {
            assertEquals(1000, account.getBalance(), 0.000001);
            return null;
        }).when(notificationService).send("Deposit successful");

        bankService.deposit(account, 1000);

        verify(notificationService).send("Deposit successful");
    }
}
