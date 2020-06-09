package examendan.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import examendan.web.rest.TestUtil;

public class HistorialCategoriaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(HistorialCategoria.class);
        HistorialCategoria historialCategoria1 = new HistorialCategoria();
        historialCategoria1.setId(1L);
        HistorialCategoria historialCategoria2 = new HistorialCategoria();
        historialCategoria2.setId(historialCategoria1.getId());
        assertThat(historialCategoria1).isEqualTo(historialCategoria2);
        historialCategoria2.setId(2L);
        assertThat(historialCategoria1).isNotEqualTo(historialCategoria2);
        historialCategoria1.setId(null);
        assertThat(historialCategoria1).isNotEqualTo(historialCategoria2);
    }
}
