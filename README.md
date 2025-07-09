# 🎫 Event Manager API – AdonisJS

Une API complète pour gérer des événements, avec authentification, gestion des utilisateurs, inscriptions.

---

## 🚀 Fonctionnalités

### 🔐 Authentification
- Inscription avec hash du mot de passe
- Connexion via sessions
- Middleware de protection des routes privées

### 👤 Utilisateurs
- Récupérer son profil : `GET /me`
- Modifier ses informations : `PUT /me`
- Supprimer son compte : `DELETE /me`

### 📅 Événements
- Lister les événements : `GET /events`
- Voir un événement : `GET /events/:id`
- Créer un événement : `POST /events`
- Modifier un événement : `PUT /events/:id`
- Supprimer un événement : `DELETE /events/:id`

**Champs** : `title`, `description`, `date`, `location`, `max_attendees`, etc.  
L’auteur est automatiquement lié à l’événement.

### 🧾 Inscriptions aux événements
- S’inscrire : `POST /events/:id/register`
- Se désinscrire : `DELETE /events/:id/register`
- Limite automatique si nombre max atteint
