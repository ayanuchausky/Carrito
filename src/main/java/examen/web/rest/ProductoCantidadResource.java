package examen.web.rest;

import examen.domain.ProductoCantidad;
import examen.repository.ProductoCantidadRepository;
import examen.web.rest.errors.BadRequestAlertException;

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
 * REST controller for managing {@link examen.domain.ProductoCantidad}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProductoCantidadResource {

    private final Logger log = LoggerFactory.getLogger(ProductoCantidadResource.class);

    private static final String ENTITY_NAME = "productoCantidad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductoCantidadRepository productoCantidadRepository;

    public ProductoCantidadResource(ProductoCantidadRepository productoCantidadRepository) {
        this.productoCantidadRepository = productoCantidadRepository;
    }

    /**
     * {@code POST  /producto-cantidads} : Create a new productoCantidad.
     *
     * @param productoCantidad the productoCantidad to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productoCantidad, or with status {@code 400 (Bad Request)} if the productoCantidad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/producto-cantidads")
    public ResponseEntity<ProductoCantidad> createProductoCantidad(@RequestBody ProductoCantidad productoCantidad) throws URISyntaxException {
        log.debug("REST request to save ProductoCantidad : {}", productoCantidad);
        if (productoCantidad.getId() != null) {
            throw new BadRequestAlertException("A new productoCantidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductoCantidad result = productoCantidadRepository.save(productoCantidad);
        return ResponseEntity.created(new URI("/api/producto-cantidads/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /producto-cantidads} : Updates an existing productoCantidad.
     *
     * @param productoCantidad the productoCantidad to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productoCantidad,
     * or with status {@code 400 (Bad Request)} if the productoCantidad is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productoCantidad couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/producto-cantidads")
    public ResponseEntity<ProductoCantidad> updateProductoCantidad(@RequestBody ProductoCantidad productoCantidad) throws URISyntaxException {
        log.debug("REST request to update ProductoCantidad : {}", productoCantidad);
        if (productoCantidad.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductoCantidad result = productoCantidadRepository.save(productoCantidad);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, productoCantidad.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /producto-cantidads} : get all the productoCantidads.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productoCantidads in body.
     */
    @GetMapping("/producto-cantidads")
    public List<ProductoCantidad> getAllProductoCantidads() {
        log.debug("REST request to get all ProductoCantidads");
        return productoCantidadRepository.findAll();
    }

    /**
     * {@code GET  /producto-cantidads/:id} : get the "id" productoCantidad.
     *
     * @param id the id of the productoCantidad to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productoCantidad, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/producto-cantidads/{id}")
    public ResponseEntity<ProductoCantidad> getProductoCantidad(@PathVariable Long id) {
        log.debug("REST request to get ProductoCantidad : {}", id);
        Optional<ProductoCantidad> productoCantidad = productoCantidadRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productoCantidad);
    }

    /**
     * {@code DELETE  /producto-cantidads/:id} : delete the "id" productoCantidad.
     *
     * @param id the id of the productoCantidad to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/producto-cantidads/{id}")
    public ResponseEntity<Void> deleteProductoCantidad(@PathVariable Long id) {
        log.debug("REST request to delete ProductoCantidad : {}", id);
        productoCantidadRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
