package examendan.web.rest;

import examendan.ExamenDanApp;
import examendan.domain.HistorialCategoria;
import examendan.repository.HistorialCategoriaRepository;
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
 * Integration tests for the {@link HistorialCategoriaResource} REST controller.
 */
@SpringBootTest(classes = ExamenDanApp.class)
public class HistorialCategoriaResourceIT {

    private static final Integer DEFAULT_MES = 1;
    private static final Integer UPDATED_MES = 2;

    private static final String DEFAULT_SE_CONVIERTE_EN = "AAAAAAAAAA";
    private static final String UPDATED_SE_CONVIERTE_EN = "BBBBBBBBBB";

    @Autowired
    private HistorialCategoriaRepository historialCategoriaRepository;

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

    private MockMvc restHistorialCategoriaMockMvc;

    private HistorialCategoria historialCategoria;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final HistorialCategoriaResource historialCategoriaResource = new HistorialCategoriaResource(historialCategoriaRepository);
        this.restHistorialCategoriaMockMvc = MockMvcBuilders.standaloneSetup(historialCategoriaResource)
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
    public static HistorialCategoria createEntity(EntityManager em) {
        HistorialCategoria historialCategoria = new HistorialCategoria()
            .mes(DEFAULT_MES)
            .seConvierteEn(DEFAULT_SE_CONVIERTE_EN);
        return historialCategoria;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static HistorialCategoria createUpdatedEntity(EntityManager em) {
        HistorialCategoria historialCategoria = new HistorialCategoria()
            .mes(UPDATED_MES)
            .seConvierteEn(UPDATED_SE_CONVIERTE_EN);
        return historialCategoria;
    }

    @BeforeEach
    public void initTest() {
        historialCategoria = createEntity(em);
    }

    @Test
    @Transactional
    public void createHistorialCategoria() throws Exception {
        int databaseSizeBeforeCreate = historialCategoriaRepository.findAll().size();

        // Create the HistorialCategoria
        restHistorialCategoriaMockMvc.perform(post("/api/historial-categorias")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historialCategoria)))
            .andExpect(status().isCreated());

        // Validate the HistorialCategoria in the database
        List<HistorialCategoria> historialCategoriaList = historialCategoriaRepository.findAll();
        assertThat(historialCategoriaList).hasSize(databaseSizeBeforeCreate + 1);
        HistorialCategoria testHistorialCategoria = historialCategoriaList.get(historialCategoriaList.size() - 1);
        assertThat(testHistorialCategoria.getMes()).isEqualTo(DEFAULT_MES);
        assertThat(testHistorialCategoria.getSeConvierteEn()).isEqualTo(DEFAULT_SE_CONVIERTE_EN);
    }

    @Test
    @Transactional
    public void createHistorialCategoriaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = historialCategoriaRepository.findAll().size();

        // Create the HistorialCategoria with an existing ID
        historialCategoria.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restHistorialCategoriaMockMvc.perform(post("/api/historial-categorias")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historialCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the HistorialCategoria in the database
        List<HistorialCategoria> historialCategoriaList = historialCategoriaRepository.findAll();
        assertThat(historialCategoriaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllHistorialCategorias() throws Exception {
        // Initialize the database
        historialCategoriaRepository.saveAndFlush(historialCategoria);

        // Get all the historialCategoriaList
        restHistorialCategoriaMockMvc.perform(get("/api/historial-categorias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(historialCategoria.getId().intValue())))
            .andExpect(jsonPath("$.[*].mes").value(hasItem(DEFAULT_MES)))
            .andExpect(jsonPath("$.[*].seConvierteEn").value(hasItem(DEFAULT_SE_CONVIERTE_EN)));
    }
    
    @Test
    @Transactional
    public void getHistorialCategoria() throws Exception {
        // Initialize the database
        historialCategoriaRepository.saveAndFlush(historialCategoria);

        // Get the historialCategoria
        restHistorialCategoriaMockMvc.perform(get("/api/historial-categorias/{id}", historialCategoria.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(historialCategoria.getId().intValue()))
            .andExpect(jsonPath("$.mes").value(DEFAULT_MES))
            .andExpect(jsonPath("$.seConvierteEn").value(DEFAULT_SE_CONVIERTE_EN));
    }

    @Test
    @Transactional
    public void getNonExistingHistorialCategoria() throws Exception {
        // Get the historialCategoria
        restHistorialCategoriaMockMvc.perform(get("/api/historial-categorias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHistorialCategoria() throws Exception {
        // Initialize the database
        historialCategoriaRepository.saveAndFlush(historialCategoria);

        int databaseSizeBeforeUpdate = historialCategoriaRepository.findAll().size();

        // Update the historialCategoria
        HistorialCategoria updatedHistorialCategoria = historialCategoriaRepository.findById(historialCategoria.getId()).get();
        // Disconnect from session so that the updates on updatedHistorialCategoria are not directly saved in db
        em.detach(updatedHistorialCategoria);
        updatedHistorialCategoria
            .mes(UPDATED_MES)
            .seConvierteEn(UPDATED_SE_CONVIERTE_EN);

        restHistorialCategoriaMockMvc.perform(put("/api/historial-categorias")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedHistorialCategoria)))
            .andExpect(status().isOk());

        // Validate the HistorialCategoria in the database
        List<HistorialCategoria> historialCategoriaList = historialCategoriaRepository.findAll();
        assertThat(historialCategoriaList).hasSize(databaseSizeBeforeUpdate);
        HistorialCategoria testHistorialCategoria = historialCategoriaList.get(historialCategoriaList.size() - 1);
        assertThat(testHistorialCategoria.getMes()).isEqualTo(UPDATED_MES);
        assertThat(testHistorialCategoria.getSeConvierteEn()).isEqualTo(UPDATED_SE_CONVIERTE_EN);
    }

    @Test
    @Transactional
    public void updateNonExistingHistorialCategoria() throws Exception {
        int databaseSizeBeforeUpdate = historialCategoriaRepository.findAll().size();

        // Create the HistorialCategoria

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restHistorialCategoriaMockMvc.perform(put("/api/historial-categorias")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(historialCategoria)))
            .andExpect(status().isBadRequest());

        // Validate the HistorialCategoria in the database
        List<HistorialCategoria> historialCategoriaList = historialCategoriaRepository.findAll();
        assertThat(historialCategoriaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteHistorialCategoria() throws Exception {
        // Initialize the database
        historialCategoriaRepository.saveAndFlush(historialCategoria);

        int databaseSizeBeforeDelete = historialCategoriaRepository.findAll().size();

        // Delete the historialCategoria
        restHistorialCategoriaMockMvc.perform(delete("/api/historial-categorias/{id}", historialCategoria.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<HistorialCategoria> historialCategoriaList = historialCategoriaRepository.findAll();
        assertThat(historialCategoriaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
