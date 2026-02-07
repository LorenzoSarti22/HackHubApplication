package it.unicam.coloni.hackhub;

import org.junit.jupiter.api.Test;
import java.io.File;
import java.nio.file.Files;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CloudConfigurationTest {

    @Test
    void verifyDockerMultiStageBuild() throws Exception {
        // Il test ora cerca il file nella cartella dove viene eseguito (hackHub)
        File dockerfile = new File("Dockerfile");
        assertTrue(dockerfile.exists(), "Dockerfile non trovato in " + dockerfile.getAbsolutePath());

        String content = Files.readString(dockerfile.toPath());

        assertTrue(content.contains("AS build"), "Il Dockerfile dovrebbe usare il multi-stage build.");
        // Abbiamo usato node:20-alpine o simili?
        // Se nel Dockerfile del backend hai usato eclipse-temurin, questo passa:
        assertTrue(content.contains("eclipse-temurin:21-jre") || content.contains("openjdk:21"),
                "L'immagine di runtime deve essere Java 21.");
        assertTrue(content.contains("EXPOSE 8080"), "Il Dockerfile deve esporre la porta 8080.");
    }

    @Test
    void verifyDockerComposeDatabaseLink() throws Exception {
        // MODIFICA: Cerchiamo il nome file corretto (docker-compose-be.yml)
        File compose = new File("docker-compose-be.yml");
        assertTrue(compose.exists(), "Docker Compose (docker-compose-be.yml) non trovato!");

        String content = Files.readString(compose.toPath());

        // Verifichiamo la persistenza
        assertTrue(content.contains("postgres_data:/var/lib/postgresql/data"),
                "Il volume di persistenza per PostgreSQL non è configurato correttamente!");

        // Verifichiamo il link tra backend e database
        // Nota: Assicurati che nel compose l'URL sia esattamente questo
        assertTrue(content.contains("jdbc:postgresql://db:5432/hackhub_db"),
                "L'URL del database deve puntare al servizio 'hackhub-db'!");

        assertTrue(content.contains("depends_on:"), "Il backend dovrebbe dipendere dal db.");
    }

    @Test
    void verifyJwtSecurityConsistency() throws Exception {
        File properties = new File("src/main/resources/application.properties");
        assertTrue(properties.exists(), "File application.properties non trovato!");

        String content = Files.readString(properties.toPath());

        // Se usate @Value("${jwt.secret}"), verifichiamo che la stringa sia presente
        assertTrue(content.contains("jwt.secret"), "La chiave JWT deve essere definita.");
    }
}