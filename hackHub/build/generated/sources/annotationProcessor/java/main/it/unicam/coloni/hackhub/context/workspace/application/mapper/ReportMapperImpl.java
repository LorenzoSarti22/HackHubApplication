package it.unicam.coloni.hackhub.context.workspace.application.mapper;

import it.unicam.coloni.hackhub.context.workspace.application.dto.ReportDto;
import it.unicam.coloni.hackhub.context.workspace.application.dto.request.ReportRequest;
import it.unicam.coloni.hackhub.context.workspace.domain.model.Report;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T12:23:39+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.10.2.jar, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class ReportMapperImpl implements ReportMapper {

    @Override
    public ReportDto toDto(Report entity) {
        if ( entity == null ) {
            return null;
        }

        ReportDto reportDto = new ReportDto();

        reportDto.setId( entity.getId() );
        reportDto.setEventId( entity.getEventId() );
        reportDto.setTeamId( entity.getTeamId() );
        reportDto.setAuthorId( entity.getAuthorId() );
        reportDto.setDescription( entity.getDescription() );

        return reportDto;
    }

    @Override
    public Report toEntity(ReportRequest request) {
        if ( request == null ) {
            return null;
        }

        Report report = new Report();

        report.setTeamId( request.getTeamId() );
        report.setEventId( request.getEventId() );
        report.setDescription( request.getDescription() );

        return report;
    }
}
