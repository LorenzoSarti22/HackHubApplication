package it.unicam.coloni.hackhub.context.event.application.mapper;

import it.unicam.coloni.hackhub.context.event.application.dto.AssignmentDto;
import it.unicam.coloni.hackhub.context.event.domain.model.Assignment;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T12:23:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.10.2.jar, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class AssignmentMapperImpl extends AssignmentMapper {

    @Override
    public AssignmentDto toDto(Assignment assignment) {
        if ( assignment == null ) {
            return null;
        }

        AssignmentDto assignmentDto = new AssignmentDto();

        assignmentDto.setRole( assignment.getRole() );
        assignmentDto.setUserId( assignment.getUserId() );
        assignmentDto.setTeamId( assignment.getTeamId() );

        assignmentDto.setEventId( assignment.getEvent().getId() );

        return assignmentDto;
    }
}
