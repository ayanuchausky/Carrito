package examen.repository;

import examen.domain.ProductoCantidad;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProductoCantidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductoCantidadRepository extends JpaRepository<ProductoCantidad, Long> {

}
