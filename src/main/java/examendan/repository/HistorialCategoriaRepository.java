package examendan.repository;

import examendan.domain.HistorialCategoria;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the HistorialCategoria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HistorialCategoriaRepository extends JpaRepository<HistorialCategoria, Long> {
	
	List<HistorialCategoria> findAllByMes(int mes);

}
