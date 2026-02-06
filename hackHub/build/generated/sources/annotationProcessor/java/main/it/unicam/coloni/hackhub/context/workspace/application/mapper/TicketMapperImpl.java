package it.unicam.coloni.hackhub.context.workspace.application.mapper;

import it.unicam.coloni.hackhub.context.workspace.application.dto.TicketDto;
import it.unicam.coloni.hackhub.context.workspace.domain.model.Ticket;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-06T18:38:03+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class TicketMapperImpl implements TicketMapper {

    @Override
    public TicketDto toDto(Ticket entity) {
        if ( entity == null ) {
            return null;
        }

        TicketDto ticketDto = new TicketDto();

        ticketDto.setId( entity.getId() );
        ticketDto.setEventId( entity.getEventId() );
        ticketDto.setTeamId( entity.getTeamId() );
        ticketDto.setDescription( entity.getDescription() );
        ticketDto.setUrgency( entity.getUrgency() );
        ticketDto.setStatus( entity.getStatus() );

        return ticketDto;
    }
}
