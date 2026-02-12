package it.unicam.coloni.hackhub.context.event.application.mapper;

import it.unicam.coloni.hackhub.context.event.application.dto.EventDto;
import it.unicam.coloni.hackhub.context.event.application.dto.requests.SimpleCreationRequest;
import it.unicam.coloni.hackhub.context.event.application.dto.requests.UpdateEventRequest;
import it.unicam.coloni.hackhub.context.event.application.dto.requests.WithStaffCreationRequest;
import it.unicam.coloni.hackhub.context.event.domain.model.Event;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T12:23:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.10.2.jar, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class EventMapperImpl extends EventMapper {

    @Override
    public Event toEvent(SimpleCreationRequest request, Event event) {
        if ( request == null ) {
            return event;
        }

        if ( request.getName() != null ) {
            event.setName( request.getName() );
        }
        if ( request.getRulesUrl() != null ) {
            event.setRulesUrl( request.getRulesUrl() );
        }

        event.setCreatedAt( java.time.LocalDateTime.now() );

        setDateRange( event, request );

        return event;
    }

    @Override
    public Event toEvent(WithStaffCreationRequest request, Event event) {
        if ( request == null ) {
            return event;
        }

        if ( request.getName() != null ) {
            event.setName( request.getName() );
        }
        if ( request.getRulesUrl() != null ) {
            event.setRulesUrl( request.getRulesUrl() );
        }

        event.setCreatedAt( java.time.LocalDateTime.now() );

        setDateRange( event, request );

        return event;
    }

    @Override
    public EventDto toDto(Event event) {
        if ( event == null ) {
            return null;
        }

        EventDto eventDto = new EventDto();

        eventDto.setEventId( event.getId() );
        eventDto.setName( event.getName() );
        eventDto.setRunningPeriod( event.getRunningPeriod() );
        eventDto.setRulesUrl( event.getRulesUrl() );
        eventDto.setStatus( event.getStatus() );
        eventDto.setCreatedAt( event.getCreatedAt() );
        eventDto.setDeletedAt( event.getDeletedAt() );
        eventDto.setModifiedAt( event.getModifiedAt() );

        return eventDto;
    }

    @Override
    public void fromUpdate(Event event, UpdateEventRequest dto) {
        if ( dto == null ) {
            return;
        }

        if ( dto != null ) {
            event.setModifiedAt( getCurrentTime( dto ) );
        }
        if ( dto.getId() != null ) {
            event.setId( dto.getId() );
        }
        if ( dto.getName() != null ) {
            event.setName( dto.getName() );
        }
        if ( dto.getRulesUrl() != null ) {
            event.setRulesUrl( dto.getRulesUrl() );
        }
    }
}
