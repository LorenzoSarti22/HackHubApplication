package it.unicam.coloni.hackhub.context.workspace.application.mapper;

import it.unicam.coloni.hackhub.context.workspace.application.dto.MeetingDto;
import it.unicam.coloni.hackhub.context.workspace.application.dto.request.ScheduleMeetingRequest;
import it.unicam.coloni.hackhub.context.workspace.domain.model.Meeting;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-06T18:38:03+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class MeetingMapperImpl implements MeetingMapper {

    @Override
    public MeetingDto toDto(Meeting entity) {
        if ( entity == null ) {
            return null;
        }

        MeetingDto meetingDto = new MeetingDto();

        meetingDto.setLink( entity.getMeetingLink() );
        meetingDto.setId( entity.getId() );
        meetingDto.setEventId( entity.getEventId() );
        meetingDto.setTeamId( entity.getTeamId() );
        meetingDto.setMentorId( entity.getMentorId() );
        meetingDto.setTicketId( entity.getTicketId() );
        meetingDto.setDate( entity.getDate() );

        meetingDto.setUpcoming( entity.isUpcoming() );

        return meetingDto;
    }

    @Override
    public Meeting toEntity(ScheduleMeetingRequest request) {
        if ( request == null ) {
            return null;
        }

        Meeting meeting = new Meeting();

        meeting.setMeetingLink( request.getLink() );
        meeting.setTeamId( request.getTeamId() );
        meeting.setDate( request.getDate() );
        meeting.setEventId( request.getEventId() );

        return meeting;
    }
}
