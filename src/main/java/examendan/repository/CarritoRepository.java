package examendan.repository;

import examendan.domain.Carrito;
import examendan.domain.Cliente;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Carrito entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarritoRepository extends JpaRepository<Carrito, Long> {

	List<Carrito> findAllByCliente(Cliente cliente);

}
