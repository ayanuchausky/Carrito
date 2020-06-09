package examendan.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import examendan.web.rest.TestUtil;

public class FechasTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fechas.class);
        Fechas fechas1 = new Fechas();
        fechas1.setId(1L);
        Fechas fechas2 = new Fechas();
        fechas2.setId(fechas1.getId());
        assertThat(fechas1).isEqualTo(fechas2);
        fechas2.setId(2L);
        assertThat(fechas1).isNotEqualTo(fechas2);
        fechas1.setId(null);
        assertThat(fechas1).isNotEqualTo(fechas2);
    }
}
