package examen.web.rest;

import examen.domain.Carrito;
import examen.domain.Fechas;
import examen.domain.ProductoCantidad;
import examen.repository.CarritoRepository;
import examen.repository.FechasRepository;
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
 * REST controller for managing {@link examen.domain.Carrito}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CarritoResource {

	private final Logger log = LoggerFactory.getLogger(CarritoResource.class);

	private static final String ENTITY_NAME = "carrito";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final CarritoRepository carritoRepository;

	private final FechasRepository fechasRepository;

	public CarritoResource(CarritoRepository carritoRepository, FechasRepository fechasRepository) {
		this.carritoRepository = carritoRepository;
		this.fechasRepository = fechasRepository;
	}

	/**
	 * {@code POST  /carritos} : Create a new carrito.
	 *
	 * @param carrito the carrito to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carrito, or with status {@code 400 (Bad Request)} if the carrito has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/carritos")
	public ResponseEntity<Carrito> createCarrito(@RequestBody Carrito carrito) throws URISyntaxException {
		log.debug("REST request to save Carrito : {}", carrito);
		if (carrito.getId() != null) {
			throw new BadRequestAlertException("A new carrito cannot already have an ID", ENTITY_NAME, "idexists");
		}
		// Chequeo el tipo de carrito antes de guardarlo
		if(carrito.getCliente().isEsVip()) {carrito.setTipo("Vip");}
		else {
			List<Fechas> listado =  this.fechasRepository.findAll();
			for(int i=1;i<listado.size();i++) {
				if(carrito.getFecha().getFecha() == listado.get(i).getFecha()) {
					carrito.setTipo("Promocionable");
				}
				else {carrito.setTipo("Comun");}

			}
		}
		// Aplico descuentos
		carrito.setTotal(this.calcularDescuentos(carrito));
		
		
		Carrito result = carritoRepository.save(carrito);
		return ResponseEntity.created(new URI("/api/carritos/" + result.getId()))
				.headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /carritos} : Updates an existing carrito.
	 *
	 * @param carrito the carrito to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carrito,
	 * or with status {@code 400 (Bad Request)} if the carrito is not valid,
	 * or with status {@code 500 (Internal Server Error)} if the carrito couldn't be updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/carritos")
	public ResponseEntity<Carrito> updateCarrito(@RequestBody Carrito carrito) throws URISyntaxException {
		log.debug("REST request to update Carrito : {}", carrito);
		if (carrito.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		Carrito result = carritoRepository.save(carrito);
		return ResponseEntity.ok()
				.headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, carrito.getId().toString()))
				.body(result);
	}

	/**
	 * {@code GET  /carritos} : get all the carritos.
	 *
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carritos in body.
	 */
	@GetMapping("/carritos")
	public List<Carrito> getAllCarritos() {
		log.debug("REST request to get all Carritos");
		return carritoRepository.findAll();
	}

	/**
	 * {@code GET  /carritos/:id} : get the "id" carrito.
	 *
	 * @param id the id of the carrito to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carrito, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/carritos/{id}")
	public ResponseEntity<Carrito> getCarrito(@PathVariable Long id) {
		log.debug("REST request to get Carrito : {}", id);
		Optional<Carrito> carrito = carritoRepository.findById(id);
		return ResponseUtil.wrapOrNotFound(carrito);
	}

	/**
	 * {@code DELETE  /carritos/:id} : delete the "id" carrito.
	 *
	 * @param id the id of the carrito to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/carritos/{id}")
	public ResponseEntity<Void> deleteCarrito(@PathVariable Long id) {
		log.debug("REST request to delete Carrito : {}", id);
		carritoRepository.deleteById(id);
		return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
	}
	
	private double calcularDescuentos(Carrito carrito) {
		int cantidadDeProductos = 0;
		double precioFinal = carrito.getTotal();
		double precioProdMasBarato = -1;
		for(ProductoCantidad pc: carrito.getProductoCants()) {
			cantidadDeProductos += pc.getCantidad();
			if(precioProdMasBarato == -1) {precioProdMasBarato = pc.getProducto().getPrecio();}
			if(pc.getProducto().getPrecio() <= precioProdMasBarato ) {precioProdMasBarato = pc.getProducto().getPrecio();} 
		}
		if (cantidadDeProductos == 5) {
			precioFinal = carrito.getTotal()*0.8;
		}
		if (cantidadDeProductos > 10) {
			if(carrito.getTipo().equals("Comun")) {}
			switch(carrito.getTipo()) {
			case "Comun":
				precioFinal = carrito.getTotal()-200;
				break;
			case "Promocionable":
				precioFinal = carrito.getTotal()-500;
				break;
			case "Vip":
				precioFinal = carrito.getTotal()-precioProdMasBarato-700;
				break;
			}
		}
		return precioFinal;
	}
}
