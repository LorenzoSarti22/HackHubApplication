package it.unicam.coloni.hackhub.context.identity.infrastructure.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import it.unicam.coloni.hackhub.context.identity.application.utility.JWTHelper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

public class SpringJWTHelper implements JWTHelper {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String generate(Authentication user, Integer duration) {
        String username;
        Object principal = user.getPrincipal();

        // Gestiamo entrambi i casi: se è un oggetto UserDetails o se è una semplice String
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }

        long seconds = Instant.now().getEpochSecond() + (86400L * duration);
        Date expDate = Date.from(Instant.ofEpochSecond(seconds));

        return Jwts.builder()
                .subject(username) // Usiamo la stringa pulita
                .expiration(expDate)
                .signWith(getSigningKey())
                .compact();
    }

    @Override
    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(getSigningKey()).build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}