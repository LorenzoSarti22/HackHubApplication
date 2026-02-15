package it.unicam.coloni.hackhub.context.event.domain.repository;

import it.unicam.coloni.hackhub.context.event.domain.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import it.unicam.coloni.hackhub.context.event.domain.model.EventStatus;
import java.util.Collection;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByStatusIn(Collection<EventStatus> statuses);
}
