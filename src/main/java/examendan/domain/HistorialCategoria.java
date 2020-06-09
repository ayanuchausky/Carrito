package examendan.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A HistorialCategoria.
 */
@Entity
@Table(name = "historial_categoria")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class HistorialCategoria implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "mes")
    private Integer mes;

    @Column(name = "se_convierte_en")
    private String seConvierteEn;

    @ManyToOne
    @JsonIgnoreProperties("historialCategorias")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMes() {
        return mes;
    }

    public HistorialCategoria mes(Integer mes) {
        this.mes = mes;
        return this;
    }

    public void setMes(Integer mes) {
        this.mes = mes;
    }

    public String getSeConvierteEn() {
        return seConvierteEn;
    }

    public HistorialCategoria seConvierteEn(String seConvierteEn) {
        this.seConvierteEn = seConvierteEn;
        return this;
    }

    public void setSeConvierteEn(String seConvierteEn) {
        this.seConvierteEn = seConvierteEn;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public HistorialCategoria cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HistorialCategoria)) {
            return false;
        }
        return id != null && id.equals(((HistorialCategoria) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "HistorialCategoria{" +
            "id=" + getId() +
            ", mes=" + getMes() +
            ", seConvierteEn='" + getSeConvierteEn() + "'" +
            "}";
    }
}
