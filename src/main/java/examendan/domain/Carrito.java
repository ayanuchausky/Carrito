package examendan.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Carrito.
 */
@Entity
@Table(name = "carrito")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Carrito implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "total")
    private Double total;

    @Column(name = "fecha")
    private LocalDate fecha;

    @OneToMany(mappedBy = "carrito")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductoCantidad> productoCants = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("carritos")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipo() {
        return tipo;
    }

    public Carrito tipo(String tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Double getTotal() {
        return total;
    }

    public Carrito total(Double total) {
        this.total = total;
        return this;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public Carrito fecha(LocalDate fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Set<ProductoCantidad> getProductoCants() {
        return productoCants;
    }

    public Carrito productoCants(Set<ProductoCantidad> productoCantidads) {
        this.productoCants = productoCantidads;
        return this;
    }

    public Carrito addProductoCant(ProductoCantidad productoCantidad) {
        this.productoCants.add(productoCantidad);
        productoCantidad.setCarrito(this);
        return this;
    }

    public Carrito removeProductoCant(ProductoCantidad productoCantidad) {
        this.productoCants.remove(productoCantidad);
        productoCantidad.setCarrito(null);
        return this;
    }

    public void setProductoCants(Set<ProductoCantidad> productoCantidads) {
        this.productoCants = productoCantidads;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public Carrito cliente(Cliente cliente) {
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
        if (!(o instanceof Carrito)) {
            return false;
        }
        return id != null && id.equals(((Carrito) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Carrito{" +
            "id=" + getId() +
            ", tipo='" + getTipo() + "'" +
            ", total=" + getTotal() +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
