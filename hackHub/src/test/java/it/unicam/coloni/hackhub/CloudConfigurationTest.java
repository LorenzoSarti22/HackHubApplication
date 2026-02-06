package it.unicam.coloni.hackhub;

import org.junit.jupiter.api.Test;
import java.io.File;
import java.nio.file.Files;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertTrue;

class CloudConfigurationTest {

    @Test
    void verifyDockerMultiStageBuild() throws Exception {
        File dockerfile = new File("Dockerfile");
        assertTrue(dockerfile.exists(), "Dockerfile non trovato!");

        String content = Files.readString(dockerfile.toPath());

        // Verifichiamo che stiate usando il Multi-stage (fondamentale per il Cloud)
        assertTrue(content.contains("AS build"), "Il Dockerfile dovrebbe usare il multi-stage build per efficienza.");
        assertTrue(content.contains("eclipse-temurin:21-jre"), "L'immagine di runtime deve essere JRE 21 per coerenza.");
        assertTrue(content.contains("EXPOSE 8080"), "Il Dockerfile deve esporre la porta 8080.");
    }

    @Test
    void verifyDockerComposeDatabaseLink() throws Exception {
        File compose = new File("docker-compose.yml");
        assertTrue(compose.exists(), "Docker Compose non trovato!");

        String content = Files.readString(compose.toPath());

        // Verifichiamo la persistenza (i Volumi)
        assertTrue(content.contains("postgres_data:/var/lib/postgresql/data"),
                "Il volume di persistenza per PostgreSQL non è configurato correttamente!");

        // Verifichiamo il link tra backend e database
        assertTrue(content.contains("jdbc:postgresql://db:5432/hackhub_db"),
                "L'URL del database nel Compose non punta al servizio 'db' o al nome DB corretto!");

        assertTrue(content.contains("depends_on:"), "Il backend dovrebbe dipendere dal db per l'avvio corretto.");
    }

    @Test
    void verifyJwtSecurityConsistency() throws Exception {
        File properties = new File("src/main/resources/application.properties");
        String content = Files.readString(properties.toPath());

        // Verifichiamo che il segreto JWT sia presente (punto critico della vostra sicurezza)
        assertTrue(content.contains("jwt.secret"), "La chiave JWT deve essere definita per la sicurezza nel Cloud.");
    }
}
