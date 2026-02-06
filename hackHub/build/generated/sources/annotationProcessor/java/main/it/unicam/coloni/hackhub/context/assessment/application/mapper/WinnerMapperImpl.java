package it.unicam.coloni.hackhub.context.assessment.application.mapper;

import it.unicam.coloni.hackhub.context.assessment.application.dto.WinnerDto;
import it.unicam.coloni.hackhub.context.assessment.domain.model.Winner;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-06T18:38:03+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class WinnerMapperImpl extends WinnerMapper {

    @Override
    public WinnerDto toDto(Winner entity) {
        if ( entity == null ) {
            return null;
        }

        WinnerDto winnerDto = new WinnerDto();

        winnerDto.setId( entity.getId() );
        winnerDto.setEventId( entity.getEventId() );
        winnerDto.setTeamId( entity.getTeamId() );
        winnerDto.setTotalScore( entity.getTotalScore() );
        winnerDto.setRankPosition( entity.getRankPosition() );

        return winnerDto;
    }

    @Override
    public List<WinnerDto> toDtoList(List<Winner> entities) {
        if ( entities == null ) {
            return null;
        }

        List<WinnerDto> list = new ArrayList<WinnerDto>( entities.size() );
        for ( Winner winner : entities ) {
            list.add( toDto( winner ) );
        }

        return list;
    }
}
