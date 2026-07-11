package com.fitness.userservice.models;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String keycloakId;

    @Column(unique = true)
    private String email;

    @Column(nullable = false)
    private String password;
    private String firstName;
    private String lastName;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

//    Automatically generates time when record is inserted
    @CreationTimestamp
    private LocalDateTime createdAt;

//    Automatically updates time when record is updated
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
