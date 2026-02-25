package it.unicam.coloni.hackhub.context.event.domain.repository;

import it.unicam.coloni.hackhub.context.event.domain.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import it.unicam.coloni.hackhub.context.event.domain.model.EventStatus;
import java.util.Collection;
import java.util.List;

import it.unicam.coloni.hackhub.shared.domain.enums.PlatformRoles;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventRepository extends JpaRepository<Event, Long> {

    @Query("SELECT e FROM Event e WHERE e.status IN :statuses AND e.deletedAt IS NULL")
    List<Event> findByStatusIn(@Param("statuses") Collection<EventStatus> statuses);

    @Query("SELECT e FROM Event e JOIN e.staff a WHERE a.userId = :userId AND a.role = :role AND e.deletedAt IS NULL")
    List<Event> findByUserIdAndRole(@Param("userId") Long userId, @Param("role") PlatformRoles role);
}
