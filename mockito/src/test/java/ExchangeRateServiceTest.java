import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ExchangeRateServiceTest {
    @Test
    void mockReturnsTheConfiguredRate() {
        ExchangeRateService rateService = mock(ExchangeRateService.class);
        when(rateService.getRate("EUR", "HUF")).thenReturn(400.0);

        double rate = rateService.getRate("EUR", "HUF");

        assertEquals(400.0, rate, 0.000001);
        verify(rateService).getRate("EUR", "HUF");
    }
}
