package it.unicam.coloni.hackhub.context.assessment.application.mapper;

import it.unicam.coloni.hackhub.context.assessment.application.dto.AssessmentDto;
import it.unicam.coloni.hackhub.context.assessment.application.dto.request.AssessmentRequest;
import it.unicam.coloni.hackhub.context.assessment.domain.model.Assessment;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-12T12:23:38+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.10.2.jar, environment: Java 21.0.10 (Oracle Corporation)"
)
@Component
public class AssessmentMapperImpl extends AssessmentMapper {

    @Override
    public AssessmentDto toDto(Assessment assessment) {
        if ( assessment == null ) {
            return null;
        }

        AssessmentDto assessmentDto = new AssessmentDto();

        assessmentDto.setId( assessment.getId() );
        assessmentDto.setEventId( assessment.getEventId() );
        assessmentDto.setTeamId( assessment.getTeamId() );
        assessmentDto.setJudgeId( assessment.getJudgeId() );
        Map<String, Integer> map = assessment.getVotes();
        if ( map != null ) {
            assessmentDto.setVotes( new LinkedHashMap<String, Integer>( map ) );
        }
        assessmentDto.setDescription( assessment.getDescription() );

        assessmentDto.setAverageScore( assessment.getAverageScore() );

        return assessmentDto;
    }

    @Override
    public Assessment toEntity(AssessmentRequest request) {
        if ( request == null ) {
            return null;
        }

        Assessment assessment = new Assessment();

        assessment.setEventId( request.getEventId() );
        assessment.setTeamId( request.getTeamId() );
        assessment.setDescription( request.getDescription() );
        Map<String, Integer> map = request.getVotes();
        if ( map != null ) {
            assessment.setVotes( new LinkedHashMap<String, Integer>( map ) );
        }

        return assessment;
    }
}
