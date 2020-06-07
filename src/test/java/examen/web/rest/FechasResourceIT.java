package examen.web.rest;

import examen.ExamenDanaideApp;
import examen.domain.Fechas;
import examen.repository.FechasRepository;
import examen.web.rest.errors.ExceptionTranslator;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static examen.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FechasResource} REST controller.
 */
@SpringBootTest(classes = ExamenDanaideApp.class)
public class FechasResourceIT {

    private static final LocalDate DEFAULT_FECHA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private FechasRepository fechasRepository;

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

    private MockMvc restFechasMockMvc;

    private Fechas fechas;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FechasResource fechasResource = new FechasResource(fechasRepository);
        this.restFechasMockMvc = MockMvcBuilders.standaloneSetup(fechasResource)
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
    public static Fechas createEntity(EntityManager em) {
        Fechas fechas = new Fechas()
            .fecha(DEFAULT_FECHA);
        return fechas;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fechas createUpdatedEntity(EntityManager em) {
        Fechas fechas = new Fechas()
            .fecha(UPDATED_FECHA);
        return fechas;
    }

    @BeforeEach
    public void initTest() {
        fechas = createEntity(em);
    }

    @Test
    @Transactional
    public void createFechas() throws Exception {
        int databaseSizeBeforeCreate = fechasRepository.findAll().size();

        // Create the Fechas
        restFechasMockMvc.perform(post("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fechas)))
            .andExpect(status().isCreated());

        // Validate the Fechas in the database
        List<Fechas> fechasList = fechasRepository.findAll();
        assertThat(fechasList).hasSize(databaseSizeBeforeCreate + 1);
        Fechas testFechas = fechasList.get(fechasList.size() - 1);
        assertThat(testFechas.getFecha()).isEqualTo(DEFAULT_FECHA);
    }

    @Test
    @Transactional
    public void createFechasWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fechasRepository.findAll().size();

        // Create the Fechas with an existing ID
        fechas.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFechasMockMvc.perform(post("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fechas)))
            .andExpect(status().isBadRequest());

        // Validate the Fechas in the database
        List<Fechas> fechasList = fechasRepository.findAll();
        assertThat(fechasList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFechas() throws Exception {
        // Initialize the database
        fechasRepository.saveAndFlush(fechas);

        // Get all the fechasList
        restFechasMockMvc.perform(get("/api/fechas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fechas.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(DEFAULT_FECHA.toString())));
    }
    
    @Test
    @Transactional
    public void getFechas() throws Exception {
        // Initialize the database
        fechasRepository.saveAndFlush(fechas);

        // Get the fechas
        restFechasMockMvc.perform(get("/api/fechas/{id}", fechas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fechas.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(DEFAULT_FECHA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFechas() throws Exception {
        // Get the fechas
        restFechasMockMvc.perform(get("/api/fechas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFechas() throws Exception {
        // Initialize the database
        fechasRepository.saveAndFlush(fechas);

        int databaseSizeBeforeUpdate = fechasRepository.findAll().size();

        // Update the fechas
        Fechas updatedFechas = fechasRepository.findById(fechas.getId()).get();
        // Disconnect from session so that the updates on updatedFechas are not directly saved in db
        em.detach(updatedFechas);
        updatedFechas
            .fecha(UPDATED_FECHA);

        restFechasMockMvc.perform(put("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFechas)))
            .andExpect(status().isOk());

        // Validate the Fechas in the database
        List<Fechas> fechasList = fechasRepository.findAll();
        assertThat(fechasList).hasSize(databaseSizeBeforeUpdate);
        Fechas testFechas = fechasList.get(fechasList.size() - 1);
        assertThat(testFechas.getFecha()).isEqualTo(UPDATED_FECHA);
    }

    @Test
    @Transactional
    public void updateNonExistingFechas() throws Exception {
        int databaseSizeBeforeUpdate = fechasRepository.findAll().size();

        // Create the Fechas

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFechasMockMvc.perform(put("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fechas)))
            .andExpect(status().isBadRequest());

        // Validate the Fechas in the database
        List<Fechas> fechasList = fechasRepository.findAll();
        assertThat(fechasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFechas() throws Exception {
        // Initialize the database
        fechasRepository.saveAndFlush(fechas);

        int databaseSizeBeforeDelete = fechasRepository.findAll().size();

        // Delete the fechas
        restFechasMockMvc.perform(delete("/api/fechas/{id}", fechas.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fechas> fechasList = fechasRepository.findAll();
        assertThat(fechasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
