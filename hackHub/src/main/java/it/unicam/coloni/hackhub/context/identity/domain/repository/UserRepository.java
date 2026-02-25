package it.unicam.coloni.hackhub.context.identity.domain.repository;

import it.unicam.coloni.hackhub.context.identity.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import it.unicam.coloni.hackhub.shared.domain.enums.PlatformRoles;
import java.util.List;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    List<User> findByRole(PlatformRoles role);
}

