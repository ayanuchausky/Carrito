package examen.repository;

import examen.domain.Fechas;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Fechas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FechasRepository extends JpaRepository<Fechas, Long> {

}
