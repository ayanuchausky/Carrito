package examendan.web.rest;

import examendan.domain.HistorialCategoria;
import examendan.repository.HistorialCategoriaRepository;
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
 * REST controller for managing {@link examendan.domain.HistorialCategoria}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class HistorialCategoriaResource {

    private final Logger log = LoggerFactory.getLogger(HistorialCategoriaResource.class);

    private static final String ENTITY_NAME = "historialCategoria";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final HistorialCategoriaRepository historialCategoriaRepository;

    public HistorialCategoriaResource(HistorialCategoriaRepository historialCategoriaRepository) {
        this.historialCategoriaRepository = historialCategoriaRepository;
    }

    /**
     * {@code POST  /historial-categorias} : Create a new historialCategoria.
     *
     * @param historialCategoria the historialCategoria to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new historialCategoria, or with status {@code 400 (Bad Request)} if the historialCategoria has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/historial-categorias")
    public ResponseEntity<HistorialCategoria> createHistorialCategoria(@RequestBody HistorialCategoria historialCategoria) throws URISyntaxException {
        log.debug("REST request to save HistorialCategoria : {}", historialCategoria);
        if (historialCategoria.getId() != null) {
            throw new BadRequestAlertException("A new historialCategoria cannot already have an ID", ENTITY_NAME, "idexists");
        }
        HistorialCategoria result = historialCategoriaRepository.save(historialCategoria);
        return ResponseEntity.created(new URI("/api/historial-categorias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /historial-categorias} : Updates an existing historialCategoria.
     *
     * @param historialCategoria the historialCategoria to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated historialCategoria,
     * or with status {@code 400 (Bad Request)} if the historialCategoria is not valid,
     * or with status {@code 500 (Internal Server Error)} if the historialCategoria couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/historial-categorias")
    public ResponseEntity<HistorialCategoria> updateHistorialCategoria(@RequestBody HistorialCategoria historialCategoria) throws URISyntaxException {
        log.debug("REST request to update HistorialCategoria : {}", historialCategoria);
        if (historialCategoria.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        HistorialCategoria result = historialCategoriaRepository.save(historialCategoria);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, historialCategoria.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /historial-categorias} : get all the historialCategorias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of historialCategorias in body.
     */
    @GetMapping("/historial-categorias")
    public List<HistorialCategoria> getAllHistorialCategorias() {
        log.debug("REST request to get all HistorialCategorias");
        return historialCategoriaRepository.findAll();
    }

    /**
     * {@code GET  /historial-categorias/:id} : get the "id" historialCategoria.
     *
     * @param id the id of the historialCategoria to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the historialCategoria, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/historial-categorias/{id}")
    public ResponseEntity<HistorialCategoria> getHistorialCategoria(@PathVariable Long id) {
        log.debug("REST request to get HistorialCategoria : {}", id);
        Optional<HistorialCategoria> historialCategoria = historialCategoriaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(historialCategoria);
    }

    /**
     * {@code DELETE  /historial-categorias/:id} : delete the "id" historialCategoria.
     *
     * @param id the id of the historialCategoria to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/historial-categorias/{id}")
    public ResponseEntity<Void> deleteHistorialCategoria(@PathVariable Long id) {
        log.debug("REST request to delete HistorialCategoria : {}", id);
        historialCategoriaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
