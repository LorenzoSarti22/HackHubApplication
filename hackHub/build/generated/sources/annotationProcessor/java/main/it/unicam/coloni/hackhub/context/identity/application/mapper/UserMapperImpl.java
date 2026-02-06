package it.unicam.coloni.hackhub.context.identity.application.mapper;

import it.unicam.coloni.hackhub.context.identity.application.dto.UserDto;
import it.unicam.coloni.hackhub.context.identity.application.dto.request.LoginRequest;
import it.unicam.coloni.hackhub.context.identity.application.dto.request.SignUpRequest;
import it.unicam.coloni.hackhub.context.identity.domain.model.User;
import it.unicam.coloni.hackhub.shared.domain.enums.PlatformRoles;
import java.time.ZoneOffset;
import java.util.Date;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-02-06T18:38:03+0100",
    comments = "version: 1.5.5.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.8.jar, environment: Java 21.0.8 (Oracle Corporation)"
)
@Component
public class UserMapperImpl extends UserMapper {

    @Override
    public UserDto toDto(User user) {
        if ( user == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setId( user.getId() );
        userDto.setFirstName( user.getFirstName() );
        userDto.setLastName( user.getLastName() );
        userDto.setUsername( user.getUsername() );
        if ( user.getBirthDate() != null ) {
            userDto.setBirthDate( Date.from( user.getBirthDate().atStartOfDay( ZoneOffset.UTC ).toInstant() ) );
        }
        userDto.setEmail( user.getEmail() );
        userDto.setGender( user.getGender() );
        userDto.setPhotoUrl( user.getPhotoUrl() );
        userDto.setRole( user.getRole() );

        return userDto;
    }

    @Override
    public User fromSignUp(SignUpRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setCreatedAt( getCurrentTime( request ) );
        user.setFirstName( request.getFirstName() );
        user.setLastName( request.getLastName() );
        user.setUsername( request.getUsername() );
        user.setEmail( request.getEmail() );
        user.setPassword( request.getPassword() );
        if ( request.getRole() != null ) {
            user.setRole( Enum.valueOf( PlatformRoles.class, request.getRole() ) );
        }
        user.setGender( request.getGender() );
        user.setBirthDate( request.getBirthDate() );
        user.setPhotoUrl( request.getPhotoUrl() );

        return user;
    }

    @Override
    public User fromLogin(LoginRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setUsername( request.getUsername() );

        return user;
    }
}
