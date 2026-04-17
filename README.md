# Secure Authentication with JWT and OAuth2

**Final Exam Project – Erik Hultqvist | Java24 | Grit Academy**

A fullstack application with JWT authentication and OAuth2(Google & GitHub), built with Spring Boot and Angular. The frontend is a movie app powered by the TMDB API where logged-in users can save favourites and build a watchlist.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Java 17, Spring Boot 3.4, Spring Security, MySQL |
| Frontend | Angular, TypeScript, PrimeNG, TailwindCSS |
| Database | MySQL 8 (via Docker) |
| Auth | JWT (jjwt 0.12.5), OAuth2 (Google, GitHub) |

---

## Requirements

Make sure you have the following installed:

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Java 17+](https://adoptium.net/)
- [Node.js 18+](https://nodejs.org/)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/)
- [VS Code](https://code.visualstudio.com/)
- Angular CLI: `npm install -g @angular/cli`

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/erihul/java24-examensarbete-erik-hultqvist.git
cd java24-examensarbete-erik-hultqvist
```

### 2. Configure secrets

#### Backend

Rename the file `backend/src/main/resources/application-local.properties` to `application.properties` and fill in the values below.

> The credentials needed to run the project have been shared separately (see Classroom).

```properties
jwt.secret=YOUR_JWT_SECRET

spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET

spring.security.oauth2.client.registration.github.client-id=YOUR_GITHUB_CLIENT_ID
spring.security.oauth2.client.registration.github.client-secret=YOUR_GITHUB_CLIENT_SECRET
```

> **OAuth2 is optional.** If you only want to test local register/login, you can leave the OAuth2 values empty. The app works without them.

#### Frontend

Rename `environment.ts` to `environment.development.ts` and fill in the values:

```typescript
export const environment: Environment = {
  apiKey: 'YOUR_TMDB_API_KEY',
  apiToken: 'YOUR_TMDB_API_TOKEN',
  apiBaseUrl: 'https://api.themoviedb.org/3',
  imageBaseUrl: 'https://image.tmdb.org/t/p'
};
```

> TMDB credentials are shared separately in Google Classroom together with the OAuth2 and JWT secrets.

### 3. Start the database (Docker)

```bash
cd backend
docker compose up -d
```

Verify it's running:

```bash
docker ps
```

To stop it later:

```bash
docker stop mysql-exjobb
```

### 4. Start the backend (IntelliJ)

1. Open the `backend/` folder in IntelliJ IDEA
2. Wait for Maven to finish downloading dependencies (progress bar at the bottom)
3. Open `src/main/java/.../Jd24ExamensarbeteErikhApplication.java`
4. Click the green ▶ Run button
5. Backend runs at `http://localhost:8080`

### 5. Start the frontend (VS Code)

```bash
cd frontend
npm install
ng serve
```

Open `http://localhost:4200` in your browser.

---


## OAuth2 Flow

```
User clicks "Login with Google"
→ Redirected to Google login page
→ Google redirects back to backend
→ Backend finds or creates user in database
→ Backend generates JWT pair
→ Redirected to frontend with tokens
→ User is logged in
```

