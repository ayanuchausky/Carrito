package examen.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "es_vip")
    private Boolean esVip;

    @Column(name = "compras_ult_mes")
    private Double comprasUltMes;

    @OneToOne
    @JoinColumn(unique = true)
    private User usuario;

    @OneToMany(mappedBy = "cliente")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Carrito> carritos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isEsVip() {
        return esVip;
    }

    public Cliente esVip(Boolean esVip) {
        this.esVip = esVip;
        return this;
    }

    public void setEsVip(Boolean esVip) {
        this.esVip = esVip;
    }

    public Double getComprasUltMes() {
        return comprasUltMes;
    }

    public Cliente comprasUltMes(Double comprasUltMes) {
        this.comprasUltMes = comprasUltMes;
        return this;
    }

    public void setComprasUltMes(Double comprasUltMes) {
        this.comprasUltMes = comprasUltMes;
    }

    public User getUsuario() {
        return usuario;
    }

    public Cliente usuario(User user) {
        this.usuario = user;
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Set<Carrito> getCarritos() {
        return carritos;
    }

    public Cliente carritos(Set<Carrito> carritos) {
        this.carritos = carritos;
        return this;
    }

    public Cliente addCarritos(Carrito carrito) {
        this.carritos.add(carrito);
        carrito.setCliente(this);
        return this;
    }

    public Cliente removeCarritos(Carrito carrito) {
        this.carritos.remove(carrito);
        carrito.setCliente(null);
        return this;
    }

    public void setCarritos(Set<Carrito> carritos) {
        this.carritos = carritos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", esVip='" + isEsVip() + "'" +
            ", comprasUltMes=" + getComprasUltMes() +
            "}";
    }
}
