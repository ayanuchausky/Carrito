package examendan.web.rest;

import examendan.ExamenDanApp;
import examendan.domain.ProductoCantidad;
import examendan.repository.ProductoCantidadRepository;
import examendan.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static examendan.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductoCantidadResource} REST controller.
 */
@SpringBootTest(classes = ExamenDanApp.class)
public class ProductoCantidadResourceIT {

    private static final Integer DEFAULT_CANTIDAD = 1;
    private static final Integer UPDATED_CANTIDAD = 2;

    @Autowired
    private ProductoCantidadRepository productoCantidadRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProductoCantidadMockMvc;

    private ProductoCantidad productoCantidad;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductoCantidadResource productoCantidadResource = new ProductoCantidadResource(productoCantidadRepository);
        this.restProductoCantidadMockMvc = MockMvcBuilders.standaloneSetup(productoCantidadResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoCantidad createEntity(EntityManager em) {
        ProductoCantidad productoCantidad = new ProductoCantidad()
            .cantidad(DEFAULT_CANTIDAD);
        return productoCantidad;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductoCantidad createUpdatedEntity(EntityManager em) {
        ProductoCantidad productoCantidad = new ProductoCantidad()
            .cantidad(UPDATED_CANTIDAD);
        return productoCantidad;
    }

    @BeforeEach
    public void initTest() {
        productoCantidad = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductoCantidad() throws Exception {
        int databaseSizeBeforeCreate = productoCantidadRepository.findAll().size();

        // Create the ProductoCantidad
        restProductoCantidadMockMvc.perform(post("/api/producto-cantidads")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCantidad)))
            .andExpect(status().isCreated());

        // Validate the ProductoCantidad in the database
        List<ProductoCantidad> productoCantidadList = productoCantidadRepository.findAll();
        assertThat(productoCantidadList).hasSize(databaseSizeBeforeCreate + 1);
        ProductoCantidad testProductoCantidad = productoCantidadList.get(productoCantidadList.size() - 1);
        assertThat(testProductoCantidad.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createProductoCantidadWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productoCantidadRepository.findAll().size();

        // Create the ProductoCantidad with an existing ID
        productoCantidad.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductoCantidadMockMvc.perform(post("/api/producto-cantidads")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCantidad)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoCantidad in the database
        List<ProductoCantidad> productoCantidadList = productoCantidadRepository.findAll();
        assertThat(productoCantidadList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProductoCantidads() throws Exception {
        // Initialize the database
        productoCantidadRepository.saveAndFlush(productoCantidad);

        // Get all the productoCantidadList
        restProductoCantidadMockMvc.perform(get("/api/producto-cantidads?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productoCantidad.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD)));
    }
    
    @Test
    @Transactional
    public void getProductoCantidad() throws Exception {
        // Initialize the database
        productoCantidadRepository.saveAndFlush(productoCantidad);

        // Get the productoCantidad
        restProductoCantidadMockMvc.perform(get("/api/producto-cantidads/{id}", productoCantidad.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(productoCantidad.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingProductoCantidad() throws Exception {
        // Get the productoCantidad
        restProductoCantidadMockMvc.perform(get("/api/producto-cantidads/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductoCantidad() throws Exception {
        // Initialize the database
        productoCantidadRepository.saveAndFlush(productoCantidad);

        int databaseSizeBeforeUpdate = productoCantidadRepository.findAll().size();

        // Update the productoCantidad
        ProductoCantidad updatedProductoCantidad = productoCantidadRepository.findById(productoCantidad.getId()).get();
        // Disconnect from session so that the updates on updatedProductoCantidad are not directly saved in db
        em.detach(updatedProductoCantidad);
        updatedProductoCantidad
            .cantidad(UPDATED_CANTIDAD);

        restProductoCantidadMockMvc.perform(put("/api/producto-cantidads")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductoCantidad)))
            .andExpect(status().isOk());

        // Validate the ProductoCantidad in the database
        List<ProductoCantidad> productoCantidadList = productoCantidadRepository.findAll();
        assertThat(productoCantidadList).hasSize(databaseSizeBeforeUpdate);
        ProductoCantidad testProductoCantidad = productoCantidadList.get(productoCantidadList.size() - 1);
        assertThat(testProductoCantidad.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingProductoCantidad() throws Exception {
        int databaseSizeBeforeUpdate = productoCantidadRepository.findAll().size();

        // Create the ProductoCantidad

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductoCantidadMockMvc.perform(put("/api/producto-cantidads")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(productoCantidad)))
            .andExpect(status().isBadRequest());

        // Validate the ProductoCantidad in the database
        List<ProductoCantidad> productoCantidadList = productoCantidadRepository.findAll();
        assertThat(productoCantidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductoCantidad() throws Exception {
        // Initialize the database
        productoCantidadRepository.saveAndFlush(productoCantidad);

        int databaseSizeBeforeDelete = productoCantidadRepository.findAll().size();

        // Delete the productoCantidad
        restProductoCantidadMockMvc.perform(delete("/api/producto-cantidads/{id}", productoCantidad.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductoCantidad> productoCantidadList = productoCantidadRepository.findAll();
        assertThat(productoCantidadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
