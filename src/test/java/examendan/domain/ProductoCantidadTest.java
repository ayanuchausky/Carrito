package examendan.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import examendan.web.rest.TestUtil;

public class ProductoCantidadTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductoCantidad.class);
        ProductoCantidad productoCantidad1 = new ProductoCantidad();
        productoCantidad1.setId(1L);
        ProductoCantidad productoCantidad2 = new ProductoCantidad();
        productoCantidad2.setId(productoCantidad1.getId());
        assertThat(productoCantidad1).isEqualTo(productoCantidad2);
        productoCantidad2.setId(2L);
        assertThat(productoCantidad1).isNotEqualTo(productoCantidad2);
        productoCantidad1.setId(null);
        assertThat(productoCantidad1).isNotEqualTo(productoCantidad2);
    }
}
