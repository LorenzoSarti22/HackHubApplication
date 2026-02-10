package it.unicam.coloni.hackhub.context.identity.infrastructure.security.providers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

/**
 * Provider per l'autenticazione tramite JWT.
 * Rimosse annotazioni @Data, @AllArgsConstructor e @NoArgsConstructor per evitare
 * conflitti con la Dependency Injection di Spring.
 */
@Component
public class JWTProvider implements AuthenticationProvider {

    private final UserDetailsService userDetails;

    // L'uso del costruttore con @Autowired garantisce che userDetails venga iniettato correttamente
    @Autowired
    public JWTProvider(UserDetailsService userDetails) {
        this.userDetails = userDetails;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // Controllo di sicurezza per evitare NullPointerException sul principal
        if (authentication.getPrincipal() == null) {
            return null;
        }

        String username = authentication.getPrincipal().toString();

        // Carica l'utente dal database tramite il servizio iniettato
        UserDetails user = userDetails.loadUserByUsername(username);

        if (user != null) {
            // Ritorna il token di autenticazione per Spring Security
            return new UsernamePasswordAuthenticationToken(
                    user.getUsername(),
                    null,
                    user.getAuthorities()
            );
        }

        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        // Specifichiamo che questo provider supporta i token di autenticazione standard
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
