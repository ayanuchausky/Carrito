package examendan.web.rest;

import examendan.domain.Fechas;
import examendan.repository.FechasRepository;
import examendan.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link examendan.domain.Fechas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FechasResource {

    private final Logger log = LoggerFactory.getLogger(FechasResource.class);

    private static final String ENTITY_NAME = "fechas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FechasRepository fechasRepository;

    public FechasResource(FechasRepository fechasRepository) {
        this.fechasRepository = fechasRepository;
    }

    /**
     * {@code POST  /fechas} : Create a new fechas.
     *
     * @param fechas the fechas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fechas, or with status {@code 400 (Bad Request)} if the fechas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fechas")
    public ResponseEntity<Fechas> createFechas(@RequestBody Fechas fechas) throws URISyntaxException {
        log.debug("REST request to save Fechas : {}", fechas);
        if (fechas.getId() != null) {
            throw new BadRequestAlertException("A new fechas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fechas result = fechasRepository.save(fechas);
        return ResponseEntity.created(new URI("/api/fechas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fechas} : Updates an existing fechas.
     *
     * @param fechas the fechas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fechas,
     * or with status {@code 400 (Bad Request)} if the fechas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fechas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fechas")
    public ResponseEntity<Fechas> updateFechas(@RequestBody Fechas fechas) throws URISyntaxException {
        log.debug("REST request to update Fechas : {}", fechas);
        if (fechas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fechas result = fechasRepository.save(fechas);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, fechas.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fechas} : get all the fechas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fechas in body.
     */
    @GetMapping("/fechas")
    public List<Fechas> getAllFechas() {
        log.debug("REST request to get all Fechas");
        return fechasRepository.findAll();
    }

    /**
     * {@code GET  /fechas/:id} : get the "id" fechas.
     *
     * @param id the id of the fechas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fechas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fechas/{id}")
    public ResponseEntity<Fechas> getFechas(@PathVariable Long id) {
        log.debug("REST request to get Fechas : {}", id);
        Optional<Fechas> fechas = fechasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fechas);
    }

    /**
     * {@code DELETE  /fechas/:id} : delete the "id" fechas.
     *
     * @param id the id of the fechas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fechas/{id}")
    public ResponseEntity<Void> deleteFechas(@PathVariable Long id) {
        log.debug("REST request to delete Fechas : {}", id);
        fechasRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
